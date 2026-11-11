# Website Admin — Quick Guide

Change the photos and text on any page of the Zenith website without touching code.

## Logging in

Go to **`yourwebsite.com/admin`** and enter the admin password.
You stay logged in for 7 days on that device. Use **Log out** at the top right on shared computers.

The password is the `ADMIN_PASSWORD` setting (in `.env.local`, or Vercel → Project → Settings →
Environment Variables). Change it there and redeploy to change the password.

## Business info (phone, email and hours)

Click **Business info** at the top of the admin to set Zenith's phone number and email. They appear
everywhere on the website at once: the header, the call buttons, the footer, the contact page,
the request-service sidebars and the business details Google reads.

- Type the phone number any way you like (720.555.0199, 7205550199…) — it's saved in the standard
  (720) 555-0199 format and becomes tap-to-call on phones.
- Use the same number as your Google Business Profile; matching details help local rankings.
- Until you save real details, the website shows a placeholder number and the admin home page
  reminds you.

### Business hours

Under **Business hours**, set each day to **Open** (with opening and closing times), **Closed** or
**Open 24 hours**. **Copy Monday to Tue–Fri** fills in the weekdays in one click, and the preview
underneath shows exactly how the hours will read on the website before you save.

Hours appear in the bar at the top of every page (e.g. "Mon–Fri 7am–6pm · Sat 8am–2pm" — closed
days are left out there), as a full week on the contact page, and in the business details Google
reads. Keep them the same as your Google Business Profile.

## Leads (form submissions)

Every time a customer fills out a **Request Service** form anywhere on the website, it appears under
**Leads** at the top of the admin. The admin home page also shows a banner when there are new leads.

Each lead shows the customer's name, phone, email, city/ZIP, the service they picked, their message,
when they sent it (Mountain Time) and which page they were on.

- **Tap the phone number** to call (on a phone) or the email address to write back.
- Set the **Status**: *New* → *Contacted* → *Done*, and add **Notes** (only you see them), then **Save**.
- Use the **All / New / Contacted / Done** filters and the search box to find a lead.
- **Download spreadsheet** saves every lead as a CSV file that opens in Excel or Google Sheets.
- **Delete** removes a lead permanently.

Customer details are private: on Vercel they're stored as private files that can't be opened by URL,
and only someone logged in to the admin can see or download them.

## Adding pages (cities, services and more)

On the **Pages** screen, click **＋ Add page** (or the "＋ Add a city / service / page" link beside
each group) and choose what to add:

| Kind | Where it appears on the website |
|---|---|
| **City page** | Service Areas page, the footer's Service Areas list, "areas we serve" on every service page, and the business details Google reads. Address: `/service-areas/golden-co` |
| **Service page** | The top menu under the category you pick, that category's page, and the city pages. Address: `/gas-line-repair` |
| **Other page** | Linked in the footer under Company. For things like Commercial Plumbing, Careers or a seasonal offer. Address: `/commercial-plumbing` |

1. Enter the name. The web address fills in automatically — it can't be changed later, so check it.
2. Click **Create page**. New pages start as a **Draft**: nobody can see them yet.
3. Fill in the page:
   - **City pages:** county, and a few **"What homeowners should know"** cards with genuinely local
     facts (older sewer lines in certain neighborhoods, common problems you see there…). Google ranks
     city pages that only swap the city name poorly, so local details matter.
   - **Service pages:** category, a one-line summary for cards, **signs you need this service**
     (one per line) and **our process** (one step per line).
   - **All pages:** content sections, FAQs, photos and the heading/intro/Google text.
4. Turn on **Show on website** and click **Save changes** — it's live, and added to the menus,
   footer and sitemap automatically.

Only add cities you actually serve.

**Delete a page you added:** open it and use **Delete page** at the bottom.

### Hiding built-in cities and services

Every built-in city and service page has a **Show on website** switch. Turn it off and save to
remove a city you don't serve (or a service you don't offer, such as trenchless repair) from the
website, menus and sitemap. Turn it back on any time — nothing is lost. Hidden pages and drafts are
marked **Hidden** / **Draft** in the pages list.

## Editing a page

1. On the **Pages** list, find the page (use the search box) and click **Edit**.
2. Make changes, then click **Save changes**. The live website updates right away.

### Photos

| Spot | Where it shows |
|---|---|
| **Main image** | Large photo beside the heading at the top of the page |
| **Card image** | Photo on the cards that link to this page (homepage, category pages, "Related Services"). If empty, the main image is used. |
| **Project gallery** | "Recent Projects" photos on the page. Use ← → to reorder, **Remove** to delete. Up to 24. |

- Photos straight from a phone are fine — large photos are resized automatically before uploading.
- JPG, PNG, WebP and AVIF are accepted.
- **Always fill in the image description** (what's in the photo, e.g. "New sewer cleanout installed in Aurora").
  Google uses it, and so do visitors who use screen readers. The admin reminds you if one is missing.
- Use real photos of Zenith's work, crew and trucks. Avoid photos you don't have the rights to.

### Text

Every page already has built-in text. A field shown in **grey** is using it. Type in a field to
replace it; clear the field to go back to the built-in text.

- **Page heading** — the big title on the page
- **Intro paragraph** — the text under the heading
- **SEO title / Meta description** — what appears in Google search results

### Resetting a page

**Reset page** (bottom of the edit screen) removes all photos and text changes for that page and
returns it to the built-in content. It can't be undone.

## Where things are stored

- **On Vercel:** connect a Blob store (Project → Storage → Blob → Connect). Photos and changes are
  stored there permanently. Without it, the admin shows a warning and uploads won't be kept.
- **On your own server / computer:** everything is saved in the `storage/` folder. Back it up.

## Limits

- Each save can upload several photos; if you add a large batch to the gallery and saving fails,
  add them in smaller groups (5–6 at a time).
- One admin password is shared by everyone who edits the site.
