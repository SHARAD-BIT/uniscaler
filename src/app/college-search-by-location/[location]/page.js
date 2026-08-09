import CollegeByLocation from "@/Components/CollegeByLocation";
import { pageMetadata, titleizeSlug } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { location } = await params;
  const city = titleizeSlug(location);

  return pageMetadata({
    title: `Colleges in ${city}`,
    description: `Top colleges and universities in ${city}. Compare courses, fees and placements, and apply to ${city} colleges through Uniscaler.`,
    keywords: `colleges in ${city.toLowerCase()}, best colleges ${city.toLowerCase()}, ${city.toLowerCase()} university admission, ${city.toLowerCase()} college fees`,
    path: `/college-search-by-location/${location}`,
  });
}

export default function Page() {
  return <CollegeByLocation />;
}
