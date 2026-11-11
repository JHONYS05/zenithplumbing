# Deploying to Vercel

## 1. Put the code on GitHub

From the project folder (the one with `package.json`):

```bash
git init
git add .
git commit -m "Zenith website"
git branch -M main
git remote add origin https://github.com/JHONYS05/zenithplumbing.git
git push -u origin main
```

`.gitignore` already keeps out `node_modules`, `.next`, `.env.local` (your password) and `storage/`.

## 2. Create the Vercel project

1. vercel.com → **Add New… → Project** → import **zenithplumbing**.
2. Framework: **Next.js** (detected automatically). Leave the build settings as they are.
3. Open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `ADMIN_PASSWORD` | a long password only you know |
   | `ADMIN_SESSION_SECRET` | a long random string (e.g. from `openssl rand -base64 32`) |

4. Click **Deploy**.

## 3. Add storage (required for the admin)

1. In the project: **Storage → Create → Blob**.
2. Set **Access: Private**, choose a region near Colorado (e.g. Washington D.C. `iad1` or San Francisco `sfo1`), and connect it
   to **all environments**. This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. **Deployments → ⋯ → Redeploy** so the site picks up the storage.

## 4. Set the site address

1. Copy the production address (e.g. `https://zenithplumbing.vercel.app`, or your own domain once added under
   **Settings → Domains**).
2. Add the environment variable `NEXT_PUBLIC_SITE_URL` with that address (no trailing slash) and redeploy.
   It's used for Google: canonical links, sitemap and business details.

## 5. Check it works

1. Open `/admin`, log in, and set **Business info** (phone, email, hours).
2. Upload a photo on any page and check it shows on the live page.
3. Submit the contact form and check it appears under **Leads**.
4. Submit `https://YOUR-ADDRESS/sitemap.xml` in Google Search Console.

From now on, every `git push` to `main` redeploys the site automatically.
Content you change in `/admin` doesn't need a redeploy.
