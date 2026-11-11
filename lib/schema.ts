import { siteConfig } from "./siteConfig";
import { hoursSchema, type DayHours } from "./hours";
import { absoluteUrl } from "./seo";


const businessId = `${siteConfig.url}/#business`;

/** LocalBusiness (Plumber + HVACBusiness) schema. Only verified fields are output. */
export function localBusinessSchema(
  contact: { phone: string; email: string; hours: DayHours[] },
  cities: { city: string }[],
) {
  const { address } = siteConfig;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Plumber", "HVACBusiness"],
    "@id": businessId,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email,
    openingHoursSpecification: hoursSchema(contact.hours),
    areaServed: cities.map((l) => ({
      "@type": "City",
      name: `${l.city}, CO`,
    })),
  };
  if (siteConfig.showAddress && address.streetAddress) {
    schema.address = { "@type": "PostalAddress", ...address };
  }
  if (siteConfig.sameAs.length) schema.sameAs = siteConfig.sameAs;
  return schema;
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": businessId },
    areaServed: { "@type": "State", name: "Colorado" },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
