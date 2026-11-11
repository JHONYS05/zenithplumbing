import Image from "next/image";
import Link from "next/link";
import type { CmsImage } from "@/lib/cms";
import { Icon } from "./Icon";
import { getContactInfo } from "@/lib/contactInfo";
import type { Offer } from "@/data/offers";
import { OfferBadge } from "./OfferBadge";

interface HeroProps {
  eyebrow?: string;
  title: string;
  intro: string;
  ctaLabel?: string;
  children?: React.ReactNode;
  large?: boolean;
  /** Optional image from the admin. The hero keeps its text-only layout when absent. */
  image?: CmsImage;
  /** Optional special offer shown above the buttons. */
  offer?: Offer;
}

export async function Hero({ eyebrow, title, intro, ctaLabel = "Request Service", children, large, image, offer }: HeroProps) {
  const contact = await getContactInfo();
  return (
    <section className={`hero${large ? " hero-large" : ""}${image ? " hero-with-image" : ""}`}>
      <div className="container hero-inner">
        <div className="hero-copy">
          {children}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {intro && <p className="hero-intro">{intro}</p>}
          {offer && <OfferBadge offer={offer} />}
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              {ctaLabel} <Icon name="arrow" size={18} />
            </Link>
            <a href={contact.phoneHref} className="btn btn-outline-light btn-lg">
              <Icon name="phone" size={18} /> {contact.phone}
            </a>
          </div>
        </div>
        {image && (
          <div className="hero-media">
            <Image
              src={image.src}
              alt={image.alt || title}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 520px"
              className="cover"
            />
          </div>
        )}
      </div>
      <svg className="hero-mountains" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 160 L0 110 L120 60 L210 95 L330 30 L450 100 L560 55 L650 85 L780 20 L900 95 L1010 50 L1120 90 L1250 40 L1360 85 L1440 65 L1440 160 Z" />
      </svg>
    </section>
  );
}
