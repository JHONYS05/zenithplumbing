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
  causes?: { heading: string; lead: string; items: { title: string; body: string }[] };
  equipment?: { heading: string; lead: string; items: CategoryPageContent["services"] };
  compare?: { heading: string; lead: string; columns: { heading: string; items: string[] }[]; outro?: string };
  materials?: { heading: string; lead: string; items: { title: string; body: string }[]; outro?: string };
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

const sewer: CategoryPageContent = {
  introHeading: "Sewer Line Repair, Replacement & Inspection Across Denver Metro",
  introParagraphs: [
    "Zenith Plumbing, Drain, Sewer & HVAC provides professional sewer line repair, sewer line replacement, sewer inspections, trenchless sewer solutions, and sewer cleanout installation throughout Denver Metro and Northern Colorado.",
    "Our approach starts with understanding the condition of your sewer line. We evaluate the problem, explain the available solutions, and provide clear pricing before work begins.",
  ],
  servicesHeading: "Complete Sewer Services",
  servicesLead:
    "Zenith provides sewer solutions for homeowners and residential properties dealing with damaged, aging, or failing sewer lines. Whether you need a localized repair or a complete sewer line replacement, we help identify the right approach for your property's conditions.",
  services: [
    {
      title: "Sewer Line Repair",
      href: "/sewer-repair",
      linkLabel: "Sewer Line Repair",
      paragraphs: [
        "A damaged sewer pipe does not always require a complete replacement. Depending on the location and condition of the damage, a targeted sewer line repair may be a practical solution.",
      ],
      bulletsLead: "Our sewer repair services can address:",
      bullets: [
        "Cracked or broken sewer pipes",
        "Leaking underground sewer lines",
        "Separated or misaligned pipe connections",
        "Root intrusion",
        "Damaged pipe sections",
        "Recurring sewer problems",
        "Localized pipe deterioration",
      ],
      outro: ["We evaluate the damaged section and explain the repair options before beginning work."],
    },
    {
      title: "Sewer Line Replacement",
      href: "/sewer-replacement",
      linkLabel: "Sewer Line Replacement",
      paragraphs: [
        "When a sewer line has extensive damage, severe deterioration, repeated failures, or multiple compromised sections, replacing the existing pipe may be the best long-term solution.",
        "Zenith provides sewer line replacement services designed to restore reliable wastewater drainage from your home to the approved connection point.",
      ],
      bulletsLead: "Sewer replacement projects may include:",
      bullets: [
        "Locating and exposing the existing sewer line",
        "Excavation to access the damaged piping",
        "Removing deteriorated sewer pipe",
        "Installing new sewer piping",
        "Connecting the new pipe to the existing system",
        "Checking pipe alignment, slope, and connections",
        "Backfilling and site restoration as included in the approved scope",
      ],
      outro: [
        "Every project is different. Depth, pipe material, soil conditions, access, concrete, landscaping, and street work can affect the scope and cost.",
      ],
    },
    {
      title: "Trenchless Sewer Repair",
      href: "/trenchless-sewer-repair",
      linkLabel: "Trenchless Sewer Repair",
      paragraphs: [
        "Traditional sewer repairs may require excavation to access underground piping. When the existing sewer line and site conditions allow, trenchless methods may offer an alternative that reduces the amount of digging required.",
        "Trenchless sewer solutions may be appropriate for certain pipe conditions and configurations.",
        "Before recommending a trenchless method, we evaluate the pipe's condition, accessibility, layout, and suitability for the proposed repair.",
        "Not every sewer line qualifies for trenchless repair. We explain the available options based on the actual condition of the system.",
      ],
    },
    {
      title: "Sewer Line Inspection",
      href: "/sewer-line-inspection",
      linkLabel: "Sewer Line Inspection",
      paragraphs: [
        "A sewer camera inspection helps identify problems inside an underground sewer pipe without immediately excavating the entire line.",
      ],
      bulletsLead: "Camera inspections can help locate:",
      bullets: [
        "Cracks and breaks",
        "Root intrusion",
        "Pipe separation",
        "Standing water or improper slope",
        "Heavy buildup and obstructions",
        "Deteriorated pipe sections",
        "Potential structural problems",
      ],
      outro: [
        "A sewer inspection can help homeowners understand the condition of their sewer system before deciding whether cleaning, repair, or replacement is appropriate.",
      ],
    },
    {
      title: "Sewer Cleanout Installation",
      href: "/sewer-cleanout-installation",
      linkLabel: "Sewer Cleanout Installation",
      paragraphs: [
        "A sewer cleanout provides an accessible point for inspecting and servicing the main sewer line.",
        "If your property does not have an accessible cleanout, installing one may make future maintenance and sewer service easier.",
        "Our sewer cleanout installation services may include excavation, installation of approved fittings and piping, connection to the existing sewer line, and restoration according to the approved project scope.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Sewer Camera Inspection", href: "/sewer-camera-inspection" },
    { label: "Drain Cleaning", href: "/drain-cleaning" },
    { label: "Hydro Jetting", href: "/hydro-jetting" },
    { label: "Plumbing Services", href: "/plumbing" },
  ],
  signs: {
    heading: "Signs You May Need Sewer Line Repair or Replacement",
    lead: [
      "Sewer line problems can develop underground before obvious damage appears inside the home. Recognizing the warning signs early may help prevent more extensive repairs.",
      "Watch for:",
    ],
    items: [
      { title: "Frequent Sewer Backups", body: "Repeated backups may indicate a problem with the main sewer line rather than an isolated fixture drain." },
      { title: "Slow Drains Throughout the Home", body: "When multiple sinks, tubs, and toilets drain slowly, the main sewer system may need inspection." },
      { title: "Sewer Odors", body: "Persistent sewage smells may indicate a damaged pipe, drainage issue, or problem with the sewer system." },
      { title: "Unusual Yard Conditions", body: "Wet soil, sinking areas, or unusually green grass along the sewer route may indicate an underground leak." },
      { title: "Gurgling Toilets and Drains", body: "Bubbling or gurgling can occur when air is displaced by a drainage obstruction or other system problem." },
      { title: "Recurring Drain Problems", body: "If the same blockage keeps returning after cleaning, a camera inspection may help identify the underlying cause." },
    ],
  },
  process: {
    heading: "Our Sewer Service Process",
    lead: "We believe homeowners should understand the condition of their sewer line and the work being recommended.",
    steps: [
      { title: "Initial Evaluation", body: "We discuss the symptoms, location, and history of the sewer problem." },
      { title: "Sewer Inspection", body: "When appropriate, we use camera inspection or other diagnostic methods to evaluate the pipe." },
      { title: "Findings and Recommendations", body: "We explain what we find and discuss repair, replacement, or other suitable options." },
      { title: "Clear Project Pricing", body: "You receive the proposed scope and pricing before authorized work begins." },
      { title: "Professional Sewer Work", body: "Our team performs the approved repair or installation according to the project requirements and applicable codes." },
      { title: "Final Evaluation", body: "We check the completed work as appropriate and explain the results and any remaining recommendations." },
    ],
  },
  listSections: [
    {
      heading: "Main Sewer Line Problems",
      lead: [
        "The main sewer line carries wastewater away from your home. When this line becomes damaged or obstructed, multiple plumbing fixtures may be affected.",
        "Common warning signs include:",
      ],
      items: [
        "Multiple drains backing up at the same time",
        "Toilets bubbling or gurgling",
        "Sewage backing up into a shower or bathtub",
        "Strong sewer odors inside or outside the property",
        "Repeated main line blockages",
        "Wet or unusually green areas in the yard",
      ],
      outro: "If you notice these problems, professional evaluation can help determine whether the issue is a blockage, damaged pipe, root intrusion, or another sewer system problem.",
    },
    {
      heading: "What Affects the Cost of Sewer Line Repair or Replacement?",
      lead: [
        "Every sewer project has different conditions. The final cost depends on the work needed to safely access and restore the sewer system.",
        "Factors that may affect pricing include:",
      ],
      items: [
        "Total length of sewer pipe requiring repair or replacement",
        "Depth of the existing sewer line",
        "Soil conditions and excavation difficulty",
        "Pipe material, diameter, and condition",
        "Accessibility of the damaged section",
        "Concrete or flooring removal and replacement",
        "Landscaping, trees, and other obstacles",
        "Sidewalk, driveway, street, or asphalt restoration",
        "Permits, inspections, and applicable local requirements",
      ],
      outro: "After evaluating the project, Zenith can explain the recommended scope and provide a written estimate.",
    },
  ],
  why: {
    heading: "Why Choose Zenith Plumbing, Drain, Sewer & HVAC?",
    lead: "Sewer work is a major decision. Here's what you can expect from Zenith.",
    points: [
      { title: "Professional Evaluation", body: "We focus on identifying the actual cause of sewer problems before recommending work." },
      { title: "Clear Recommendations", body: "We explain the available options so you can make an informed decision." },
      { title: "Upfront Pricing", body: "We provide the proposed scope and price before work begins." },
      { title: "Complete Sewer Solutions", body: "From sewer inspections and cleanout installation to major sewer line repairs and replacements, we offer solutions for different project needs." },
      { title: "Respect for Your Property", body: "We take care to protect work areas and maintain an organized jobsite." },
      { title: "One Company for Your Home", body: "In addition to sewer services, Zenith provides plumbing, drain cleaning, water heater, heating, and air conditioning services." },
    ],
  },
  areas: {
    heading: "Sewer Services in Denver Metro & Northern Colorado",
    lead: "Zenith provides sewer line repair, sewer replacement, and inspection services throughout Denver Metro and Northern Colorado.",
    outro: "Contact our team to confirm availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About Sewer Services",
  replacesFaqs: ["How do I know if my sewer line is damaged?", "Who is responsible for the sewer line?"],
  faqs: () => [
    { q: "How do I know if my sewer line needs repair?", a: "Repeated sewer backups, multiple slow drains, sewer odors, gurgling toilets, and wet areas in your yard can indicate a sewer line problem. A professional evaluation and camera inspection can help identify the cause." },
    { q: "How much does sewer line replacement cost in Denver?", a: "The cost depends on the length and depth of the sewer line, excavation conditions, pipe material, access, and restoration requirements. Concrete, asphalt, landscaping, and street work can increase project costs. An on-site evaluation is the best way to determine an accurate estimate." },
    { q: "Is sewer line repair better than replacement?", a: "It depends on the pipe's condition. A localized repair may be suitable when the damage is limited to one section. Extensive deterioration, multiple damaged sections, or recurring failures may make replacement a better long-term option." },
    { q: "How long does sewer line replacement take?", a: "The timeline depends on the length, depth, accessibility, soil conditions, permits, inspections, and restoration work. Smaller projects may take less time than deep or complex replacements." },
    { q: "What is a sewer camera inspection?", a: "A sewer camera inspection uses a specialized camera to examine the inside of a sewer pipe. It helps identify cracks, roots, separations, obstructions, and other potential problems." },
    { q: "Can tree roots damage my sewer line?", a: "Yes. Tree roots can enter small openings or damaged joints in sewer pipes. As roots grow, they may restrict wastewater flow and contribute to pipe damage." },
    { q: "What is trenchless sewer repair?", a: "Trenchless sewer repair uses specialized methods to rehabilitate or replace certain underground sewer pipes while reducing the need for traditional excavation. Whether it is suitable depends on the pipe and property conditions." },
    { q: "Do I need a sewer cleanout?", a: "A sewer cleanout provides access to the main sewer line for inspection and maintenance. If your property lacks an accessible cleanout, installation may make future service easier." },
    { q: "Who is responsible for the sewer line between my house and the street?", a: "Responsibility varies by municipality and utility district. Homeowners are often responsible for at least part of the private sewer service line, but the exact boundary and requirements should be confirmed with the local sewer authority." },
    { q: "Do sewer repairs require a permit?", a: "Permit requirements depend on the location, type of work, and local authority. Zenith can discuss applicable project requirements during the estimate process." },
    { q: "Does Zenith provide sewer services in Aurora and Denver?", a: "Yes. Zenith serves Denver, Aurora, and other communities throughout its Denver Metro and Northern Colorado service area. Contact us to confirm service availability for your property." },
  ],
  cta: {
    title: "Schedule Sewer Line Service with Zenith",
    text: "Do not ignore recurring sewer backups, damaged underground piping, or signs of a failing sewer line. Contact Zenith for sewer line repair, sewer replacement, trenchless solutions, sewer inspections and cleanout installation throughout Denver Metro and Northern Colorado.",
  },
};

const hvac: CategoryPageContent = {
  introParagraphs: [
    "Zenith Plumbing, Drain, Sewer & HVAC provides professional heating and cooling services throughout Denver Metro and Northern Colorado. We help homeowners with air conditioning repair, AC installation, furnace repair, furnace replacement, heating maintenance, and heat pump services.",
    "Whether your system is making unusual noises, struggling to maintain comfortable temperatures, or approaching the end of its useful life, our team can evaluate the problem and explain your available options.",
  ],
  servicesHeading: "Complete Heating and Air Conditioning Services",
  servicesLead:
    "Zenith provides residential HVAC services to help keep your home comfortable throughout the year. We work with homeowners who need repairs, system installations, replacements, or routine maintenance.",
  services: [
    {
      title: "Air Conditioning Repair",
      href: "/ac-repair",
      linkLabel: "AC Repair",
      paragraphs: [
        "When your air conditioner is not cooling properly, the problem may involve airflow, electrical components, refrigerant-related issues, controls, or other system components.",
      ],
      bulletsLead: "Our AC repair service helps diagnose and address problems such as:",
      bullets: [
        "Air conditioner blowing warm or insufficiently cool air",
        "Weak airflow from vents",
        "AC system making unusual noises",
        "System frequently turning on and off",
        "Water leaking around the indoor unit",
        "Thermostat or temperature-control problems",
        "Air conditioner failing to start",
        "Uneven cooling throughout the home",
      ],
      outro: ["We evaluate the equipment and explain the recommended repair before proceeding."],
    },
    {
      title: "Air Conditioning Installation",
      href: "/ac-installation",
      linkLabel: "AC Installation",
      paragraphs: [
        "Installing a new air conditioning system is an important investment in your home's comfort. Proper equipment selection and installation help support reliable operation and efficient cooling.",
      ],
      bulletsLead: "Our AC installation service may include:",
      bullets: [
        "Evaluating the existing cooling system",
        "Reviewing the home's cooling requirements",
        "Discussing suitable equipment options",
        "Removing existing equipment when included in the project",
        "Installing the new air conditioning equipment",
        "Connecting required electrical, refrigerant, and drainage components",
        "Checking system operation after installation",
      ],
      outro: ["Equipment sizing, existing ductwork, electrical requirements, and installation conditions all affect the project scope."],
    },
    {
      title: "Air Conditioning Maintenance",
      href: "/ac-maintenance",
      linkLabel: "AC Maintenance",
      paragraphs: [
        "Regular air conditioning maintenance can help identify developing issues and prepare your cooling system for the summer season.",
      ],
      bulletsLead: "A maintenance visit may include:",
      bullets: [
        "Inspecting accessible system components",
        "Checking filters and airflow",
        "Inspecting the outdoor condenser",
        "Checking thermostat operation",
        "Inspecting accessible electrical connections",
        "Evaluating condensate drainage",
        "Checking system operation",
        "Identifying maintenance or repair recommendations",
      ],
      outro: ["The exact maintenance tasks depend on the equipment and manufacturer requirements."],
    },
    {
      title: "Heating Services",
      href: "/heating",
      linkLabel: "Heating Services",
      paragraphs: [
        "Colorado winters make dependable home heating essential. Zenith provides heating services to help homeowners maintain comfortable indoor temperatures during cold weather.",
        "Our heating services include furnace repair, furnace installation, heating maintenance, and heat pump services.",
        "Whether your heating system is not producing enough heat or needs replacement, we can evaluate its condition and discuss the appropriate next steps.",
      ],
    },
    {
      title: "Furnace Repair",
      href: "/furnace-repair",
      linkLabel: "Furnace Repair",
      paragraphs: [
        "A furnace that is not operating correctly can affect your home's comfort and may indicate a mechanical, electrical, airflow, ignition, or control problem.",
      ],
      bulletsLead: "Common furnace problems include:",
      bullets: [
        "Furnace not producing heat",
        "Furnace blowing cold air",
        "Furnace turning on and off frequently",
        "Unusual banging, rattling, or humming sounds",
        "Thermostat not controlling the temperature properly",
        "Weak airflow from heating vents",
        "Furnace failing to start",
        "Uneven heating between rooms",
      ],
      outro: [
        "Our team evaluates the system to identify the source of the problem and explain the repair options.",
        "If you smell gas or suspect carbon monoxide, leave the property and contact the appropriate emergency services or utility provider. Do not attempt to troubleshoot the equipment yourself.",
      ],
    },
    {
      title: "Furnace Installation and Replacement",
      href: "/furnace-installation",
      linkLabel: "Furnace Installation",
      paragraphs: [
        "If your existing furnace is aging, frequently breaking down, or no longer meeting your home's heating needs, replacing it may be worth considering.",
        "Zenith provides furnace installation and replacement services based on your home's heating requirements and existing system conditions.",
      ],
      bulletsLead: "A furnace replacement project may include:",
      bullets: [
        "Evaluating the existing furnace",
        "Reviewing heating capacity requirements",
        "Discussing equipment options",
        "Removing the existing furnace when included",
        "Installing the replacement equipment",
        "Connecting required system components",
        "Checking operation and controls",
        "Reviewing the completed installation",
      ],
      outro: [
        "The final installation scope depends on equipment selection, venting, gas and electrical connections, ductwork, permits, and applicable code requirements.",
      ],
    },
    {
      title: "Heating System Maintenance",
      href: "/heating-maintenance",
      linkLabel: "Heating Maintenance",
      paragraphs: [
        "Routine heating maintenance helps prepare your furnace or heating system for the colder months.",
        "A heating maintenance visit may include inspecting accessible components, checking system operation, reviewing airflow, inspecting the thermostat, and identifying potential service concerns.",
        "We recommend following the manufacturer's maintenance schedule and arranging a professional inspection before the heating season.",
      ],
    },
    {
      title: "Heat Pump Repair and Installation",
      href: "/heat-pump-repair",
      linkLabel: "Heat Pump Repair",
      paragraphs: [
        "Heat pumps provide heating and cooling using one system. They can be an option for homeowners looking for year-round comfort and an alternative to traditional heating and cooling arrangements.",
        "Zenith provides heat pump repair and installation services.",
      ],
      bulletsLead: "Heat pump problems may include:",
      bullets: [
        "Insufficient heating or cooling",
        "Unusual operating noises",
        "Airflow problems",
        "Defrost-cycle concerns",
        "Thermostat or control issues",
        "System failing to start",
        "Inconsistent indoor temperatures",
      ],
      outro: ["If you are considering a new heat pump, we can evaluate your home's requirements and discuss suitable system options."],
    },
  ],
  relatedLinks: [
    { label: "Heat Pump Installation", href: "/heat-pump-installation" },
    { label: "Water Heaters", href: "/water-heaters" },
    { label: "Plumbing Services", href: "/plumbing" },
    { label: "Service Areas", href: "/service-areas" },
  ],
  signs: {
    heading: "Signs Your HVAC System Needs Professional Service",
    lead: [
      "Heating and cooling problems can develop gradually. Addressing unusual system behavior early may help prevent additional equipment problems.",
      "Watch for these warning signs:",
    ],
    items: [
      { title: "Uneven Temperatures", body: "Some rooms are too hot or too cold while others remain comfortable." },
      { title: "Weak Airflow", body: "Reduced airflow may indicate a filter, ductwork, blower, or other system issue." },
      { title: "Unusual Noises", body: "Banging, rattling, buzzing, or grinding sounds should be evaluated." },
      { title: "Frequent Cycling", body: "A system that repeatedly starts and stops may have an equipment, airflow, control, or sizing issue." },
      { title: "Higher Energy Bills", body: "Unexpected increases in energy use may indicate reduced system performance or another issue." },
      { title: "System Not Reaching the Set Temperature", body: "If your HVAC system runs but cannot maintain the thermostat setting, it may need professional diagnosis." },
      { title: "Water Around Equipment", body: "Water near an indoor cooling unit may indicate a condensate drainage or other equipment problem." },
    ],
  },
  process: {
    heading: "Our HVAC Service Process",
    lead: "We want homeowners to understand what is happening with their heating or cooling system and what options are available.",
    steps: [
      { title: "Understand the Problem", body: "We discuss the symptoms, equipment, and service concerns." },
      { title: "Evaluate the System", body: "We inspect the relevant equipment and components." },
      { title: "Explain Our Findings", body: "We discuss the cause of the problem when it can be identified and explain the recommended work." },
      { title: "Provide Pricing", body: "You receive the proposed scope and price before authorized work begins." },
      { title: "Complete the Approved Work", body: "We perform the agreed repair, maintenance, or installation." },
      { title: "Review System Operation", body: "We check the work performed and explain any additional recommendations." },
    ],
  },
  listSections: [
    {
      heading: "What Affects HVAC Repair and Installation Costs?",
      lead: [
        "The cost of HVAC service depends on the equipment, the type of work, and the conditions at your property.",
        "Factors may include:",
      ],
      items: [
        "Type and size of the HVAC system",
        "Equipment age and condition",
        "Parts and components required",
        "Accessibility of the equipment",
        "Existing ductwork and airflow conditions",
        "Electrical requirements",
        "Gas connections and venting requirements",
        "Refrigerant system requirements",
        "Equipment efficiency and features",
        "Permit and inspection requirements",
        "Installation modifications and restoration",
      ],
      outro: "Zenith provides a project-specific estimate after evaluating the work needed.",
    },
  ],
  why: {
    heading: "Why Choose Zenith Plumbing, Drain, Sewer & HVAC?",
    lead: "Here's what you can expect when Zenith works on your heating or cooling system.",
    points: [
      { title: "Professional Evaluation", body: "We evaluate your system before recommending repairs or replacement." },
      { title: "Clear Options", body: "We explain the available solutions so you can make an informed decision." },
      { title: "Upfront Pricing", body: "You receive the proposed work and pricing before service begins." },
      { title: "Heating and Cooling Solutions", body: "From AC repairs to furnace replacements and heat pump installations, we provide a range of residential HVAC services." },
      { title: "Respect for Your Home", body: "We take care to protect work areas and maintain an organized jobsite." },
      { title: "Complete Home Services", body: "In addition to HVAC, Zenith provides plumbing, drain cleaning, sewer, and water heater services." },
    ],
  },
  areas: {
    heading: "HVAC Services in Denver Metro and Northern Colorado",
    lead: "Zenith provides heating and air conditioning services throughout Denver Metro and Northern Colorado.",
    outro: "Contact us to confirm service availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About HVAC Services",
  replacesFaqs: ["Do you work on both heating and cooling?", "How often should my HVAC system be serviced?"],
  faqs: (phone) => [
    { q: "What HVAC services does Zenith provide?", a: "Zenith provides air conditioning repair, AC installation, AC maintenance, furnace repair, furnace installation, heating maintenance, and heat pump repair and installation." },
    { q: "How often should my HVAC system be serviced?", a: "A common maintenance schedule is to have your air conditioner checked in the spring and your furnace checked in the fall. Heat pumps may benefit from professional maintenance before both the heating and cooling seasons. Always follow your equipment manufacturer's recommendations." },
    { q: "How do I know if my air conditioner needs repair?", a: "Warm air, weak airflow, unusual noises, water around the indoor unit, frequent cycling, and difficulty maintaining the thermostat setting are signs that your AC system may need service." },
    { q: "When should I replace my furnace instead of repairing it?", a: "The decision depends on the furnace's age, condition, repair history, safety, operating performance, and replacement cost. A professional evaluation can help you compare repair and replacement options." },
    { q: "Why is my furnace blowing cold air?", a: "Possible causes include thermostat settings, airflow restrictions, ignition problems, equipment faults, or other system issues. A technician can evaluate the furnace and identify the cause." },
    { q: "How long does an HVAC system last?", a: "Equipment lifespan varies by system type, installation quality, usage, maintenance, and operating conditions. Regular maintenance can help support reliable operation, but no specific lifespan is guaranteed." },
    { q: "Are heat pumps suitable for Colorado?", a: "Some heat pumps are designed to operate in cold climates. The right system depends on your home's heating requirements, insulation, electrical service, existing equipment, and local weather conditions." },
    { q: "Should I repair or replace my air conditioner?", a: "It depends on the equipment's age, repair needs, performance, and overall condition. A technician can help compare the cost and benefits of repairing the existing system versus installing a replacement." },
    { q: "Why is my HVAC system running constantly?", a: "Possible reasons include extreme outdoor temperatures, incorrect thermostat settings, dirty filters, airflow restrictions, equipment problems, or an improperly sized system. A professional inspection can help identify the cause." },
    { q: "Does Zenith provide both heating and air conditioning services?", a: "Yes. Zenith provides residential heating and cooling services, including furnace services, air conditioning services, and heat pump solutions." },
    { q: "Does Zenith serve Denver and Aurora?", a: "Yes. Zenith serves Denver, Aurora, and other communities throughout its Denver Metro and Northern Colorado service area. Contact us to confirm availability." },
    { q: "How do I schedule HVAC service?", a: `Call Zenith at ${phone} or submit a service request through our website.` },
  ],
  cta: {
    title: "Schedule HVAC Service with Zenith",
    text: "Whether you need air conditioning repair, a new AC system, furnace service, heating maintenance, or heat pump installation, Zenith is ready to help you understand your options throughout Denver Metro and Northern Colorado.",
  },
};

export const categoryPageContent: Record<string, CategoryPageContent> = {
  plumbing,
  "drain-cleaning": drainCleaning,
  sewer,
  hvac,
};

const pipeRepair: CategoryPageContent = {
  introParagraphs: [
    "Zenith Plumbing, Drain, Sewer & HVAC provides professional pipe repair and replacement services throughout Denver Metro and Northern Colorado. We help homeowners with leaking pipes, burst pipes, corroded piping, frozen pipe damage, damaged water lines, and aging plumbing systems.",
    "Whether you need a localized pipe repair, replacement of a damaged pipe section, or a larger repiping project, our team evaluates the condition of your plumbing and explains the available solutions.",
  ],
  servicesHeading: "Complete Pipe Repair & Replacement Services",
  servicesLead:
    "Your home's plumbing system depends on properly functioning pipes to deliver water to fixtures and appliances. Zenith provides several pipe repair and replacement solutions depending on the type of pipe, location of the problem, and overall condition of the plumbing system.",
  services: [
    {
      title: "Leaking Pipe Repair",
      href: "/leak-detection",
      linkLabel: "Water Leak Detection",
      paragraphs: [
        "A leaking pipe can waste water and damage walls, ceilings, floors, cabinets, and other parts of your home. Some leaks are easy to see, while others occur behind walls, underneath floors, or in difficult-to-access areas.",
      ],
      bulletsLead: "Our leaking pipe repair services can address:",
      bullets: [
        "Pinhole leaks in copper pipes",
        "Leaking PEX connections and fittings",
        "Damaged water supply pipes",
        "Leaking pipe joints and connections",
        "Corroded pipe sections",
        "Leaks underneath sinks and cabinets",
        "Leaking pipes in basements and crawl spaces",
        "Damaged plumbing inside walls or ceilings",
      ],
      outro: [
        "Depending on the condition of the pipe, the repair may involve replacing a fitting, repairing a connection, or removing and replacing a damaged section.",
      ],
    },
    {
      title: "Burst Pipe Repair",
      href: "/emergency-plumber",
      linkLabel: "Emergency Plumbing",
      paragraphs: [
        "A burst pipe can release a significant amount of water into your property in a short period of time. Frozen pipes, corrosion, excessive pressure, and damaged connections can all contribute to pipe failures.",
      ],
      bulletsLead: "Our burst pipe repair service may include:",
      bullets: [
        "Identifying the damaged pipe section",
        "Shutting off the affected water supply",
        "Removing damaged piping",
        "Installing replacement pipe and fittings",
        "Reconnecting the affected plumbing",
        "Restoring water service",
        "Testing repaired connections for leaks",
      ],
      outro: [
        "If a pipe bursts, shut off your main water supply if it is safe to do so. If water is near electrical equipment, avoid the area and contact appropriate emergency assistance.",
        "For urgent plumbing problems, call Zenith at {phone}.",
      ],
    },
    {
      title: "Pipe Replacement",
      paragraphs: [
        "Sometimes repairing a small section of pipe is not enough. If a pipe has extensive corrosion, repeated leaks, or significant deterioration, replacing the affected section may provide a more reliable solution.",
      ],
      bulletsLead: "Pipe replacement projects may include:",
      bullets: [
        "Removing damaged or deteriorated pipe",
        "Replacing failed pipe sections",
        "Installing new plumbing fittings and connections",
        "Updating outdated piping where appropriate",
        "Reconnecting existing plumbing fixtures",
        "Testing the completed piping system",
      ],
      outro: [
        "The replacement material and installation method depend on the existing plumbing, application, accessibility, and applicable plumbing requirements.",
      ],
    },
    {
      title: "Partial Repiping",
      paragraphs: [
        "Partial repiping involves replacing selected sections of a plumbing system rather than replacing every water supply pipe throughout the property.",
      ],
      bulletsLead: "This may be appropriate when:",
      bullets: [
        "A specific area has recurring leaks",
        "Several pipes in one section are deteriorated",
        "A bathroom or kitchen requires updated piping",
        "A plumbing renovation requires new water supply lines",
        "Existing pipe material is damaged in certain areas",
        "The remaining plumbing system is still in acceptable condition",
      ],
      outro: [
        "A professional evaluation helps determine whether a partial repipe is suitable or whether a more extensive replacement should be considered.",
      ],
    },
    {
      title: "Whole-House Repiping",
      href: "/plumbing#whole-house-repiping",
      linkLabel: "Whole-House Repiping",
      paragraphs: [
        "If your home's plumbing system has widespread corrosion, repeated leaks, or outdated piping, a whole-house repipe may be worth considering. It replaces the home's existing water supply piping with new piping material selected for the property.",
      ],
      bulletsLead: "A whole-house repiping project may involve:",
      bullets: [
        "Evaluating the existing water supply system",
        "Planning new pipe routes",
        "Selecting suitable replacement materials",
        "Accessing piping through walls, ceilings, basements, or crawl spaces",
        "Removing or abandoning existing piping as appropriate",
        "Installing new hot and cold water supply lines",
        "Reconnecting plumbing fixtures and appliances",
        "Testing the new plumbing system",
      ],
      outro: [
        "The amount of wall or ceiling access required depends on the home's layout and existing pipe locations. Drywall repair, painting, and finish restoration are identified in the project estimate.",
      ],
    },
    {
      title: "Copper Pipe Repair",
      paragraphs: [
        "Copper piping is commonly used in residential water supply systems. Although copper is durable, it can develop pinhole leaks, corrosion, damaged joints, and other problems over time.",
      ],
      bulletsLead: "Our copper pipe repair services may address:",
      bullets: [
        "Pinhole leaks",
        "Corroded copper sections",
        "Failed soldered connections",
        "Damaged fittings",
        "Leaking joints",
        "Pipe sections damaged by freezing",
      ],
      outro: [
        "Depending on the condition of the piping, we can evaluate whether a localized copper pipe repair or replacement section is appropriate.",
      ],
    },
    {
      title: "PEX Pipe Repair & Installation",
      href: "/plumbing#pex-pipe-installation",
      linkLabel: "PEX Pipe Installation",
      paragraphs: [
        "PEX is a flexible plumbing pipe material used in many residential water supply systems. It can be suitable for new plumbing installations, repairs, and repiping projects.",
      ],
      bulletsLead: "Our PEX services may include:",
      bullets: [
        "PEX pipe installation",
        "Replacement of damaged PEX sections",
        "PEX fitting and connection repairs",
        "Hot and cold water supply piping",
        "Partial repiping projects",
        "Whole-house repiping",
      ],
      outro: [
        "The correct pipe type, fittings, and installation method depend on the plumbing application and applicable code requirements.",
      ],
    },
    {
      title: "Frozen Pipe Repair",
      paragraphs: [
        "Colorado's winter temperatures can expose plumbing to freezing conditions, especially in unheated areas, exterior walls, crawl spaces, garages, and other vulnerable locations.",
        "When water freezes inside a pipe, expansion can cause cracks or ruptures. Sometimes the leak only becomes visible after the pipe begins to thaw.",
      ],
      bulletsLead: "Our frozen pipe repair service may include:",
      bullets: [
        "Identifying the affected piping",
        "Evaluating the pipe for cracks or damage",
        "Replacing split or damaged sections",
        "Repairing affected fittings and connections",
        "Checking the system for additional leaks",
        "Recommending ways to reduce future freezing risks",
      ],
      outro: ["Do not use an open flame to thaw frozen pipes. If you suspect a frozen pipe, contact a plumbing professional."],
    },
  ],
  relatedLinks: [
    { label: "Water Line Replacement", href: "/plumbing#water-line-replacement" },
    { label: "Pipe Installation", href: "/plumbing#pipe-installation" },
    { label: "Plumbing Repair", href: "/plumbing-repair" },
    { label: "Main Water Shut-Off Valve", href: "/plumbing#main-water-shut-off-valve" },
    { label: "Plumbing Services", href: "/plumbing" },
  ],
  signs: {
    heading: "Signs Your Home Needs Pipe Repair or Replacement",
    lead: [
      "Plumbing pipe problems can develop gradually or occur suddenly. Recognizing the warning signs can help you address problems before additional damage occurs.",
    ],
    items: [
      { title: "Frequent Water Leaks", body: "Repeated leaks in the same area or in different parts of the home may indicate aging or deteriorating plumbing." },
      { title: "Low Water Pressure", body: "A noticeable drop in water pressure throughout multiple fixtures may be associated with pipe corrosion, restrictions, leaks, or other plumbing problems." },
      { title: "Discolored Water", body: "Brown, orange, or rust-colored water can sometimes indicate corrosion in plumbing pipes or other components. A professional evaluation can help identify the source." },
      { title: "Visible Pipe Corrosion", body: "Green, white, or rust-colored buildup around exposed pipes and fittings may indicate corrosion or a deteriorating connection." },
      { title: "Unexplained Water Damage", body: "Wet drywall, ceiling stains, bubbling paint, damp flooring, or water underneath cabinets may indicate a hidden plumbing leak." },
      { title: "Frozen or Burst Pipes", body: "Pipes exposed to freezing temperatures may crack or split, resulting in leaks when the ice thaws." },
      { title: "Older Plumbing Materials", body: "Some older homes have galvanized steel or polybutylene piping. These materials may warrant an evaluation if the plumbing has recurring leaks, corrosion, or performance problems." },
    ],
  },
  compare: {
    heading: "Pipe Repair vs. Pipe Replacement: Which Do You Need?",
    lead: "Not every damaged pipe requires a complete replacement. The best solution depends on the location of the damage and the condition of the surrounding plumbing.",
    columns: [
      {
        heading: "Pipe repair may be appropriate when:",
        items: [
          "The leak is isolated to one section.",
          "The surrounding piping is in good condition.",
          "The pipe material remains suitable for continued use.",
          "The damage is limited to a fitting or connection.",
          "There are no signs of widespread deterioration.",
        ],
      },
      {
        heading: "Pipe replacement may be appropriate when:",
        items: [
          "Multiple pipe sections are leaking.",
          "Corrosion is widespread.",
          "Pipes have recurring failures.",
          "Existing piping is deteriorating.",
          "The cost of repeated repairs is becoming significant.",
          "The existing pipe material is no longer suitable for the application.",
        ],
      },
    ],
    outro: "Our goal is to evaluate the actual condition of your plumbing and explain the available options before recommending work.",
  },
  materials: {
    heading: "Choosing the Right Pipe Material",
    lead: "Different plumbing materials have different applications, installation requirements, and performance characteristics.",
    items: [
      { title: "PEX Piping", body: "PEX is flexible and commonly used for residential hot and cold water supply systems. It can simplify installation in certain homes and reduce the number of connections required." },
      { title: "Copper Piping", body: "Copper is a long-established water supply material known for its durability. Proper installation and suitable water conditions are important for long-term performance." },
      { title: "CPVC Piping", body: "CPVC is used in certain hot and cold water supply applications. Its suitability depends on the system design, installation requirements, and applicable codes." },
      { title: "PVC Piping", body: "PVC is commonly used in drain, waste, and vent plumbing applications. It is not interchangeable with every water supply pipe material, so the intended use must be considered." },
    ],
    outro: "Zenith can help evaluate the existing system and discuss suitable replacement materials for your project.",
  },
  process: {
    heading: "Our Pipe Repair Process",
    lead: "We believe homeowners should understand what is wrong with their plumbing and what work is necessary to address it.",
    steps: [
      { title: "Evaluate the Problem", body: "We discuss the symptoms, leak location, plumbing history, and any visible damage." },
      { title: "Inspect Accessible Piping", body: "We examine accessible pipes, connections, fittings, and surrounding plumbing conditions." },
      { title: "Identify the Recommended Solution", body: "We determine whether the problem calls for a localized repair, section replacement, partial repiping, or a larger project." },
      { title: "Explain the Scope and Pricing", body: "We explain the recommended work, materials, access requirements, and pricing before authorized work begins." },
      { title: "Complete the Repair or Replacement", body: "Our team performs the approved plumbing work using appropriate materials and installation methods." },
      { title: "Test the Plumbing System", body: "We check the completed work for leaks and verify proper operation of the affected plumbing system." },
    ],
  },
  listSections: [
    {
      heading: "What Affects Pipe Repair and Replacement Costs?",
      lead: [
        "The price of pipe repair or replacement depends on the location, accessibility, pipe material, and amount of work required.",
        "Factors that may affect your estimate include:",
      ],
      items: [
        "Type and diameter of the existing pipe",
        "Length of pipe requiring repair or replacement",
        "Accessibility behind walls, ceilings, or floors",
        "Crawl space or basement access",
        "Number of fittings and connections",
        "Water shutoff and system drainage requirements",
        "Concrete or flooring access",
        "Wall or ceiling openings",
        "Replacement material",
        "Permit and inspection requirements",
        "Restoration work included in the project",
      ],
      outro: "A simple accessible pipe repair is different from replacing piping behind finished walls or completing a whole-house repipe. We provide project-specific pricing after evaluating the work.",
    },
  ],
  why: {
    heading: "Why Choose Zenith for Pipe Repair in Denver?",
    lead: "Here's what you can expect when Zenith works on your plumbing.",
    points: [
      { title: "Professional Plumbing Evaluation", body: "We evaluate the plumbing problem before recommending a repair or replacement." },
      { title: "Repair and Replacement Options", body: "We explain when a localized repair may be sufficient and when a larger piping project should be considered." },
      { title: "Upfront Project Pricing", body: "You receive the proposed work and pricing before authorized work begins." },
      { title: "Quality Plumbing Materials", body: "We select suitable piping materials and fittings based on the application and project requirements." },
      { title: "Respect for Your Property", body: "We take care to protect work areas and maintain an organized jobsite." },
      { title: "Complete Home Services", body: "Zenith also provides plumbing repairs, water heaters, drain cleaning, sewer services, heating, and air conditioning." },
    ],
  },
  areas: {
    heading: "Pipe Repair Services in Denver Metro & Northern Colorado",
    lead: "Zenith provides pipe repair and replacement services throughout Denver Metro and Northern Colorado.",
    outro: "Contact our team to confirm service availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About Pipe Repair",
  replacesFaqs: ["Should I repair one section or repipe the house?"],
  faqs: () => [
    { q: "How much does pipe repair cost in Denver?", a: "The cost depends on the pipe material, location of the leak, accessibility, amount of damaged piping, and whether walls or floors need to be opened. An accessible pipe repair will generally involve a different scope than a concealed pipe replacement. We provide pricing after evaluating the project." },
    { q: "How do I know if a pipe needs to be replaced?", a: "Recurring leaks, widespread corrosion, multiple damaged sections, persistent water pressure problems, and deteriorating pipe materials may indicate that replacement should be considered. An inspection can help determine whether a localized repair is still appropriate." },
    { q: "Can a leaking pipe be repaired without replacing the entire plumbing system?", a: "Yes. If the damage is limited to one section and the surrounding piping is in good condition, a localized repair may be sufficient." },
    { q: "What causes pipes to leak?", a: "Common causes include corrosion, aging materials, freezing temperatures, excessive pressure, damaged fittings, poor connections, and physical damage." },
    { q: "What should I do if a pipe bursts?", a: "If it is safe, shut off the main water supply to reduce additional water damage. Keep away from water near electrical equipment. Then contact a plumbing professional for repair." },
    { q: "Can frozen pipes be repaired?", a: "Yes. If a frozen pipe has cracked or split, the damaged section may need to be replaced. The surrounding plumbing should also be checked for additional damage." },
    { q: "Is PEX better than copper?", a: "Both materials can be appropriate for residential water supply systems. PEX is flexible and often easier to route through existing structures, while copper is a durable traditional material. The right choice depends on the home, application, water conditions, budget, and installation requirements." },
    { q: "How long does pipe replacement take?", a: "A small pipe section may be replaced in a few hours, depending on accessibility. Larger projects and whole-house repiping can take considerably longer. The timeline depends on the property layout, pipe routing, access, and project scope." },
    { q: "Can you replace pipes behind walls?", a: "Yes. Some pipe repairs and replacements require opening walls or ceilings to access the damaged piping. The access and restoration requirements are explained in the estimate." },
    { q: "What is partial repiping?", a: "Partial repiping replaces selected portions of a home's water supply piping rather than replacing the entire system. It may be suitable when the problem is limited to a specific area." },
    { q: "What is whole-house repiping?", a: "Whole-house repiping replaces the home's water supply piping throughout the property. It may be considered when the existing plumbing has widespread deterioration or repeated leaks." },
    { q: "Do old galvanized pipes need to be replaced?", a: "Not every older galvanized pipe automatically requires immediate replacement. However, galvanized piping can corrode internally over time and may contribute to reduced water flow, discoloration, and leaks. A plumbing evaluation can help determine its condition." },
    { q: "Does low water pressure mean my pipes are damaged?", a: "Not necessarily. Low pressure can result from several causes, including a pressure regulator problem, valve restriction, fixture issue, leaks, or pipe corrosion. Proper diagnosis is important before deciding on repairs." },
    { q: "Do pipe repairs require a plumbing permit?", a: "Some plumbing repairs and replacement projects require permits and inspections, depending on the scope and local jurisdiction. Requirements should be confirmed for the specific project." },
    { q: "Does Zenith provide pipe repair in Aurora and Denver?", a: "Yes. Zenith serves Denver, Aurora, and communities throughout its Denver Metro and Northern Colorado service area. Contact us to confirm availability for your property." },
  ],
  cta: {
    title: "Schedule Pipe Repair & Replacement with Zenith",
    text: "Do not let a small pipe leak turn into a major plumbing problem. Whether you need a leaking pipe repaired, a burst pipe replaced, or an evaluation of aging plumbing, Zenith is ready to help throughout Denver Metro and Northern Colorado.",
  },
};

const cloggedDrainRepair: CategoryPageContent = {
  introParagraphs: [
    "Zenith Plumbing, Drain, Sewer & HVAC provides professional clogged drain repair and drain cleaning services throughout Denver Metro and Northern Colorado. We help homeowners clear stubborn blockages, address recurring drain problems, and identify conditions that may be affecting proper drainage.",
    "From everyday sink clogs to more difficult drain blockages, our team evaluates the problem and selects an appropriate cleaning method for the affected line.",
  ],
  servicesHeading: "Professional Clogged Drain Repair Services",
  servicesLead:
    "Different drains can become clogged for different reasons. Kitchen sinks commonly collect grease and food residue, while bathroom drains often accumulate hair, soap, and other debris. Main drain blockages may affect multiple fixtures throughout the home. Zenith provides drain-clearing solutions based on the location and severity of the blockage.",
  services: [
    {
      title: "Kitchen Sink Clog Repair",
      href: "/kitchen-drain-cleaning",
      linkLabel: "Kitchen Drain Cleaning",
      paragraphs: [
        "Kitchen sink clogs commonly develop from grease, cooking oils, food particles, soap residue, and buildup inside the drain piping.",
      ],
      bulletsLead: "Common signs of a kitchen drain blockage include:",
      bullets: [
        "Water draining slowly from the sink",
        "Standing water inside the basin",
        "Gurgling sounds when water drains",
        "Unpleasant odors coming from the kitchen drain",
        "Water backing up into the sink",
        "Recurring clogs after temporary clearing",
      ],
      outro: [
        "Our technicians evaluate the affected drain and use appropriate equipment to remove the blockage. If the problem continues returning, additional inspection may help identify buildup or a deeper restriction.",
      ],
    },
    {
      title: "Bathroom Sink Drain Clog Repair",
      href: "/bathroom-drain-cleaning",
      linkLabel: "Bathroom Drain Cleaning",
      paragraphs: ["Bathroom sinks can become clogged by hair, toothpaste, soap residue, and other everyday debris."],
      bulletsLead: "Signs of a bathroom sink clog include:",
      bullets: [
        "Slow-draining water",
        "Water collecting around the drain",
        "Unpleasant drain odors",
        "Gurgling sounds",
        "Frequent blockages",
        "Water backing up after running the faucet",
      ],
      outro: ["Professional drain cleaning can help remove accumulated debris and restore proper drainage."],
    },
    {
      title: "Shower and Bathtub Drain Clog Repair",
      href: "/bathroom-drain-cleaning",
      linkLabel: "Bathroom Drain Cleaning",
      paragraphs: [
        "Shower and bathtub drains frequently collect hair, soap residue, shampoo buildup, and other materials.",
        "When the drain becomes restricted, water may accumulate around your feet while showering or remain in the bathtub after use.",
        "Zenith can evaluate shower and bathtub drainage problems and use suitable drain-cleaning equipment to address the blockage.",
      ],
    },
    {
      title: "Toilet Clog Repair",
      paragraphs: [
        "Toilet clogs may result from excessive toilet paper, foreign objects, buildup, or problems farther down the drain system.",
      ],
      bulletsLead: "Common warning signs include:",
      bullets: [
        "Toilet water rising when flushed",
        "Repeated toilet backups",
        "Slow flushing",
        "Gurgling sounds",
        "Water backing up into nearby fixtures",
      ],
      outro: [
        "A plunger may resolve some minor toilet clogs. Persistent or recurring blockages may require professional evaluation and appropriate drain-clearing equipment.",
        "Do not repeatedly flush a toilet that is overflowing or close to overflowing.",
      ],
    },
    {
      title: "Main Drain and Multiple Fixture Blockages",
      href: "/main-line-drain-cleaning",
      linkLabel: "Main Line Drain Cleaning",
      paragraphs: [
        "When several plumbing fixtures become slow or back up at the same time, the problem may involve a shared drain line or the main sewer line.",
      ],
      bulletsLead: "Warning signs include:",
      bullets: [
        "Multiple sinks draining slowly",
        "Toilets bubbling when other fixtures are used",
        "Water backing up into showers or bathtubs",
        "Basement floor drain backups",
        "Repeated blockages throughout the home",
      ],
      outro: [
        "These symptoms may indicate a blockage farther downstream. A professional evaluation can help determine whether the problem is in an individual fixture drain, a branch drain, or the main sewer line.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Drain Cleaning Services", href: "/drain-cleaning" },
    { label: "Sewer Line Repair", href: "/sewer-repair" },
    { label: "Plumbing Repairs", href: "/plumbing-repair" },
    { label: "Emergency Plumbing", href: "/emergency-plumber" },
  ],
  causes: {
    heading: "What Causes Drains to Become Clogged?",
    lead: "Drain blockages develop when materials accumulate inside the piping or become trapped in a drain opening. Common causes include:",
    items: [
      { title: "Grease and Cooking Oils", body: "Grease can stick to the inside of kitchen drain pipes and collect additional food particles over time." },
      { title: "Hair and Soap Residue", body: "Hair combines with soap and other debris, creating restrictions in bathroom sinks, showers, and tubs." },
      { title: "Food Waste", body: "Food particles and improper disposal practices can contribute to kitchen sink blockages." },
      { title: "Foreign Objects", body: "Items that should not enter the plumbing system can become lodged in drain piping." },
      { title: "Mineral and Soap Buildup", body: "Deposits can gradually restrict water flow, particularly in frequently used drains." },
      { title: "Pipe Problems", body: "Damaged, misaligned, or improperly sloped piping can contribute to recurring drainage problems." },
      { title: "Main Line Obstructions", body: "Blockages in shared drainage piping can affect multiple fixtures throughout the property." },
    ],
  },
  signs: {
    heading: "Signs You Need Professional Clogged Drain Repair",
    lead: [
      "A slow drain may seem like a minor inconvenience, but recurring symptoms can indicate a more serious blockage.",
      "Watch for these warning signs:",
    ],
    items: [
      { title: "Slow-Draining Water", body: "Water takes noticeably longer than usual to leave the sink, shower, or bathtub." },
      { title: "Standing Water", body: "Water remains in the fixture instead of draining normally." },
      { title: "Recurring Clogs", body: "The same drain repeatedly becomes blocked after temporary clearing." },
      { title: "Gurgling Sounds", body: "Air movement in the drain may produce bubbling or gurgling noises." },
      { title: "Unpleasant Odors", body: "Accumulated debris or drainage problems may produce foul smells." },
      { title: "Multiple Affected Fixtures", body: "Several drains backing up together may indicate a shared-line or main-line problem." },
      { title: "Water Backups", body: "Wastewater returning through a different fixture requires prompt attention." },
    ],
    outro: "If sewage is backing up into your home, stop using affected plumbing fixtures and arrange professional evaluation promptly.",
  },
  process: {
    heading: "Our Clogged Drain Repair Process",
    lead: "We use a practical approach to identify the blockage, select suitable equipment, and check the drainage after cleaning.",
    steps: [
      { title: "Evaluate the Symptoms", body: "We determine which fixtures are affected and ask about the history of the blockage." },
      { title: "Locate the Problem", body: "We evaluate whether the restriction appears to be in an individual fixture drain, branch line, or larger shared drainage system." },
      { title: "Select the Appropriate Equipment", body: "Depending on the pipe and blockage, we may use a drain auger, cable machine, or another suitable cleaning method." },
      { title: "Clear the Blockage", body: "We work to remove the obstruction while using equipment appropriate for the affected piping." },
      { title: "Check Drainage Performance", body: "We run water and evaluate whether the affected drain is flowing properly after cleaning." },
      { title: "Discuss Recurring Problems", body: "If a blockage returns or the symptoms suggest an underlying pipe issue, we may recommend further inspection, including a sewer camera inspection when appropriate." },
    ],
  },
  equipment: {
    heading: "Professional Drain Cleaning Equipment",
    lead: "Different drain problems require different cleaning methods. Using the correct equipment is important for effective service and protecting the plumbing system.",
    items: [
      {
        title: "Drain Auger and Cable Machine",
        paragraphs: [
          "A drain auger or cable machine uses a flexible cable and appropriate cutting or clearing head to break through or remove obstructions in drain piping.",
          "It may be suitable for many common sink, shower, bathtub, and drain-line blockages, depending on the pipe configuration and obstruction.",
        ],
      },
      {
        title: "Hydro Jetting",
        href: "/hydro-jetting",
        linkLabel: "Hydro Jetting",
        paragraphs: [
          "Hydro jetting uses specialized equipment to direct high-pressure water through suitable drain and sewer piping. It can help remove grease, sludge, and other accumulated material.",
          "Hydro jetting is not appropriate for every pipe or every blockage. The pipe condition, material, access, and obstruction should be evaluated before recommending this method.",
        ],
      },
      {
        title: "Sewer Camera Inspection",
        href: "/sewer-camera-inspection",
        linkLabel: "Sewer Camera Inspection",
        paragraphs: [
          "A sewer camera inspection helps evaluate the inside of a drain or sewer pipe when recurring blockages or other symptoms suggest an underlying problem.",
        ],
        bulletsLead: "It can help identify:",
        bullets: [
          "Root intrusion",
          "Cracks or damaged pipe sections",
          "Separated pipe connections",
          "Heavy buildup",
          "Standing water",
          "Other visible obstructions",
        ],
        outro: ["Camera inspection can help determine whether a recurring clog is related to a pipe condition rather than ordinary debris."],
      },
    ],
  },
  listSections: [
    {
      heading: "Can You Fix a Clogged Drain Yourself?",
      lead: [
        "Some minor drain blockages can be addressed with a plunger or by cleaning an accessible drain stopper. However, repeated use of unsuitable tools or chemical drain cleaners can create additional problems.",
        "Before attempting a simple drain-clearing step:",
      ],
      items: [
        "Remove visible debris from an accessible drain opening.",
        "Use a plunger appropriate for the fixture.",
        "Avoid mixing different drain-cleaning chemicals.",
        "Follow product safety directions.",
        "Stop if water backs up into other fixtures.",
        "Contact a professional if the clog persists or returns.",
      ],
      outro: "If chemical drain cleaner has already been used, tell your technician before service so appropriate precautions can be taken.",
    },
  ],
  why: {
    heading: "Why Choose Zenith for Clogged Drain Repair?",
    lead: "Here's what you can expect when Zenith clears your drain.",
    points: [
      { title: "Diagnosis Before Recommendations", body: "We evaluate the symptoms and determine what type of blockage may be affecting your drain." },
      { title: "Appropriate Cleaning Methods", body: "We select equipment based on the drain, piping, and obstruction." },
      { title: "Clear Options and Pricing", body: "We explain the proposed service and pricing before authorized work begins." },
      { title: "Recurring Clog Evaluation", body: "When blockages return, we can discuss whether further inspection is appropriate." },
      { title: "Respect for Your Home", body: "We take care to protect work areas and maintain an organized jobsite." },
      { title: "Complete Home Services", body: "Zenith also provides plumbing, sewer, water heater, heating, and air conditioning services." },
    ],
  },
  areas: {
    heading: "Clogged Drain Repair in Denver Metro and Northern Colorado",
    lead: "Zenith provides clogged drain repair throughout Denver Metro and Northern Colorado.",
    outro: "Contact our team to confirm service availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About Clogged Drain Repair",
  replacesFaqs: ["Are chemical drain cleaners safe to use?", "Why are several drains clogged at the same time?"],
  faqs: (phone) => [
    { q: "How much does clogged drain repair cost in Denver?", a: "The price depends on the location of the clog, the severity of the blockage, the equipment required, and whether the problem involves an individual fixture or a larger drain line. Zenith offers $69 drain cleaning when there is an accessible cleanout. Ask us to confirm eligibility and the total price for your specific situation." },
    { q: "Why does my drain keep getting clogged?", a: "Recurring clogs may result from grease, hair, soap residue, mineral buildup, foreign objects, or restrictions deeper in the piping. If the same drain repeatedly becomes blocked, further inspection may help identify the cause." },
    { q: "Are chemical drain cleaners safe for plumbing pipes?", a: "Some chemical cleaners can damage certain pipes, finishes, or plumbing components, especially with repeated or improper use. They may also fail to remove the underlying blockage. Tell your technician if chemicals have already been used." },
    { q: "Why are multiple drains clogged at the same time?", a: "Several affected fixtures may indicate a restriction in a shared branch drain or main sewer line. A professional evaluation can help locate the problem." },
    { q: "How do I know if the clog is in my main sewer line?", a: "Common signs include multiple slow drains, toilets gurgling when other fixtures are used, sewage backing up into tubs or showers, and basement floor drain backups. These symptoms warrant evaluation of the larger drainage system." },
    { q: "Can a drain auger remove tough clogs?", a: "A properly selected drain auger can clear many common blockages. The correct cable and attachment depend on the pipe size, configuration, and obstruction." },
    { q: "What is hydro jetting?", a: "Hydro jetting uses specialized high-pressure water equipment to clean suitable drain and sewer pipes. It may help remove grease, sludge, and accumulated debris. The pipe should be evaluated before this method is used." },
    { q: "Is hydro jetting safe for older pipes?", a: "Not necessarily in every situation. The condition and material of the pipe must be considered before recommending high-pressure cleaning. A different cleaning method may be more appropriate for damaged or deteriorated piping." },
    { q: "Why does my kitchen sink drain slowly?", a: "Grease, food particles, soap residue, and other debris can accumulate inside kitchen drain piping and restrict water flow." },
    { q: "What causes shower drains to clog?", a: "Hair, soap residue, shampoo, and other debris commonly accumulate around the drain opening or farther inside the piping." },
    { q: "Can a clogged drain cause bad odors?", a: "Yes. Accumulated debris and drainage problems can contribute to unpleasant smells. Persistent sewer odors may indicate a different plumbing or sewer issue and should be evaluated." },
    { q: "Should I keep using water if my drain is backing up?", a: "Avoid using the affected fixtures if water is backing up. If multiple fixtures are affected or sewage is returning into the home, stop using the plumbing system and arrange professional service." },
    { q: "How often should drains be professionally cleaned?", a: "There is no single schedule that applies to every home. Professional cleaning is generally based on actual drainage problems, usage, and the condition of the plumbing system." },
    { q: "Does Zenith provide clogged drain repair in Aurora and Denver?", a: "Yes. Zenith serves Denver, Aurora, and other communities throughout its Denver Metro and Northern Colorado service area. Contact us to confirm availability." },
    { q: "How do I schedule clogged drain repair?", a: `Call Zenith at ${phone} or submit a service request through our website.` },
  ],
  cta: {
    title: "Schedule Clogged Drain Repair with Zenith",
    text: "Do not let a slow or blocked drain interrupt your home. Whether you have a clogged kitchen sink, blocked shower drain, recurring toilet clog, or a larger drainage problem, Zenith can help throughout Denver Metro and Northern Colorado.",
  },
};

const kitchenDrainCleaning: CategoryPageContent = {
  introParagraphs: [
    "Zenith Plumbing, Drain, Sewer & HVAC provides professional kitchen drain cleaning services throughout Denver Metro and Northern Colorado. We help homeowners with clogged kitchen sinks, grease buildup, garbage disposal drain problems, slow-draining sinks, and dishwasher drainage backups.",
    "Whether your kitchen sink is draining slowly or water is backing up into the basin, our team evaluates the problem and recommends an appropriate cleaning solution.",
  ],
  servicesHeading: "Professional Kitchen Drain Cleaning Services",
  servicesLead:
    "Kitchen drains handle grease, food residue, dish soap, and other materials every day. Over time, these substances can collect inside the drain piping and create stubborn restrictions. Zenith provides professional kitchen drain cleaning to help remove blockages and restore proper drainage.",
  services: [
    {
      title: "Kitchen Sink Clog Removal",
      href: "/clogged-drain-repair",
      linkLabel: "Clogged Drain Repair",
      paragraphs: [
        "A clogged kitchen sink is one of the most common household plumbing problems. A blockage can develop near the sink drain, inside the P-trap, or farther down the branch drain line.",
      ],
      bulletsLead: "Common symptoms include:",
      bullets: [
        "Water draining slowly from the kitchen sink",
        "Standing water inside the sink basin",
        "Water backing up into a double kitchen sink",
        "Gurgling sounds when the sink drains",
        "Unpleasant odors coming from the drain",
        "Recurring blockages after temporary cleaning",
      ],
      outro: ["Our technicians evaluate the affected plumbing and select appropriate equipment to remove the obstruction."],
    },
    {
      title: "Kitchen Drain Grease Removal",
      href: "/hydro-jetting",
      linkLabel: "Hydro Jetting",
      paragraphs: [
        "Grease is a major contributor to kitchen drain blockages.",
        "Cooking oils, fats, and grease may enter the drain as liquids, but they can cool and collect along the inside of the piping. Over time, grease can trap food particles and other debris, reducing the space available for water to flow.",
        "Our kitchen drain cleaning service addresses grease-related blockages using suitable drain-cleaning methods. Depending on the condition of the piping and the severity of the buildup, cleaning may involve a drain cable or hydro jetting when appropriate.",
      ],
    },
    {
      title: "Garbage Disposal Drain Cleaning",
      href: "/fixture-installation",
      linkLabel: "Garbage Disposal Services",
      paragraphs: [
        "A garbage disposal does not eliminate the possibility of a kitchen drain blockage. Food particles, grease, and other debris can still accumulate inside the drain piping.",
      ],
      bulletsLead: "Common garbage disposal drainage problems include:",
      bullets: [
        "Water draining slowly after using the disposal",
        "Water backing up into the opposite sink basin",
        "Unpleasant odors near the disposal",
        "Gurgling sounds during operation",
        "Repeated kitchen sink blockages",
        "Disposal operation accompanied by poor drainage",
      ],
      outro: [
        "Our team can evaluate the disposal connection and affected drain line to determine whether the problem involves the disposal, trap, or downstream piping.",
      ],
    },
    {
      title: "Dishwasher Drain Backup",
      paragraphs: [
        "Most residential dishwashers discharge wastewater through plumbing connected to the kitchen sink drain or garbage disposal. When the shared drainage line becomes clogged, water may back up into the sink or interfere with dishwasher drainage.",
      ],
      bulletsLead: "Warning signs include:",
      bullets: [
        "Water appearing in the kitchen sink during dishwasher operation",
        "Standing water inside the dishwasher after a cycle",
        "Slow drainage from the sink",
        "Unpleasant odors near the dishwasher",
        "Water backing up around the disposal connection",
      ],
      outro: ["We evaluate the accessible kitchen drainage connections and affected drain piping to identify the likely cause."],
    },
    {
      title: "Double Kitchen Sink Drain Cleaning",
      paragraphs: [
        "Double-basin kitchen sinks share drainage connections in many plumbing configurations. A blockage in a shared drain section can cause water to back up into one or both basins.",
        "Our technicians evaluate the sink connections, accessible trap, and branch drain to identify the obstruction and determine the appropriate cleaning method.",
      ],
    },
    {
      title: "Recurring Kitchen Drain Clogs",
      href: "/sewer-camera-inspection",
      linkLabel: "Sewer Camera Inspection",
      paragraphs: [
        "If your kitchen sink keeps clogging after being cleaned, the underlying problem may not have been completely removed.",
      ],
      bulletsLead: "Recurring blockages can be associated with:",
      bullets: [
        "Grease buildup inside the pipe",
        "Food particles accumulating downstream",
        "Improper pipe slope",
        "Damaged or restricted drain piping",
        "Poorly configured connections",
        "A blockage farther down the drainage system",
      ],
      outro: ["If the problem repeatedly returns, additional inspection may help determine whether the drain requires more than routine cleaning."],
    },
  ],
  relatedLinks: [
    { label: "Drain Cleaning Services", href: "/drain-cleaning" },
    { label: "Bathroom Drain Cleaning", href: "/bathroom-drain-cleaning" },
    { label: "Main Line Drain Cleaning", href: "/main-line-drain-cleaning" },
    { label: "Plumbing Repairs", href: "/plumbing-repair" },
  ],
  causes: {
    heading: "What Causes Kitchen Drains to Become Clogged?",
    lead: "Kitchen drain blockages usually develop gradually as materials accumulate inside the plumbing system.",
    items: [
      { title: "Cooking Grease and Oils", body: "Cooking grease and oils can cool inside drain pipes and contribute to stubborn buildup. Even small amounts entering the drain repeatedly can create problems over time." },
      { title: "Food Particles", body: "Rice, pasta, vegetable scraps, coffee grounds, and other food waste can contribute to drain restrictions, especially when combined with grease." },
      { title: "Soap and Detergent Residue", body: "Dish soap and other cleaning products can combine with grease and debris, contributing to accumulated residue inside the piping." },
      { title: "Coffee Grounds", body: "Coffee grounds do not dissolve in water and can collect with grease and other debris inside kitchen drains." },
      { title: "Improper Garbage Disposal Use", body: "Disposing of excessive food waste or unsuitable materials can contribute to blockages and disposal problems." },
      { title: "Drain Pipe Buildup", body: "Over time, accumulated material can restrict the inside diameter of a drain pipe, making it increasingly difficult for wastewater to flow." },
    ],
  },
  signs: {
    heading: "Signs You Need Professional Kitchen Drain Cleaning",
    lead: ["Your kitchen drain may need professional attention if you notice:"],
    items: [
      { title: "Slow Drainage", body: "Water takes longer than usual to leave the sink." },
      { title: "Standing Water", body: "Water remains in the basin instead of draining normally." },
      { title: "Grease Odors", body: "Persistent unpleasant smells may indicate accumulated organic material or grease inside the drain." },
      { title: "Double Sink Backups", body: "Water moves from one sink basin into the other when the faucet or disposal is used." },
      { title: "Dishwasher Drainage Problems", body: "The dishwasher does not drain properly or water backs up into the sink." },
      { title: "Gurgling Sounds", body: "Bubbling or gurgling may indicate restricted drainage or air movement inside the plumbing." },
      { title: "Repeated Clogs", body: "The same kitchen drain becomes blocked shortly after being cleaned." },
    ],
    outro: "If wastewater is backing up into your kitchen, stop using the affected fixtures until the blockage is evaluated.",
  },
  process: {
    heading: "Our Kitchen Drain Cleaning Process",
    lead: "Zenith follows a practical process to identify the blockage and select an appropriate cleaning method.",
    steps: [
      { title: "Evaluate the Kitchen Drain", body: "We ask about the symptoms, how long the problem has been occurring, and whether the sink, garbage disposal, or dishwasher is affected." },
      { title: "Inspect Accessible Plumbing", body: "We evaluate the accessible sink drain, P-trap, disposal connection, dishwasher connection, and other relevant components." },
      { title: "Identify the Blockage", body: "We determine whether the restriction appears to be near the fixture or farther inside the branch drain line." },
      { title: "Select the Appropriate Cleaning Method", body: "Depending on the pipe configuration and obstruction, we may use a drain cable or another suitable cleaning method. Hydro jetting may be considered for appropriate piping with significant buildup." },
      { title: "Clear the Drain", body: "We work to remove the blockage and improve wastewater flow through the affected line." },
      { title: "Test Drainage", body: "We run water and evaluate the sink drainage and related connections as appropriate." },
      { title: "Provide Recommendations", body: "If the problem appears to involve damaged piping, improper drainage, or recurring buildup, we explain whether further inspection or repair should be considered." },
    ],
  },
  equipment: {
    heading: "Kitchen Drain Cleaning Methods",
    lead: "Different kitchen drain problems require different equipment. The cleaning method should be selected based on the location of the blockage and condition of the piping.",
    items: [
      {
        title: "Drain Cable Cleaning",
        paragraphs: [
          "A professional drain cable machine uses a flexible cable and appropriate attachment to break through or remove obstructions inside drain piping.",
          "This method may be suitable for many common kitchen sink blockages involving food residue, grease accumulation, and other debris.",
        ],
      },
      {
        title: "Hydro Jetting for Kitchen Drains",
        href: "/hydro-jetting",
        linkLabel: "Hydro Jetting",
        paragraphs: [
          "Hydro jetting uses specialized equipment to direct high-pressure water through suitable drain piping. It can help remove accumulated grease, sludge, and other material from appropriate drain lines.",
          "Hydro jetting is not recommended for every plumbing system. The pipe material, condition, accessibility, and severity of the blockage should be evaluated before using this method.",
        ],
      },
      {
        title: "Sewer and Drain Camera Inspection",
        href: "/sewer-camera-inspection",
        linkLabel: "Sewer Camera Inspection",
        paragraphs: [
          "If kitchen drain problems continue returning, a camera inspection may help evaluate the inside of accessible piping and identify visible problems.",
        ],
        bulletsLead: "A camera inspection can help identify:",
        bullets: ["Heavy grease buildup", "Pipe damage", "Separated connections", "Standing water", "Visible obstructions", "Other drainage concerns"],
        outro: ["Camera inspection is particularly useful when the symptoms suggest a deeper problem rather than a simple blockage near the sink."],
      },
    ],
  },
  listSections: [
    {
      heading: "How to Prevent Kitchen Drain Clogs",
      lead: ["A few simple habits can help reduce the likelihood of future kitchen drain problems."],
      items: [
        "Dispose of cooking grease in a container and place it in the trash after it cools.",
        "Avoid pouring cooking oils and fats down the sink.",
        "Scrape food scraps into the trash or compost before washing dishes.",
        "Use a sink strainer to catch food particles.",
        "Avoid putting large amounts of fibrous or starchy food into the garbage disposal.",
        "Run water according to the disposal manufacturer's recommendations.",
        "Clean accessible sink strainers regularly.",
        "Address slow drainage before the blockage becomes more severe.",
        "Avoid repeatedly using chemical drain cleaners.",
      ],
      outro: "Remember that hot water does not make grease safe to pour down the drain. Grease can travel farther into the plumbing before cooling and collecting inside the pipe.",
    },
  ],
  why: {
    heading: "Why Choose Zenith for Kitchen Drain Cleaning?",
    lead: "Here's what you can expect when Zenith cleans your kitchen drain.",
    points: [
      { title: "Professional Drain Evaluation", body: "We evaluate the symptoms and affected plumbing before recommending a cleaning method." },
      { title: "Appropriate Equipment", body: "We select suitable drain-cleaning equipment based on the obstruction and piping conditions." },
      { title: "Clear Pricing", body: "We explain the recommended service and pricing before authorized work begins." },
      { title: "Recurring Clog Solutions", body: "If the same kitchen drain keeps clogging, we can discuss further inspection to help identify the underlying problem." },
      { title: "Respect for Your Home", body: "We take care to protect work areas and maintain an organized jobsite." },
      { title: "Complete Home Services", body: "Zenith also provides plumbing, sewer, water heater, heating, and air conditioning services." },
    ],
  },
  areas: {
    heading: "Kitchen Drain Cleaning in Denver Metro & Northern Colorado",
    lead: "Zenith provides professional kitchen drain cleaning services throughout Denver Metro and Northern Colorado.",
    outro: "Contact our team to confirm service availability in your area.",
  },
  faqHeading: "Frequently Asked Questions About Kitchen Drain Cleaning",
  replacesFaqs: ["Can grease go down the drain if I run hot water?", "Why does my dishwasher back up into the sink?"],
  faqs: (phone) => [
    { q: "How much does kitchen drain cleaning cost in Denver?", a: "The cost depends on the location of the blockage, severity of the buildup, equipment required, and accessibility of the drain line. Zenith offers $69 drain cleaning when there is an accessible cleanout. Ask us to confirm eligibility, included work, and the total price when you book." },
    { q: "What causes a kitchen sink to drain slowly?", a: "Common causes include grease, cooking oils, food particles, soap residue, and accumulated material inside the drain piping. A restriction in the P-trap or farther down the branch line may also cause slow drainage." },
    { q: "Can grease clog kitchen drain pipes?", a: "Yes. Grease and cooking oils can cool and accumulate inside drain piping. Over time, they may trap food particles and contribute to stubborn blockages." },
    { q: "Can I pour hot water down the drain to remove grease?", a: "Hot water may temporarily move grease farther into the plumbing, but it does not eliminate the problem. The grease can cool and accumulate farther down the pipe." },
    { q: "Why does water back up into the other side of my double sink?", a: "Many double sinks share a drainage connection. A blockage in the shared piping or downstream drain can cause water to back up into the opposite basin." },
    { q: "Why is my dishwasher backing up into my kitchen sink?", a: "The dishwasher commonly shares a drainage connection with the kitchen sink or garbage disposal. A blockage in the shared drain line may interfere with dishwasher drainage." },
    { q: "Can a garbage disposal cause kitchen drain clogs?", a: "Yes. Food particles, grease, and debris can accumulate in the disposal connection or downstream drain piping. Improper disposal use may contribute to recurring blockages." },
    { q: "Is hydro jetting good for kitchen drains?", a: "Hydro jetting can help remove grease and accumulated material from suitable drain pipes. However, the pipe condition and configuration should be evaluated before high-pressure cleaning is recommended." },
    { q: "How long does professional kitchen drain cleaning take?", a: "The time depends on the location and severity of the blockage, accessibility, and cleaning method required. A straightforward sink blockage may take less time than a restriction farther down the drain line." },
    { q: "Should I use chemical drain cleaners?", a: "Chemical drain cleaners may damage certain plumbing components or create safety concerns when used improperly. Repeated use may also fail to remove the underlying blockage. Professional evaluation is a better option for stubborn or recurring clogs." },
    { q: "Why does my kitchen sink smell bad?", a: "Unpleasant odors may come from accumulated food debris, grease, residue, or drainage problems. Persistent sewer odors may indicate a different plumbing issue that requires evaluation." },
    { q: "How often should kitchen drains be professionally cleaned?", a: "There is no universal cleaning schedule for every kitchen. Professional cleaning is generally recommended when drainage problems develop or recurring buildup becomes an issue." },
    { q: "Can a clogged kitchen drain damage my plumbing?", a: "A clog can cause water backups and place additional stress on plumbing connections. Ignoring recurring blockages may allow an underlying drainage or pipe problem to continue." },
    { q: "Does Zenith provide kitchen drain cleaning in Aurora and Denver?", a: "Yes. Zenith serves Denver, Aurora, and communities throughout its Denver Metro and Northern Colorado service area. Contact us to confirm availability." },
    { q: "How do I schedule kitchen drain cleaning?", a: `Call Zenith at ${phone} or submit a service request through our website.` },
  ],
  cta: {
    title: "Schedule Kitchen Drain Cleaning with Zenith",
    text: "Do not let a slow or clogged kitchen sink interrupt your daily routine. Whether you are dealing with grease buildup, a blocked kitchen sink, garbage disposal drainage problems, or a dishwasher backup, Zenith can help throughout Denver Metro and Northern Colorado.",
  },
};

/** Extra long-form content for individual service pages, keyed by service slug. */
export const servicePageContent: Record<string, CategoryPageContent> = {
  "pipe-repair": pipeRepair,
  "clogged-drain-repair": cloggedDrainRepair,
  "kitchen-drain-cleaning": kitchenDrainCleaning,
};
