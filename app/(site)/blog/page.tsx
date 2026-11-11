import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { publishedPosts } from "@/data/posts";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";

export const metadata = buildMetadata({
  title: "Plumbing, Sewer & HVAC Guides for Colorado Homeowners | Zenith",
  description:
    "Practical guides on sewer lines, drain cleaning, water heaters, furnaces and air conditioning from the Zenith team.",
  path: "/blog",
});

export default async function BlogIndex() {
  const cms = await getCmsPage("blog");
  const posts = publishedPosts();
  return (
    <>
      <Hero image={cms.heroImage} title="Homeowner Guides" intro="Practical advice on plumbing, sewer lines, water heaters and HVAC.">
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      </Hero>
      <section className="section">
        <div className="container narrow">
          <ul className="link-list">
            {posts.map((p) => (
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
        </div>
      </section>
    </>
  );
}
