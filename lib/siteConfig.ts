/**
 * Business details used across the site, in schema markup and in the footer.
 *
 * ⚠️ BEFORE LAUNCH: replace every value marked TODO with Zenith's real, verified details.
 * Keep the name, phone and address identical to your Google Business Profile (NAP consistency).
 */
export const siteConfig = {
  name: "Zenith Plumbing, Drain, Sewer & HVAC",
  shortName: "Zenith",
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.zenithplumbingandhvac.com").replace(/\/$/, ""),

  // Placeholders — set the real phone and email in Admin → Business info (/admin/settings).
  phone: "(303) 555-0123",
  phoneHref: "tel:+13035550123",
  email: "service@zenithplumbing.com",

  /**
   * TODO: real address. If Zenith is a service-area business without a public storefront,
   * set `showAddress` to false — the street address will be hidden on the site and left out
   * of schema, matching how a service-area Google Business Profile works.
   */
  showAddress: false,
  address: {
    streetAddress: "",
    addressLocality: "Aurora",
    addressRegion: "CO",
    postalCode: "",
    addressCountry: "US",
  },

  // Business hours are set in Admin → Business info (defaults in lib/hours.ts).

  // TODO: paste your Google Business Profile link and any real social profiles.
  googleBusinessUrl: "",
  sameAs: [] as string[],

  /**
   * "Why choose Zenith" points shown on every service page.
   * TODO: replace with claims you can stand behind (license numbers, years in business, warranties…).
   */
  trustPoints: [
    {
      title: "Diagnosis before recommendations",
      body: "We find the actual cause — with a camera or test equipment when needed — before suggesting a repair.",
    },
    {
      title: "Options and pricing up front",
      body: "You'll hear your options and the price before any work begins, so there are no surprises.",
    },
    {
      title: "Plumbing and HVAC under one roof",
      body: "Drains, sewer lines, water heaters, furnaces and AC — one team that knows your whole home.",
    },
    {
      title: "Respect for your home",
      body: "Shoe covers, protected work areas and a clean jobsite when we're done.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
