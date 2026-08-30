import { SITE_URL } from "@lib/siteMeta";
import { MetadataRoute } from "next";

// Authenticated and transactional areas stay out of the index; everything the
// public site publishes is open to crawlers, including AI assistants — the
// foundation wants to be findable and quotable.
const DISALLOW = [
  "/api/",
  "/admin",
  "/admin/",
  "/donor",
  "/donor/",
  "/ministry",
  "/ministry/",
  "/auth",
  "/auth/",
  "/website/auth/",
  "/bulk-email",
  "/donate-old/",
];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOW,
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
