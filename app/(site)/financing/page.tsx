import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";

export const metadata = buildMetadata({
  title: "Financing for Plumbing, Sewer & HVAC Projects | Zenith",
  description:
    "Ask about financing for sewer line replacement, water heater replacement and HVAC systems from Zenith in Colorado.",
  path: "/financing",
});

// TODO: Add your actual financing partner, terms and application link. Don't advertise
// specific rates or terms unless they're current and include required disclosures.
export default async function FinancingPage() {
  const cms = await getCmsPage("financing");
  return (
    <>
      <Hero
        image={cms.heroImage}
        title="Financing Options"
        intro="Big repairs rarely arrive at a convenient time. Ask us about financing for larger projects."
      >
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Financing", path: "/financing" }]} />
      </Hero>
      <section className="section">
        <div className="container narrow prose">
          <h2>Projects that may qualify</h2>
          <ul>
            <li>Sewer line repair and replacement</li>
            <li>Water heater replacement, including tankless upgrades</li>
            <li>Furnace, air conditioner and heat pump installation</li>
          </ul>
          <h2>How it works</h2>
          <p>
            Ask your technician or our office about financing when you receive your estimate. We&apos;ll
            explain the available options and how to apply.
          </p>
        </div>
      </section>
      <CtaBand title="Questions about financing?" label="Contact Us" />
    </>
  );
}
