/**
 * Service-area city pages at /service-areas/{slug}.
 *
 * ⚠️ Only publish cities Zenith genuinely serves. Set `published: false` for any city you don't.
 * Each page needs unique, genuinely local content — expand `intro`, `localNotes` and `faqs`
 * with real project examples, neighborhoods you work in and local reviews as you get them.
 */
import type { Faq } from "./services";

export interface Location {
  slug: string;
  city: string;
  county: string;
  published: boolean;
  intro: string;
  localNotes: { title: string; text: string }[];
  faqs: Faq[];
}

export const locations: Location[] = [
  {
    slug: "denver-co",
    city: "Denver",
    county: "Denver County",
    published: true,
    intro:
      "Denver's housing stock ranges from century-old bungalows and Victorians to brand-new builds, and each comes with its own plumbing and HVAC challenges. Zenith helps Denver homeowners with everything from main line backups in older neighborhoods to furnace and AC replacements.",
    localNotes: [
      {
        title: "Older sewer laterals",
        text: "Many older Denver homes still have clay tile or cast-iron sewer lines, which are prone to root intrusion and cracking as they age. A camera inspection is the fastest way to know where yours stands.",
      },
      {
        title: "Mature trees, mature roots",
        text: "Tree-lined streets are part of Denver's charm — and a common cause of recurring main line clogs when roots find their way into old pipe joints.",
      },
      {
        title: "Basements and backups",
        text: "With so many basements, a main line clog often shows up first at a basement floor drain. Clearing it quickly limits the cleanup.",
      },
    ],
    faqs: [
      {
        q: "Do you offer sewer scopes for Denver home buyers?",
        a: "Yes. A sewer line inspection is a smart step when buying an older Denver home, since the sewer line usually isn't covered by a standard home inspection.",
      },
    ],
  },
  {
    slug: "aurora-co",
    city: "Aurora",
    county: "Arapahoe, Adams and Douglas Counties",
    published: true,
    intro:
      "Aurora spans everything from established neighborhoods built in the 1960s–80s to newer subdivisions on the city's east and south sides. Zenith provides plumbing, drain, sewer, water heater and HVAC service across Aurora.",
    localNotes: [
      {
        title: "Aging water heaters and furnaces",
        text: "In many of Aurora's established neighborhoods, original or second-generation water heaters and furnaces are reaching the end of their service life.",
      },
      {
        title: "Front Range soils",
        text: "Expansive clay soils in parts of the Front Range can shift over time, which can stress underground sewer and water lines.",
      },
      {
        title: "Cooling for hot summers",
        text: "Aurora's sunny summer afternoons put real demand on air conditioners and heat pumps, making a spring tune-up worthwhile.",
      },
    ],
    faqs: [
      {
        q: "Do you serve all of Aurora?",
        a: "Contact us with your address and we'll confirm availability for your neighborhood.",
      },
    ],
  },
  {
    slug: "lakewood-co",
    city: "Lakewood",
    county: "Jefferson County",
    published: true,
    intro:
      "Lakewood has a large number of mid-century ranch homes alongside newer construction near the foothills. Zenith helps Lakewood homeowners keep aging plumbing, sewer lines and heating systems working reliably.",
    localNotes: [
      {
        title: "Mid-century plumbing",
        text: "Homes from the 1950s and '60s may still have galvanized steel water lines or original drain piping, which can corrode and restrict flow.",
      },
      {
        title: "Root-prone sewer lines",
        text: "Mature landscaping on older lots often means roots near the sewer line — a common cause of recurring backups.",
      },
      {
        title: "Ready for winter",
        text: "Being close to the foothills, Lakewood sees sharp cold snaps, so fall furnace maintenance and frost-free hose bibs are worth the investment.",
      },
    ],
    faqs: [
      {
        q: "Can you replace galvanized pipe in my Lakewood home?",
        a: "Yes. We can assess your water lines and recommend a section replacement or whole-home repipe with modern materials.",
      },
    ],
  },
  {
    slug: "littleton-co",
    city: "Littleton",
    county: "Arapahoe County",
    published: true,
    intro:
      "From historic homes near downtown to established neighborhoods and newer developments, Littleton homes need dependable plumbing and HVAC. Zenith provides repair, replacement and maintenance services throughout Littleton.",
    localNotes: [
      {
        title: "Established neighborhoods",
        text: "Many Littleton neighborhoods have homes several decades old with original sewer lines and mature trees nearby.",
      },
      {
        title: "Water heater replacement",
        text: "Replacing an aging water heater before it fails avoids water damage — especially when the unit sits in a finished basement.",
      },
      {
        title: "Heating and cooling upgrades",
        text: "Many homeowners are weighing high-efficiency furnaces and heat pumps when their existing systems reach replacement age.",
      },
    ],
    faqs: [
      {
        q: "Do you install heat pumps in Littleton?",
        a: "Yes. We help you compare cold-climate heat pumps, dual-fuel systems and furnace replacements.",
      },
    ],
  },
  {
    slug: "centennial-co",
    city: "Centennial",
    county: "Arapahoe County",
    published: true,
    intro:
      "Centennial's many 1970s–1990s subdivisions mean a lot of homes now have water heaters, furnaces and air conditioners at or past their expected lifespan. Zenith helps Centennial homeowners repair or replace them on their own schedule.",
    localNotes: [
      {
        title: "Second-generation equipment",
        text: "Many Centennial homes are on their second or third water heater and HVAC system — good timing to consider tankless or heat pump upgrades.",
      },
      {
        title: "Sewer lines at mid-life",
        text: "Sewer lines in homes from this era can develop root intrusion and offset joints. A camera inspection shows their condition.",
      },
      {
        title: "Finished basements",
        text: "Finished basements raise the stakes on water heater leaks and drain backups, so preventive service pays off.",
      },
    ],
    faqs: [
      {
        q: "Should I replace my water heater before it fails?",
        a: "If it's around 10 years old and sits in a finished basement, planned replacement is often cheaper than dealing with a leak.",
      },
    ],
  },
  {
    slug: "arvada-co",
    city: "Arvada",
    county: "Jefferson and Adams Counties",
    published: true,
    intro:
      "Arvada combines older homes around Olde Town with mid-century and newer neighborhoods further out. Zenith provides plumbing, sewer, drain, water heater and HVAC services across Arvada.",
    localNotes: [
      {
        title: "Older homes near Olde Town",
        text: "Older homes may have original sewer laterals and drain lines that benefit from inspection before problems start.",
      },
      {
        title: "Drain and sewer maintenance",
        text: "If roots are a recurring problem, regular main line cleaning or a targeted repair can prevent surprise backups.",
      },
      {
        title: "Comfort upgrades",
        text: "Many Arvada homeowners are upgrading to more efficient heating and cooling as older systems age out.",
      },
    ],
    faqs: [
      {
        q: "Do you offer main line drain cleaning in Arvada?",
        a: "Yes, along with camera inspection to find the cause of recurring clogs.",
      },
    ],
  },
  {
    slug: "westminster-co",
    city: "Westminster",
    county: "Adams and Jefferson Counties",
    published: true,
    intro:
      "Westminster's mix of 1960s–80s neighborhoods and newer developments means plumbing and HVAC needs vary from street to street. Zenith serves Westminster homeowners with repair, replacement and maintenance.",
    localNotes: [
      {
        title: "Aging drain and sewer lines",
        text: "Homes built in the 1960s–80s can have sewer lines with root intrusion or settled sections. Camera inspection takes the guesswork out.",
      },
      {
        title: "Water heater replacement",
        text: "We replace gas and electric tank water heaters and install tankless systems sized for your home.",
      },
      {
        title: "Year-round comfort",
        text: "From AC repair in summer to furnace service in winter, we keep Westminster homes comfortable through every season.",
      },
    ],
    faqs: [
      {
        q: "Can you tell me if my sewer line needs replacement?",
        a: "Yes. A camera inspection shows the condition of the line so we can recommend a repair, a replacement or simply maintenance.",
      },
    ],
  },
  {
    slug: "thornton-co",
    city: "Thornton",
    county: "Adams County",
    published: true,
    intro:
      "Thornton has grown quickly, and many of its homes were built in the last few decades. Zenith helps Thornton homeowners keep water heaters, HVAC systems and plumbing running well as original equipment ages.",
    localNotes: [
      {
        title: "Original equipment reaching mid-life",
        text: "In newer neighborhoods, builder-installed water heaters and air conditioners are often the first systems due for repair or replacement.",
      },
      {
        title: "Maintenance that pays off",
        text: "Seasonal AC and furnace tune-ups help newer systems last and catch small issues early.",
      },
      {
        title: "Drain cleaning",
        text: "Kitchen and bathroom drain clogs are the most common plumbing calls in newer homes — and usually quick to solve.",
      },
    ],
    faqs: [
      {
        q: "My home is fairly new — do I still need HVAC maintenance?",
        a: "Yes. Annual maintenance keeps warranties in good standing for many manufacturers and catches small problems before they become big ones.",
      },
    ],
  },
  {
    slug: "longmont-co",
    city: "Longmont",
    county: "Boulder and Weld Counties",
    published: true,
    intro:
      "Longmont's older homes near downtown and its newer neighborhoods each bring different plumbing and HVAC needs. Zenith provides plumbing, sewer, drain, water heater and HVAC service in Longmont.",
    localNotes: [
      {
        title: "Historic homes, historic pipes",
        text: "Older homes near downtown may have aging sewer laterals and supply lines that benefit from inspection.",
      },
      {
        title: "Heating for northern Front Range winters",
        text: "A fall furnace or heat pump tune-up helps your system handle cold snaps without surprises.",
      },
      {
        title: "Water heater options",
        text: "From like-for-like tank replacement to tankless upgrades, we help you choose the right fit.",
      },
    ],
    faqs: [
      {
        q: "Do you install tankless water heaters in Longmont?",
        a: "Yes. We'll check your gas line and venting and size a unit for your household.",
      },
    ],
  },
  {
    slug: "boulder-co",
    city: "Boulder",
    county: "Boulder County",
    published: true,
    intro:
      "Boulder homeowners often care as much about efficiency as reliability. Zenith provides plumbing, sewer and drain service plus HVAC solutions — including heat pumps — for Boulder homes.",
    localNotes: [
      {
        title: "Interest in electrification",
        text: "Many Boulder homeowners are exploring heat pumps and heat pump water heaters. We'll help you compare options for your home.",
      },
      {
        title: "Older homes near downtown",
        text: "Older houses may have aging sewer laterals and drain lines that benefit from a camera inspection.",
      },
      {
        title: "Cold-weather readiness",
        text: "Freezing nights mean protecting exterior plumbing and keeping heating systems maintained.",
      },
    ],
    faqs: [
      {
        q: "Can you install a heat pump water heater in Boulder?",
        a: "Yes. We'll check the space, airflow and electrical requirements to make sure it's a good fit.",
      },
    ],
  },
];

export const publishedLocations = () => locations.filter((l) => l.published);
export const getLocation = (slug: string) => publishedLocations().find((l) => l.slug === slug);
