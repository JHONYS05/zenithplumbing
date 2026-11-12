import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { CategoryPageContent } from "@/data/categoryPages";

/**
 * Long-form page sections shared by category landing pages (e.g. /plumbing) and
 * individual service pages (e.g. /pipe-repair). Content lives in data/categoryPages.ts.
 */
type Props = { extra: CategoryPageContent };

export function ExtraIntro({ extra }: Props) {
  return (
    <section className="section">
      <div className="container home-intro">
        {extra.introHeading && <h2>{extra.introHeading}</h2>}
        {extra.introSubheading && <p className="intro-subheading">{extra.introSubheading}</p>}
        {extra.introParagraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "home-lead" : undefined}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ExtraBody({ extra, icon, phone }: Props & { icon: string; phone: string }) {
  const fill = (t: string) => t.replace("{phone}", phone);
  return (
    <>
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <h2>{extra.servicesHeading}</h2>
            <p>{extra.servicesLead}</p>
          </div>
          <div className={`home-services home-services-wide${extra.services.length % 3 === 0 || extra.services.length === 5 ? " grid-3" : ""}`}>
            {extra.services.map((sv) => (
              <article key={sv.title} className="home-service">
                <h3>
                  <Icon name={icon} size={22} /> {sv.title}
                </h3>
                {sv.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {sv.bullets && (
                  <>
                    {sv.bulletsLead && <p className="home-service-lead">{sv.bulletsLead}</p>}
                    <ul>
                      {sv.bullets.map((b) => (
                        <li key={b}>
                          <Icon name="check" size={16} /> {b}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {sv.outro?.map((p, i) => (
                  <p key={`o${i}`}>{fill(p)}</p>
                ))}
                {sv.href && (
                  <Link href={sv.href} className="home-service-link">
                    {sv.linkLabel ?? `Learn about ${sv.title.toLowerCase()}`} <Icon name="arrow" size={16} />
                  </Link>
                )}
              </article>
            ))}
          </div>
          {extra.relatedLinks && (
            <div className="related-links">
              <strong>Related services:</strong>
              <ul className="area-list">
                {extra.relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <Icon name="arrow" size={14} /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {extra.signs && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>{extra.signs.heading}</h2>
              {extra.signs.lead.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className={`home-why${extra.signs.items.length % 3 === 0 ? " grid-3" : extra.signs.items.length === 7 ? " grid-4" : ""}`}>
              {extra.signs.items.map((it) => (
                <div key={it.title} className="home-why-item">
                  <Icon name="check" size={22} />
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
            {extra.signs.outro && <p className="signs-warning">{extra.signs.outro}</p>}
          </div>
        </section>
      )}

      {extra.compare && (
        <section className="section section-tint">
          <div className="container">
            <div className="section-head">
              <h2>{extra.compare.heading}</h2>
              <p>{extra.compare.lead}</p>
            </div>
            <div className="two-col">
              {extra.compare.columns.map((col) => (
                <div key={col.heading} className="home-service">
                  <h3>{col.heading}</h3>
                  <ul>
                    {col.items.map((it) => (
                      <li key={it}>
                        <Icon name="check" size={16} /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {extra.compare.outro && <p className="process-outro">{extra.compare.outro}</p>}
          </div>
        </section>
      )}

      {extra.materials && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>{extra.materials.heading}</h2>
              <p>{extra.materials.lead}</p>
            </div>
            <div className="home-why grid-4">
              {extra.materials.items.map((it) => (
                <div key={it.title} className="home-why-item">
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
            {extra.materials.outro && <p className="process-outro">{extra.materials.outro}</p>}
          </div>
        </section>
      )}

      {extra.process && (
        <section className="section section-tint">
          <div className="container">
            <div className="section-head">
              <h2>{extra.process.heading}</h2>
              <p>{extra.process.lead}</p>
            </div>
            <ol className={`home-steps${extra.process.steps.length === 6 ? " grid-3" : ""}`}>
              {extra.process.steps.map((st) => (
                <li key={st.title}>
                  <strong>{st.title}</strong>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
            {extra.process.outro && <p className="process-outro">{extra.process.outro}</p>}
          </div>
        </section>
      )}

      {extra.listSections && (
      <section className="section">
        <div className={`container${extra.listSections.length > 1 ? " two-col" : " home-intro"}`}>
          {extra.listSections.map((ls) => (
            <div key={ls.heading}>
              <h2>{ls.heading}</h2>
              {ls.lead.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <ul className="check-list">
                {ls.items.map((it) => (
                  <li key={it}>
                    <Icon name="check" size={20} /> {it}
                  </li>
                ))}
              </ul>
              {ls.outro && <p>{ls.outro}</p>}
            </div>
          ))}
        </div>
      </section>
      )}

      {extra.split && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>{extra.split.heading}</h2>
              <p>{extra.split.lead}</p>
            </div>
            <div className="two-col">
              {extra.split.items.map((it) => (
                <div key={it.title} className="home-service">
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function ExtraWhy({ extra }: Props) {
  return (
    <section className="section-block">
      <h2>{extra.why.heading}</h2>
      <p>{extra.why.lead}</p>
      <ul className="trust-list">
        {extra.why.points.map((pt) => (
          <li key={pt.title}>
            <Icon name="check" size={22} />
            <div>
              <strong>{pt.title}</strong>
              <p>{pt.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
