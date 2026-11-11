/**
 * Real customer reviews only. Copy them (with permission) from Google or your CRM.
 * Never invent reviews — it violates Google and FTC rules. The site hides review
 * sections automatically while this list is empty.
 */
export interface Review {
  name: string;
  city?: string;
  service?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source?: string;
}

export const reviews: Review[] = [];
