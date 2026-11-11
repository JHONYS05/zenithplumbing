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
import { HOME } from "@/lib/homeContent";

export async function generateMetadata() {
  const cms = await getCmsPage("home");
  return buildMetadata({
  title: cms.title ?? HOME.title,
  description: cms.description ?? HOME.description,
  path: "/",
  keywords: HOME.keywords,
  });
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
  const [cms, catCms] = await Promise.all([getCmsPage("home"), getCmsPages(categories.map((c) => c.slug))]);

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

      <CtaBand />
    </>
  );
}
