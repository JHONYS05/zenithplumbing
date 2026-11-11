import Link from "next/link";
import type { Crumb } from "@/lib/schema";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

/** Visible breadcrumb trail + BreadcrumbList schema. Pass the full trail including Home. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.path}>
              {i < crumbs.length - 1 ? (
                <Link href={c.path}>{c.name}</Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
