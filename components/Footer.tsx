import Link from "next/link";
import { categories } from "@/data/services";
import { getCatalog } from "@/lib/catalog";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";
import { getContactInfo } from "@/lib/contactInfo";

export async function Footer() {
  const { address } = siteConfig;
  const [contact, catalog] = await Promise.all([getContactInfo(), getCatalog()]);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo inverted />
          <p>
            Plumbing, drain cleaning, sewer, water heater and HVAC services for homes across the
            Denver Metro and Northern Colorado.
          </p>
          <p>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            {siteConfig.showAddress && address.streetAddress ? (
              <>
                {address.streetAddress}, {address.addressLocality}, {address.addressRegion}{" "}
                {address.postalCode}
              </>
            ) : (
              <>Based in {address.addressLocality}, {address.addressRegion}</>
            )}
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat.key}>
            <h3>
              <Link href={`/${cat.slug}`}>{cat.name}</Link>
            </h3>
            <ul>
              {catalog.servicesIn(cat.key).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3>
            <Link href="/service-areas">Service Areas</Link>
          </h3>
          <ul>
            {catalog.cities.map((l) => (
              <li key={l.slug}>
                <Link href={`/service-areas/${l.slug}`}>{l.city}, CO</Link>
              </li>
            ))}
          </ul>
          <h3>Company</h3>
          <ul>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/financing">Financing</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            {catalog.otherPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
