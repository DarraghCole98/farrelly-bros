export interface NavItem {
  label: string;
  href: string;
}

/** The eight service pages, in the order they should always list. */
export const SERVICE_LINKS: NavItem[] = [
  { label: "Tree Care", href: "/services/tree-care/" },
  { label: "Site Clearance", href: "/services/site-clearance/" },
  {
    label: "Pipeline Reinstatement",
    href: "/services/pipeline-reinstatement/",
  },
  { label: "Plant Hire", href: "/services/plant-hire/" },
  {
    label: "Agricultural Contracting",
    href: "/services/agricultural-contracting/",
  },
  { label: "Wood Chipping", href: "/services/wood-chipping/" },
  {
    label: "Telecoms Vegetation Management",
    href: "/services/telecoms-vegetation-management/",
  },
  {
    label: "Solar Farm Landscaping",
    href: "/services/solar-farm-landscaping/",
  },
];

/** The service slugs in their documented, canonical order. */
export const SERVICE_ORDER: string[] = SERVICE_LINKS.map((item) =>
  item.href.replace(/^\/services\/|\/$/g, ""),
);

/** Sorts service collection entries into the canonical order, instead of the alphabetical order `getCollection` returns. */
export function sortByServiceOrder<T extends { id: string }>(
  entries: T[],
): T[] {
  return [...entries].sort(
    (a, b) => SERVICE_ORDER.indexOf(a.id) - SERVICE_ORDER.indexOf(b.id),
  );
}

/** Header links either side of the Services dropdown. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Projects", href: "/projects/" },
  { label: "Plant & Machinery", href: "/plant-machinery/" },
  { label: "Contact", href: "/contact/" },
];

/** Footer's own navigation column — Services links to its index, not a dropdown. */
export const FOOTER_NAV: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Projects", href: "/projects/" },
  { label: "Plant & Machinery", href: "/plant-machinery/" },
  { label: "Contact", href: "/contact/" },
];

/** Thin utility bar above the main nav — secondary destinations only. */
export const UTILITY_NAV: NavItem[] = [
  { label: "Plant & Machinery", href: "/plant-machinery/" },
  { label: "Projects", href: "/projects/" },
];
