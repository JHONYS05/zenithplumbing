import type { Faq } from "@/data/services";

/**
 * Accessible FAQ accordion. FAQPage schema is intentionally not emitted —
 * Google limits FAQ rich results to authoritative government and health sites.
 */
export function FAQ({ faqs, heading = "Frequently Asked Questions" }: { faqs: Faq[]; heading?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="section-block">
      <h2>{heading}</h2>
      <div className="faq-list">
        {faqs.map((f) => (
          <details key={f.q} className="faq-item">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
