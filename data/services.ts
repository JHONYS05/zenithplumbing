/**
 * Single source of truth for every service and category (hub) page.
 * Each entry becomes a page at /{slug} with its own title, meta description, H1,
 * content sections, FAQs, Service schema and sitemap entry.
 *
 * To hide a service Zenith doesn't offer (e.g. trenchless), set `published: false`.
 * Review all copy for accuracy before launch — it's written as a strong starting draft.
 */

export type CategoryKey = "plumbing" | "drain" | "sewer" | "water-heaters" | "hvac";

export interface Faq {
  q: string;
  a: string;
}

export interface ContentBlock {
  heading: string;
  body: string;
  items?: { label: string; text: string }[];
}

export interface Category {
  key: CategoryKey;
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  /** One-line summary for cards on the homepage. */
  summary: string;
  icon: string;
  faqs: Faq[];
}

export interface Service {
  slug: string;
  category: CategoryKey;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  summary: string;
  signsHeading?: string;
  signs: string[];
  processHeading?: string;
  process: string[];
  sections?: ContentBlock[];
  faqs: Faq[];
  related?: string[];
  ctaLabel?: string;
  published?: boolean;
}

export const categories: Category[] = [
  {
    key: "plumbing",
    slug: "plumbing",
    name: "Plumbing",
    title: "Plumbing Services Denver CO | Plumbing Repair & Installation | Zenith",
    description:
      "Need a plumber in Denver, CO? Zenith provides plumbing repair, pipe replacement, leak detection, repiping, fixture installation and residential plumbing services. Call today!",
    keywords: [
      "plumbing services Denver CO",
      "plumber Denver CO",
      "plumbing repair Denver",
      "plumbing installation Denver",
      "residential plumbing Denver",
      "general plumbing services",
      "water line repair Denver",
      "whole house repiping Denver",
      "pipe replacement Denver",
      "leak detection Denver",
      "emergency plumber Denver",
      "plumbing contractor Denver",
      "plumbing services Northern Colorado",
    ],
    h1: "Professional Plumbing Services in Denver, CO",
    intro:
      "When plumbing problems affect your home, you need dependable solutions. Zenith provides professional plumbing services throughout Denver Metro and Northern Colorado, including plumbing repairs, water line replacement, pipe installation, leak detection, fixture installation and whole-house repiping. From minor plumbing repairs to major plumbing projects, our team focuses on identifying the problem, explaining your options and completing the approved work with attention to detail.",
    summary: "Repairs, leaks, pipes, fixtures and emergency service.",
    icon: "wrench",
    faqs: [
      {
        q: "What plumbing problems do you handle?",
        a: "Leaking and burst pipes, hidden leaks, running toilets, faucet and fixture repair or installation, low water pressure, frozen pipes and urgent plumbing failures. If it carries water in or out of your home, we can help.",
      },
      {
        q: "Do you give pricing before starting work?",
        a: "Yes. After diagnosing the problem, your technician explains the repair options and the price before any work begins.",
      },
    ],
  },
  {
    key: "drain",
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    title: "Drain Cleaning Services in Colorado | Zenith",
    description:
      "Slow or clogged drains? Zenith clears kitchen, bathroom and main line drains with professional cleaning, hydro jetting and camera inspection in Colorado.",
    keywords: ["drain cleaning", "drain cleaning Colorado", "clogged drain"],
    h1: "Professional Drain Cleaning Services",
    intro:
      "A slow drain is usually the first warning of a bigger blockage. Zenith clears clogs at the source — from a single sink to your home's main sewer line — and uses camera inspection to find out why recurring clogs keep coming back.",
    summary: "Clogs, main lines, hydro jetting and camera inspection.",
    icon: "drain",
    faqs: [
      {
        q: "How do I know if it's one drain or my main line?",
        a: "If only one fixture is slow, the clog is usually in that fixture's branch line. If several drains are slow at once, toilets gurgle, or water backs up into a tub or floor drain, the main line is the likely problem.",
      },
      {
        q: "Will drain cleaning stop clogs from coming back?",
        a: "Cleaning removes the blockage. If clogs keep returning, a camera inspection shows whether roots, a sag or a damaged pipe is the underlying cause so it can be fixed for good.",
      },
    ],
  },
  {
    key: "sewer",
    slug: "sewer",
    name: "Sewer Services",
    title: "Sewer Services in Colorado | Zenith",
    description:
      "Sewer line repair, replacement, inspection and cleanout installation for Colorado homes. Camera-verified diagnosis and clear options from Zenith.",
    keywords: ["sewer services", "sewer repair Colorado", "sewer line replacement Colorado"],
    h1: "Sewer Line Repair, Replacement & Inspection",
    intro:
      "Your sewer line carries everything out of your home, and when it fails the problem shows up fast — backups, odors and soggy spots in the yard. Zenith starts with a camera inspection, shows you what's wrong and explains whether a repair or a full replacement makes sense.",
    summary: "Repair, replacement, inspection and cleanouts.",
    icon: "pipe",
    faqs: [
      {
        q: "How do I know if my sewer line is damaged?",
        a: "Repeated main line backups, multiple slow drains, sewer odors, gurgling toilets and unusually green or soggy patches in the yard are common signs. A camera inspection confirms it.",
      },
      {
        q: "Who is responsible for the sewer line?",
        a: "In most Colorado communities the homeowner is responsible for the service line from the house to the city or district main. The exact boundary depends on your local utility, so it's worth checking with them.",
      },
    ],
  },
  {
    key: "water-heaters",
    slug: "water-heaters",
    name: "Water Heaters",
    title: "Water Heater Services in Colorado | Zenith",
    description:
      "Water heater repair, replacement and installation in Colorado, including tank and tankless systems. Restore reliable hot water with Zenith.",
    keywords: ["water heater services", "water heater Colorado", "water heater repair Colorado"],
    h1: "Water Heater Repair, Replacement & Installation",
    intro:
      "No hot water, rusty water or a tank that's started to leak? Zenith repairs and replaces gas and electric tank water heaters and installs tankless systems — set up correctly for Colorado's altitude.",
    summary: "Tank and tankless repair, replacement and installation.",
    icon: "flame",
    faqs: [
      {
        q: "How long does a water heater last?",
        a: "Tank water heaters commonly last about 8 to 12 years. Tankless units can last longer with regular descaling. Water quality and maintenance make a big difference.",
      },
      {
        q: "Should I repair or replace my water heater?",
        a: "A failed part on a younger unit is usually worth repairing. A leaking tank, heavy rust or a unit past about 10 years old usually points to replacement.",
      },
    ],
  },
  {
    key: "hvac",
    slug: "hvac",
    name: "HVAC",
    title: "HVAC Services in Colorado | Zenith",
    description:
      "AC, furnace and heat pump repair, installation and maintenance for Colorado homes. Keep your home comfortable year-round with Zenith HVAC.",
    keywords: ["HVAC services", "HVAC company Colorado", "heating and cooling Colorado"],
    h1: "Heating & Air Conditioning Services in Colorado",
    intro:
      "Colorado asks a lot of a home's heating and cooling — cold snaps in winter, hot afternoons in summer and big temperature swings in between. Zenith repairs, installs and maintains furnaces, air conditioners and heat pumps so your system is ready for both.",
    summary: "AC, furnace and heat pump repair, install and maintenance.",
    icon: "fan",
    faqs: [
      {
        q: "Do you work on both heating and cooling?",
        a: "Yes. Zenith services furnaces, central air conditioners and heat pumps, including repairs, replacements and seasonal maintenance.",
      },
      {
        q: "How often should my HVAC system be serviced?",
        a: "Once a year for each system is a good rule: AC in the spring and furnace in the fall. A heat pump that heats and cools benefits from service twice a year.",
      },
    ],
  },
];

export const services: Service[] = [
  // ───────────────────────────── PLUMBING ─────────────────────────────
  {
    slug: "plumbing-repair",
    category: "plumbing",
    name: "Plumbing Repair",
    title: "Plumbing Repair Services in Colorado | Zenith",
    description:
      "Get help with leaking pipes, plumbing problems and fixture repairs. Contact Zenith for professional plumbing repair services.",
    keywords: ["plumbing repair", "plumber near me", "plumbing repair Colorado"],
    h1: "Plumbing Repair Services in Colorado",
    intro:
      "From a dripping faucet to a pipe leaking inside a wall, small plumbing problems get more expensive the longer they wait. Zenith finds the cause, explains your repair options and fixes the problem with durable parts.",
    summary: "Leaks, low pressure, running toilets and fixture problems.",
    signs: [
      "Dripping faucets or toilets that run constantly",
      "Low water pressure at one or more fixtures",
      "Water stains on ceilings, walls or floors",
      "Banging, knocking or whistling pipes",
      "Fixtures or valves that won't shut off completely",
    ],
    process: [
      "Listen to what you've noticed and inspect the affected fixtures and lines",
      "Find the root cause rather than just the symptom",
      "Explain repair options and the price before work begins",
      "Complete the repair and test for leaks and proper operation",
      "Clean up and walk you through what was done",
    ],
    faqs: [
      {
        q: "Is a running toilet worth fixing right away?",
        a: "Yes. A toilet that runs nonstop can waste a surprising amount of water every day. The fix is often a worn flapper or fill valve — usually a quick, inexpensive repair.",
      },
      {
        q: "What should I do if water is actively leaking?",
        a: "Close the shutoff valve under the fixture if there is one. If not, close your home's main water shutoff, then call us.",
      },
    ],
    related: ["leak-detection", "pipe-repair", "emergency-plumber"],
  },
  {
    slug: "emergency-plumber",
    category: "plumbing",
    name: "Emergency Plumbing",
    title: "Emergency Plumber in Colorado | Zenith Plumbing",
    description:
      "Have a plumbing emergency? Contact Zenith for help with urgent plumbing problems, leaks and unexpected plumbing failures.",
    keywords: ["emergency plumber", "emergency plumbing", "burst pipe repair"],
    h1: "Emergency Plumbing Help in Colorado",
    intro:
      "Burst pipes, sewage backups and leaking water heaters can't wait until next week. Here's what to do right now to limit the damage — and how to reach Zenith for urgent help.",
    summary: "Burst pipes, backups and urgent leaks.",
    signsHeading: "When to Call an Emergency Plumber",
    signs: [
      "A burst or frozen pipe",
      "Water leaking through a ceiling or wall",
      "Sewage backing up into tubs, toilets or floor drains",
      "No water anywhere in the home",
      "Water pooling around the base of the water heater",
    ],
    processHeading: "What to Do Before We Arrive",
    process: [
      "Shut off your home's main water valve to stop the flow",
      "If the water heater is leaking, turn off its gas or power and close its cold-water inlet valve",
      "If sewage is backing up, stop using all drains, toilets and appliances",
      "Move valuables, rugs and electronics away from the water",
      "Call Zenith and describe exactly what you're seeing",
    ],
    faqs: [
      {
        q: "Where is my main water shutoff?",
        a: "In many Colorado homes it's in the basement, crawl space or utility room where the water line enters the house — often near the water meter or water heater. It's worth finding it before you need it.",
      },
      {
        q: "Can frozen pipes really burst?",
        a: "Yes. Water expands as it freezes, which can split a pipe. If a pipe is frozen, open the faucet it feeds, apply gentle heat such as a hair dryer (never an open flame), and call us if water doesn't return.",
      },
    ],
    related: ["pipe-repair", "leak-detection", "main-line-drain-cleaning"],
    ctaLabel: "Call for Urgent Help",
  },
  {
    slug: "leak-detection",
    category: "plumbing",
    name: "Leak Detection",
    title: "Water Leak Detection & Repair in Colorado | Zenith",
    description:
      "Find hidden water leaks and prevent further property damage with professional leak detection and plumbing repair services.",
    keywords: ["water leak detection", "hidden leak", "leak detection Colorado"],
    h1: "Water Leak Detection & Repair",
    intro:
      "Hidden leaks waste water and quietly damage drywall, flooring and framing. Professional leak detection pinpoints where water is escaping, so the repair is targeted and any opening in walls or floors is as small as possible.",
    summary: "Find hidden leaks before they cause damage.",
    signs: [
      "An unexplained jump in your water bill",
      "The sound of running water when nothing is on",
      "Warm or damp spots on floors",
      "Musty odors, mold or bubbling paint",
      "A water meter that moves when no water is being used",
    ],
    process: [
      "Check the water meter to confirm an active leak",
      "Isolate fixtures and supply lines to narrow down the area",
      "Locate the leak with acoustic, thermal or moisture detection tools",
      "Explain repair options before opening anything",
      "Repair the leak and verify the system holds pressure",
    ],
    faqs: [
      {
        q: "How can I check for a leak myself?",
        a: "Turn off every fixture and appliance that uses water, note the reading on your water meter, and check it again in an hour or two. If the reading changed, water is escaping somewhere.",
      },
      {
        q: "Will you need to cut into my walls?",
        a: "Sometimes a small opening is needed to make the repair. The point of leak detection is to find the exact spot first, so any opening is small and in the right place.",
      },
    ],
    related: ["pipe-repair", "plumbing-repair"],
  },
  {
    slug: "pipe-repair",
    category: "plumbing",
    name: "Pipe Repair",
    title: "Pipe Repair in Colorado | Zenith Plumbing",
    description:
      "Leaking, corroded or frozen pipes? Zenith repairs and replaces damaged water and drain pipes in Colorado homes.",
    keywords: ["pipe repair", "burst pipe repair", "frozen pipe repair Colorado"],
    h1: "Pipe Repair & Replacement",
    intro:
      "Colorado winters are hard on plumbing, and older homes may still have galvanized steel or other aging pipe. Zenith repairs pinhole leaks, freeze damage and corroded sections — and tells you honestly when a larger repipe makes more sense.",
    summary: "Leaking, corroded, frozen and burst pipes.",
    signs: [
      "Visible corrosion or green and white buildup on fittings",
      "Rusty or discolored water",
      "Pinhole leaks or repeated drips",
      "Pipes that froze or burst",
      "Low water pressure throughout the house",
    ],
    process: [
      "Inspect the pipe material and the condition of the surrounding system",
      "Decide between a spot repair, a section replacement or a repipe",
      "Replace damaged pipe with suitable modern material such as copper or PEX",
      "Pressure-test the repair",
      "Restore access and clean up",
    ],
    faqs: [
      {
        q: "Should I repair one section or repipe the house?",
        a: "A single leak in otherwise healthy pipe is usually a straightforward repair. Repeated leaks, galvanized steel supply lines or polybutylene pipe are good reasons to consider replacing more.",
      },
      {
        q: "How do I prevent frozen pipes?",
        a: "Disconnect garden hoses before the first freeze, insulate pipes in unheated spaces, keep the heat on when you travel, and open sink cabinets on exterior walls during cold snaps.",
      },
    ],
    related: ["leak-detection", "emergency-plumber"],
  },
  {
    slug: "fixture-installation",
    category: "plumbing",
    name: "Fixture Installation",
    title: "Plumbing Fixture Installation in Colorado | Zenith",
    description:
      "Professional installation of faucets, toilets, sinks, garbage disposals and other plumbing fixtures for Colorado homes.",
    keywords: ["plumbing fixture installation", "faucet installation", "toilet installation"],
    h1: "Plumbing Fixture Installation",
    intro:
      "A new faucet or toilet should work perfectly from the first day — no slow drips, no wobble and no water under the vanity. Zenith installs fixtures correctly, replaces worn shutoffs and supply lines, and tests everything before we leave.",
    summary: "Faucets, toilets, sinks, disposals and more.",
    signsHeading: "Fixtures We Install",
    signs: [
      "Kitchen and bathroom faucets",
      "Toilets",
      "Sinks and vanity tops",
      "Garbage disposals",
      "Shower valves and tub fixtures",
      "Frost-free outdoor hose bibs",
    ],
    process: [
      "Confirm the new fixture fits your existing connections",
      "Shut off the water and remove the old fixture",
      "Replace worn shutoff valves and supply lines where needed",
      "Install, seal and secure the new fixture",
      "Test for leaks and proper operation",
    ],
    faqs: [
      {
        q: "Can I buy my own fixture?",
        a: "Often, yes. Let us know the make and model ahead of time and we'll confirm it's compatible with your plumbing.",
      },
      {
        q: "What is a frost-free hose bib?",
        a: "It's an outdoor faucet whose shutoff valve sits inside the heated wall of your home, so the water in it is less likely to freeze — a useful upgrade for Colorado winters.",
      },
    ],
    related: ["plumbing-repair", "water-heater-installation"],
  },

  // ───────────────────────────── DRAIN ─────────────────────────────
  {
    slug: "clogged-drain-repair",
    category: "drain",
    name: "Clogged Drain Repair",
    title: "Clogged Drain Repair in Colorado | Zenith",
    description:
      "Restore proper drainage with professional clogged drain repair. Contact Zenith for help with stubborn blockages and slow drains.",
    keywords: ["clogged drain repair", "clogged drain", "slow drain"],
    h1: "Clogged Drain Repair",
    intro:
      "Plungers and store-bought chemicals only go so far. When a drain keeps clogging or won't clear at all, Zenith removes the blockage with the right equipment and checks whether something deeper in the line is causing it.",
    summary: "Stubborn blockages and slow drains.",
    signs: [
      "Water draining slowly or standing in the fixture",
      "Gurgling sounds from drains",
      "The same drain clogging again and again",
      "Water backing up into a different fixture",
      "Foul odors coming from the drain",
    ],
    process: [
      "Determine whether one drain or several are affected",
      "Clear the line with a drain auger or cable machine sized for the pipe",
      "Camera-inspect recurring clogs to find the cause",
      "Run water to confirm full flow",
      "Share simple tips to help prevent the next clog",
    ],
    faqs: [
      {
        q: "Are chemical drain cleaners safe to use?",
        a: "Repeated use can damage older pipes, and they rarely remove the whole clog. If you've already poured one in, tell your technician so they can work safely.",
      },
      {
        q: "Why are several drains clogged at the same time?",
        a: "When multiple fixtures back up together, the blockage is usually in the main line rather than in each drain.",
      },
    ],
    related: ["kitchen-drain-cleaning", "bathroom-drain-cleaning", "main-line-drain-cleaning"],
  },
  {
    slug: "kitchen-drain-cleaning",
    category: "drain",
    name: "Kitchen Drain Cleaning",
    title: "Kitchen Drain Cleaning in Colorado | Zenith",
    description:
      "Clear kitchen drain blockages, grease buildup and slow drains with professional kitchen drain cleaning services.",
    keywords: ["kitchen drain cleaning", "kitchen sink clogged", "grease clog"],
    h1: "Kitchen Drain Cleaning",
    intro:
      "Kitchen drains take a beating from grease, food scraps and coffee grounds. Over time that buildup coats the inside of the pipe until water can barely get through. Zenith clears the line and removes the buildup — not just a hole through it.",
    summary: "Grease buildup, slow sinks and disposal clogs.",
    signs: [
      "A sink that drains slowly or holds standing water",
      "Water backing up into the other side of a double sink",
      "A garbage disposal that hums or drains poorly",
      "The dishwasher not draining fully",
      "Persistent odors from the sink",
    ],
    process: [
      "Check the disposal, trap and dishwasher connection",
      "Clear the branch line with a drain cable",
      "Use hydro jetting for heavy grease buildup when appropriate",
      "Test the sink, disposal and dishwasher drainage",
      "Share tips to keep grease out of the line",
    ],
    faqs: [
      {
        q: "Can grease go down the drain if I run hot water?",
        a: "No. Hot water only moves grease farther down the pipe, where it cools, hardens and catches food particles. Let grease cool and throw it in the trash.",
      },
      {
        q: "Why does my dishwasher back up into the sink?",
        a: "The dishwasher usually drains through the same line as the kitchen sink or disposal, so a clog there affects both.",
      },
    ],
    related: ["clogged-drain-repair", "hydro-jetting"],
  },
  {
    slug: "bathroom-drain-cleaning",
    category: "drain",
    name: "Bathroom Drain Cleaning",
    title: "Bathroom Drain Cleaning in Colorado | Zenith",
    description:
      "Get help with clogged bathroom sinks, tubs and shower drains with professional drain cleaning solutions.",
    keywords: ["bathroom drain cleaning", "shower drain clogged", "tub drain clogged"],
    h1: "Bathroom Drain Cleaning",
    intro:
      "Hair, soap scum and toothpaste combine into some of the toughest clogs in the house. Zenith clears bathroom sinks, tubs, showers and toilets, and checks for venting or main line issues when the problem keeps returning.",
    summary: "Sinks, tubs, showers and toilets.",
    signs: [
      "A slow tub or shower that leaves you standing in water",
      "A bathroom sink that drains slowly",
      "A toilet that clogs repeatedly",
      "Gurgling from the tub when the toilet is flushed",
      "Sewer or musty smells in the bathroom",
    ],
    process: [
      "Identify which fixtures are affected",
      "Remove stoppers and clear hair and buildup",
      "Clear deeper clogs with a drain cable",
      "Check for venting or main line issues if multiple fixtures are slow",
      "Test drainage at every fixture",
    ],
    faqs: [
      {
        q: "How do I keep my shower drain from clogging?",
        a: "A simple hair catcher over the drain stops most of what causes shower clogs. Clean it out regularly.",
      },
      {
        q: "Why does my toilet gurgle?",
        a: "Gurgling usually means air is being pulled through the trap — often a sign of a partial clog farther down the line or a blocked plumbing vent.",
      },
    ],
    related: ["clogged-drain-repair", "main-line-drain-cleaning"],
  },
  {
    slug: "main-line-drain-cleaning",
    category: "drain",
    name: "Main Line Drain Cleaning",
    title: "Main Line Drain Cleaning in Colorado | Zenith",
    description:
      "Address recurring main drain blockages with professional cleaning and inspection solutions for residential sewer systems.",
    keywords: ["main sewer drain cleaning", "main line clog", "sewer backup"],
    h1: "Main Line Drain Cleaning",
    intro:
      "Your main line carries every drain in the house to the city sewer. When it clogs, water backs up at the lowest drain — often a basement floor drain or tub. Zenith clears the main line through your cleanout and can camera-inspect it to see what caused the blockage.",
    summary: "Whole-house backups and basement floor drains.",
    signs: [
      "Several drains slow at the same time",
      "Water or sewage backing up into a basement floor drain",
      "The toilet bubbling when the washing machine drains",
      "Sewer odors inside the home",
      "Water rising in the tub when the toilet is flushed",
    ],
    process: [
      "Access the main line through the sewer cleanout",
      "Clear the blockage with a sewer cable machine",
      "Camera-inspect the line to look for roots, sags or damage",
      "Explain what we found and any recommended next steps",
      "Suggest a maintenance schedule if roots are a recurring problem",
    ],
    faqs: [
      {
        q: "What causes main line clogs?",
        a: "Tree roots, grease, wipes and other non-flushable items, offset joints and sagging sections of pipe are the most common causes.",
      },
      {
        q: "What if my home doesn't have a cleanout?",
        a: "We can sometimes access the line another way. If your home has no usable cleanout, installing one makes future cleaning faster and less disruptive.",
      },
    ],
    related: ["sewer-camera-inspection", "hydro-jetting", "sewer-cleanout-installation"],
  },
  {
    slug: "hydro-jetting",
    category: "drain",
    name: "Hydro Jetting",
    title: "Hydro Jetting Services in Colorado | Zenith",
    description:
      "Remove stubborn buildup from drain and sewer pipes with professional hydro jetting services.",
    keywords: ["hydro jetting", "hydro jetting vs drain cleaning", "sewer jetting"],
    h1: "Hydro Jetting Services",
    intro:
      "A drain cable punches a hole through a clog. Hydro jetting uses high-pressure water to scour grease, scale, sludge and light roots off the inside walls of the pipe — restoring much more of its original flow.",
    summary: "High-pressure cleaning for stubborn buildup.",
    signsHeading: "When Hydro Jetting Makes Sense",
    signs: [
      "Clogs that come back soon after the line is snaked",
      "Heavy grease buildup in kitchen or main lines",
      "Light root intrusion",
      "Scale and sludge reducing flow",
      "Preparing a line for camera inspection or repair",
    ],
    process: [
      "Camera-inspect the line to confirm it can handle jetting",
      "Access the line through a cleanout",
      "Jet the line with the right nozzle and pressure for the pipe",
      "Camera-verify the results",
      "Recommend repairs if the inspection found damage",
    ],
    sections: [
      {
        heading: "Hydro Jetting vs. Traditional Drain Cleaning",
        body: "Both have a place. Cabling is fast and effective for most single clogs. Jetting is the better choice for buildup that lines the pipe, because it cleans the full diameter instead of opening a path through the middle.",
        items: [
          { label: "Drain cable / snake", text: "Breaks through a blockage. Quick, affordable, ideal for most simple clogs." },
          { label: "Hydro jetting", text: "Scours the pipe walls clean. Best for grease, scale and recurring clogs." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is hydro jetting safe for my pipes?",
        a: "It's safe for pipes in sound condition. That's why we inspect first — badly cracked or deteriorated pipe may need repair rather than jetting.",
      },
      {
        q: "Will hydro jetting remove tree roots?",
        a: "It can cut and flush out light root intrusion. Heavy roots usually come back unless the damaged joint they're entering through is repaired.",
      },
    ],
    related: ["main-line-drain-cleaning", "sewer-camera-inspection", "kitchen-drain-cleaning"],
  },
  {
    slug: "sewer-camera-inspection",
    category: "drain",
    name: "Sewer Camera Inspection",
    title: "Sewer Camera Inspection in Colorado | Zenith",
    description:
      "Identify sewer line problems with camera inspection services. Get a clearer understanding of pipe conditions and repair options.",
    keywords: ["sewer camera inspection", "drain camera inspection", "sewer video inspection"],
    h1: "Sewer Camera Inspection",
    intro:
      "Guessing is expensive. A sewer camera inspection sends a waterproof camera through your drain line so you can see exactly what's going on — roots, cracks, sags or a simple blockage — before deciding what to do.",
    summary: "See inside your pipes before deciding on repairs.",
    signsHeading: "When a Camera Inspection Helps",
    signs: [
      "Recurring main line backups",
      "After clearing a main line clog, to find the cause",
      "Suspected tree root intrusion",
      "Before choosing between sewer repair and replacement",
      "Sewer odors or soggy spots in the yard",
    ],
    process: [
      "Insert the camera through a cleanout or other access point",
      "Record the full length of the line",
      "Locate problem areas and their depth with an electronic locator",
      "Review the footage with you",
      "Recommend next steps based on what we see",
    ],
    faqs: [
      {
        q: "Does a camera inspection fix the problem?",
        a: "No — it's a diagnosis. It tells you exactly what's wrong and where, so the repair is targeted and you're not paying for work you don't need.",
      },
      {
        q: "Can I see the footage?",
        a: "Yes. Your technician will walk you through what the camera shows. Ask about getting a copy if you'd like one for your records or for comparing options.",
      },
    ],
    related: ["sewer-line-inspection", "sewer-repair", "main-line-drain-cleaning"],
  },

  // ───────────────────────────── SEWER ─────────────────────────────
  {
    slug: "sewer-repair",
    category: "sewer",
    name: "Sewer Line Repair",
    title: "Sewer Line Repair in Colorado | Zenith",
    description:
      "Damaged sewer line? Zenith provides camera-verified sewer line repair for Colorado homes, from root damage to broken and sagging pipe.",
    keywords: ["sewer line repair", "sewer repair Colorado", "broken sewer pipe"],
    h1: "Sewer Line Repair Services",
    intro:
      "Not every sewer problem means replacing the whole line. When damage is limited to one section — a broken joint, a root-damaged area or a short sag — a targeted repair can restore your sewer for far less than a full replacement.",
    summary: "Targeted repairs for damaged sections.",
    signs: [
      "Frequent main line backups",
      "Multiple slow drains throughout the home",
      "Sewer odors inside or outside",
      "Unusually green or soggy patches in the yard",
      "Recurring root blockages",
    ],
    process: [
      "Camera-inspect the full sewer line",
      "Locate the damaged section and measure its depth",
      "Explain spot repair versus replacement, with pricing",
      "Excavate and repair the damaged section",
      "Test the line, backfill and restore the area",
    ],
    faqs: [
      {
        q: "What causes sewer line damage?",
        a: "Tree roots, shifting soil, freeze-thaw cycles and aging pipe materials such as clay tile, cast iron and Orangeburg are the most common causes.",
      },
      {
        q: "When is a repair better than a replacement?",
        a: "If the camera shows one damaged section in an otherwise healthy line, a repair usually makes sense. If damage is spread along the line, replacement is often the better long-term value.",
      },
    ],
    related: ["sewer-replacement", "sewer-camera-inspection", "trenchless-sewer-repair"],
  },
  {
    slug: "sewer-replacement",
    category: "sewer",
    name: "Sewer Line Replacement",
    title: "Sewer Line Replacement in Colorado | Zenith",
    description:
      "Professional sewer line replacement for Colorado homes. Learn about excavation, pipe replacement, sewer cleanouts and repair options.",
    keywords: ["sewer line replacement", "sewer replacement cost", "sewer line replacement Colorado"],
    h1: "Professional Sewer Line Replacement Services",
    intro:
      "When a sewer line is cracked, collapsed or failing along its length, repeated repairs stop making sense. A full replacement gives you a new, properly sloped line built to last for decades. Zenith handles the whole project — from camera inspection and excavation to cleanout installation and restoring your yard.",
    summary: "Full replacement of failing sewer lines.",
    signsHeading: "Signs You Need Sewer Line Replacement",
    signs: [
      "Frequent sewer backups",
      "Multiple slow drains",
      "Sewer odors",
      "Damaged or collapsed sewer pipe",
      "Recurring blockages that return after cleaning",
    ],
    processHeading: "Our Sewer Replacement Process",
    process: [
      "Sewer camera inspection",
      "Locate the damaged section and mark the line",
      "Explain repair and replacement options",
      "Excavation and new pipe installation",
      "Install or upgrade cleanouts when required",
      "Backfill and restore the work area",
    ],
    sections: [
      {
        heading: "What Affects a Sewer Replacement Project",
        body: "Every sewer replacement is different. These are the factors that shape the scope and the estimate:",
        items: [
          { label: "Depth", text: "Deeper lines need more excavation, shoring and time." },
          { label: "Length and route", text: "The distance from the house to the main and any bends along the way." },
          { label: "Access", text: "Driveways, trees, landscaping and utilities over or near the line." },
          { label: "Pipe material", text: "Modern PVC replaces aging clay, cast iron or Orangeburg pipe." },
          { label: "Cleanouts", text: "Adding a cleanout makes future maintenance much easier." },
          { label: "Permits and restoration", text: "Local permits, inspections and putting your yard back together." },
        ],
      },
      {
        heading: "Sewer Repair vs. Sewer Replacement",
        body: "A repair fixes one damaged section; a replacement renews the whole line. If the camera shows isolated damage in otherwise good pipe, a repair is often the smart choice. If there's damage in several places, an old material that's failing everywhere, or a long sag, replacement usually saves money over time compared with repeated repairs. We'll show you the footage and explain both options.",
      },
    ],
    faqs: [
      {
        q: "How much does sewer line replacement cost?",
        a: "It depends on depth, length, access, the surface over the line and permit requirements. After a camera inspection we can give you a project estimate based on your actual line rather than a guess.",
      },
      {
        q: "How long does a sewer line last?",
        a: "It varies widely by material and conditions. Older clay and cast iron lines are often the ones failing today, while modern PVC is expected to last much longer when installed with proper slope and bedding.",
      },
      {
        q: "Will my yard be torn up?",
        a: "Traditional replacement requires excavation along the line. We plan the dig to limit disruption, then backfill and restore the work area when the job is done.",
      },
    ],
    related: ["sewer-repair", "sewer-cleanout-installation", "sewer-camera-inspection"],
    ctaLabel: "Request a Sewer Replacement Estimate",
  },
  {
    slug: "trenchless-sewer-repair",
    category: "sewer",
    name: "Trenchless Sewer Repair",
    title: "Trenchless Sewer Repair in Colorado | Zenith",
    description:
      "Explore trenchless sewer repair options for damaged underground pipes with less excavation where suitable.",
    keywords: ["trenchless sewer repair", "pipe lining", "pipe bursting"],
    h1: "Trenchless Sewer Repair",
    intro:
      "When a damaged sewer line runs under a driveway, mature trees or finished landscaping, trenchless methods can renew the pipe through small access points instead of a long trench. A camera inspection tells us whether your line is a good candidate.",
    summary: "Less digging where the line allows it.",
    // TODO: set to false if Zenith does not offer trenchless repair.
    published: true,
    signsHeading: "When Trenchless May Be an Option",
    signs: [
      "The line runs under a driveway, patio or mature landscaping",
      "Damage is spread along a line that still holds its shape",
      "Recurring root intrusion through joints",
      "You want to limit disruption to your property",
    ],
    process: [
      "Camera-inspect the line to confirm it's suitable",
      "Clean the line thoroughly",
      "Renew the pipe using the appropriate trenchless method",
      "Camera-verify the finished line",
      "Restore the small access points",
    ],
    sections: [
      {
        heading: "Pipe Lining vs. Pipe Bursting",
        body: "These are the two most common trenchless methods.",
        items: [
          { label: "Pipe lining", text: "A resin-coated liner is cured inside the old pipe, forming a new pipe within it." },
          { label: "Pipe bursting", text: "A new pipe is pulled through the old one, breaking it apart as it goes." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is trenchless always possible?",
        a: "No. Fully collapsed pipe, significant sags (bellies) and some other conditions usually require traditional excavation. The camera inspection decides it.",
      },
      {
        q: "Is trenchless more expensive?",
        a: "It can cost more for the pipe work itself, but it often saves on restoring driveways, landscaping and hardscape. We'll compare both approaches for your property.",
      },
    ],
    related: ["sewer-replacement", "sewer-repair", "sewer-camera-inspection"],
  },
  {
    slug: "sewer-line-inspection",
    category: "sewer",
    name: "Sewer Line Inspection",
    title: "Sewer Line Inspection in Colorado | Zenith",
    description:
      "Buying a home or dealing with recurring backups? A sewer line inspection (sewer scope) shows roots, cracks, sags and pipe condition before you commit.",
    keywords: ["sewer line inspection", "sewer scope inspection", "sewer scope before buying a house"],
    h1: "Sewer Line Inspection & Sewer Scopes",
    intro:
      "A standard home inspection usually stops at the foundation — but the sewer line under the yard can be one of the most expensive surprises in a home purchase. A sewer scope shows the condition of the line so you can plan, negotiate or budget with real information.",
    summary: "Sewer scopes for home buyers and older homes.",
    signsHeading: "When to Get a Sewer Line Inspection",
    signs: [
      "You're buying a home, especially an older one",
      "There are mature trees near the sewer line",
      "The home has a history of backups",
      "You're planning a remodel that adds a bathroom",
      "You're selling and want to address issues up front",
    ],
    process: [
      "Locate and open the sewer cleanout",
      "Run the camera from the house to the main where possible",
      "Note roots, cracks, offsets, sags and the pipe material",
      "Review the findings with you",
      "Explain any recommended repairs and their urgency",
    ],
    faqs: [
      {
        q: "Should I get a sewer scope before buying a home?",
        a: "It's a smart step for most purchases and especially for older homes or homes with large trees. Problems found before closing are much easier to deal with.",
      },
      {
        q: "What problems can a sewer inspection find?",
        a: "Root intrusion, cracked or broken pipe, offset joints, sagging sections that hold water, blockages and deteriorating materials like Orangeburg.",
      },
    ],
    related: ["sewer-camera-inspection", "sewer-repair", "sewer-replacement"],
  },
  {
    slug: "sewer-cleanout-installation",
    category: "sewer",
    name: "Sewer Cleanout Installation",
    title: "Sewer Cleanout Installation in Colorado | Zenith",
    description:
      "Improve access to your sewer system with professional sewer cleanout installation and replacement services.",
    keywords: ["sewer cleanout installation", "sewer cleanout", "install cleanout"],
    h1: "Sewer Cleanout Installation & Replacement",
    intro:
      "A sewer cleanout is an access point that lets your main line be cleaned and inspected without pulling a toilet or working through a roof vent. If your home doesn't have one — or it's broken or buried — installing a proper cleanout makes every future service call faster and cleaner.",
    summary: "Easy, clean access to your main line.",
    signsHeading: "When You Need a Cleanout",
    signs: [
      "Your home has no accessible cleanout",
      "The existing cleanout is cracked, buried or seized",
      "The cleanout cap is damaged or missing",
      "Your main line needs regular maintenance for roots",
      "Your sewer line is being repaired or replaced",
    ],
    process: [
      "Locate the sewer line and choose the best access point",
      "Excavate to the line",
      "Install the cleanout with proper fittings",
      "Test the connection",
      "Backfill and restore the area",
    ],
    faqs: [
      {
        q: "Where is my sewer cleanout?",
        a: "It's usually a capped pipe in the basement floor or near the foundation outside, typically on the side of the house closest to the street.",
      },
      {
        q: "Is a cleanout required?",
        a: "Requirements vary by city. Even where it isn't required, a cleanout is a worthwhile upgrade during any sewer repair or replacement.",
      },
    ],
    related: ["main-line-drain-cleaning", "sewer-replacement"],
  },

  // ───────────────────────────── WATER HEATERS ─────────────────────────────
  {
    slug: "water-heater-repair",
    category: "water-heaters",
    name: "Water Heater Repair",
    title: "Water Heater Repair in Colorado | Zenith",
    description:
      "Having water heater problems? Get professional troubleshooting and repair solutions to restore reliable hot water.",
    keywords: ["water heater repair", "no hot water", "water heater not working"],
    h1: "Water Heater Repair",
    intro:
      "No hot water, lukewarm showers or strange noises from the tank? Zenith troubleshoots gas and electric water heaters, replaces failed parts and tells you honestly when a repair isn't worth it anymore.",
    summary: "No hot water, noises, leaks and pilot problems.",
    signs: [
      "No hot water at all",
      "Hot water runs out faster than it used to",
      "Rusty or discolored hot water",
      "Rumbling or popping sounds from the tank",
      "Water around the base of the tank",
      "A pilot light that won't stay lit",
    ],
    process: [
      "Check the gas or power supply, controls and venting",
      "Test components such as the thermocouple, igniter, elements and thermostats",
      "Inspect the tank for leaks and corrosion",
      "Explain repair versus replacement with pricing",
      "Repair and confirm proper, safe operation",
    ],
    faqs: [
      {
        q: "Why does my water heater make popping noises?",
        a: "Usually sediment has settled at the bottom of the tank, and water trapped under it boils as the burner heats. Flushing the tank can help if it's caught early.",
      },
      {
        q: "Is a leaking water heater repairable?",
        a: "A leak from a valve or fitting can often be repaired. A leak from the tank itself means the tank has failed and needs replacement.",
      },
    ],
    related: ["water-heater-replacement", "tankless-water-heaters"],
  },
  {
    slug: "water-heater-installation",
    category: "water-heaters",
    name: "Water Heater Installation",
    title: "Water Heater Installation in Colorado | Zenith",
    description:
      "Upgrade your home with professional water heater installation. Explore residential hot water solutions with Zenith.",
    keywords: ["water heater installation", "new water heater", "water heater install Colorado"],
    h1: "Water Heater Installation",
    intro:
      "The right water heater depends on your household, your fuel type and your space. Zenith helps you choose the size and type that fits, then installs it with correct venting, gas or electrical connections, an expansion tank where needed and a safe relief valve discharge.",
    summary: "Gas, electric, tankless and hybrid installs.",
    signsHeading: "Water Heater Options",
    signs: [
      "Gas tank water heaters",
      "Electric tank water heaters",
      "Tankless (on-demand) water heaters",
      "Heat pump (hybrid) water heaters",
    ],
    process: [
      "Review your hot water needs and current setup",
      "Recommend a size and type",
      "Pull permits where your city requires them",
      "Install with proper venting, connections, expansion tank and relief valve piping",
      "Test the system and show you how to operate it",
    ],
    faqs: [
      {
        q: "What size water heater do I need?",
        a: "It depends on household size and how much hot water you use at once — for example, showers running while the dishwasher is on. We'll size it to your real usage.",
      },
      {
        q: "Do I need a permit for a new water heater?",
        a: "Many Colorado cities require a permit for water heater installation or replacement. We'll let you know what your city requires.",
      },
    ],
    related: ["water-heater-replacement", "tankless-water-heaters"],
  },
  {
    slug: "water-heater-replacement",
    category: "water-heaters",
    name: "Water Heater Replacement",
    title: "Water Heater Replacement in Colorado | Zenith",
    description:
      "Replace an aging or failing water heater with a professionally installed system suited to your home's needs.",
    keywords: ["water heater replacement", "water heater replacement cost", "replace water heater"],
    h1: "Water Heater Replacement",
    intro:
      "A water heater rarely gives much notice before it fails — and a failed tank can mean water on the floor. Replacing an aging unit on your schedule avoids the emergency and lets you choose the right replacement instead of whatever's available that day.",
    summary: "Replace aging or failing units on your schedule.",
    signsHeading: "Signs It's Time to Replace Your Water Heater",
    signs: [
      "The unit is around 10 years old or older",
      "Water is leaking from the tank",
      "Rust in the hot water or on the tank",
      "Repairs are becoming frequent",
      "It no longer keeps up with your household",
    ],
    process: [
      "Confirm the condition of the existing unit",
      "Review like-for-like replacement or an upgrade",
      "Drain and remove the old water heater",
      "Install the new unit to current code",
      "Test, check for leaks and haul away the old unit",
    ],
    faqs: [
      {
        q: "How long do water heaters last?",
        a: "Tank water heaters commonly last about 8 to 12 years. Tankless units can last longer with regular maintenance.",
      },
      {
        q: "Can I switch from a tank to tankless?",
        a: "Often, yes. It may require a larger gas line, new venting or electrical upgrades, which we'll assess before recommending it.",
      },
    ],
    related: ["water-heater-installation", "tankless-water-heaters", "water-heater-repair"],
  },
  {
    slug: "tankless-water-heaters",
    category: "water-heaters",
    name: "Tankless Water Heaters",
    title: "Tankless Water Heater Installation in Colorado | Zenith",
    description:
      "Explore tankless water heater installation and replacement for efficient on-demand hot water.",
    keywords: ["tankless water heater installation", "tankless water heater", "tankless vs tank"],
    h1: "Tankless Water Heater Installation",
    intro:
      "A tankless water heater heats water only when you need it — no tank to keep hot, and no running out halfway through a shower. Zenith installs and services tankless units, sized for your home and set up for Colorado's elevation.",
    summary: "On-demand hot water, sized for your home.",
    signsHeading: "Benefits of Going Tankless",
    signs: [
      "Continuous hot water within the unit's flow capacity",
      "Saves floor space with a wall-mounted unit",
      "No standby energy spent keeping a tank hot",
      "Longer expected lifespan with regular maintenance",
    ],
    process: [
      "Calculate the flow rate your household needs",
      "Check gas line size, venting and electrical requirements",
      "Select a unit rated for your elevation",
      "Install, vent and connect the unit",
      "Test and explain recommended maintenance",
    ],
    sections: [
      {
        heading: "Things to Consider",
        body: "Tankless is a great fit for many homes, but it's not automatic. A few things to weigh:",
        items: [
          { label: "Upfront cost", text: "Units and installation usually cost more than a tank replacement." },
          { label: "Gas supply", text: "Many units need a larger gas line than a standard tank." },
          { label: "Simultaneous use", text: "Size the unit for how many fixtures run at once." },
          { label: "Maintenance", text: "Periodic descaling keeps it efficient, especially with harder water." },
        ],
      },
    ],
    faqs: [
      {
        q: "Do tankless water heaters work at Colorado's altitude?",
        a: "Yes, when they're selected and set up for it. Gas appliances need to be rated or configured for high altitude, which we account for during installation.",
      },
      {
        q: "How often should a tankless unit be flushed?",
        a: "Typically about once a year, or more often with harder water. Flushing removes scale that reduces efficiency.",
      },
    ],
    related: ["water-heater-installation", "water-heater-replacement"],
  },

  // ───────────────────────────── HVAC ─────────────────────────────
  {
    slug: "ac-repair",
    category: "hvac",
    name: "AC Repair",
    title: "AC Repair in Colorado | Zenith HVAC",
    description:
      "Restore indoor comfort with professional air conditioning repair for residential cooling systems.",
    keywords: ["AC repair", "air conditioner repair", "AC not cooling"],
    h1: "Air Conditioning Repair",
    intro:
      "When the AC quits on a hot Colorado afternoon, the upstairs heats up fast. Zenith diagnoses central air problems — electrical, refrigerant, airflow or drainage — and gets your system cooling again.",
    summary: "Warm air, weak airflow, leaks and noises.",
    signs: [
      "The AC runs but blows warm air",
      "Weak airflow from the vents",
      "The system turns on and off frequently",
      "Ice on the refrigerant lines or indoor coil",
      "Water leaking near the indoor unit",
      "Buzzing, grinding or rattling noises",
    ],
    process: [
      "Check the thermostat, filter and electrical supply",
      "Inspect the outdoor unit, indoor coil and drain",
      "Diagnose the failed component",
      "Explain options and pricing before repairing",
      "Repair and confirm the system is cooling properly",
    ],
    faqs: [
      {
        q: "Why is my AC running but not cooling?",
        a: "Common causes include a clogged filter, a dirty outdoor coil, a failed capacitor or fan motor, or a refrigerant leak. Some are quick fixes; others need repair.",
      },
      {
        q: "What can I check before calling?",
        a: "Make sure the thermostat is set to cool, replace a dirty filter, check the breaker and clear debris away from the outdoor unit.",
      },
    ],
    related: ["ac-maintenance", "ac-installation", "heat-pump-repair"],
  },
  {
    slug: "ac-installation",
    category: "hvac",
    name: "AC Installation",
    title: "AC Installation in Colorado | Zenith HVAC",
    description:
      "Get professional AC installation and cooling system replacement for your Colorado home.",
    keywords: ["AC installation", "AC replacement", "central air installation"],
    h1: "Air Conditioner Installation & Replacement",
    intro:
      "A new air conditioner should be sized for your home — not guessed from square footage. Zenith calculates your cooling load, walks you through central AC and heat pump options, and installs the system correctly so it runs efficiently for years.",
    summary: "Properly sized central AC and replacements.",
    signsHeading: "When to Replace Your Air Conditioner",
    signs: [
      "The system is 12–15 years old or older",
      "Repairs are frequent or expensive",
      "It uses R-22 refrigerant, which has been phased out",
      "Some rooms never cool down",
      "Cooling bills keep rising",
    ],
    process: [
      "Perform a load calculation to size the system",
      "Review central AC and heat pump options",
      "Remove the old equipment",
      "Install the new system and matched coil",
      "Commission and test performance",
    ],
    faqs: [
      {
        q: "What size AC do I need?",
        a: "It depends on insulation, windows, sun exposure, ductwork and layout. A load calculation sizes it correctly; an oversized unit can short-cycle and leave the home clammy.",
      },
      {
        q: "Should I consider a heat pump instead?",
        a: "Many Colorado homeowners do. A heat pump cools like an AC and also provides efficient heat. Incentive programs change often, so we'll help you check what's currently available.",
      },
    ],
    related: ["heat-pump-installation", "ac-maintenance"],
  },
  {
    slug: "ac-maintenance",
    category: "hvac",
    name: "AC Maintenance",
    title: "AC Maintenance in Colorado | Zenith HVAC",
    description:
      "Help maintain cooling performance with professional air conditioning maintenance and seasonal tune-ups.",
    keywords: ["AC maintenance", "AC tune-up", "air conditioner service"],
    h1: "AC Maintenance & Tune-Ups",
    intro:
      "A spring tune-up catches small problems before the first heat wave and keeps your system running efficiently. Zenith inspects, cleans and tests your air conditioner so it's ready for summer.",
    summary: "Seasonal tune-ups before summer.",
    signsHeading: "Signs Your AC Needs a Tune-Up",
    signs: [
      "It's been more than a year since the last service",
      "Cooling seems weaker than last summer",
      "Energy bills have crept up",
      "The outdoor unit is dirty or blocked by plants",
    ],
    processHeading: "What AC Maintenance Includes",
    process: [
      "Clean and inspect the outdoor condenser coil",
      "Check refrigerant performance and temperatures",
      "Test the capacitor, contactor and electrical connections",
      "Clear the condensate drain",
      "Check airflow and the filter",
      "Verify thermostat operation",
    ],
    faqs: [
      {
        q: "How often should my AC be serviced?",
        a: "Once a year, ideally in the spring before you need it.",
      },
      {
        q: "What can I do myself between visits?",
        a: "Change the filter regularly and keep at least two feet of clearance around the outdoor unit.",
      },
    ],
    related: ["ac-repair", "heating-maintenance"],
  },
  {
    slug: "heating",
    category: "hvac",
    name: "Heating Services",
    title: "Heating Services in Colorado | Zenith HVAC",
    description:
      "Explore residential heating repair, installation and maintenance services from Zenith.",
    keywords: ["heating services", "heating repair Colorado", "heating company"],
    h1: "Home Heating Services in Colorado",
    intro:
      "A reliable heating system isn't optional in Colorado. Zenith repairs, replaces and maintains gas furnaces and heat pumps, so your home stays warm through every cold snap.",
    summary: "Furnaces and heat pumps, repair to replacement.",
    signsHeading: "Heating Services We Provide",
    signs: [
      "Furnace repair and diagnostics",
      "Furnace installation and replacement",
      "Heat pump repair and installation",
      "Seasonal heating maintenance",
      "Thermostat troubleshooting",
    ],
    processHeading: "How We Approach Heating Service",
    process: [
      "Safety first: check combustion, venting and carbon monoxide risks",
      "Diagnose the real cause of the problem",
      "Explain options and pricing",
      "Repair or replace with properly sized equipment",
      "Test the system through a full heating cycle",
    ],
    faqs: [
      {
        q: "Furnace or heat pump — which is better for Colorado?",
        a: "Both work. Cold-climate heat pumps have improved a lot, and many homes pair a heat pump with a gas furnace for backup. The right choice depends on your home, fuel costs and goals.",
      },
      {
        q: "When should I schedule heating maintenance?",
        a: "Early fall, before the first real cold snap.",
      },
    ],
    related: ["furnace-repair", "furnace-installation", "heating-maintenance", "heat-pump-installation"],
  },
  {
    slug: "furnace-repair",
    category: "hvac",
    name: "Furnace Repair",
    title: "Furnace Repair in Colorado | Zenith HVAC",
    description:
      "Get help with furnace problems, heating failures and inconsistent indoor temperatures with professional furnace repair.",
    keywords: ["furnace repair", "furnace not working", "no heat"],
    h1: "Furnace Repair",
    intro:
      "No heat on a cold Colorado night isn't just uncomfortable — it can lead to frozen pipes. Zenith diagnoses furnace problems safely, from ignition and flame sensor issues to blower and control failures.",
    summary: "No heat, cold air, cycling and noises.",
    signs: [
      "No heat at all",
      "The furnace blows cold air",
      "It turns on and off frequently",
      "Banging, squealing or rumbling noises",
      "A yellow or flickering burner flame",
      "Some rooms much colder than others",
    ],
    process: [
      "Check the thermostat, filter, power and gas supply",
      "Inspect ignition, flame sensor, burners and safety controls",
      "Check venting and for carbon monoxide risks",
      "Explain repair options and pricing",
      "Repair and test through a full heating cycle",
    ],
    faqs: [
      {
        q: "Why is my furnace blowing cold air?",
        a: "Common causes are a thermostat fan set to ON, a clogged filter, a dirty flame sensor or an ignition problem. If basic checks don't fix it, call us.",
      },
      {
        q: "What should I do if my carbon monoxide alarm goes off?",
        a: "Get everyone out of the house immediately and call 911 or your gas utility's emergency line from outside. Don't go back in until it's declared safe.",
      },
    ],
    related: ["furnace-installation", "heating-maintenance"],
  },
  {
    slug: "furnace-installation",
    category: "hvac",
    name: "Furnace Installation",
    title: "Furnace Installation in Colorado | Zenith HVAC",
    description:
      "Upgrade your home's heating with professional furnace installation and replacement services.",
    keywords: ["furnace installation", "furnace replacement", "new furnace"],
    h1: "Furnace Installation & Replacement",
    intro:
      "Replacing a furnace is a long-term decision. Zenith sizes the new system to your home, explains efficiency options, and installs it with correct venting and high-altitude setup so it heats safely and efficiently.",
    summary: "Sized, efficient furnace replacements.",
    signsHeading: "When to Replace Your Furnace",
    signs: [
      "The furnace is 15–20 years old",
      "A cracked heat exchanger has been found",
      "Repairs are frequent or costly",
      "Uneven heating from room to room",
      "Heating bills keep rising",
    ],
    process: [
      "Perform a load calculation to size the system",
      "Review efficiency options and venting requirements",
      "Remove the old furnace",
      "Install with proper venting, gas piping and high-altitude setup",
      "Test combustion and performance",
    ],
    faqs: [
      {
        q: "What does AFUE mean?",
        a: "Annual Fuel Utilization Efficiency — the percentage of fuel that becomes heat for your home. A 95% AFUE furnace turns about 95 cents of every gas dollar into heat.",
      },
      {
        q: "Do furnaces need high-altitude adjustments?",
        a: "Often, yes. Gas furnaces installed at Colorado elevations typically need to be configured for altitude so they burn correctly.",
      },
    ],
    related: ["furnace-repair", "heat-pump-installation"],
  },
  {
    slug: "heating-maintenance",
    category: "hvac",
    name: "Heating Maintenance",
    title: "Heating Maintenance in Colorado | Zenith HVAC",
    description:
      "Prepare your heating system for colder weather with professional furnace and heating maintenance.",
    keywords: ["heating maintenance", "furnace tune-up", "furnace maintenance"],
    h1: "Furnace & Heating Maintenance",
    intro:
      "A fall tune-up is the best way to avoid a no-heat call on the first freezing night. Zenith cleans, inspects and safety-checks your furnace or heat pump before winter.",
    summary: "Fall tune-ups and safety checks.",
    signsHeading: "Signs Your Furnace Needs Service",
    signs: [
      "It's been over a year since the last tune-up",
      "A dusty or burning smell that doesn't clear",
      "The furnace runs longer than it used to",
      "Some rooms feel colder than others",
    ],
    processHeading: "What Heating Maintenance Includes",
    process: [
      "Inspect burners, ignition and flame sensor",
      "Inspect the heat exchanger and venting",
      "Test safety controls and limit switches",
      "Check the blower and electrical connections",
      "Check the filter and airflow",
      "Verify thermostat operation",
    ],
    faqs: [
      {
        q: "When should I schedule furnace maintenance?",
        a: "Early fall is ideal — before you need heat every day.",
      },
      {
        q: "Do heat pumps need maintenance too?",
        a: "Yes. Because a heat pump runs for both heating and cooling, servicing it twice a year is a good idea.",
      },
    ],
    related: ["furnace-repair", "ac-maintenance"],
  },
  {
    slug: "heat-pump-repair",
    category: "hvac",
    name: "Heat Pump Repair",
    title: "Heat Pump Repair in Colorado | Zenith HVAC",
    description:
      "Get professional heat pump troubleshooting and repair to help restore reliable heating and cooling.",
    keywords: ["heat pump repair", "heat pump not heating", "heat pump service"],
    h1: "Heat Pump Repair",
    intro:
      "A heat pump handles both heating and cooling, so when it fails you lose both. Zenith troubleshoots heat pumps and their controls, defrost systems and backup heat.",
    summary: "Heating, cooling and defrost problems.",
    signs: [
      "Not heating or cooling properly",
      "Heavy ice that doesn't clear on the outdoor unit",
      "Running constantly without reaching temperature",
      "Auxiliary or emergency heat running all the time",
      "Unusual noises from the outdoor unit",
    ],
    process: [
      "Check thermostat settings and controls",
      "Inspect the outdoor unit, coil and defrost operation",
      "Test refrigerant performance and electrical components",
      "Explain repair options and pricing",
      "Repair and test in both heating and cooling modes",
    ],
    faqs: [
      {
        q: "Is it normal for my heat pump to frost up?",
        a: "Light frost in cold weather is normal, and the unit runs a defrost cycle to clear it. Thick ice that stays is not normal and should be checked.",
      },
      {
        q: "Why is my auxiliary heat always on?",
        a: "It can be normal in very cold weather, but if it runs constantly in mild weather, it may point to a heat pump, refrigerant or thermostat problem.",
      },
    ],
    related: ["heat-pump-installation", "ac-repair", "furnace-repair"],
  },
  {
    slug: "heat-pump-installation",
    category: "hvac",
    name: "Heat Pump Installation",
    title: "Heat Pump Installation in Colorado | Zenith HVAC",
    description:
      "Explore professional heat pump installation and replacement for year-round home comfort.",
    keywords: ["heat pump installation", "cold climate heat pump", "heat pump Colorado"],
    h1: "Heat Pump Installation",
    intro:
      "Modern cold-climate heat pumps provide efficient heating and cooling from a single system. Zenith helps you decide whether a heat pump, a dual-fuel setup with your furnace, or another option fits your home — then sizes and installs it correctly.",
    summary: "Cold-climate and dual-fuel systems.",
    signsHeading: "Why Colorado Homeowners Choose Heat Pumps",
    signs: [
      "One system for heating and cooling",
      "Efficient heating for much of the winter",
      "Cold-climate models built for low temperatures",
      "Can pair with an existing furnace (dual fuel)",
    ],
    process: [
      "Perform a load calculation for heating and cooling",
      "Compare cold-climate, dual-fuel and ductless options",
      "Check ductwork and electrical capacity",
      "Install and commission the system",
      "Set up controls and walk you through operation",
    ],
    faqs: [
      {
        q: "Do heat pumps work in Colorado winters?",
        a: "Cold-climate heat pumps are designed to keep heating at low outdoor temperatures. Many homes add a furnace or electric backup for the coldest days.",
      },
      {
        q: "Are there rebates for heat pumps?",
        a: "Utility, state and federal incentive programs change often. We'll help you check which ones are currently available for your home.",
      },
    ],
    related: ["heat-pump-repair", "ac-installation", "furnace-installation"],
  },
];

// ───────────────────────────── helpers ─────────────────────────────

export const publishedServices = () => services.filter((s) => s.published !== false);

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const getCategory = (key: CategoryKey) => categories.find((c) => c.key === key)!;
export const getServiceBySlug = (slug: string) =>
  publishedServices().find((s) => s.slug === slug);
export const servicesInCategory = (key: CategoryKey) =>
  publishedServices().filter((s) => s.category === key);

export const allServiceSlugs = () => [
  ...categories.map((c) => c.slug),
  ...publishedServices().map((s) => s.slug),
];
