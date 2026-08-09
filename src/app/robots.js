import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal and administrative areas. These pages also carry
      // robots: noindex in their own metadata; this stops crawlers spending
      // budget requesting them at all.
      disallow: [
        "/admin-dashboard",
        "/user-dashboard",
        "/caf-details",
        "/login",
        "/register",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
