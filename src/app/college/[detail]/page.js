import CollegeSearch from "@/Components/CollegeSearch";
import { pageMetadata, titleizeSlug } from "@/lib/seo";

/**
 * The segment here is a free-text search term, not an id from a fixed list —
 * CollegeSearch passes it straight to /fetchCollegeForSearch. So the title is
 * built from the term itself rather than looked up, and there is no
 * generateStaticParams to write.
 */
export async function generateMetadata({ params }) {
  const { detail } = await params;
  const term = titleizeSlug(detail);

  return pageMetadata({
    title: `${term} Colleges — Courses, Fees & Location`,
    description: `Colleges matching "${term}" on Uniscaler. Filter by location, course and duration, compare fees, and apply directly.`,
    path: `/college/${detail}`,
  });
}

export default function Page() {
  return <CollegeSearch />;
}
