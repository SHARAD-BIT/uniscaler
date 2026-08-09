import { pageMetadata } from "@/lib/seo";
import { studyAbroadCountries } from "@/lib/studyAbroadData";

export const metadata = pageMetadata({
  title: "Study Abroad Programs — Top Universities Worldwide",
  description:
    "Explore 205+ international degree programs across the USA, Germany, France, UK, Canada, Australia and more. Expert counseling, 98% admit rate, 300+ partner universities.",
  path: "/study-abroad",
  keywords: [
    "study abroad",
    "international education",
    "overseas universities",
    "MBA abroad",
    "MS abroad",
    "study in USA",
    "study in Germany",
  ],
});

export default function StudyAbroadLayout({ children }) {
  return children;
}
