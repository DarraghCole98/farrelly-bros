/**
 * Cloudflare Pages Function — POST /api/enquiry
 *
 * Receives the five-stage enquiry as multipart/form-data (`payload` is the
 * JSON-encoded ProjectEnquiry, minus files; each file is a separate part
 * named `file_<kind>_<index>`). Validates everything server-side, stores
 * files in R2 and a record in D1 when those bindings exist, and emails a
 * structured notification — never a JSON dump, never raw attachments.
 *
 * Every external integration (R2, D1, Turnstile, Resend) is optional and
 * checked at runtime, so this works today via the Web3Forms fallback and
 * upgrades in place once real credentials are added — see the project
 * README / handover notes for the env vars this reads.
 */
import {
  type Env,
  jsonResponse,
  sanitizeText,
  isValidEmail,
  classifyAndValidateFile,
  fileCountLimit,
  isDangerousFilename,
  signFileUrl,
  verifyTurnstile,
  isRateLimited,
  WEB3FORMS_ENDPOINT,
  DEFAULT_WEB3FORMS_ACCESS_KEY,
  type FileKind,
} from "./_shared.ts";
import {
  SERVICE_OPTIONS,
  SITE_TYPE_OPTIONS,
  ACCESS_OPTIONS,
  SITE_CONDITION_OPTIONS,
  TIMING_OPTIONS,
  ROLE_OPTIONS,
  SERVICE_QUESTIONS,
  findOption,
} from "../../src/lib/enquiry/config.ts";

interface IncomingEnquiry {
  service?: string;
  serviceDetails?: Record<string, string | string[]>;
  siteType?: string;
  location?: string;
  access?: string;
  siteConditions?: string[];
  timing?: string;
  targetDate?: string;
  notes?: string;
  contact?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    role?: string;
  };
  privacyAccepted?: boolean;
  metadata?: { sourcePage?: string };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  if (await isRateLimited(env, ip)) {
    return jsonResponse({ success: false, error: "Too many enquiries from this connection — please try again shortly." }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ success: false, error: "Could not read submission." }, { status: 400 });
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    return jsonResponse({ success: false, error: "Missing enquiry data." }, { status: 400 });
  }

  let incoming: IncomingEnquiry;
  try {
    incoming = JSON.parse(rawPayload);
  } catch {
    return jsonResponse({ success: false, error: "Malformed enquiry data." }, { status: 400 });
  }

  // ---- Server-side validation (never trust the client) --------------------

  const problems: string[] = [];
  const service = sanitizeText(incoming.service, 100);
  const siteType = sanitizeText(incoming.siteType, 100);
  const location = sanitizeText(incoming.location, 200);
  const access = sanitizeText(incoming.access, 100);
  const timing = sanitizeText(incoming.timing, 100);
  const name = sanitizeText(incoming.contact?.name, 200);
  const company = sanitizeText(incoming.contact?.company, 200);
  const email = sanitizeText(incoming.contact?.email, 200);
  const phone = sanitizeText(incoming.contact?.phone, 60);
  const role = sanitizeText(incoming.contact?.role, 100);
  const notes = sanitizeText(incoming.notes, 4000);
  const targetDate = sanitizeText(incoming.targetDate, 40);
  const siteConditions = Array.isArray(incoming.siteConditions)
    ? incoming.siteConditions.map((c) => sanitizeText(c, 100)).slice(0, 20)
    : [];

  if (!service) problems.push("A service is required.");
  if (!siteType) problems.push("A site type is required.");
  if (!location) problems.push("A location is required.");
  if (!access) problems.push("An access answer is required.");
  if (!timing) problems.push("A timing answer is required.");
  if (!name) problems.push("A name is required.");
  if (!email || !isValidEmail(email)) problems.push("A valid email is required.");
  if (!phone) problems.push("A telephone number is required.");
  if (!incoming.privacyAccepted) problems.push("Consent to store and use these details is required.");

  // Turnstile — verified when configured; skipped (not blocked) otherwise, so
  // the form still works before a site/secret key pair has been created.
  if (env.TURNSTILE_SECRET_KEY) {
    const token = formData.get("turnstileToken");
    const valid =
      typeof token === "string" && token.length > 0 && (await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip));
    if (!valid) problems.push("Spam check failed — please try again.");
  }

  if (problems.length) {
    return jsonResponse({ success: false, error: problems.join(" ") }, { status: 400 });
  }

  // ---- Files ---------------------------------------------------------

  const fileEntries: { key: string; file: File; kind: FileKind }[] = [];
  const fileProblems: string[] = [];
  const countsByKind: Record<string, number> = {};

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("file_") || !(value instanceof File)) continue;
    const parts = key.split("_"); // file_<kind>_<index>
    const claimedKind = parts[1] ?? "";

    if (isDangerousFilename(value.name)) {
      fileProblems.push(`${value.name}: file type not allowed.`);
      continue;
    }
    const result = classifyAndValidateFile(value, claimedKind);
    if (!result.ok) {
      fileProblems.push(result.reason);
      continue;
    }
    countsByKind[result.kind] = (countsByKind[result.kind] ?? 0) + 1;
    if (countsByKind[result.kind] > fileCountLimit(result.kind)) {
      fileProblems.push(`${value.name}: exceeds the allowed number of ${result.kind}s.`);
      continue;
    }
    fileEntries.push({ key, file: value, kind: result.kind });
  }

  if (fileProblems.length) {
    return jsonResponse({ success: false, error: fileProblems.join(" ") }, { status: 400 });
  }

  // ---- Store -----------------------------------------------------------

  const enquiryId = crypto.randomUUID();
  const siteUrl = env.SITE_URL || new URL(request.url).origin;

  const storedFiles: { name: string; kind: FileKind; url: string | null }[] = [];

  if (env.ENQUIRY_UPLOADS) {
    let index = 0;
    for (const entry of fileEntries) {
      const objectKey = `enquiries/${enquiryId}/${index}-${safeFilename(entry.file.name)}`;
      try {
        await env.ENQUIRY_UPLOADS.put(objectKey, entry.file.stream(), {
          httpMetadata: { contentType: entry.file.type || "application/octet-stream" },
        });
        const url = env.FILES_SIGNING_SECRET
          ? await signFileUrl(siteUrl, env.FILES_SIGNING_SECRET, objectKey)
          : null;
        storedFiles.push({ name: entry.file.name, kind: entry.kind, url });
      } catch {
        storedFiles.push({ name: entry.file.name, kind: entry.kind, url: null });
      }
      index++;
    }
  } else {
    // No bucket configured yet — still tell Farrelly Bros what was attached,
    // just without a retrievable link. Nothing is emailed as an attachment.
    for (const entry of fileEntries) {
      storedFiles.push({ name: entry.file.name, kind: entry.kind, url: null });
    }
  }

  const record = {
    enquiryId,
    service,
    serviceDetails: incoming.serviceDetails ?? {},
    siteType,
    location,
    access,
    siteConditions,
    timing,
    targetDate,
    notes,
    files: storedFiles,
    contact: { name, company, email, phone, role },
    sourcePage: sanitizeText(incoming.metadata?.sourcePage, 300),
    createdAt: new Date().toISOString(),
    ip,
  };

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO enquiry_submissions (id, ip, service, site_type, location, created_at, data)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(enquiryId, ip, service, siteType, location, record.createdAt, JSON.stringify(record))
        .run();
    } catch {
      // Storage is best-effort — see migrations/0001_enquiries.sql for the
      // expected schema. A missing table must not block the enquiry itself.
    }
  }

  // ---- Notification email ------------------------------------------------

  const subject = `New Project Enquiry — ${labelFor(SERVICE_OPTIONS, service)} — ${location}`;
  const { text, html } = buildNotificationEmail(record, enquiryId);

  let emailSent = false;
  if (env.RESEND_API_KEY && env.NOTIFY_TO) {
    emailSent = await sendViaResend(env, subject, text, html, env.NOTIFY_TO);
  }
  if (!emailSent) {
    emailSent = await sendViaWeb3Forms(env, subject, text);
  }

  if (env.RESEND_API_KEY && email) {
    await sendAcknowledgement(env, email, name);
  }

  return jsonResponse({ success: true, enquiryId, emailSent });
};

export const onRequestGet: PagesFunction = async () =>
  jsonResponse({ success: false, error: "Method not allowed." }, { status: 405 });

// ---- helpers ----------------------------------------------------------

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-120);
}

function labelFor(options: { value: string; label: string }[], value: string) {
  return findOption(options, value)?.label ?? value ?? "Not specified";
}

function buildNotificationEmail(
  record: {
    enquiryId: string;
    service: string;
    serviceDetails: Record<string, string | string[]>;
    siteType: string;
    location: string;
    access: string;
    siteConditions: string[];
    timing: string;
    targetDate?: string;
    notes: string;
    files: { name: string; kind: string; url: string | null }[];
    contact: { name: string; company: string; email: string; phone: string; role: string };
    sourcePage: string;
  },
  enquiryId: string,
) {
  const serviceQuestions = SERVICE_QUESTIONS[record.service] ?? [];
  const projectDetailLines = serviceQuestions
    .map((q) => {
      const value = record.serviceDetails[q.name];
      if (!value) return null;
      const labels = Array.isArray(value)
        ? value.map((v) => labelFor(q.options, v))
        : [labelFor(q.options, value)];
      return labels.join(", ");
    })
    .filter(Boolean) as string[];

  const conditionLabels = record.siteConditions.map((c) => labelFor(SITE_CONDITION_OPTIONS, c));
  const fileLines = record.files.map(
    (f) => `${f.kind === "photo" ? "Photo" : f.kind === "video" ? "Video" : "Document"} — ${f.name}${f.url ? ` — ${f.url}` : " (link unavailable — storage not configured)"}`,
  );

  const sections: [string, string[]][] = [
    ["SERVICE", [labelFor(SERVICE_OPTIONS, record.service)]],
    ["SITE", [labelFor(SITE_TYPE_OPTIONS, record.siteType), record.location]],
    ["PROJECT DETAILS", projectDetailLines],
    ["ACCESS", [labelFor(ACCESS_OPTIONS, record.access)]],
    ["SITE CONDITIONS", conditionLabels],
    [
      "TIMING",
      [labelFor(TIMING_OPTIONS, record.timing), record.targetDate ? `Target start: ${record.targetDate}` : ""].filter(Boolean),
    ],
    ["FILES", fileLines.length ? fileLines : ["None"]],
    ["ADDITIONAL NOTES", [record.notes || "None"]],
    [
      "CONTACT",
      [
        record.contact.name,
        record.contact.company,
        labelFor(ROLE_OPTIONS, record.contact.role),
        record.contact.email,
        record.contact.phone,
      ].filter(Boolean),
    ],
  ];

  const text = [
    "NEW PROJECT ENQUIRY",
    "",
    ...sections.flatMap(([heading, lines]) => [heading, ...lines.map((l) => `  ${l}`), ""]),
    `Enquiry ID: ${enquiryId}`,
    record.sourcePage ? `Source: ${record.sourcePage}` : "",
  ]
    .filter((l) => l !== "")
    .join("\n");

  const html = `<div style="font-family:sans-serif;font-size:15px;color:#17241c;">
    <h2 style="margin:0 0 16px;">New Project Enquiry</h2>
    ${sections
      .map(
        ([heading, lines]) => `
      <div style="margin-bottom:16px;">
        <p style="margin:0 0 4px;font-weight:700;letter-spacing:0.04em;font-size:12px;color:#5a6b5f;text-transform:uppercase;">${heading}</p>
        ${lines.map((l) => `<p style="margin:0;">${escapeHtml(l)}</p>`).join("")}
      </div>`,
      )
      .join("")}
    <p style="margin-top:24px;color:#5a6b5f;font-size:12px;">Enquiry ID: ${enquiryId}</p>
  </div>`;

  return { text, html };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function sendViaResend(env: Env, subject: string, text: string, html: string, to: string) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || "Farrelly Bros Enquiries <enquiries@farrellybros.ie>",
        to: [to],
        subject,
        text,
        html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendAcknowledgement(env: Env, to: string, name: string) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || "Farrelly Bros <enquiries@farrellybros.ie>",
        to: [to],
        subject: "We've received your project details — Farrelly Bros",
        text: `Hi ${name || "there"},\n\nWe've received the project details and files you sent. We'll review the site, access requirements and likely equipment before coming back to you.\n\nFarrelly Bros`,
      }),
    });
  } catch {
    // Best-effort — the enquiry itself has already succeeded.
  }
}

/** Working fallback while RESEND_API_KEY / NOTIFY_TO aren't set — same destination the classic contact form already uses. */
async function sendViaWeb3Forms(env: Env, subject: string, text: string) {
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_ACCESS_KEY,
        subject,
        message: text,
        from_name: "Farrelly Bros Enquiry Form",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
