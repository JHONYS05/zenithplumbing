/**
 * Extra long-form content for category landing pages (currently /plumbing).
 * Rendered by app/(site)/[slug]/page.tsx in addition to the existing sections.
 */
import type { Faq } from "./services";

export interface CategoryPageContent {
  subtitle?: string;
  ctaLabel?: string;
  /** Open Graph (link preview) title/description, when different from the SEO title. */
  og?: { title: string; description: string };
  /** Optional heading + subheading above the intro paragraphs. */
  introHeading?: string;
  introSubheading?: string;
  /** Paragraphs shown right under the hero. */
  introParagraphs: string[];
  servicesHeading: string;
  servicesLead: string;
  services: {
    title: string;
    paragraphs: string[];
    bulletsLead?: string;
    bullets?: string[];
    outro?: string[];
    href?: string;
    linkLabel?: string;
  }[];
  relatedLinks?: { label: string; href: string }[];
  listSections?: { heading: string; lead: string[]; items: string[]; outro?: string }[];
  signs?: { heading: string; lead: string[]; items: { title: string; body: string }[]; outro?: string };
  process?: { heading: string; lead: string; steps: { title: string; body: string }[]; outro?: string };
  split?: { heading: string; lead: string; items: { title: string; body: string }[] };
  why: { heading: string; lead: string; points: { title: string; body: string }[] };
  areas: { heading: string; lead: string; outro: string };
  faqHeading: string;
  faqs: (phone: string) => Faq[];
  /** Existing category FAQs to hide because the longer list already answers them. */
  replacesFaqs?: string[];
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
  replacesFaqs: ["Do you give pricing before starting work?"],
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

const drainCleaning: CategoryPageContent = {
  subtitle: "Clear Clogged Drains. Restore Proper Drainage.",
  ctaLabel: "Book Drain Cleaning",
  og: {
    title: "Professional Drain Cleaning Services | Zenith Colorado",
    description:
      "Professional drain cleaning, clogged drain repair, hydro jetting and main line cleaning throughout Denver Metro and Northern Colorado.",
  },
  introHeading: "Professional Drain Cleaning Services in Denver, Colorado",
  introSubheading: "Reliable Drain Cleaning, Clogged Drain Repair & Hydro Jetting",
  introParagraphs: [
    "A clogged drain can quickly become a frustrating problem for any homeowner. Whether your kitchen sink is draining slowly, your bathroom shower is backing up, or multiple drains throughout your home are experiencing problems, finding the source of the blockage is essential.",
    "Zenith Plumbing, Drain, Sewer & HVAC provides professional drain cleaning services throughout Denver Metro and Northern Colorado. We help homeowners address clogged drains, slow drainage, grease buildup, recurring blockages and main sewer line obstructions.",
    "Our drain cleaning services include kitchen drain cleaning, bathroom drain cleaning, main line drain cleaning, clogged drain repair, hydro jetting and sewer camera inspections.",
    "Every drain problem is different. Our approach focuses on understanding the type of blockage, identifying its location and selecting an appropriate cleaning method for your plumbing system.",
    "Whether you need a routine drain cleaning service or help with a recurring drainage problem, contact Zenith to discuss your needs and schedule service.",
  ],
  servicesHeading: "Complete Drain Cleaning Services",
  servicesLead: "Zenith provides drain cleaning solutions for kitchens, bathrooms, laundry areas and main sewer lines.",
  services: [
    {
      title: "Clogged Drain Repair",
      href: "/clogged-drain-repair",
      linkLabel: "Clogged Drain Repair",
      paragraphs: [
        "A clogged drain can develop from accumulated grease, soap residue, hair, food particles, foreign objects and other debris inside your plumbing pipes.",
        "When water drains slowly or stops flowing completely, professional drain cleaning can help remove the obstruction and restore proper drainage.",
      ],
      bulletsLead: "We help homeowners address:",
      bullets: [
        "Slow-draining sinks",
        "Completely clogged drains",
        "Recurring drain blockages",
        "Standing water in sinks and tubs",
        "Clogged household drain pipes",
        "Drainage problems caused by accumulated debris",
      ],
      outro: ["Our goal is to identify the blockage and recommend the appropriate cleaning or repair solution."],
    },
    {
      title: "Kitchen Drain Cleaning",
      href: "/kitchen-drain-cleaning",
      linkLabel: "Kitchen Drain Cleaning",
      paragraphs: [
        "Kitchen drains frequently become clogged due to grease, cooking oils, food particles, soap residue and other materials entering the drain.",
        "Over time, these materials can accumulate inside the drain piping, restricting water flow and causing unpleasant odors.",
      ],
      bulletsLead: "Zenith provides kitchen drain cleaning to address:",
      bullets: [
        "Clogged kitchen sinks",
        "Slow-draining kitchen drains",
        "Grease buildup inside drain pipes",
        "Food debris blockages",
        "Garbage disposal drainage problems",
        "Recurring kitchen sink clogs",
      ],
      outro: ["Professional drain cleaning helps remove accumulated obstructions and restore normal kitchen drainage."],
    },
    {
      title: "Bathroom Drain Cleaning",
      href: "/bathroom-drain-cleaning",
      linkLabel: "Bathroom Drain Cleaning",
      paragraphs: [
        "Bathroom drains collect hair, soap residue, toothpaste, personal care products and other debris that can gradually restrict water flow.",
        "A clogged bathroom drain can affect sinks, bathtubs, showers and other plumbing fixtures.",
      ],
      bulletsLead: "Our bathroom drain cleaning services address:",
      bullets: [
        "Bathroom sink clogs",
        "Shower drain blockages",
        "Bathtub drain clogs",
        "Hair and soap buildup",
        "Slow-draining bathroom fixtures",
        "Recurring bathroom drainage problems",
      ],
      outro: [
        "If multiple bathroom fixtures are backing up simultaneously, the problem may extend beyond an individual fixture drain and require additional inspection.",
      ],
    },
    {
      title: "Main Sewer Line Drain Cleaning",
      href: "/main-line-drain-cleaning",
      linkLabel: "Main Sewer Line Cleaning",
      paragraphs: [
        "The main sewer line carries wastewater from your home's plumbing fixtures toward the municipal sewer connection or an approved onsite wastewater system.",
        "A blockage in this line can affect multiple plumbing fixtures throughout your property.",
      ],
      bulletsLead: "Common warning signs include:",
      bullets: [
        "Multiple drains backing up",
        "Toilets gurgling when other fixtures are used",
        "Water backing up into tubs or showers",
        "Basement floor drain backups",
        "Recurring sewer-related clogs",
        "Unusual drainage odors",
      ],
      outro: [
        "Zenith provides main line drain cleaning to address obstructions and help restore proper wastewater flow.",
        "If recurring blockages are caused by tree roots, damaged piping, pipe separation or a sagging sewer line, additional inspection and repair may be necessary.",
      ],
    },
    {
      title: "Hydro Jetting Services",
      href: "/hydro-jetting",
      linkLabel: "Professional Hydro Jetting",
      paragraphs: [
        "Hydro jetting is a professional drain cleaning method that uses specialized equipment to direct high-pressure water through plumbing pipes.",
        "This method can help remove stubborn grease, sludge, accumulated debris and certain root intrusions from suitable drain and sewer lines.",
      ],
      bulletsLead: "Hydro jetting may be recommended for:",
      bullets: [
        "Heavy grease accumulation",
        "Stubborn main line blockages",
        "Recurring drain clogs",
        "Sludge and debris buildup",
        "Certain sewer line obstructions",
      ],
      outro: [
        "Before hydro jetting, the condition and suitability of the piping should be evaluated. Older, damaged or deteriorated pipes may require a different cleaning method or repair.",
      ],
    },
    {
      title: "Sewer Camera Inspection",
      href: "/sewer-camera-inspection",
      linkLabel: "Sewer Camera Inspection",
      paragraphs: [
        "When a drain clog keeps coming back, simply removing the blockage may not address the underlying problem.",
        "A sewer camera inspection allows a plumbing professional to examine the inside of accessible drain and sewer piping.",
      ],
      bulletsLead: "Camera inspections can help identify:",
      bullets: [
        "Tree root intrusion",
        "Cracked or damaged pipes",
        "Pipe separation",
        "Grease and debris buildup",
        "Foreign objects",
        "Potential pipe bellies or sagging sections",
      ],
      outro: [
        "The inspection findings help determine whether additional cleaning, maintenance or sewer line repair may be appropriate.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Sewer Line Repair", href: "/sewer-repair" },
    { label: "Sewer Line Replacement", href: "/sewer-replacement" },
    { label: "Professional Plumbing Services", href: "/plumbing" },
  ],
  signs: {
    heading: "Signs You Need Professional Drain Cleaning",
    lead: [
      "Not every clogged drain is immediately obvious. In many cases, your plumbing system provides warning signs before a complete blockage develops.",
      "Look for these common symptoms:",
    ],
    items: [
      { title: "Slow Drainage", body: "Water takes longer than normal to drain from sinks, tubs or showers." },
      { title: "Recurring Clogs", body: "The same drain repeatedly becomes blocked after temporary clearing." },
      { title: "Unpleasant Drain Odors", body: "Accumulated debris and organic material can produce unpleasant smells near plumbing fixtures." },
      { title: "Gurgling Sounds", body: "Bubbling or gurgling noises can indicate trapped air or drainage restrictions." },
      { title: "Multiple Backed-Up Fixtures", body: "When several drains experience problems at the same time, the main sewer line may be affected." },
      { title: "Water Backups", body: "Wastewater backing up into a bathtub, shower or floor drain can indicate a more serious blockage." },
    ],
    outro: "If you notice sewage backing up, stop using affected fixtures and arrange a professional inspection.",
  },
  process: {
    heading: "Our Drain Cleaning Process",
    lead: "At Zenith, we focus on identifying the problem before recommending a cleaning method.",
    steps: [
      { title: "Identify the Drainage Problem", body: "We discuss the symptoms, affected fixtures and history of recurring clogs to understand the situation." },
      { title: "Inspect the Drain System", body: "We evaluate the affected plumbing and determine whether the problem appears to be within an individual fixture drain, branch line or main sewer line." },
      { title: "Recommend the Appropriate Cleaning Method", body: "Depending on the blockage and pipe condition, we may recommend professional drain cleaning equipment, mechanical clearing, hydro jetting or camera inspection." },
      { title: "Clear the Blockage", body: "We perform the approved drain cleaning service using an appropriate method for the accessible piping and condition of the system." },
      { title: "Check Drainage Performance", body: "Where practical, we check the affected fixture or drain to help confirm that water is flowing properly after service." },
    ],
    outro: "If inspection reveals damaged or deteriorated piping, we explain the findings and discuss possible next steps.",
  },
  why: {
    heading: "Why Choose Zenith for Drain Cleaning?",
    lead: "Choosing the right drain cleaning company matters, especially when recurring clogs may indicate a larger plumbing problem.",
    points: [
      { title: "Diagnosis Before Recommendations", body: "We focus on understanding the cause of the blockage before recommending additional work." },
      { title: "Professional Cleaning Solutions", body: "We use appropriate drain cleaning methods based on the type of obstruction and condition of the piping." },
      { title: "Clear Pricing", body: "We explain the recommended service and pricing before beginning authorized work." },
      { title: "Residential Plumbing Experience", body: "We handle a variety of residential plumbing and drainage problems, from individual fixture clogs to main line drainage issues." },
      { title: "Complete Home Service Solutions", body: "In addition to drain cleaning, Zenith provides plumbing, sewer, water heater and HVAC services." },
      { title: "Respect for Your Property", body: "We take precautions to protect the work area and leave the jobsite clean and orderly." },
    ],
  },
  areas: {
    heading: "Residential Drain Cleaning Throughout Denver Metro & Northern Colorado",
    lead: "Zenith provides drain cleaning services throughout the Colorado Front Range, including:",
    outro: "Whether you have a clogged kitchen sink, a backed-up bathroom drain or a recurring main sewer line blockage, contact Zenith to confirm service availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About Drain Cleaning",
  replacesFaqs: ["How do I know if it's one drain or my main line?"],
  faqs: (phone) => [
    { q: "How much does professional drain cleaning cost?", a: "The cost depends on the location of the clog, the severity of the blockage, accessibility and the equipment required. Zenith offers $69 drain cleaning when there is an accessible cleanout. Ask us about the full offer terms and any additional charges when you schedule." },
    { q: "What causes drains to become clogged?", a: "Common causes include grease, food particles, hair, soap residue, foreign objects, mineral buildup and tree roots entering damaged sewer pipes." },
    { q: "How do I know if my main sewer line is clogged?", a: "Several slow or backed-up drains, gurgling toilets and wastewater appearing in tubs or floor drains can indicate a main sewer line blockage." },
    { q: "What is the difference between drain cleaning and hydro jetting?", a: "Standard drain cleaning may use mechanical equipment to break up or remove a blockage. Hydro jetting uses specialized high-pressure water equipment to clean suitable pipe interiors and remove accumulated buildup." },
    { q: "Is hydro jetting safe for all pipes?", a: "No. Pipe material, condition, age and existing damage must be considered before hydro jetting. A professional evaluation helps determine whether the method is appropriate." },
    { q: "How often should drains be professionally cleaned?", a: "There is no single schedule for every property. Cleaning frequency depends on usage, pipe condition, the history of recurring clogs and the type of plumbing system." },
    { q: "Can a camera inspection identify recurring drain problems?", a: "Yes. A sewer camera can help identify root intrusion, pipe damage, separation, buildup and other visible conditions inside accessible piping." },
    { q: "Why does my kitchen sink keep clogging?", a: "Grease, cooking oil, food particles and soap residue can accumulate inside kitchen drain pipes. Repeated clogs may require a more thorough cleaning or inspection." },
    { q: "What should I do if my drains are backing up?", a: "Stop using affected fixtures, especially if wastewater is backing up into tubs or floor drains. Contact a professional plumber to investigate the source of the blockage." },
    { q: "Does Zenith provide emergency drain cleaning?", a: `Contact Zenith at ${phone} to confirm emergency service availability and scheduling for your drainage problem.` },
    { q: "What areas does Zenith serve for drain cleaning?", a: "Zenith serves Denver Metro and selected Northern Colorado communities, including Denver, Aurora, Lakewood, Littleton, Centennial, Arvada, Westminster, Thornton, Longmont and Boulder." },
    { q: "How can I schedule drain cleaning with Zenith?", a: `Call ${phone} or use the online booking form on our website to request drain cleaning service.` },
  ],
  cta: {
    title: "Schedule Professional Drain Cleaning Today",
    text: "Don't let a clogged drain disrupt your home. Whether you need kitchen drain cleaning, bathroom drain cleaning, main sewer line cleaning, hydro jetting or a camera inspection, Zenith is ready to help throughout Denver Metro and Northern Colorado.",
  },
};

export const categoryPageContent: Record<string, CategoryPageContent> = {
  plumbing,
  "drain-cleaning": drainCleaning,
};
