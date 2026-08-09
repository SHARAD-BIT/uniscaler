import SitemapGenerator from "@/Helper/SitemapBuilder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sitemap",
  description:
    "Every section of Uniscaler, listed in one place.",
  path: "/sitemap",
});

// Route list copied verbatim from the old App.jsx sitemap route.
const routes = [
  "/",
  "/login",
  "/register",
  "/refer-and-earn",
  "/ai",
  "/sitemap",
  "/about",
  "/college",
  "/contact",
  "/copyright",
  "/course",
  "/exam",
  "/help",
  "/privacy-policy",
  "/report",
  "/terms-and-conditions",
  "/videos",
  "/register",
  "/login",
  "/blogs",
  "/admission",
  "/education-loan",
  "/scholarship",
  "/common-application-form",
  "/caf-details",
  "/user-dashboard",
  "/refund-policy",
  "/college/mba",
  "/college/bba",
  "/college/btech",
  "/college/bba",
  "/college/bcom",
  "/college/bca",
  "/college/bdes",
  "/college/bsc",
  "/college/mtech",
  "/direct-admission",
];

export default function Page() {
  return <SitemapGenerator routes={routes} />;
}
