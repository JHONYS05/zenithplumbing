import Image from "next/image";
import Link from "next/link";
import type { CmsImage } from "@/lib/cms";
import { Icon } from "./Icon";

export function ServiceCard({
  href,
  title,
  summary,
  icon,
  image,
}: {
  href: string;
  title: string;
  summary: string;
  icon?: string;
  /** Photo from the admin. Shown above the text; the icon is used when there is none. */
  image?: CmsImage;
}) {
  return (
    <Link href={href} className={`service-card${image ? " has-image" : ""}`}>
      {image ? (
        <span className="service-card-image">
          <Image src={image.src} alt={image.alt || ""} fill sizes="(max-width: 640px) 100vw, 300px" className="cover" />
        </span>
      ) : (
        icon && (
          <span className="service-card-icon">
            <Icon name={icon} size={26} />
          </span>
        )
      )}
      <span className="service-card-title">{title}</span>
      <span className="service-card-summary">{summary}</span>
      <span className="service-card-more">
        Learn more <Icon name="arrow" size={16} />
      </span>
    </Link>
  );
}
