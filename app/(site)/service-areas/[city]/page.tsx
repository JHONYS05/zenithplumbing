import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publishedLocations } from "@/data/locations";
import { categories } from "@/data/services";
import { getCatalog } from "@/lib/catalog";
import { Paragraphs } from "@/components/Paragraphs";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { Reviews } from "@/components/Reviews";
import { reviews } from "@/data/reviews";
import { Icon } from "@/components/Icon";
import { Gallery } from "@/components/Gallery";
import { getCmsPage } from "@/lib/cms";

// Built-in cities are generated at build time; cities added in the admin on first visit.
export function generateStaticParams() {
  return publishedLocations().map((l) => ({ city: l.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const loc = (await getCatalog()).city(city);
  if (!loc) return {};
  const cms = await getCmsPage(`service-areas/${loc.slug}`);
  return buildMetadata({
    title: cms.title ?? `Plumbing, Sewer & HVAC in ${loc.city}, CO | Zenith`,
    description: cms.description ?? `Plumbing repair, drain cleaning, sewer line repair and replacement, water heaters and HVAC service for ${loc.city}, Colorado homes. Request service from Zenith.`,
    path: `/service-areas/${loc.slug}`,
    keywords: [`plumber ${loc.city} CO`, `HVAC ${loc.city} CO`, `sewer repair ${loc.city}`, `drain cleaning ${loc.city}`],
  });
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const catalog = await getCatalog();
  const loc = catalog.city(city);
  if (!loc) notFound();

  const cityReviews = reviews.filter((r) => r.city === loc.city);
  const cms = await getCmsPage(`service-areas/${loc.slug}`);

  return (
    <>
      <Hero
        title={cms.h1 ?? `Plumbing, Drain, Sewer & HVAC Services in ${loc.city}, CO`}
        intro={cms.intro ?? loc.intro}
        image={cms.heroImage}
      >
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: `${loc.city}, CO`, path: `/service-areas/${loc.slug}` },
          ]}
        />
      </Hero>

      {loc.localNotes.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>What {loc.city} Homeowners Should Know</h2>
            </div>
            <div className="card-grid">
              {loc.localNotes.map((n, i) => (
                <div key={i} className="note-card">
                  {n.title && <h3>{n.title}</h3>}
                  <Paragraphs text={n.text} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <h2>Our Services in {loc.city}</h2>
          </div>
          <div className="city-services">
            {categories.map((c) => (
              <div key={c.key} className="city-service-col">
                <h3>
                  <Icon name={c.icon} size={22} />{" "}
                  <Link href={`/${c.slug}`}>
                    {c.name} in {loc.city}
                  </Link>
                </h3>
                <ul>
                  {catalog.servicesIn(c.key).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <Gallery images={cms.gallery} heading={`Recent Projects in ${loc.city}`} />
          {cityReviews.length > 0 && (
            <section className="section-block">
              <h2>Reviews from {loc.city}</h2>
              <Reviews items={cityReviews} />
            </section>
          )}
          <FAQ faqs={loc.faqs} heading={`${loc.city} FAQs`} />
        </div>
      </section>

      <CtaBand title={`Need service in ${loc.city}?`} />
    </>
  );
}
