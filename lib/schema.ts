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
  schema.hasOfferCatalog = {
    "@type": "OfferCatalog",
    name: "Home Services",
    itemListElement: [
      ["Plumbing Services", "/plumbing"],
      ["Drain Cleaning", "/drain-cleaning"],
      ["Sewer Repair and Replacement", "/sewer"],
      ["Water Heater Services", "/water-heaters"],
      ["Heating and Air Conditioning", "/hvac"],
    ].map(([name, path]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, url: absoluteUrl(path) },
    })),
  };
  if (siteConfig.showAddress && address.streetAddress) {
    schema.address = { "@type": "PostalAddress", ...address };
  }
  if (siteConfig.sameAs.length) schema.sameAs = siteConfig.sameAs;
  return schema;
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  offer?: { title: string; note: string; priceValue: number };
  /** Full list of services offered (shown as an OfferCatalog to Google). */
  catalog?: { group: string; items: { name: string; text: string }[] }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": businessId },
    areaServed: { "@type": "State", name: "Colorado" },
    ...(opts.catalog && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${opts.name} services`,
        itemListElement: opts.catalog.map((g) => ({
          "@type": "OfferCatalog",
          name: g.group,
          itemListElement: g.items.map((it) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: it.name, description: it.text },
          })),
        })),
      },
    }),
    ...(opts.offer && {
      offers: {
        "@type": "Offer",
        name: opts.offer.title,
        description: opts.offer.note,
        price: opts.offer.priceValue,
        priceCurrency: "USD",
        url: absoluteUrl(opts.path),
      },
    }),
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
