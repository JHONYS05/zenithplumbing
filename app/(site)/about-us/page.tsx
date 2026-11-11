import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";

export const metadata = buildMetadata({
  title: "About Zenith Plumbing, Drain, Sewer & HVAC | Colorado",
  description:
    "Learn about Zenith, a Colorado home-service company providing plumbing, drain cleaning, sewer, water heater and HVAC services.",
  path: "/about-us",
});

// TODO: Replace with Zenith's real story — founding year, owner, licenses, team photos.
export default async function AboutPage() {
  const cms = await getCmsPage("about-us");
  return (
    <>
      <Hero
        image={cms.heroImage}
        title="About Zenith"
        intro="A Colorado home-service company built around one idea: find the real problem, explain it clearly and fix it right."
      >
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }]} />
      </Hero>
      <section className="section">
        <div className="container narrow prose">
          <h2>Plumbing and HVAC under one roof</h2>
          <p>
            Zenith Plumbing, Drain, Sewer &amp; HVAC serves homeowners across the Denver metro and
            Colorado Front Range. Our team handles everything from clogged drains and sewer line
            replacements to water heaters, furnaces, air conditioners and heat pumps — so you have
            one company to call for the systems that keep your home running.
          </p>
          <h2>How we work</h2>
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
      </section>
      <CtaBand />
    </>
  );
}
