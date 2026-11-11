import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, publishedPosts } from "@/data/posts";
import { getCatalog } from "@/lib/catalog";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Zenith`,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.keyword],
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const service = post.relatedService ? (await getCatalog()).service(post.relatedService) : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />
      <section className="section">
        <article className="container narrow prose">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />
          <h1>{post.title}</h1>
          {post.sections?.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {service && (
            <div className="callout">
              <strong>Need help?</strong> Learn about our{" "}
              <Link href={`/${service.slug}`}>{service.name.toLowerCase()} services</Link>.
            </div>
          )}
        </article>
      </section>
      <CtaBand />
    </>
  );
}
