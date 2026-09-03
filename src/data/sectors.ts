import type { IconGridItem } from "@/components/Site/ContentIconGrid.astro";
import iconInfrastructure from "@/assets/Icons/infrastructure.svg";
import iconConstruction from "@/assets/Icons/construction.svg";
import iconUtilities from "@/assets/Icons/utilities.svg";
import iconTelecommunications from "@/assets/Icons/telecommunications.svg";
import iconRenewableEnergy from "@/assets/Icons/renewable-energy.svg";
import iconAgriculture from "@/assets/Icons/agriculture.svg";
import iconCommercialLand from "@/assets/Icons/commercial-land.svg";

/**
 * The sectors Farrelly Bros works across, shared by every page that lists
 * them (currently the homepage and About) so the set and its icons stay in
 * one place rather than drifting between copies.
 */
export const SECTORS: IconGridItem[] = [
  { label: "Infrastructure", icon: iconInfrastructure, span: "large" },
  { label: "Construction", icon: iconConstruction },
  { label: "Utilities", icon: iconUtilities },
  { label: "Telecommunications", icon: iconTelecommunications, span: "tall" },
  { label: "Renewable Energy", icon: iconRenewableEnergy },
  { label: "Agriculture", icon: iconAgriculture, span: "wide" },
  { label: "Commercial Land", icon: iconCommercialLand },
];
