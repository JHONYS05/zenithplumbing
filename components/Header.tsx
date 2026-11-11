import Link from "next/link";
import { categories } from "@/data/services";
import { getCatalog } from "@/lib/catalog";
import { siteConfig } from "@/lib/siteConfig";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { getContactInfo } from "@/lib/contactInfo";
import { LiveClock } from "./LiveClock";
import { MenuCloser } from "./MenuCloser";
import { offeringHref, offeringsByCategory, type OfferingGroup } from "@/data/plumbingServices";
import type { Service } from "@/data/services";

/** Services from the catalog (e.g. pages added in the admin) not already linked in the grouped list. */
function extraServices(groups: OfferingGroup[], services: Service[]) {
  const linked = new Set(groups.flatMap((g) => g.items.map((i) => i.href)).filter(Boolean));
  return services.filter((s) => !linked.has(`/${s.slug}`));
}

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
          <span>Serving Denver Metro &amp; Northern Colorado</span>
        </div>
      </div>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} — home`}>
          <Logo />
        </Link>

        <MenuCloser />
        <nav className="main-nav" aria-label="Main">
          <ul>
            {categories.map((cat) => {
              const groups = offeringsByCategory[cat.slug];
              const services = catalog.servicesIn(cat.key);
              if (groups) {
                const extra = extraServices(groups, services);
                return (
                  <li key={cat.key} className="has-menu has-mega">
                    <Link href={`/${cat.slug}`}>{cat.name}</Link>
                    <div className="mega">
                      <div className="mega-grid">
                        {groups.map((g) => (
                          <div key={g.group}>
                            <p className="mega-title">{g.group}</p>
                            <ul>
                              {g.items.map((it) => (
                                <li key={it.name}>
                                  <Link href={offeringHref(cat.slug, it)}>{it.name}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {extra.length > 0 && (
                          <div>
                            <p className="mega-title">More {cat.name}</p>
                            <ul>
                              {extra.map((s) => (
                                <li key={s.slug}>
                                  <Link href={`/${s.slug}`}>{s.name}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <Link href={`/${cat.slug}`} className="mega-all">
                        See all {cat.name.toLowerCase()} services →
                      </Link>
                    </div>
                  </li>
                );
              }
              return (
                <li key={cat.key} className="has-menu">
                  <Link href={`/${cat.slug}`}>{cat.name}</Link>
                  <ul className="dropdown">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`}>{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
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
            {categories.map((cat) => {
              const groups = offeringsByCategory[cat.slug];
              const services = catalog.servicesIn(cat.key);
              return (
                <details key={cat.key}>
                  <summary>{cat.name}</summary>
                  <ul>
                    <li>
                      <Link href={`/${cat.slug}`}>All {cat.name}</Link>
                    </li>
                    {groups
                      ? [
                          ...groups.map((g) => (
                            <li key={g.group} className="mobile-group">
                              <span>{g.group}</span>
                              <ul>
                                {g.items.map((it) => (
                                  <li key={it.name}>
                                    <Link href={offeringHref(cat.slug, it)}>{it.name}</Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          )),
                          ...extraServices(groups, services).map((s) => (
                            <li key={s.slug}>
                              <Link href={`/${s.slug}`}>{s.name}</Link>
                            </li>
                          )),
                        ]
                      : services.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/${s.slug}`}>{s.name}</Link>
                          </li>
                        ))}
                  </ul>
                </details>
              );
            })}
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
