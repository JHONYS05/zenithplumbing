import Link from "next/link";
import { categories } from "@/data/services";
import { getCatalog } from "@/lib/catalog";
import { siteConfig } from "@/lib/siteConfig";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { getContactInfo } from "@/lib/contactInfo";
import { LiveClock } from "./LiveClock";

export async function Header() {
  const [contact, catalog] = await Promise.all([getContactInfo(), getCatalog()]);
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-left">
            <Icon name="clock" size={14} />
            <LiveClock />
            <span className="topbar-sep" aria-hidden="true">
              |
            </span>
            <span>{contact.hoursSummary}</span>
          </span>
          <span>Serving the Denver metro &amp; Front Range</span>
        </div>
      </div>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} — home`}>
          <Logo />
        </Link>

        <nav className="main-nav" aria-label="Main">
          <ul>
            {categories.map((cat) => (
              <li key={cat.key} className="has-menu">
                <Link href={`/${cat.slug}`}>{cat.name}</Link>
                <ul className="dropdown">
                  {catalog.servicesIn(cat.key).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li>
              <Link href="/service-areas">Service Areas</Link>
            </li>
          </ul>
        </nav>

        <div className="header-cta">
          <a href={contact.phoneHref} className="btn btn-ghost phone-link">
            <Icon name="phone" size={18} /> <span>{contact.phone}</span>
          </a>
          <Link href="/contact" className="btn btn-primary">
            Book Service
          </Link>
        </div>

        <details className="mobile-nav">
          <summary aria-label="Open menu">
            <span />
            <span />
            <span />
          </summary>
          <div className="mobile-panel">
            {categories.map((cat) => (
              <details key={cat.key}>
                <summary>{cat.name}</summary>
                <ul>
                  <li>
                    <Link href={`/${cat.slug}`}>All {cat.name}</Link>
                  </li>
                  {catalog.servicesIn(cat.key).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <Link href="/service-areas">Service Areas</Link>
            <Link href="/about-us">About</Link>
            <Link href="/contact">Contact</Link>
            <a href={contact.phoneHref} className="btn btn-primary">
              <Icon name="phone" size={18} /> Call {contact.phone}
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
