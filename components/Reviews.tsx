import { reviews, type Review } from "@/data/reviews";
import { siteConfig } from "@/lib/siteConfig";

/** Shows real reviews from data/reviews.ts. Renders nothing (or a fallback) while empty. */
export function Reviews({
  items = reviews,
  limit,
  showEmptyState = false,
}: {
  items?: Review[];
  limit?: number;
  showEmptyState?: boolean;
}) {
  const list = limit ? items.slice(0, limit) : items;

  if (!list.length) {
    if (!showEmptyState) return null;
    return (
      <div className="callout">
        <p>
          We&apos;re collecting reviews from our customers.
          {siteConfig.googleBusinessUrl ? (
            <>
              {" "}
              Read what people are saying on{" "}
              <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noopener noreferrer">
                our Google Business Profile
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    );
  }

  return (
    <div className="review-grid">
      {list.map((r, i) => (
        <figure key={i} className="review-card">
          <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
            {"★".repeat(r.rating)}
            {"☆".repeat(5 - r.rating)}
          </div>
          <blockquote>{r.text}</blockquote>
          <figcaption>
            <strong>{r.name}</strong>
            {r.city ? ` · ${r.city}` : ""}
            {r.service ? <span> — {r.service}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
