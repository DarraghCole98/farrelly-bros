/**
 * The shape of a project enquiry, built up across the five-stage form and
 * persisted to `localStorage` as the customer moves between steps. Kept as
 * plain, structured data — never a single free-text blob — so both the
 * confirmation email and any future CRM sync can read it without parsing.
 */
export interface ProjectEnquiry {
  /** The `id` of the selected service, or `"something-else"`. Empty until Stage 1 is answered. */
  service: string;
  /** Free-form answers to the service-specific question(s) shown in Stage 2, keyed by field name. */
  serviceDetails: Record<string, string | string[]>;

  siteType: string;
  location: string;

  access: string;
  siteConditions: string[];

  timing: string;
  targetDate?: string;

  notes: string;

  contact: {
    name: string;
    company: string;
    email: string;
    phone: string;
    /** Job title — optional. */
    role: string;
  };

  /** Required by law/UX before submission — not a marketing opt-in. */
  privacyAccepted: boolean;

  metadata: {
    submittedAt?: string;
    sourcePage?: string;
    enquiryId?: string;
  };
}

export type EnquiryStep = 1 | 2 | 3 | 4 | 5;

export const TOTAL_STEPS = 5;

export const DRAFT_STORAGE_KEY = "farrelly-enquiry-draft-v3";

export function createEmptyEnquiry(): ProjectEnquiry {
  return {
    service: "",
    serviceDetails: {},
    siteType: "",
    location: "",
    access: "",
    siteConditions: [],
    timing: "",
    targetDate: "",
    notes: "",
    contact: {
      name: "",
      company: "",
      email: "",
      phone: "",
      role: "",
    },
    privacyAccepted: false,
    metadata: {},
  };
}
