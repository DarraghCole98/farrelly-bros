/**
 * Cloudflare Pages Function — GET /api/files?key=&exp=&sig=
 *
 * Streams a single enquiry attachment from R2 after checking a signed,
 * time-limited link (see `signFileUrl` in `_shared.ts`) — the raw bucket is
 * never exposed directly, and nothing is served without a valid signature.
 */
import { type Env, jsonResponse, verifyFileUrlSignature } from "./_shared.ts";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.ENQUIRY_UPLOADS || !env.FILES_SIGNING_SECRET) {
    return jsonResponse({ success: false, error: "File storage is not configured." }, { status: 404 });
  }

  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const exp = url.searchParams.get("exp");
  const sig = url.searchParams.get("sig");

  if (!key || !exp || !sig || !key.startsWith("enquiries/")) {
    return jsonResponse({ success: false, error: "Invalid link." }, { status: 400 });
  }

  const valid = await verifyFileUrlSignature(env.FILES_SIGNING_SECRET, key, exp, sig);
  if (!valid) {
    return jsonResponse({ success: false, error: "This link has expired or is invalid." }, { status: 403 });
  }

  const object = await env.ENQUIRY_UPLOADS.get(key);
  if (!object) {
    return jsonResponse({ success: false, error: "File not found." }, { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("content-disposition", `inline; filename="${key.split("/").pop()}"`);
  headers.set("cache-control", "private, max-age=3600");

  return new Response(object.body, { headers });
};
