/**
 * /llms.txt — a plain-language summary of Zenith for AI assistants (ChatGPT, Claude, Perplexity…),
 * built from the same data as the website and the admin (services, cities, contact, hours, offers).
 */
import { categories } from "@/data/services";
import { drainCleaningOffer } from "@/data/offers";
import { offeringsByCategory } from "@/data/plumbingServices";
import { getCatalog } from "@/lib/catalog";
import { getContactInfo } from "@/lib/contactInfo";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 3600;

export async function GET() {
  const [catalog, contact] = await Promise.all([getCatalog(), getContactInfo()]);
  const link = (name: string, path: string, note?: string) =>
    `- [${name}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> Residential plumbing, drain cleaning, sewer line repair and replacement, water heater and HVAC (heating and air conditioning) company serving homeowners in the Denver Metro and Northern Colorado.`,
    "",
    "## Contact",
    "",
    `- Website: ${absoluteUrl("/")}`,
    ...(contact.isPlaceholder ? [] : [`- Phone: ${contact.phone}`, `- Email: ${contact.email}`]),
    `- Request service online: ${absoluteUrl("/contact")}`,
    `- Hours: ${contact.hoursTable.map((r) => `${r.label} ${r.text}`).join("; ")}`,
    `- Based in: ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion}`,
    "",
  ];

  if (drainCleaningOffer.active) {
    lines.push(
      "## Current offer",
      "",
      `- ${drainCleaningOffer.price} ${drainCleaningOffer.title}. ${drainCleaningOffer.note} Details: ${absoluteUrl("/drain-cleaning")}`,
      "",
    );
  }

  lines.push("## Services", "");
  for (const c of categories) {
    lines.push(`### ${c.name}`, "", link(c.name, `/${c.slug}`, c.summary));
    for (const s of catalog.servicesIn(c.key)) lines.push(link(s.name, `/${s.slug}`, s.summary));
    for (const g of offeringsByCategory[c.slug] ?? []) {
      lines.push("", `Also offered (${g.group}):`);
      for (const it of g.items) lines.push(`- ${it.name}: ${it.text}`);
    }
    lines.push("");
  }

  lines.push(
    "## Service areas (Colorado)",
    "",
    ...catalog.cities.map((l) => link(`${l.city}, CO`, `/service-areas/${l.slug}`, l.county || undefined)),
    "",
  );

  if (catalog.otherPages.length) {
    lines.push("## More", "", ...catalog.otherPages.map((p) => link(p.name, `/${p.slug}`)), "");
  }

  lines.push(
    "## Company",
    "",
    link("About Zenith", "/about-us"),
    link("Customer reviews", "/reviews"),
    link("Financing", "/financing"),
    link("Frequently asked questions", "/faqs"),
    link("Homeowner guides (blog)", "/blog"),
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
