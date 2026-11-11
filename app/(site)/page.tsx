import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { categories, type Service } from "@/data/services";
import { getCatalog } from "@/lib/catalog";
import { publishedPosts } from "@/data/posts";
import { reviews } from "@/data/reviews";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceArea } from "@/components/ServiceArea";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { OfferBadge } from "@/components/OfferBadge";
import { drainCleaningOffer } from "@/data/offers";
import { Gallery } from "@/components/Gallery";
import { getCmsPage, getCmsPages } from "@/lib/cms";
import {
  HOME,
  HOME_AREAS,
  HOME_CTA,
  HOME_INTRO,
  HOME_KEYWORDS_EXTRA,
  HOME_OG,
  HOME_PROCESS,
  HOME_SERVICES,
  HOME_SEWER,
  HOME_WHY,
  homeDescription,
  homeFaqs,
} from "@/lib/homeContent";
import { getContactInfo } from "@/lib/contactInfo";
import { FAQ } from "@/components/FAQ";

export async function generateMetadata() {
  const [cms, contact] = await Promise.all([getCmsPage("home"), getContactInfo()]);
  const meta = buildMetadata({
    title: cms.title ?? HOME.title,
    description: cms.description ?? homeDescription(contact.isPlaceholder ? undefined : contact.phone),
    path: "/",
    keywords: [...HOME.keywords, ...HOME_KEYWORDS_EXTRA],
  });
  return {
    ...meta,
    robots: { index: true, follow: true },
    openGraph: { ...meta.openGraph, title: HOME_OG.title, description: HOME_OG.description },
    twitter: { card: "summary_large_image", title: HOME_OG.title, description: HOME_OG.description },
  };
}

const featured = [
  "sewer-replacement",
  "main-line-drain-cleaning",
  "hydro-jetting",
  "water-heater-replacement",
  "furnace-repair",
  "ac-repair",
];

export default async function HomePage() {
  const catalog = await getCatalog();
  const featuredServices = featured.map(catalog.service).filter((s): s is Service => Boolean(s));
  const [cms, catCms, contact] = await Promise.all([
    getCmsPage("home"),
    getCmsPages(categories.map((c) => c.slug)),
    getContactInfo(),
  ]);
  const metroNames = new Set(HOME_AREAS.denverMetro);
  const metroCities = HOME_AREAS.denverMetro
    .map((name) => catalog.cities.find((c) => c.city === name))
    .filter((c): c is (typeof catalog.cities)[number] => Boolean(c));
  const northernCities = catalog.cities.filter((c) => !metroNames.has(c.city));

  return (
    <>
      <Hero
        large
        eyebrow={HOME.eyebrow}
        title={cms.h1 ?? HOME.h1}
        subtitle={HOME.subtitle}
        intro={cms.intro ?? HOME.intro}
        image={cms.heroImage}
      />

      {drainCleaningOffer.active && <OfferBadge offer={drainCleaningOffer} variant="strip" />}

      <section className="section">
        <div className="container home-intro">
          <h2>{HOME_INTRO.heading}</h2>
          <p className="home-lead">{HOME_INTRO.lead}</p>
          {HOME_INTRO.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What We Do</h2>
            <p>Five service lines, one team that knows your whole home.</p>
          </div>
          <div className="card-grid card-grid-5">
            {categories.map((c) => (
              <ServiceCard
                key={c.key}
                href={`/${c.slug}`}
                title={c.name}
                summary={c.summary}
                icon={c.icon}
                image={catCms[c.slug]?.cardImage}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{HOME_SERVICES.heading}</h2>
            <p>{HOME_SERVICES.lead}</p>
          </div>
          <div className="home-services">
            {HOME_SERVICES.items.map((it) => (
              <article key={it.href} className="home-service">
                <h3>
                  <Icon name={it.icon} size={22} /> {it.title}
                </h3>
                <p>{it.body}</p>
                <ul>
                  {it.bullets.map((b) => (
                    <li key={b}>
                      <Icon name="check" size={16} /> {b}
                    </li>
                  ))}
                </ul>
                <Link href={it.href} className="home-service-link">
                  Explore {it.title} <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container two-col">
          <div>
            <h2>Why Colorado Homeowners Choose Zenith</h2>
            <ul className="trust-list">
              {siteConfig.trustPoints.map((t) => (
                <li key={t.title}>
                  <Icon name="check" size={22} />
                  <div>
                    <strong>{t.title}</strong>
                    <p>{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Popular Services</h2>
            <ul className="link-list">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>
                    <span>
                      <strong>{s.name}</strong>
                      <small>{s.summary}</small>
                    </span>
                    <Icon name="arrow" size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{HOME_WHY.heading}</h2>
            <p>{HOME_WHY.lead}</p>
          </div>
          <div className="home-why">
            {HOME_WHY.points.map((pt) => (
              <div key={pt.title} className="home-why-item">
                <Icon name="check" size={22} />
                <h3>{pt.title}</h3>
                <p>{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container home-intro">
          <h2>{HOME_SEWER.heading}</h2>
          {HOME_SEWER.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <ul className="area-list home-pill-links">
            {HOME_SEWER.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <Icon name="arrow" size={14} /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {cms.gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <Gallery images={cms.gallery} />
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>What Our Customers Say</h2>
            </div>
            <Reviews limit={3} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{HOME_AREAS.heading}</h2>
            <p>{HOME_AREAS.lead}</p>
          </div>
          <div className="two-col">
            {metroCities.length > 0 && (
              <div>
                <h3>Denver Metro</h3>
                <ul className="area-list">
                  {metroCities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/service-areas/${c.slug}`}>
                        <Icon name="pin" size={16} /> {c.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {northernCities.length > 0 && (
              <div>
                <h3>Northern Colorado &amp; Front Range</h3>
                <ul className="area-list">
                  {northernCities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/service-areas/${c.slug}`}>
                        <Icon name="pin" size={16} /> {c.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <h2>{HOME_PROCESS.heading}</h2>
          </div>
          <ol className="home-steps">
            {HOME_PROCESS.steps.map((st) => (
              <li key={st.title}>
                <strong>{st.title}</strong>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container home-intro">
          <FAQ heading="Frequently Asked Questions About Our Services" faqs={homeFaqs(contact.phone)} />
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <ServiceArea />
          {publishedPosts().length > 0 && (
            <section className="section-block">
              <h2>Homeowner Guides</h2>
              <ul className="link-list">
                {publishedPosts()
                  .slice(0, 3)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`}>
                        <span>
                          <strong>{p.title}</strong>
                          <small>{p.description}</small>
                        </span>
                        <Icon name="arrow" size={18} />
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </div>
      </section>

      <CtaBand title={HOME_CTA.title} text={HOME_CTA.text} />
    </>
  );
}
