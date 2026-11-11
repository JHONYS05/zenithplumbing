# Zenith Plumbing, Drain, Sewer & HVAC — Website

Next.js 16 (App Router) + TypeScript. Every page is statically generated for speed and SEO.

## Run it

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Deploys to Vercel: import the repo, set `NEXT_PUBLIC_SITE_URL` and `ADMIN_PASSWORD`, and connect a Blob store (Storage → Blob) so admin uploads are kept.

## How it's organized

| Where | What |
|---|---|
| `data/services.ts` | **All 5 category hubs + 29 service pages** — title, meta description, keywords, H1, intro, signs, process, extra sections, FAQs, related links. One file drives every service URL. |
| `data/locations.ts` | City pages at `/service-areas/{city}`. Set `published: false` for any city you don't serve. |
| `data/posts.ts` | Blog. 1 post written, 9 planned (`published: false`). |
| `data/reviews.ts` | Real reviews only — sections stay hidden while empty. |
| `data/faqs.ts` | General FAQs for `/faqs`. |
| `lib/siteConfig.ts` | **Business name, phone, email, address, hours, trust points.** |
| `lib/seo.ts` | Per-page title, description, canonical, Open Graph. |
| `lib/schema.ts` | LocalBusiness (Plumber + HVACBusiness), Service, BreadcrumbList JSON-LD. |
| `app/(site)/[slug]/page.tsx` | Renders every hub and service page from the data. |
| `app/sitemap.ts`, `app/robots.ts` | Generated automatically from the data. |
| `app/api/contact/route.ts` | Contact form endpoint — saves each submission as a lead (`lib/leads.ts`), shown at `/admin/leads`. |
| `app/admin/` | **Built-in admin** at `/admin` — upload photos and edit text for every page. See [ADMIN-GUIDE.md](ADMIN-GUIDE.md). |
| `lib/contentStore.ts` | Where admin changes are stored — as JSON in `storage/content.json` (or Vercel Blob). |
| `lib/cms.ts` | Supplies the admin's saved photos and text to the pages. |

### Add a new service
Add an object to `services` in `data/services.ts`. The page, nav menu, footer, sitemap and schema all update automatically.

### Add or hide pages without code
Admin → Pages → **＋ Add page** creates city, service and other pages; every built-in city and service has a **Show on website** switch. These are stored with the admin content (`lib/customPages.ts`, `lib/catalog.ts`). To remove a built-in page permanently in code, set `published: false` on it in `data/`.

## Before launch checklist

- [ ] Admin → Business info: enter the real phone number, email and business hours
- [ ] `lib/siteConfig.ts`: address (or keep `showAddress: false` for a service-area business), Google Business Profile URL, trust points you can back up
- [ ] Admin → Pages: hide built-in cities you don't serve (Show on website switch), add cities you do, and add real local details and project photos
- [ ] Review all service copy for accuracy against the work Zenith actually does
- [ ] Contact form leads are saved and shown at `/admin/leads`. Optional: add email/text alerts for new leads
- [ ] Set a strong `ADMIN_PASSWORD`; on Vercel connect a Blob store, then upload real photos in `/admin`
- [ ] Replace the placeholder logo (`components/Logo.tsx`, `public/icon.svg`)
- [ ] Google Tag Manager (GTM-N5SFJ9B5) is installed on public pages; set up GA4 and conversions inside Tag Manager (form submissions send a `generate_lead` event)
- [ ] Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then submit `/sitemap.xml` in Search Console
- [ ] Fill in About and Financing pages (marked `TODO`)
