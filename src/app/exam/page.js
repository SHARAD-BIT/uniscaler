import Exam from "@/Components/Exam";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Entrance Exams in India",
  description:
    "Entrance exam details by stream — JEE, NEET, CLAT, CAT and more. Eligibility, attempts, exam pattern and the colleges that accept each score.",
  keywords:
    "entrance exam india, jee main, neet, clat, cat exam, exam eligibility, exam pattern",
  path: "/exam",
});

export default function Page() {
  return <Exam />;
}
