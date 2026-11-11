import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { Icon } from "./Icon";

export async function ServiceArea({ heading = "Areas We Serve", serviceName }: { heading?: string; serviceName?: string }) {
  const locations = (await getCatalog()).cities;
  if (!locations.length) return null;
  return (
    <section className="section-block">
      <h2>{heading}</h2>
      <p>
        {serviceName ? `Zenith provides ${serviceName.toLowerCase()} ` : "Zenith serves homeowners "}
        across the Denver metro and Front Range, including:
      </p>
      <ul className="area-list">
        {locations.map((l) => (
          <li key={l.slug}>
            <Link href={`/service-areas/${l.slug}`}>
              <Icon name="pin" size={16} /> {l.city}, CO
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
