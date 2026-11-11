import Link from "next/link";
import { Icon } from "./Icon";
import { getContactInfo } from "@/lib/contactInfo";

export async function CtaBand({
  title = "Ready to get it fixed?",
  text = "Tell us what's going on and we'll schedule a time that works for you.",
  label = "Request Service",
}: {
  title?: string;
  text?: string;
  label?: string;
}) {
  const contact = await getContactInfo();
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn btn-primary btn-lg">
            {label}
          </Link>
          <a href={contact.phoneHref} className="btn btn-outline-light btn-lg">
            <Icon name="phone" size={18} /> {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
