/**
 * Every option list and branching rule the enquiry form needs, kept in one
 * place so Stage content, validation and the review screen all read from
 * the same source rather than drifting apart.
 */

export interface EnquiryOption {
  value: string;
  label: string;
  /** Shown under the label on a large tile option. */
  description?: string;
}

export const SERVICE_OPTIONS: EnquiryOption[] = [
  {
    value: "tree-care",
    label: "Tree Care",
    description: "Removals, pruning and storm work, from a single tree upward.",
  },
  {
    value: "site-clearance",
    label: "Site Clearance",
    description: "Scrub, hedgerow and tree clearance ahead of the next stage of work.",
  },
  {
    value: "pipeline-reinstatement",
    label: "Pipeline Reinstatement",
    description: "Land and landscape reinstatement following pipeline works.",
  },
  {
    value: "plant-hire",
    label: "Plant Hire",
    description: "Specialist plant and machinery, operated or self-drive.",
  },
  {
    value: "agricultural-contracting",
    label: "Agricultural Contracting",
    description: "Machinery-led contracting for farms and land.",
  },
  {
    value: "wood-chipping",
    label: "Wood Chipping",
    description: "On-site chipping for timber and brash.",
  },
  {
    value: "telecoms-vegetation-management",
    label: "Telecoms Vegetation Management",
    description: "Access routes, compounds and mast perimeters kept clear.",
  },
  {
    value: "solar-farm-landscaping",
    label: "Solar Farm Landscaping",
    description: "Clearance and land management for solar sites.",
  },
  {
    value: "something-else",
    label: "Something Else / Not Sure",
    description: "Tell us what's going on and we'll work out where it fits.",
  },
];

export const SITE_TYPE_OPTIONS: EnquiryOption[] = [
  { value: "construction", label: "Construction Site" },
  { value: "commercial", label: "Commercial Property" },
  { value: "agricultural", label: "Farm / Agricultural Land" },
  { value: "residential", label: "Residential Property" },
  { value: "utility", label: "Utility / Infrastructure" },
  { value: "telecoms", label: "Telecommunications" },
  { value: "renewable", label: "Renewable Energy" },
  { value: "estate", label: "Estate / Woodland" },
  { value: "roadside", label: "Roadside" },
  { value: "other", label: "Other" },
];

export const ACCESS_OPTIONS: EnquiryOption[] = [
  { value: "open", label: "Yes — open access" },
  { value: "restricted", label: "Yes — but restricted" },
  { value: "very-limited", label: "No / very limited access" },
  { value: "not-sure", label: "Not sure" },
];

/** "None that I know of" is handled specially in the client script — it clears every other choice. */
export const SITE_CONDITION_OPTIONS: EnquiryOption[] = [
  { value: "soft-ground", label: "Soft / wet ground" },
  { value: "steep-terrain", label: "Steep terrain" },
  { value: "restricted-entrance", label: "Restricted entrance" },
  { value: "public-road", label: "Public road" },
  { value: "buildings-nearby", label: "Buildings nearby" },
  { value: "overhead-power", label: "Overhead power lines" },
  { value: "underground-services", label: "Underground services" },
  { value: "telecoms-infrastructure", label: "Telecoms infrastructure" },
  { value: "watercourse", label: "Watercourse" },
  { value: "livestock", label: "Livestock" },
  { value: "public-access", label: "Public access" },
  { value: "none", label: "None that I know of" },
  { value: "not-sure", label: "Not sure" },
];

export const TIMING_OPTIONS: EnquiryOption[] = [
  { value: "emergency", label: "Emergency" },
  { value: "asap", label: "As soon as possible" },
  { value: "2-4-weeks", label: "Within 2–4 weeks" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "scheduled", label: "Scheduled future project" },
  { value: "budgeting", label: "Just budgeting / tendering" },
];

export const ROLE_OPTIONS: EnquiryOption[] = [
  { value: "project-manager", label: "Project Manager" },
  { value: "site-manager", label: "Site Manager" },
  { value: "quantity-surveyor", label: "Quantity Surveyor" },
  { value: "landowner", label: "Property / Landowner" },
  { value: "contractor", label: "Contractor" },
  { value: "other", label: "Other" },
];

/** A single service-specific question shown in Stage 2, once a service is picked in Stage 1. */
export interface ServiceQuestion {
  name: string;
  question: string;
  /** `radio` allows one answer, `checkboxes` allows several. */
  type: "radio" | "checkboxes";
  options: EnquiryOption[];
  optional?: boolean;
}

/** Keyed by the same `value`s as `SERVICE_OPTIONS`. `something-else` intentionally has none. */
export const SERVICE_QUESTIONS: Record<string, ServiceQuestion[]> = {
  "tree-care": [
    {
      name: "treeScope",
      question: "What's involved?",
      type: "radio",
      options: [
        { value: "one", label: "One tree" },
        { value: "2-5", label: "2–5 trees" },
        { value: "6-20", label: "6–20 trees" },
        { value: "20-plus", label: "20+ trees" },
        { value: "woodland", label: "Larger woodland / site" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
    {
      name: "treeHeight",
      question: "Approximate tree height",
      type: "radio",
      optional: true,
      options: [
        { value: "under-5m", label: "Under 5m" },
        { value: "5-10m", label: "5–10m" },
        { value: "10-20m", label: "10–20m" },
        { value: "20m-plus", label: "20m+" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
  "site-clearance": [
    {
      name: "clearanceArea",
      question: "Roughly how large is the area?",
      type: "radio",
      options: [
        { value: "under-1-acre", label: "Under 1 acre" },
        { value: "1-5-acres", label: "1–5 acres" },
        { value: "5-20-acres", label: "5–20 acres" },
        { value: "20-50-acres", label: "20–50 acres" },
        { value: "50-plus-acres", label: "50+ acres" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
    {
      name: "clearanceContent",
      question: "What's currently on the site?",
      type: "checkboxes",
      options: [
        { value: "scrub", label: "Scrub" },
        { value: "dense-vegetation", label: "Dense vegetation" },
        { value: "small-trees", label: "Small trees" },
        { value: "mature-trees", label: "Mature trees" },
        { value: "stumps", label: "Stumps" },
        { value: "hedges", label: "Hedges" },
        { value: "mixed-woodland", label: "Mixed woodland" },
        { value: "waste-debris", label: "Waste / debris" },
        { value: "other", label: "Other" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
  "pipeline-reinstatement": [
    {
      name: "pipelineLength",
      question: "Approximate length of works",
      type: "radio",
      options: [
        { value: "under-500m", label: "Under 500m" },
        { value: "500m-1km", label: "500m–1km" },
        { value: "1-5km", label: "1–5km" },
        { value: "5km-plus", label: "5km+" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
  "plant-hire": [
    {
      name: "plantPurpose",
      question: "What type of work do you need the machine for?",
      type: "radio",
      options: [
        { value: "excavation", label: "Excavation" },
        { value: "mulching-clearance", label: "Mulching / clearance" },
        { value: "chipping", label: "Chipping" },
        { value: "agricultural-work", label: "Agricultural work" },
        { value: "specialist-access", label: "Specialist access" },
        { value: "material-handling", label: "Material handling" },
        { value: "not-sure", label: "Not sure what machine is required" },
      ],
    },
  ],
  "agricultural-contracting": [
    {
      name: "agriWorkType",
      question: "What type of work?",
      type: "radio",
      options: [
        { value: "hedge-cutting", label: "Hedge cutting" },
        { value: "grass-forage", label: "Grass / forage work" },
        { value: "ground-prep", label: "Ground preparation" },
        { value: "drainage-excavation", label: "Drainage / excavation" },
        { value: "land-clearance", label: "Land clearance" },
        { value: "other", label: "Other" },
      ],
    },
  ],
  "wood-chipping": [
    {
      name: "chippingMaterial",
      question: "What material needs processed?",
      type: "radio",
      options: [
        { value: "brash-branches", label: "Brash / branches" },
        { value: "felled-trees", label: "Felled trees" },
        { value: "timber", label: "Timber" },
        { value: "clearance-material", label: "Site clearance material" },
        { value: "large-mixed-volume", label: "Large mixed volume" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
  "telecoms-vegetation-management": [
    {
      name: "telecomsArea",
      question: "What needs cleared?",
      type: "radio",
      options: [
        { value: "access-road", label: "Access road" },
        { value: "compound", label: "Compound" },
        { value: "mast-perimeter", label: "Mast perimeter" },
        { value: "overhead-route", label: "Overhead route" },
        { value: "multiple-sites", label: "Multiple sites" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "telecomsSiteCount",
      question: "How many sites?",
      type: "radio",
      options: [
        { value: "single-site", label: "Single site" },
        { value: "multiple-sites", label: "Multiple sites" },
      ],
    },
  ],
  "solar-farm-landscaping": [
    {
      name: "solarStage",
      question: "What stage is the project at?",
      type: "radio",
      options: [
        { value: "pre-construction", label: "Pre-construction" },
        { value: "construction", label: "Construction" },
        { value: "operational", label: "Operational site" },
        { value: "maintenance-contract", label: "Maintenance contract" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],
};


export function findOption(
  options: EnquiryOption[],
  value: string,
): EnquiryOption | undefined {
  return options.find((option) => option.value === value);
}
