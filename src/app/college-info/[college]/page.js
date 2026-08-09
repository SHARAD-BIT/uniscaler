import CollegeInfo from "@/Components/CollegeInfo";
import { pageMetadata, titleizeSlug } from "@/lib/seo";

/**
 * Links are built as `collegeName.replace(/\s+/g, "-")` (CollegeSearch,
 * ExploreByCollege), so the segment is the college's name and the title can be
 * built from it directly.
 *
 * Note the component itself still reads its data from in-memory nav state and
 * redirects on a hard refresh — see the comment in Helper/NavigationState.jsx.
 * The metadata below is correct regardless, but the page body will not render
 * for a visitor arriving from search until that lookup is moved onto the URL.
 */
export async function generateMetadata({ params }) {
  const { college } = await params;
  const name = titleizeSlug(college);

  return pageMetadata({
    title: `${name} — Courses, Fees, Admission & Placements`,
    description: `${name}: courses offered, fee structure, eligibility, campus facilities and placement record. Apply to ${name} through Uniscaler.`,
    keywords: `${name.toLowerCase()}, ${name.toLowerCase()} admission, ${name.toLowerCase()} fees, ${name.toLowerCase()} courses, ${name.toLowerCase()} placements`,
    path: `/college-info/${college}`,
  });
}

export default function Page() {
  return <CollegeInfo />;
}
