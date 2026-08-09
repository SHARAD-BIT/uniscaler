import Course from "@/Components/Course";
import { COURSE_CATEGORIES } from "@/lib/catalog";
import { pageMetadata, titleizeSlug } from "@/lib/seo";
import { notFound } from "next/navigation";

// The 22 categories are a fixed list, so every one of these pages can be
// prerendered at build time instead of rendered per request.
export function generateStaticParams() {
  return COURSE_CATEGORIES.map((name) => ({ name }));
}

export async function generateMetadata({ params }) {
  // params is a Promise in Next 16.
  const { name } = await params;
  const category = titleizeSlug(name);

  return pageMetadata({
    title: `${category} Courses — Fees, Eligibility & Colleges`,
    description: `Explore ${category.toLowerCase()} courses in India. Compare duration, eligibility and fees, and see the colleges offering each ${category.toLowerCase()} programme.`,
    keywords: `${category.toLowerCase()} courses, ${category.toLowerCase()} colleges india, ${category.toLowerCase()} course fees, ${category.toLowerCase()} eligibility`,
    path: `/course/${name}`,
  });
}

export default async function Page({ params }) {
  const { name } = await params;

  // Without this, any /course/<anything> renders an empty page that a crawler
  // would happily index. Only the real categories should exist.
  if (!COURSE_CATEGORIES.includes(decodeURIComponent(name).toLowerCase())) {
    notFound();
  }

  return <Course />;
}
