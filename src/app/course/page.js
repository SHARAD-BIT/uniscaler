import Course from "@/Components/Course";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Courses After 12th — Streams, Fees & Colleges",
  description:
    "Explore courses across medical, engineering, management, law, design and more. See eligibility, duration, fees and the colleges that offer each one.",
  keywords:
    "courses after 12th, best course after 12th, undergraduate courses india, course fees, course eligibility",
  path: "/course",
});

export default function Page() {
  return <Course />;
}
