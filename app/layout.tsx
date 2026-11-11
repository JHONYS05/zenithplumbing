import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;
const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Zenith Plumbing, Drain, Sewer & HVAC | Colorado",
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Looking for reliable plumbing, drain cleaning, sewer repair, water heater or HVAC services in Colorado? Contact Zenith to request professional home service.",
  applicationName: siteConfig.name,
  verification:
    verification || bingVerification
      ? { google: verification, other: bingVerification ? { "msvalidate.01": bingVerification } : undefined }
      : undefined,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0e2340",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
