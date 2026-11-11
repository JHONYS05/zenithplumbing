import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { getContactInfo } from "@/lib/contactInfo";
import { getCatalog } from "@/lib/catalog";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

/** Layout for the public website (everything except /admin). */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [contact, catalog] = await Promise.all([getContactInfo(), getCatalog()]);
  return (
    <>
      <GoogleTagManagerNoScript />
      <GoogleTagManager />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <JsonLd data={localBusinessSchema(contact, catalog.cities)} />
    </>
  );
}
