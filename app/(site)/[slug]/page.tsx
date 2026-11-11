/**
 * One route renders every category hub (/plumbing, /hvac…), every service page
 * (/ac-repair, /sewer-replacement…) and every "other page" added in the admin.
 * Built-in pages are generated at build time; pages added in the admin are generated on
 * first visit. Unknown addresses return a 404.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allServiceSlugs, getCategory, getCategoryBySlug, type Category, type Service } from "@/data/services";
import { getCatalog, customPageDefaults } from "@/lib/catalog";
import type { CustomPage } from "@/lib/customPages";
import { Paragraphs } from "@/components/Paragraphs";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/siteConfig";
import { getCmsPage, getCmsPages, type CmsPage } from "@/lib/cms";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceArea } from "@/components/ServiceArea";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { offerFor } from "@/data/offers";
import { offeringAnchor, offeringsByCategory } from "@/data/plumbingServices";
import { getContactInfo } from "@/lib/contactInfo";
import { categoryPageContent } from "@/data/categoryPages";

export function generateStaticParams() {
  return allServiceSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalog();
  const other = catalog.otherPage(slug);
  const page =
    getCategoryBySlug(slug) ??
    catalog.service(slug) ??
    (other && { ...customPageDefaults(other.name), keywords: [other.name.toLowerCase()] });
  if (!page) return {};
  const cms = await getCmsPage(slug);
  const firstText = other?.sections.find((s) => s.body)?.body.replace(/\s+/g, " ").slice(0, 155);
  return buildMetadata({
    title: cms.title ?? page.title,
    description: cms.description ?? (page.description || cms.intro || firstText || ""),
    path: `/${slug}`,
    keywords: page.keywords,
  });
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const category = getCategoryBySlug(slug);
  const service = category ? undefined : catalog.service(slug);
  const other = category || service ? undefined : catalog.otherPage(slug);
  if (!category && !service && !other) notFound();
  const cms = await getCmsPage(slug);
  if (category) return <CategoryPage category={category} cms={cms} />;
  if (service) return <ServicePage service={service} cms={cms} />;
  return <OtherPage page={other!} cms={cms} />;
}

// ─────────────────────────── Category hub ───────────────────────────

async function CategoryPage({ category, cms }: { category: Category; cms: CmsPage }) {
  const offer = offerFor(category.slug);
  const children = (await getCatalog()).servicesIn(category.key);
  const childCms = await getCmsPages(children.map((s) => s.slug));
  const offerings = offeringsByCategory[category.slug];
  const extra = categoryPageContent[category.slug];
  const contact = extra ? await getContactInfo() : undefined;
  const extraFaqs = extra && contact ? extra.faqs(contact.phone) : [];
  const extraQs = new Set(extraFaqs.map((f) => f.q));
  // Keep the category's own FAQs, minus the pricing one the longer list already answers.
  const faqs = extra
    ? [...extraFaqs, ...category.faqs.filter((f) => !extraQs.has(f.q) && !/pricing before/i.test(f.q))]
    : category.faqs;
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: category.name,
          description: category.description,
          path: `/${category.slug}`,
          offer,
          catalog: offerings,
        })}
      />
      <Hero
        title={cms.h1 ?? category.h1}
        subtitle={extra?.subtitle}
        intro={cms.intro ?? category.intro}
        ctaLabel={extra?.ctaLabel}
        image={cms.heroImage}
        offer={offer}
      >
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: category.name, path: `/${category.slug}` },
          ]}
        />
      </Hero>

      {extra && (
        <section className="section">
          <div className="container home-intro">
            {extra.introParagraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "home-lead" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{category.name} Services</h2>
            <p>Choose a service to learn about warning signs, our process and common questions.</p>
          </div>
          <div className="card-grid">
            {children.map((s) => (
              <ServiceCard
                key={s.slug}
                href={`/${s.slug}`}
                title={s.name}
                summary={s.summary}
                icon={category.icon}
                image={childCms[s.slug]?.cardImage}
              />
            ))}
          </div>
        </div>
      </section>

      {offerings && (
        <section className="section offerings-section" aria-labelledby="offerings-heading">
          <div className="container">
            <div className="section-head">
              <h2 id="offerings-heading">{category.name} Services We Offer</h2>
              <p>Everything our team handles, from a dripping faucet to a whole-house repipe.</p>
            </div>
            <div className="offerings-grid">
              {offerings.map((g) => (
                <div key={g.group} className="offerings-group">
                  <h3>{g.group}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name} id={offeringAnchor(it.name)}>
                        <Icon name="check" size={18} />
                        <span>
                          {it.href ? <Link href={it.href}>{it.name}</Link> : <strong>{it.name}</strong>}
                          <small>{it.text}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {extra && (
        <>
          <section className="section section-tint">
            <div className="container">
              <div className="section-head">
                <h2>{extra.servicesHeading}</h2>
                <p>{extra.servicesLead}</p>
              </div>
              <div className="home-services home-services-wide">
                {extra.services.map((sv) => (
                  <article key={sv.title} className="home-service">
                    <h3>
                      <Icon name={category.icon} size={22} /> {sv.title}
                    </h3>
                    {sv.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {sv.href && (
                      <Link href={sv.href} className="home-service-link">
                        {sv.linkLabel ?? `Learn about ${sv.title.toLowerCase()}`} <Icon name="arrow" size={16} />
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container two-col">
              {extra.listSections.map((ls) => (
                <div key={ls.heading}>
                  <h2>{ls.heading}</h2>
                  {ls.lead.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <ul className="check-list">
                    {ls.items.map((it) => (
                      <li key={it}>
                        <Icon name="check" size={20} /> {it}
                      </li>
                    ))}
                  </ul>
                  {ls.outro && <p>{ls.outro}</p>}
                </div>
              ))}
            </div>
          </section>

          {extra.split && (
            <section className="section">
              <div className="container">
                <div className="section-head">
                  <h2>{extra.split.heading}</h2>
                  <p>{extra.split.lead}</p>
                </div>
                <div className="two-col">
                  {extra.split.items.map((it) => (
                    <div key={it.title} className="home-service">
                      <h3>{it.title}</h3>
                      <p>{it.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="section section-tint">
        <div className="container content-grid">
          <div className="content">
            <Gallery images={cms.gallery} heading={`Recent ${category.name} Projects`} />
            {extra ? (
              <section className="section-block">
                <h2>{extra.why.heading}</h2>
                <p>{extra.why.lead}</p>
                <ul className="trust-list">
                  {extra.why.points.map((pt) => (
                    <li key={pt.title}>
                      <Icon name="check" size={22} />
                      <div>
                        <strong>{pt.title}</strong>
                        <p>{pt.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <WhyZenith />
            )}
            <ServiceArea serviceName={category.name} heading={extra?.areas.heading} />
            {extra && <p>{extra.areas.outro}</p>}
            <FAQ faqs={faqs} heading={extra?.faqHeading} />
          </div>
          <Sidebar />
        </div>
      </section>

      <CtaBand
        title={extra?.cta.title}
        label={offer ? `Book ${offer.price} ${offer.title}` : extra?.ctaLabel}
        text={offer ? `${offer.price} ${offer.title.toLowerCase()}. ${offer.note}` : extra?.cta.text}
      />
    </>
  );
}

// ─────────────────────────── Service page ───────────────────────────

async function ServicePage({ service, cms }: { service: Service; cms: CmsPage }) {
  const offer = offerFor(service.slug);
  const catalog = await getCatalog();
  const category = getCategory(service.category);
  const related = (service.related ?? [])
    .map(catalog.service)
    .filter((s): s is Service => Boolean(s));
  const siblings = catalog.servicesIn(service.category).filter((s) => s.slug !== service.slug);
  const relatedCms = await getCmsPages(related.map((r) => r.slug));

  return (
    <>
      <JsonLd
        data={serviceSchema({ name: service.name, description: service.description, path: `/${service.slug}`, offer })}
      />
      <Hero
        title={cms.h1 ?? service.h1}
        intro={cms.intro ?? service.intro}
        ctaLabel={service.ctaLabel}
        image={cms.heroImage}
        offer={offer}
      >
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: category.name, path: `/${category.slug}` },
            { name: service.name, path: `/${service.slug}` },
          ]}
        />
      </Hero>

      <section className="section">
        <div className="container content-grid">
          <article className="content">
            {service.signs.length > 0 && (
              <section className="section-block">
                <h2>{service.signsHeading ?? `Signs You Need ${service.name}`}</h2>
                <ul className="check-list">
                  {service.signs.map((s, i) => (
                    <li key={i}>
                      <Icon name="check" size={20} /> {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {service.process.length > 0 && (
              <section className="section-block">
                <h2>{service.processHeading ?? `Our ${service.name} Process`}</h2>
                <ol className="steps">
                  {service.process.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ol>
              </section>
            )}

            {service.sections?.map((block, i) => (
              <section key={i} className="section-block">
                {block.heading && <h2>{block.heading}</h2>}
                <Paragraphs text={block.body} />
                {block.items && (
                  <dl className="detail-grid">
                    {block.items.map((it) => (
                      <div key={it.label}>
                        <dt>{it.label}</dt>
                        <dd>{it.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}

            <Gallery images={cms.gallery} heading={`Recent ${service.name} Projects`} />
            <WhyZenith />
            <ServiceArea heading={`${service.name} Service Areas`} serviceName={service.name} />
            <FAQ faqs={service.faqs} />

            {related.length > 0 && (
              <section className="section-block">
                <h2>Related Services</h2>
                <div className="card-grid card-grid-compact">
                  {related.map((r) => (
                    <ServiceCard
                      key={r.slug}
                      href={`/${r.slug}`}
                      title={r.name}
                      summary={r.summary}
                      image={relatedCms[r.slug]?.cardImage}
                    />
                  ))}
                </div>
              </section>
            )}
          </article>

          <Sidebar>
            <div className="side-card">
              <h3>More {category.name}</h3>
              <ul className="side-links">
                <li>
                  <Link href={`/${category.slug}`}>All {category.name}</Link>
                </li>
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Sidebar>
        </div>
      </section>

      <CtaBand
        label={offer ? `Book ${offer.price} ${offer.title}` : (service.ctaLabel ?? "Request Service")}
        title={`Need ${service.name.toLowerCase()}?`}
        text={offer ? `${offer.price} ${offer.title.toLowerCase()}. ${offer.note}` : undefined}
      />
    </>
  );
}

// ─────────────────────────── Other pages (added in the admin) ───────────────────────────

function OtherPage({ page, cms }: { page: CustomPage; cms: CmsPage }) {
  const d = customPageDefaults(page.name);
  return (
    <>
      <Hero title={cms.h1 ?? d.h1} intro={cms.intro ?? d.intro} image={cms.heroImage}>
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: page.name, path: `/${page.slug}` },
          ]}
        />
      </Hero>

      <section className="section">
        <div className="container content-grid">
          <article className="content">
            {page.sections.map((block, i) => (
              <section key={i} className="section-block">
                {block.heading && <h2>{block.heading}</h2>}
                <Paragraphs text={block.body} />
              </section>
            ))}
            <Gallery images={cms.gallery} />
            <FAQ faqs={page.faqs} />
          </article>
          <Sidebar />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

// ─────────────────────────── Shared pieces ───────────────────────────

function WhyZenith() {
  return (
    <section className="section-block">
      <h2>Why Choose Zenith?</h2>
      <div className="trust-grid">
        {siteConfig.trustPoints.map((t) => (
          <div key={t.title} className="trust-item">
            <Icon name="check" size={22} />
            <div>
              <strong>{t.title}</strong>
              <p>{t.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function Sidebar({ children }: { children?: React.ReactNode }) {
  const contact = await getContactInfo();
  return (
    <aside className="sidebar">
      <div className="side-card side-card-accent">
        <h3>Request Service</h3>
        <p>
          Or call <a href={contact.phoneHref}>{contact.phone}</a>
        </p>
        <ContactForm />
      </div>
      {children}
    </aside>
  );
}
