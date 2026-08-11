import { getBlogs } from "@/lib/api";
import {
  COURSE_CATEGORIES,
  EXAM_CATEGORIES,
  ONLINE_COURSES,
} from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";
import { studyAbroadCountries } from "@/lib/studyAbroadData";

/**
 * Serves /sitemap.xml.
 *
 * Distinct from the /sitemap page, which renders a human-readable index for
 * visitors. This one is for crawlers.
 *
 * Private routes (dashboards, login, caf-details) are deliberately absent —
 * they are disallowed in robots.js and carry noindex.
 */

// The degree-course landing pages the old /sitemap page already advertised.
const COLLEGE_SEARCH_TERMS = [
  "mba",
  "bba",
  "btech",
  "bcom",
  "bca",
  "bdes",
  "bsc",
  "mtech",
];

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/college", priority: 0.9, changeFrequency: "daily" },
  { path: "/course", priority: 0.9, changeFrequency: "weekly" },
  { path: "/exam", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
  { path: "/admission", priority: 0.8, changeFrequency: "weekly" },
  { path: "/direct-admission", priority: 0.8, changeFrequency: "weekly" },
  { path: "/scholarship", priority: 0.8, changeFrequency: "weekly" },
  { path: "/study-abroad", priority: 0.8, changeFrequency: "weekly" },
  { path: "/education-loan", priority: 0.7, changeFrequency: "monthly" },
  { path: "/common-application-form", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/videos", priority: 0.6, changeFrequency: "weekly" },
  { path: "/refer-and-earn", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/help", priority: 0.5, changeFrequency: "monthly" },
  { path: "/report", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/copyright", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const now = new Date();
  const entry = (path, priority, changeFrequency, lastModified = now) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  // Returns [] if the backend is unreachable, so a build never fails on it.
  const blogs = await getBlogs();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) =>
      entry(path, priority, changeFrequency)
    ),

    ...COURSE_CATEGORIES.map((name) =>
      entry(`/course/${name}`, 0.8, "monthly")
    ),

    ...EXAM_CATEGORIES.map((name) => entry(`/exam/${name}`, 0.8, "monthly")),

    // The nine country pages. They are prerendered by generateStaticParams but
    // nothing on the site links to them individually, so the sitemap is how a
    // crawler reaches them at all.
    ...studyAbroadCountries.map((country) =>
      entry(`/study-abroad/${country.slug}`, 0.7, "monthly")
    ),

    ...ONLINE_COURSES.map((name) =>
      entry(`/online-course/${name.replace(/\s/g, "-")}`, 0.7, "monthly")
    ),

    ...COLLEGE_SEARCH_TERMS.map((term) =>
      entry(`/college/${term}`, 0.8, "weekly")
    ),

    ...blogs.map((blog) => {
      // timeStamp is what the URL is built from, and it is also the only date
      // the row carries. An unparseable value falls back to the build time.
      const parsed = new Date(blog.timeStamp);
      const lastModified = Number.isNaN(parsed.valueOf()) ? now : parsed;
      return entry(
        `/blogs/${encodeURIComponent(blog.timeStamp)}`,
        0.6,
        "monthly",
        lastModified
      );
    }),
  ];
}
