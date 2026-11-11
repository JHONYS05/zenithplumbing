import type { Faq } from "./services";

/** General FAQs for the /faqs page. Update answers to match Zenith's actual policies. */
export const generalFaqs: { group: string; items: Faq[] }[] = [
  {
    group: "Scheduling & Pricing",
    items: [
      {
        q: "How do I request service?",
        a: "Call us or use the contact form. Tell us what's happening and your address, and we'll schedule a time that works for you.",
      },
      {
        q: "Will I know the price before work begins?",
        a: "Yes. After diagnosing the problem, your technician explains the options and the price before starting any work.",
      },
      {
        q: "Do you offer financing?",
        a: "Ask us about financing options for larger projects such as sewer replacement, water heater replacement and HVAC systems.",
      },
    ],
  },
  {
    group: "Plumbing, Drains & Sewer",
    items: [
      {
        q: "What's the difference between drain cleaning and sewer repair?",
        a: "Drain cleaning removes a blockage. Sewer repair fixes damaged pipe. If clogs keep coming back after cleaning, a camera inspection can show whether the pipe itself needs repair.",
      },
      {
        q: "Should I get a sewer scope before buying a home?",
        a: "For most homes — especially older homes or homes with large trees — it's a smart step. Standard home inspections usually don't include the sewer line.",
      },
    ],
  },
  {
    group: "Water Heaters & HVAC",
    items: [
      {
        q: "How long do water heaters and furnaces last?",
        a: "Tank water heaters commonly last about 8–12 years, air conditioners around 12–15 years and furnaces around 15–20 years, depending on maintenance and use.",
      },
      {
        q: "Does Colorado's altitude affect HVAC and water heaters?",
        a: "Yes. Gas appliances often need to be rated or configured for high altitude so they burn correctly and safely.",
      },
    ],
  },
];
