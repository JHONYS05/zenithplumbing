/**
 * Full list of plumbing services shown on the Plumbing page (/plumbing) under
 * "Plumbing Services We Offer". `href` links an item to its detailed page when one exists.
 * Edit, add or remove items here.
 */
export interface OfferingItem {
  name: string;
  text: string;
  href?: string;
}

export interface OfferingGroup {
  group: string;
  items: OfferingItem[];
}

export const plumbingOfferings: OfferingGroup[] = [
  {
    group: "Water Lines & Piping",
    items: [
      { name: "Water Line Repair", text: "Repair leaking or damaged water lines inside and outside the home.", href: "/pipe-repair" },
      { name: "Water Line Replacement", text: "Replace aging, corroded or failing water lines." },
      { name: "Whole House Repiping", text: "Replace a home's water supply piping with new PEX or copper." },
      { name: "Pipe Installation", text: "Install and replace PEX, copper, and PVC piping where appropriate." },
      { name: "PEX Pipe Installation", text: "Flexible, freeze-resistant PEX piping for repairs, remodels and repipes." },
      { name: "Copper Pipe Repair", text: "Repair pinhole leaks, corrosion and damaged copper lines and fittings.", href: "/pipe-repair" },
    ],
  },
  {
    group: "Water Pressure & Shut-Off Valves",
    items: [
      { name: "Water Pressure Problems", text: "Diagnose low or high water pressure and install PRV valves." },
      { name: "Pressure Reducing Valve (PRV)", text: "Install or replace a PRV to protect pipes and fixtures from high water pressure." },
      { name: "Main Water Shut-Off Valve", text: "Install or replace the valve that shuts off water to the whole home." },
      { name: "Water Shut-Off Valves", text: "Install and replace main shut-off valves and fixture stop valves." },
    ],
  },
  {
    group: "Fixtures & Appliances",
    items: [
      { name: "Faucet Repair & Installation", text: "Repair or replace kitchen and bathroom faucets.", href: "/fixture-installation" },
      { name: "Toilet Repair & Installation", text: "Repair running toilets, replace fill valves, flappers, wax rings, and install toilets.", href: "/fixture-installation" },
      { name: "Shower & Bathtub Plumbing", text: "Install or repair shower valves, tub drains, faucets, and plumbing connections." },
      { name: "Garbage Disposal Services", text: "Install, replace, and repair garbage disposals.", href: "/fixture-installation" },
      { name: "Hose Bib Installation", text: "Install or replace outdoor faucets, including frost-free hose bibs.", href: "/fixture-installation" },
    ],
  },
  {
    group: "Repairs, Leaks & Emergencies",
    items: [
      { name: "Plumbing Repairs", text: "Repair leaking pipes, damaged fittings, and plumbing connections.", href: "/plumbing-repair" },
      { name: "Water Leak Detection", text: "Locate hidden leaks before they cause more damage.", href: "/leak-detection" },
      { name: "Water Leak Repair", text: "Find and repair water leaks in walls, ceilings, floors, and crawl spaces.", href: "/leak-detection" },
      { name: "Emergency Plumbing", text: "Help with burst pipes, active leaks and sudden plumbing failures.", href: "/emergency-plumber" },
      { name: "Sump Pump Installation", text: "Install or replace sump pumps to help keep basements dry." },
    ],
  },
  {
    group: "General Plumbing Services",
    items: [
      { name: "Plumbing Installation", text: "New plumbing for remodels, additions and replacements." },
      { name: "Residential Plumbing", text: "Repairs, installations and upgrades for homes." },
      { name: "Commercial Plumbing", text: "Plumbing repairs and installations for businesses." },
      { name: "Plumbing Inspections", text: "Check the condition of your plumbing before problems start." },
      { name: "Plumbing Maintenance", text: "Inspect plumbing systems and identify potential problems." },
    ],
  },
];

/** Offerings per category page slug. */
export const offeringsByCategory: Record<string, OfferingGroup[]> = {
  plumbing: plumbingOfferings,
};

/** Anchor id for a service on its category page, e.g. "Whole House Repiping" → "whole-house-repiping". */
export function offeringAnchor(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Where a service links in menus: its own page if it has one, otherwise its spot on the category page. */
export function offeringHref(categorySlug: string, item: OfferingItem) {
  return item.href ?? `/${categorySlug}#${offeringAnchor(item.name)}`;
}
