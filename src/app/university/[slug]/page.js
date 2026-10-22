import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import UniversityView from "./UniversityView";
import { ONLINE_UNIVERSITIES } from "@/lib/onlineUniversities";
import { pageMetadata } from "@/lib/seo";
import "./university.css";

export function generateStaticParams() {
  return ONLINE_UNIVERSITIES.filter((u) => u.slug).map((u) => ({
    slug: u.slug,
  }));
}

// The slug is only ever used after being found in ONLINE_UNIVERSITIES, so a
// crafted URL can never reach the filesystem read below.
function findUniversity(slug) {
  return ONLINE_UNIVERSITIES.find((u) => u.slug === slug) || null;
}

async function loadDetail(slug) {
  if (!findUniversity(slug)) return null;
  try {
    const file = path.join(
      process.cwd(),
      "src",
      "lib",
      "university-details",
      `${slug}.json`
    );
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const uni = findUniversity(slug);
  if (!uni) return pageMetadata({ title: "University", path: "/university" });
  return pageMetadata({
    title: `${uni.name} — Courses, Fees & Reviews`,
    description: `${uni.name}${
      uni.location ? `, ${uni.location}` : ""
    }: online courses with fees and duration, approvals, key facts, learner reviews and FAQs.`,
    path: `/university/${slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const uni = findUniversity(slug);
  const detail = await loadDetail(slug);
  if (!uni || !detail) notFound();

  // Rendering lives in UniversityView (a client component): the section bar
  // switches panels like the collegevidya reference, so only the clicked
  // topic's content shows.
  return (
    <main className="top universityPage">
      <UniversityView uni={uni} detail={detail} />
    </main>
  );
}
