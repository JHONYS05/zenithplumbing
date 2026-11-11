import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { Hero } from "@/components/Hero";
import { getCmsPage } from "@/lib/cms";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { getContactInfo } from "@/lib/contactInfo";

export const metadata = buildMetadata({
  title: "Contact Zenith | Request Plumbing, Sewer or HVAC Service",
  description:
    "Request plumbing, drain cleaning, sewer, water heater or HVAC service from Zenith. Call or send us a message and we'll schedule a time that works for you.",
  path: "/contact",
});

export default async function ContactPage() {
  const [cms, contact] = await Promise.all([getCmsPage("contact"), getContactInfo()]);
  return (
    <>
      <Hero
        image={cms.heroImage}
        title="Request Service"
        intro="Tell us what's going on and we'll get back to you to schedule. For urgent problems, please call."
      >
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      </Hero>
      <section className="section">
        <div className="container content-grid">
          <div className="side-card">
            <ContactForm />
          </div>
          <aside className="sidebar">
            <div className="side-card">
              <h3>Call us</h3>
              <p className="big-phone">
                <a href={contact.phoneHref}>
                  <Icon name="phone" size={22} /> {contact.phone}
                </a>
              </p>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <h3>Hours</h3>
              <dl className="hours-list">
                {contact.hoursTable.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
