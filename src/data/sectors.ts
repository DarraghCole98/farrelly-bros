import type { SvgComponent } from "astro/types";
import type { ReasonItem } from "@/components/Site/ContentReasonList.astro";
import iconInfrastructure from "@/assets/icons/infrastructure.svg";
import iconConstruction from "@/assets/icons/construction.svg";
import iconUtilities from "@/assets/icons/utilities.svg";
import iconTelecommunications from "@/assets/icons/telecommunications.svg";
import iconRenewableEnergy from "@/assets/icons/renewable-energy.svg";
import iconAgriculture from "@/assets/icons/agriculture.svg";
import iconCommercialLand from "@/assets/icons/commercial-land.svg";
import iconCircleUser from "@/assets/icons/circle-user.svg";
import iconCalendar from "@/assets/icons/calendar.svg";
import iconFence from "@/assets/icons/fence.svg";
import iconSpecialistPlant from "@/assets/icons/specialist-plant.svg";
import iconShovel from "@/assets/icons/shovel.svg";
import iconLayers from "@/assets/icons/layers.svg";
import iconScissors from "@/assets/icons/scissors.svg";
import iconRoute from "@/assets/icons/route.svg";
import iconRecycle from "@/assets/icons/recycle.svg";
import iconSprout from "@/assets/icons/sprout.svg";
import iconLandManagement from "@/assets/icons/land-management.svg";
import iconArboriculture from "@/assets/icons/arboriculture.svg";
import iconMap from "@/assets/icons/map.svg";
import infrastructureImage from "@/assets/Images/farrelly-brothers-services-8.webp";
import constructionImage from "@/assets/Images/farrelly-brothers-services-2.webp";
import utilitiesImage from "@/assets/Images/farrelly-brothers-services-9.webp";
import telecommunicationsImage from "@/assets/Images/farrelly-brothers-herro5.webp";
import renewableEnergyImage from "@/assets/Images/solar-panels-drone-view-2023-11-27-05-10-40-utc-copy-scaled.webp";
import agricultureImage from "@/assets/Images/farrelly-brothers-services-10.webp";
import commercialLandImage from "@/assets/Images/farrelly-brothers-herro1.webp";
import infrastructureWhyUsImage from "@/assets/Images/farrelly-brothers-herro7.webp";
import constructionWhyUsImage from "@/assets/Images/farrelly-brothers-services-4.webp";
import utilitiesWhyUsImage from "@/assets/Images/farrelly-brothers-herro3.webp";
import telecommunicationsWhyUsImage from "@/assets/Images/farrelly-brothers-services-9.webp";
import renewableEnergyWhyUsImage from "@/assets/Images/farrelly-brothers-services-10.webp";
import agricultureWhyUsImage from "@/assets/Images/farrelly-brothers-herro2.webp";
import commercialLandWhyUsImage from "@/assets/Images/farrelly-brothers-services-1.webp";

type ImageSource = ImageMetadata | string;

/** Why this sector's work is suited to a business that also runs everything else Farrelly Bros does. */
interface SectorWhyUs {
  heading: string;
  intro?: string;
  items: ReasonItem[];
  image: ImageSource;
  imageAlt: string;
}

export interface Sector {
  /** Full sector name. */
  label: string;
  /** URL slug — the page lives at `/sectors/{slug}/`. */
  slug: string;
  icon: SvgComponent;
  image: ImageSource;
  imageAlt: string;
  /** Overrides `label` in the sector page's H1. */
  heading?: string;
  /** One or two sentences on how the work applies to this sector. */
  summary: string;
  /** Service ids (matching `src/content/services/`) relevant to this sector, in display order. */
  services: string[];
  /** Heading/intro for the "what Farrelly Bros can offer" section, above the service cards. */
  offer?: {
    heading?: string;
    intro?: string;
  };
  /** Sector-specific reasons the work is suited to Farrelly Bros, as a tick list. */
  whyUs: SectorWhyUs;
  /**
   * Project ids (matching `src/content/projects/`) that give this sector a real
   * case study. Left empty rather than pointing at a project that isn't a
   * genuine fit — see docs/CONTENT.md on not fabricating project information.
   */
  caseStudies?: string[];
}

/**
 * The sectors Farrelly Bros works across, shared by every page that lists
 * them (the homepage, About, and each sector's own page at
 * `/sectors/{slug}/`) so the set, its icons and its imagery stay in one
 * place rather than drifting between copies. The list itself is confirmed —
 * see docs/CONTENT.md — but the descriptive copy below is a restatement of
 * each service's own approved summary, not a new claim.
 */
export const SECTORS: Sector[] = [
  {
    label: "Infrastructure",
    slug: "infrastructure",
    icon: iconInfrastructure,
    image: infrastructureImage,
    imageAlt: "Pipeline being laid across an open site.",
    summary:
      "Corridors, compounds and access routes — cleared, reinstated and kept workable for the life of the project.",
    services: [
      "pipeline-reinstatement",
      "telecoms-vegetation-management",
      "site-clearance",
    ],
    offer: {
      heading: "One contractor across the whole corridor.",
      intro:
        "Infrastructure work rarely sits inside one discipline — a corridor or compound can need clearance, reinstatement and ongoing access maintenance in the same project.",
    },
    whyUs: {
      heading: "Built for work that crosses more than one landholding.",
      intro:
        "Infrastructure projects run across boundaries, ownerships and fixed delivery dates that don't move. That takes more than one crew turning up with a flail.",
      image: infrastructureWhyUsImage,
      imageAlt: "Close-up of tractor cab and grille in the field.",
      items: [
        { label: "One contractor, every stage", icon: iconCircleUser },
        { label: "Work planned to fixed delivery dates", icon: iconCalendar },
        { label: "Multi-landholding boundaries respected", icon: iconFence },
        { label: "Heavier plant already in the business", icon: iconSpecialistPlant },
      ],
    },
    caseStudies: ["offaly-pipeline-reinstatement", "kildare-telecoms-mast-access"],
  },
  {
    label: "Construction",
    slug: "construction",
    icon: iconConstruction,
    image: constructionImage,
    imageAlt: "Excavator working a cleared development site.",
    summary:
      "Site clearance and ground preparation ahead of the next contractor, plus the plant to keep a build on schedule.",
    services: ["site-clearance", "plant-hire"],
    offer: {
      heading: "A site handed over ready to build on.",
      intro:
        "Before a build can start, the ground has to be cleared, levelled and accessible — and the plant available if the programme needs more than that.",
    },
    whyUs: {
      heading: "Ground prepared to keep the programme moving.",
      intro:
        "A construction programme is only as good as the state the site is in when the next contractor arrives. Clearance and plant hire from one contractor keeps that handover clean.",
      image: constructionWhyUsImage,
      imageAlt: "Excavator working on a cleared site.",
      items: [
        { label: "Clearance to a fixed start date", icon: iconCalendar },
        { label: "Plant hire, operated or self-drive", icon: iconSpecialistPlant },
        { label: "Sites handed back level and ready", icon: iconShovel },
        { label: "One contractor for site and plant", icon: iconCircleUser },
      ],
    },
    caseStudies: ["meath-solar-farm-site-clearance"],
  },
  {
    label: "Utilities",
    slug: "utilities",
    icon: iconUtilities,
    image: utilitiesImage,
    imageAlt: "Flail attachment clearing vegetation beside a site boundary.",
    summary:
      "Vegetation kept back from lines, pipes and access routes, worked to a schedule that fits network maintenance.",
    services: ["telecoms-vegetation-management", "pipeline-reinstatement"],
    offer: {
      heading: "Network access kept clear, and land put back properly.",
      intro:
        "Utility work usually means two different problems on the same project — getting access to the asset, and putting the land back the way its owner agreed to.",
    },
    whyUs: {
      heading: "Land handed back the way the owner agreed to.",
      intro:
        "A utility contractor's work is judged on the asset. The landowner's is judged on the ground afterwards. Both have to be satisfied, not just one.",
      image: utilitiesWhyUsImage,
      imageAlt: "Cleared land with machinery working in the background.",
      items: [
        { label: "Access cleared to maintenance windows", icon: iconCalendar },
        { label: "Topsoil and subsoil kept separate", icon: iconLayers },
        { label: "Agricultural machinery already in the business", icon: iconAgriculture },
        { label: "Consistent work across every boundary", icon: iconFence },
      ],
    },
    caseStudies: ["offaly-pipeline-reinstatement"],
  },
  {
    label: "Telecommunications",
    slug: "telecommunications",
    icon: iconTelecommunications,
    image: telecommunicationsImage,
    imageAlt: "Flail mower maintaining vegetation along a site access route.",
    summary:
      "Mast compounds and access routes cleared and maintained, so infrastructure stays reachable and work can go ahead on schedule.",
    services: ["telecoms-vegetation-management"],
    offer: {
      heading: "Access sorted before the crew is booked.",
      intro:
        "A mast upgrade or scheduled visit is only as good as the access to it — vegetation blocking a route is a problem that has to be solved in advance, not on the day.",
    },
    whyUs: {
      heading: "Access work planned around your fixed dates.",
      intro:
        "Crane slots and upgrade windows don't move. Clearance is planned to have the route and compound ready well ahead of the date they're booked against.",
      image: telecommunicationsWhyUsImage,
      imageAlt: "Flail attachment clearing scrub and trees at the edge of a site.",
      items: [
        { label: "Work planned to fixed crew dates", icon: iconCalendar },
        { label: "Hand-cutting near fencing and cabling", icon: iconScissors },
        { label: "Rural and restricted-access sites covered", icon: iconRoute },
        { label: "Scheduled maintenance keeps routes clear", icon: iconRecycle },
      ],
    },
    caseStudies: ["kildare-telecoms-mast-access"],
  },
  {
    label: "Renewable Energy",
    slug: "renewable-energy",
    icon: iconRenewableEnergy,
    image: renewableEnergyImage,
    imageAlt: "Aerial view of a solar farm.",
    summary:
      "Clearance and ground preparation ahead of construction, then ongoing vegetation management once a site is generating.",
    services: ["solar-farm-landscaping", "site-clearance"],
    offer: {
      heading: "From cleared footprint to a managed site.",
      intro:
        "A renewable energy site's vegetation needs don't end when construction does — the land still has to be managed for the life of the site.",
    },
    whyUs: {
      heading: "One contractor for construction and the years after.",
      intro:
        "Handling pre-construction clearance and ongoing land management under one contractor keeps continuity across a project that runs for decades, not months.",
      image: renewableEnergyWhyUsImage,
      imageAlt: "Cleared land ready for the next stage of work.",
      items: [
        { label: "Clearance phased field by field", icon: iconSprout },
        { label: "Work planned to planning-conditioned dates", icon: iconCalendar },
        { label: "One contractor, construction through to upkeep", icon: iconCircleUser },
        { label: "Ground conditions checked before machinery moves", icon: iconRoute },
      ],
    },
    caseStudies: ["meath-solar-farm-site-clearance"],
  },
  {
    label: "Agriculture",
    slug: "agriculture",
    icon: iconAgriculture,
    image: agricultureImage,
    imageAlt: "Forage harvester loading a trailer in the field.",
    summary:
      "Machinery-led contracting for farms and land — seasonal work, land reinstatement and maintenance heavier than a farm's own kit.",
    services: ["agricultural-contracting", "wood-chipping"],
    offer: {
      heading: "Contracting sized to the farm and the season.",
      intro:
        "From routine seasonal work to the heavier jobs a farm doesn't keep its own kit for, the same team can take on both without a second contractor being called in.",
    },
    whyUs: {
      heading: "Work booked around the land, not a diary.",
      intro:
        "Agricultural work is timed against the season and the ground as much as the job itself, so it's scheduled around the farming calendar rather than fitted in around it.",
      image: agricultureWhyUsImage,
      imageAlt: "Forage harvester loading a trailer in the field.",
      items: [
        { label: "Heavier plant when the job needs it", icon: iconSpecialistPlant },
        { label: "Work scheduled around the farming calendar", icon: iconCalendar },
        { label: "Land reinstatement experience built in", icon: iconLandManagement },
        { label: "One contractor for routine and heavier work", icon: iconCircleUser },
      ],
    },
  },
  {
    label: "Commercial Land",
    slug: "commercial-land",
    icon: iconCommercialLand,
    image: commercialLandImage,
    imageAlt: "Mature tree standing in open parkland.",
    summary:
      "Tree work, clearance and grounds maintenance for estates, developments and land holdings, planned around what the site is used for.",
    services: ["tree-care", "site-clearance", "plant-hire"],
    offer: {
      heading: "Grounds work planned around how the land is used.",
      intro:
        "Estate and commercial land rarely has just one need — a single tree, a wider clearance and ongoing maintenance can all sit on the same holding.",
    },
    whyUs: {
      heading: "One team, from a single tree to the wider estate.",
      intro:
        "A landholding's needs change over time. Having tree care, clearance and plant hire under one contractor means the response scales with the job instead of needing a new one brought in.",
      image: commercialLandWhyUsImage,
      imageAlt: "Chainsaw cutting through a felled tree trunk.",
      items: [
        { label: "One team, from a single tree upward", icon: iconArboriculture },
        { label: "Heavier machinery already in the business", icon: iconSpecialistPlant },
        { label: "Work planned around access and land use", icon: iconMap },
        { label: "Commercial, estate and infrastructure standard", icon: iconCommercialLand },
      ],
    },
    caseStudies: ["wicklow-storm-damage-clearance"],
  },
];
