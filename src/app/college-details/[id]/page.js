import CollegeDetails from "@/Components/CollegeDetails";
import { pageMetadata, titleizeSlug } from "@/lib/seo";

/**
 * The segment is the college name with spaces turned into dashes — see the
 * links in PopularCollege and ScrollZoomImage — not a numeric id, despite the
 * folder name.
 *
 * Like /college-info, the component reads its data from nav state and will not
 * render on a direct visit until that is moved onto the URL.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const name = titleizeSlug(id);

  return pageMetadata({
    title: `${name} — College Details, Fees & Admission`,
    description: `Full details for ${name}: courses, fees, eligibility, campus gallery and admission process. Apply through Uniscaler.`,
    path: `/college-details/${id}`,
  });
}

export default function Page() {
  return <CollegeDetails />;
}
