/**
 * Homepage wording. Anything set in Admin → Pages → Homepage overrides these.
 * Shared by the homepage, the admin's placeholders and the site-wide default title.
 */
export const HOME = {
  title: "Plumber Denver CO | Drain, Sewer & HVAC | Zenith",
  description:
    "Looking for plumbing, drain cleaning, sewer repair or HVAC services in Denver, CO? Zenith serves the Denver Metro and Northern Colorado. Call today for professional home services.",
  eyebrow: "Plumbing · Drain · Sewer · HVAC",
  h1: "Colorado's Trusted Plumbing, Drain, Sewer & HVAC Professionals",
  subtitle: "Professional Home Services Across Denver Metro & Northern Colorado",
  intro:
    "From plumbing repairs and drain cleaning to complete sewer replacements and HVAC installations, Zenith delivers dependable home services with professional workmanship.",
  keywords: [
    "plumber Denver CO",
    "plumbing company Denver",
    "drain cleaning Denver",
    "sewer repair Denver",
    "HVAC company Denver",
    "water heater replacement Denver",
  ],
};

/** Phone-aware meta description (falls back to HOME.description when no real phone is set). */
export function homeDescription(phone?: string) {
  return phone
    ? `Zenith provides professional plumbing, drain cleaning, sewer repair, water heater and HVAC services in Denver Metro and Northern Colorado. Call ${phone} to schedule service.`
    : HOME.description;
}

export const HOME_OG = {
  title: "Zenith Plumbing, Drain, Sewer & HVAC | Colorado",
  description:
    "Professional plumbing, drain, sewer and HVAC services for homeowners across Denver Metro and Northern Colorado.",
};

export const HOME_KEYWORDS_EXTRA = [
  "plumbing and HVAC services Denver CO",
  "plumber Denver Colorado",
  "sewer line replacement Denver",
  "water heater installation Denver",
  "HVAC repair Denver",
  "furnace repair Denver",
  "AC repair Denver",
  "plumbing services Northern Colorado",
];

export const HOME_INTRO = {
  heading: "Professional Plumbing & HVAC Services in Denver, Colorado",
  lead: "When your home needs plumbing, drain, sewer or heating and cooling services, you want a company that understands the problem and provides the right solution.",
  paragraphs: [
    "Zenith Plumbing, Drain, Sewer & HVAC provides residential home services throughout Denver Metro and Northern Colorado. Our services include plumbing repairs, water line replacement, drain cleaning, hydro jetting, sewer line repair and replacement, water heater services, air conditioning repair and furnace installation.",
    "Whether you are dealing with a leaking pipe, a clogged kitchen drain, a backed-up sewer line, a failing water heater or an HVAC system that isn't working properly, our team is ready to help.",
    "We believe in identifying the source of the problem, explaining available repair options and providing clear pricing before work begins. Our goal is to deliver dependable service, quality workmanship and a professional experience from the initial appointment through project completion.",
    "Contact Zenith to schedule plumbing, sewer, drain or HVAC service in the Colorado Front Range.",
  ],
};

export const HOME_SERVICES = {
  heading: "Complete Home Plumbing, Drain, Sewer & HVAC Services",
  lead: "Zenith offers a comprehensive range of residential services to help homeowners maintain, repair and improve their properties.",
  items: [
    {
      title: "Plumbing Services",
      href: "/plumbing",
      icon: "wrench",
      body: "Professional plumbing repair, installation and replacement for residential properties.",
      bullets: [
        "Water line repair and replacement",
        "Pipe installation and whole-house repiping",
        "Faucet and toilet repair",
        "Shower and bathtub plumbing",
        "Leak detection and repair",
        "Water pressure and shut-off valves",
      ],
    },
    {
      title: "Drain Cleaning Services",
      href: "/drain-cleaning",
      icon: "drain",
      body: "Solutions for clogged drains, slow drainage and recurring blockages.",
      bullets: [
        "Kitchen drain cleaning",
        "Bathroom drain cleaning",
        "Main sewer drain cleaning",
        "Hydro jetting",
        "Drain camera inspections",
        "Clogged drain repair",
      ],
    },
    {
      title: "Sewer Line Repair & Replacement",
      href: "/sewer",
      icon: "pipe",
      body: "Sewer solutions for damaged, broken, leaking and deteriorating underground sewer pipes.",
      bullets: [
        "Sewer line repair",
        "Complete sewer replacement",
        "Trenchless sewer repair",
        "Sewer camera inspection",
        "Sewer cleanout installation",
        "Underground sewer pipe installation",
      ],
    },
    {
      title: "Water Heater Services",
      href: "/water-heaters",
      icon: "flame",
      body: "Water heater repair, installation and replacement for dependable hot water.",
      bullets: [
        "Traditional tank water heaters",
        "Tankless water heaters",
        "Water heater repair",
        "Water heater replacement",
        "New water heater installation",
      ],
    },
    {
      title: "Heating & Air Conditioning Services",
      href: "/hvac",
      icon: "fan",
      body: "Residential HVAC solutions to help keep your home comfortable throughout Colorado's changing seasons.",
      bullets: [
        "AC repair and installation",
        "Furnace repair and installation",
        "Heating system maintenance",
        "Heat pump installation and repair",
        "HVAC system maintenance",
      ],
    },
  ],
} as const;

export const HOME_WHY = {
  heading: "Why Choose Zenith Plumbing, Drain, Sewer & HVAC?",
  lead: "Choosing the right home service contractor matters. At Zenith, we focus on providing a professional experience and practical solutions for your home.",
  points: [
    { title: "Accurate Problem Diagnosis", body: "We work to identify the underlying cause of plumbing, drain, sewer and HVAC problems before recommending repairs." },
    { title: "Clear Estimates and Pricing", body: "We explain the recommended work and available options so you understand the project before work begins." },
    { title: "Comprehensive Home Services", body: "From everyday plumbing repairs to major sewer replacements and HVAC installations, Zenith offers multiple home services through one company." },
    { title: "Professional Workmanship", body: "We focus on quality installations, proper repair methods and attention to detail." },
    { title: "Respect for Your Property", body: "We take care to protect work areas, maintain a clean jobsite and treat your home with respect." },
  ],
};

export const HOME_SEWER = {
  heading: "Professional Drain Cleaning & Sewer Replacement in Denver",
  paragraphs: [
    "Drain and sewer problems can interrupt your entire household. Slow drains, recurring clogs, sewer odors and wastewater backups can indicate an issue that needs professional attention.",
    "Zenith provides drain cleaning, hydro jetting, sewer camera inspections, sewer line repairs and complete sewer replacements.",
    "When necessary, we use camera inspections to help identify blockages, pipe damage, root intrusion and other sewer line problems. Based on the condition of the existing pipe, we explain possible repair or replacement solutions.",
    "From smaller drain cleaning services to extensive underground sewer excavation and replacement projects, we help homeowners understand their options.",
  ],
  links: [
    { label: "Drain Cleaning", href: "/drain-cleaning" },
    { label: "Hydro Jetting", href: "/hydro-jetting" },
    { label: "Sewer Camera Inspection", href: "/sewer-camera-inspection" },
    { label: "Sewer Repair", href: "/sewer-repair" },
    { label: "Sewer Replacement", href: "/sewer-replacement" },
  ],
};

export const HOME_AREAS = {
  heading: "Serving Denver Metro & Northern Colorado",
  lead: "Zenith provides plumbing, drain cleaning, sewer and HVAC services throughout the Colorado Front Range.",
  denverMetro: ["Denver", "Aurora", "Lakewood", "Littleton", "Centennial", "Arvada", "Westminster", "Thornton"],
};

export const HOME_PROCESS = {
  heading: "A Straightforward Home Service Experience",
  steps: [
    { title: "Contact Zenith", body: "Tell us about your plumbing, drain, sewer or HVAC issue." },
    { title: "Schedule an appointment", body: "Arrange a service visit." },
    { title: "Inspect and diagnose", body: "Identify the problem and determine the appropriate solution." },
    { title: "Review your estimate", body: "Understand the scope of work and pricing before authorizing the job." },
    { title: "Complete the work", body: "Our team performs the approved service and reviews the completed work with you." },
  ],
};

export function homeFaqs(phone: string) {
  return [
    { q: "What plumbing services does Zenith provide?", a: "Zenith provides residential plumbing repairs, water line repair and replacement, pipe installation, whole-house repiping, faucet and toilet installation, leak detection, water pressure repairs and other plumbing services." },
    { q: "Does Zenith offer emergency plumbing services?", a: `Zenith lists emergency plumbing services. Contact the company at ${phone} to confirm current emergency availability and scheduling.` },
    { q: "Does Zenith provide drain cleaning in Denver?", a: "Yes. Drain cleaning services include kitchen and bathroom drain cleaning, main line drain cleaning, clogged drain repair, hydro jetting and sewer camera inspections." },
    { q: "Does Zenith replace sewer lines?", a: "Yes. Zenith offers sewer line repair, full sewer replacement, sewer inspections and cleanout installation. The recommended solution depends on the pipe's condition, depth, accessibility and property conditions." },
    { q: "Does Zenith install and replace water heaters?", a: "Yes. Zenith provides water heater repair, installation and replacement, including traditional tank and tankless water heater systems." },
    { q: "Does Zenith provide AC and furnace repair?", a: "Yes. Zenith offers residential air conditioning repair, AC installation, furnace repair, furnace installation and heating maintenance." },
    { q: "What areas does Zenith serve?", a: "Zenith serves Denver Metro and selected Northern Colorado communities, including Denver, Aurora, Lakewood, Littleton, Centennial, Longmont and Boulder." },
    { q: "How can I schedule service with Zenith?", a: `Call ${phone} or use the online booking option on our website to request service.` },
  ];
}

export const HOME_CTA = {
  title: "Need Professional Plumbing, Sewer or HVAC Service?",
  text: "Let Zenith help you find the right solution for your home. Contact our team for professional service throughout Denver Metro and Northern Colorado.",
};
