/**
 * Blog posts. Only `published: true` posts get a page and a sitemap entry.
 * The planned posts come from the content strategy — write and publish them one at a time.
 */
export interface Post {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  published: boolean;
  date?: string;
  relatedService?: string;
  sections?: { heading?: string; paragraphs: string[]; list?: string[] }[];
}

export const posts: Post[] = [
  {
    slug: "signs-you-need-sewer-line-repair",
    title: "Signs You Need Sewer Line Repair",
    description:
      "Slow drains, backups, odors and soggy spots in the yard can all point to a damaged sewer line. Here's what to watch for and what to do next.",
    keyword: "sewer line repair",
    published: true,
    date: "2026-11-03",
    relatedService: "sewer-repair",
    sections: [
      {
        paragraphs: [
          "Your sewer line is out of sight and out of mind — until it isn't. Because it runs underground from your house to the city or district main, the first signs of trouble usually show up inside your home. Catching them early can mean the difference between a targeted repair and a full replacement.",
        ],
      },
      {
        heading: "1. Several drains are slow at once",
        paragraphs: [
          "One slow sink usually means a local clog. When the tub, toilets and floor drains all start draining slowly together, the problem is likely in the main line that they share.",
        ],
      },
      {
        heading: "2. Backups in the lowest drain",
        paragraphs: [
          "Water and waste follow gravity. When the main line is blocked, they back up at the lowest point in the house — often a basement floor drain or a lower-level tub or shower.",
        ],
      },
      {
        heading: "3. Gurgling toilets and drains",
        paragraphs: [
          "Gurgling happens when air is forced through water in the drain traps. If a toilet bubbles when the washing machine drains, or the tub gurgles when you flush, the main line may be partially blocked.",
        ],
      },
      {
        heading: "4. Sewer odors",
        paragraphs: [
          "A sewer smell inside the home or near the yard can point to a cracked or broken line, a dried-out trap or a venting issue. Persistent odors are worth investigating.",
        ],
      },
      {
        heading: "5. Lush or soggy patches in the yard",
        paragraphs: [
          "A leaking sewer line can feed the grass above it, leaving a strip or patch that's greener than the rest of the lawn — or soggy ground that never seems to dry out.",
        ],
      },
      {
        heading: "6. Clogs that keep coming back",
        paragraphs: [
          "If your main line has been cleared more than once and keeps clogging, something is catching debris — commonly tree roots, an offset joint or a sagging section of pipe.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "The best next step is a sewer camera inspection. It shows exactly what's happening inside the line and where, so you can decide between maintenance, a spot repair or a replacement based on facts instead of guesses.",
        ],
        list: [
          "Stop using water if sewage is backing up.",
          "Avoid chemical drain cleaners on a main line clog.",
          "Schedule a main line cleaning and camera inspection.",
        ],
      },
    ],
  },
  { slug: "sewer-line-replacement-cost-colorado", title: "How Much Does Sewer Line Replacement Cost in Colorado?", description: "", keyword: "sewer replacement cost", published: false, relatedService: "sewer-replacement" },
  { slug: "how-often-should-you-clean-your-drains", title: "How Often Should You Clean Your Drains?", description: "", keyword: "drain cleaning", published: false, relatedService: "clogged-drain-repair" },
  { slug: "hydro-jetting-vs-drain-cleaning", title: "Hydro Jetting vs. Traditional Drain Cleaning", description: "", keyword: "hydro jetting vs drain cleaning", published: false, relatedService: "hydro-jetting" },
  { slug: "how-long-does-a-sewer-line-last", title: "How Long Does a Sewer Line Last?", description: "", keyword: "sewer line lifespan", published: false, relatedService: "sewer-replacement" },
  { slug: "water-heater-replacement-cost", title: "How Much Does Water Heater Replacement Cost?", description: "", keyword: "water heater replacement cost", published: false, relatedService: "water-heater-replacement" },
  { slug: "tankless-vs-traditional-water-heaters", title: "Tankless vs. Traditional Water Heaters", description: "", keyword: "tankless water heater", published: false, relatedService: "tankless-water-heaters" },
  { slug: "why-is-my-ac-not-cooling", title: "Why Is My AC Not Cooling My House?", description: "", keyword: "AC not cooling", published: false, relatedService: "ac-repair" },
  { slug: "how-often-should-you-service-your-furnace", title: "How Often Should You Service Your Furnace?", description: "", keyword: "furnace maintenance", published: false, relatedService: "heating-maintenance" },
  { slug: "when-to-replace-your-hvac-system", title: "When Should You Replace Your HVAC System?", description: "", keyword: "HVAC replacement", published: false, relatedService: "ac-installation" },
];

export const publishedPosts = () => posts.filter((p) => p.published);
export const getPost = (slug: string) => publishedPosts().find((p) => p.slug === slug);
