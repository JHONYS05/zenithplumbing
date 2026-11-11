import Link from "next/link";
import type { Offer } from "@/data/offers";

/** Price callout for a special offer. `variant="hero"` sits on the navy hero; "strip" is a full-width band. */
export function OfferBadge({ offer, variant = "hero" }: { offer: Offer; variant?: "hero" | "strip" }) {
  if (variant === "strip") {
    return (
      <section className="offer-strip" aria-label="Special offer">
        <div className="container offer-strip-inner">
          <p className="offer-strip-text">
            <span className="offer-price">{offer.price}</span>
            <span>
              <strong>{offer.title}</strong>
              <small>{offer.note}</small>
            </span>
          </p>
          <Link href="/contact" className="btn btn-primary">
            Book {offer.price} {offer.title}
          </Link>
        </div>
      </section>
    );
  }
  return (
    <div className="offer-badge" role="note" aria-label={`Special offer: ${offer.price} ${offer.title}`}>
      <span className="offer-price">{offer.price}</span>
      <span>
        <strong>{offer.title}</strong>
        <small>{offer.note}</small>
      </span>
    </div>
  );
}
