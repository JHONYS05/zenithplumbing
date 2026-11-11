import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCatalog } from "@/lib/catalog";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";

export const metadata = buildMetadata({
  title: "Service Areas | Zenith Plumbing, Drain, Sewer & HVAC",
  description:
    "Zenith provides plumbing, drain cleaning, sewer, water heater and HVAC services across the Denver Metro and Northern Colorado. Find your city.",
  path: "/service-areas",
});

export default async function ServiceAreasPage() {
  const cms = await getCmsPage("service-areas");
  const locations = (await getCatalog()).cities;
  return (
    <>
      <Hero
        image={cms.heroImage}
        title="Areas We Serve in Colorado"
        intro="Zenith serves homeowners across the Denver Metro and Northern Colorado. Find your city below, or contact us to confirm service at your address."
      >
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
          ]}
        />
      </Hero>
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {locations.map((l) => (
              <Link key={l.slug} href={`/service-areas/${l.slug}`} className="service-card">
                <span className="service-card-icon">
                  <Icon name="pin" size={26} />
                </span>
                <span className="service-card-title">{l.city}, CO</span>
                <span className="service-card-summary">{l.county}</span>
                <span className="service-card-more">
                  View services <Icon name="arrow" size={16} />
                </span>
              </Link>
            ))}
          </div>
          <p className="muted center">Don&apos;t see your city? Call us — we may still be able to help.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
