import { buildMetadata } from "@/lib/seo";
import { generalFaqs } from "@/data/faqs";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";

export const metadata = buildMetadata({
  title: "Plumbing, Sewer & HVAC FAQs | Zenith Colorado",
  description:
    "Answers to common questions about plumbing, drain cleaning, sewer lines, water heaters, HVAC, scheduling and pricing from Zenith.",
  path: "/faqs",
});

export default async function FaqsPage() {
  const cms = await getCmsPage("faqs");
  return (
    <>
      <Hero image={cms.heroImage} title="Frequently Asked Questions" intro="Quick answers to the questions we hear most.">
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }]} />
      </Hero>
      <section className="section">
        <div className="container narrow">
          {generalFaqs.map((g) => (
            <FAQ key={g.group} heading={g.group} faqs={g.items} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
