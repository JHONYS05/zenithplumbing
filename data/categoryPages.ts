/**
 * Extra long-form content for category landing pages (currently /plumbing).
 * Rendered by app/(site)/[slug]/page.tsx in addition to the existing sections.
 */
import type { Faq } from "./services";

export interface CategoryPageContent {
  subtitle?: string;
  ctaLabel?: string;
  /** Paragraphs shown right under the hero. */
  introParagraphs: string[];
  servicesHeading: string;
  servicesLead: string;
  services: { title: string; paragraphs: string[]; href?: string; linkLabel?: string }[];
  listSections: { heading: string; lead: string[]; items: string[]; outro?: string }[];
  split?: { heading: string; lead: string; items: { title: string; body: string }[] };
  why: { heading: string; lead: string; points: { title: string; body: string }[] };
  areas: { heading: string; lead: string; outro: string };
  faqHeading: string;
  faqs: (phone: string) => Faq[];
  cta: { title: string; text: string };
}

const plumbing: CategoryPageContent = {
  subtitle: "Reliable Plumbing Repair, Installation & Replacement",
  ctaLabel: "Request Plumbing Service",
  introParagraphs: [
    "When you need a reliable plumber in Denver, Colorado, Zenith is ready to help with residential plumbing repairs, installations and replacements. Your home's plumbing system plays an essential role in delivering clean water, maintaining proper water pressure and safely carrying wastewater away from your property.",
    "A leaking pipe, malfunctioning shut-off valve, damaged water line or failing plumbing fixture can cause inconvenience and potentially lead to costly water damage if left unaddressed.",
    "At Zenith Plumbing, Drain, Sewer & HVAC, we provide plumbing solutions designed to address common household plumbing problems and larger plumbing system needs. Our services include water line repair, pipe replacement, whole-house repiping, plumbing fixture installation, water pressure troubleshooting, leak detection and general plumbing repairs.",
    "Whether you are remodeling a bathroom, replacing old plumbing pipes, installing a new kitchen faucet or dealing with a sudden plumbing leak, we work to identify the source of the problem and explain the available solutions.",
    "We serve homeowners throughout Denver Metro and Northern Colorado, providing professional plumbing services for everyday repairs, home improvements and plumbing system upgrades.",
  ],
  servicesHeading: "Our Complete Plumbing Services",
  servicesLead: "Zenith offers a wide range of plumbing services to help homeowners maintain and improve their plumbing systems.",
  services: [
    {
      title: "Plumbing Repair",
      href: "/plumbing-repair",
      paragraphs: [
        "Plumbing problems can develop in pipes, connections, fixtures and water supply systems. We diagnose and repair common plumbing issues, including leaking pipes, damaged fittings, malfunctioning valves, running toilets and faulty faucets.",
        "We identify the problem and recommend an appropriate repair to restore normal plumbing operation.",
      ],
    },
    {
      title: "Water Line Repair & Replacement",
      href: "/pipe-repair",
      linkLabel: "Learn about pipe & water line repair",
      paragraphs: [
        "Water lines supply fresh water throughout your home. Damaged, corroded or leaking water lines can cause water pressure problems, moisture damage and interruptions to your water supply.",
        "Zenith provides water line troubleshooting, pipe repairs and water line replacement based on the condition and location of the damaged piping.",
      ],
    },
    {
      title: "Whole-House Repiping",
      paragraphs: [
        "Older or deteriorating plumbing systems may require replacement when leaks, corrosion or repeated pipe failures become an ongoing problem.",
        "Whole-house repiping involves replacing existing water supply pipes with new plumbing materials, such as PEX or copper, depending on the property's needs and applicable requirements.",
      ],
    },
    {
      title: "Faucet, Toilet & Fixture Installation",
      href: "/fixture-installation",
      paragraphs: [
        "Plumbing fixtures are essential to the everyday operation of kitchens, bathrooms and laundry areas.",
        "We provide faucet installation, toilet replacement, garbage disposal installation, hose bib replacement and other plumbing fixture services.",
      ],
    },
    {
      title: "Water Pressure & PRV Valve Services",
      paragraphs: [
        "High or low water pressure can affect plumbing fixtures, appliances and water supply piping.",
        "We troubleshoot water pressure problems and provide pressure reducing valve installation and replacement, main shut-off valve replacement and fixture stop valve repairs.",
      ],
    },
    {
      title: "Water Leak Detection & Repair",
      href: "/leak-detection",
      paragraphs: [
        "Hidden plumbing leaks can occur behind walls, beneath floors, inside ceilings and in crawl spaces.",
        "We help locate suspected leaks, inspect affected plumbing connections and perform appropriate repairs to address the source of the water loss.",
      ],
    },
    {
      title: "Shower & Bathtub Plumbing",
      paragraphs: [
        "Bathroom plumbing installation and repairs require properly connected water supply lines, drain assemblies and plumbing fixtures.",
        "We provide shower valve installation, bathtub plumbing connections, tub drain replacement, shower faucet repairs and plumbing work for bathroom remodeling projects.",
      ],
    },
    {
      title: "Pipe Installation & Replacement",
      href: "/pipe-repair",
      linkLabel: "Learn about pipe repair & replacement",
      paragraphs: [
        "New construction, remodeling and plumbing upgrades may require new water supply piping.",
        "We provide pipe installation and replacement using appropriate plumbing materials, including PEX and copper, depending on the project requirements.",
      ],
    },
  ],
  listSections: [
    {
      heading: "General Plumbing Services for Your Home",
      lead: [
        "General plumbing includes the repair, installation, replacement and maintenance of the water supply and plumbing fixtures throughout a property.",
        "At Zenith, general plumbing services cover many of the components homeowners depend on every day, including:",
      ],
      items: [
        "Kitchen and bathroom plumbing.",
        "Water supply lines and pipe connections.",
        "Faucets, sinks and toilets.",
        "Shower and bathtub plumbing.",
        "Main water shut-off valves.",
        "Pressure reducing valves.",
        "Plumbing fixture stop valves.",
        "Garbage disposals.",
        "Outdoor hose bibs.",
        "Plumbing repairs and upgrades.",
      ],
      outro: "Our goal is to help homeowners maintain properly functioning plumbing systems and address problems before they become more extensive.",
    },
    {
      heading: "Common Plumbing Problems We Solve",
      lead: [
        "Plumbing problems can occur unexpectedly or develop gradually over time. Some warning signs indicate that your plumbing system needs professional attention.",
        "Common plumbing issues include:",
      ],
      items: [
        "Leaking pipes or plumbing connections.",
        "Low or inconsistent water pressure.",
        "High water pressure.",
        "Running or constantly leaking toilets.",
        "Dripping faucets.",
        "Damaged or corroded water lines.",
        "Frozen or burst pipes.",
        "Water leaks inside walls or ceilings.",
        "Faulty shut-off valves.",
        "Slow or malfunctioning plumbing fixtures.",
      ],
      outro: "If you notice any of these issues, contact Zenith to discuss an inspection and the appropriate repair options.",
    },
  ],
  split: {
    heading: "Residential & Commercial Plumbing",
    lead: "Zenith provides plumbing solutions for residential properties and selected commercial plumbing projects.",
    items: [
      {
        title: "Residential Plumbing",
        body: "Our residential plumbing services include everyday plumbing repairs, bathroom and kitchen fixture installation, water line replacement, repiping, plumbing upgrades and leak repairs.",
      },
      {
        title: "Commercial Plumbing",
        body: "Commercial plumbing systems require appropriate installation, repair and maintenance to support the needs of businesses and commercial properties. Contact our team to discuss your project's requirements and service availability.",
      },
    ],
  },
  why: {
    heading: "Why Choose Zenith for Plumbing Services?",
    lead: "Choosing a plumbing contractor is an important decision. At Zenith, we focus on professional service, clear communication and practical solutions.",
    points: [
      { title: "Problem Diagnosis", body: "We work to identify the source of plumbing problems before recommending a repair or replacement." },
      { title: "Clear Estimates", body: "We explain the proposed work and pricing before beginning an authorized project." },
      { title: "Complete Plumbing Solutions", body: "From a simple faucet repair to a complete whole-house repipe, we handle a variety of residential plumbing needs." },
      { title: "Respect for Your Home", body: "We take precautions to protect work areas and maintain a clean and organized jobsite." },
      { title: "Multiple Home Services", body: "In addition to plumbing, Zenith provides drain cleaning, sewer, water heater and HVAC services." },
    ],
  },
  areas: {
    heading: "Plumbing Services Throughout Denver Metro & Northern Colorado",
    lead: "Zenith provides plumbing services throughout the Colorado Front Range, including the following communities:",
    outro: "Whether you need plumbing repairs, pipe installation, water line replacement or a plumbing system upgrade, contact Zenith to confirm service availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About Plumbing Services",
  faqs: (phone) => [
    { q: "What is included in general plumbing services?", a: "General plumbing includes water line repairs, pipe installation, plumbing fixture replacement, faucet and toilet repairs, leak detection, water pressure troubleshooting, valve replacement and other everyday plumbing needs." },
    { q: "How do I know if I need a plumber?", a: "Signs include leaking pipes, low water pressure, dripping faucets, running toilets, water stains, damaged pipes and plumbing fixtures that are not working properly. A professional inspection can help identify the cause." },
    { q: "Does Zenith offer residential plumbing repair in Denver?", a: "Yes. Zenith provides residential plumbing repairs throughout its Denver Metro service area, subject to appointment and service availability." },
    { q: "Can you replace the water pipes throughout my entire house?", a: "Yes. Whole-house repiping replaces existing water supply pipes with new piping, such as PEX or copper. The recommended material and scope depend on your home and plumbing configuration." },
    { q: "What causes low water pressure in a house?", a: "Low water pressure can result from leaking pipes, partially closed valves, mineral buildup, plumbing restrictions, faulty pressure regulators or problems with the water supply." },
    { q: "What is a pressure reducing valve?", a: "A pressure reducing valve, commonly called a PRV, regulates incoming water pressure to help protect a home's plumbing system and fixtures from excessive pressure." },
    { q: "Do you install new toilets and faucets?", a: "Yes. Zenith provides plumbing fixture installation and replacement, including toilets, faucets, sinks and other residential plumbing fixtures." },
    { q: "Can you repair leaking pipes inside walls?", a: "Yes. We provide leak detection and plumbing leak repairs. The repair process depends on the location of the leak, pipe material and accessibility." },
    { q: "Do you provide emergency plumbing services?", a: `Zenith offers emergency plumbing services for urgent problems such as burst pipes and active leaks. Call ${phone} to confirm current availability.` },
    { q: "What areas does Zenith serve?", a: "Our service areas include Denver, Aurora, Lakewood, Littleton, Centennial, Arvada, Westminster, Thornton, Longmont and Boulder, subject to service availability." },
    { q: "Do you provide plumbing estimates before starting work?", a: "Yes. We explain the recommended scope of work and pricing before beginning an authorized repair or installation." },
    { q: "How can I schedule a plumbing service?", a: `Call Zenith at ${phone} or submit a service request through our website.` },
  ],
  cta: {
    title: "Schedule Professional Plumbing Service Today",
    text: "Whether you need plumbing repairs, a new water line, fixture installation, leak detection or whole-house repiping, Zenith is ready to discuss your project. Get professional plumbing service throughout Denver Metro and Northern Colorado.",
  },
};

export const categoryPageContent: Record<string, CategoryPageContent> = { plumbing };
