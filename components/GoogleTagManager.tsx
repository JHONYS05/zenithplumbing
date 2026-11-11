import Script from "next/script";

/**
 * Google Tag Manager container, loaded on every public page (not the admin).
 * Set NEXT_PUBLIC_GTM_ID to change containers, or to "off" to disable.
 */
const DEFAULT_ID = "GTM-N5SFJ9B5";

export function gtmId() {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_ID;
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : null;
}

export function GoogleTagManager() {
  const id = gtmId();
  if (!id) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
(function(d){var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${id}';d.head.appendChild(s);})(document);`}
    </Script>
  );
}

/** Fallback for visitors with JavaScript turned off. Place right after <body> opens. */
export function GoogleTagManagerNoScript() {
  const id = gtmId();
  if (!id) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
