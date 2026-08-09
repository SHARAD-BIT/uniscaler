import OnlineCourse from "@/Components/OnlineCourse";
import { ONLINE_COURSES, findOnlineCourse } from "@/lib/catalog";
import { pageMetadata, titleizeSlug } from "@/lib/seo";

export function generateStaticParams() {
  // Mirrors how ExploreOnlineCourse builds its hrefs.
  return ONLINE_COURSES.map((name) => ({ name: name.replace(/\s/g, "-") }));
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  // Falls back to the titleized slug so an unlisted segment still gets a
  // sensible title rather than "undefined".
  const course = findOnlineCourse(name) ?? titleizeSlug(name);

  return pageMetadata({
    title: `${course} Online Degree — Fees, Duration & Universities`,
    description: `Pursue ${course} online from UGC-approved Indian universities. Compare fees, duration, specialisations and accreditation on Uniscaler.`,
    keywords: `online ${course.toLowerCase()}, ${course.toLowerCase()} distance education, online degree india, ugc approved online course`,
    path: `/online-course/${name}`,
  });
}

export default function Page() {
  return <OnlineCourse />;
}
