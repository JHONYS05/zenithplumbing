/**
 * Special offers shown on the website.
 * Change the price or wording here; set `active: false` to take an offer down everywhere.
 */
export interface Offer {
  active: boolean;
  /** Shown large, e.g. "$69" */
  price: string;
  /** What the price is for, e.g. "Drain Cleaning" */
  title: string;
  /** Conditions, shown under the price. */
  note: string;
  /** Number only, for Google's structured data. */
  priceValue: number;
  /** Page slugs (categories and services) that show this offer. */
  pages: string[];
}

export const drainCleaningOffer: Offer = {
  active: true,
  price: "$69",
  title: "Drain Cleaning",
  note: "Requires an accessible cleanout.",
  priceValue: 69,
  pages: [
    "drain-cleaning",
    "clogged-drain-repair",
    "kitchen-drain-cleaning",
    "bathroom-drain-cleaning",
    "main-line-drain-cleaning",
  ],
};

const offers: Offer[] = [drainCleaningOffer];

/** The active offer for a page, if any. */
export function offerFor(slug: string): Offer | undefined {
  return offers.find((o) => o.active && o.pages.includes(slug));
}
