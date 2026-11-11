import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every service URL is a single slug (e.g. /ac-repair), so keep URLs without trailing slashes.
  trailingSlash: false,
  poweredByHeader: false,
  experimental: {
    // Admin photo uploads are sent through a server action. Photos are resized in the browser
    // first (usually < 1 MB each); this leaves room for several gallery photos in one save.
    serverActions: { bodySizeLimit: "25mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos uploaded in /admin are served by this site at /media/…, so no outside image hosts are needed.
  },
};

export default nextConfig;
