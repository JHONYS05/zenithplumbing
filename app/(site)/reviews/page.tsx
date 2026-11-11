import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";

export const metadata = buildMetadata({
  title: "Customer Reviews | Zenith Plumbing, Drain, Sewer & HVAC",
  description:
    "Read reviews from Colorado homeowners who used Zenith for plumbing, drain cleaning, sewer, water heater and HVAC service.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const cms = await getCmsPage("reviews");
  return (
    <>
      <Hero image={cms.heroImage} title="Customer Reviews" intro="What Colorado homeowners say about working with Zenith.">
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]} />
      </Hero>
      <section className="section">
        <div className="container">
          <Reviews showEmptyState />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
