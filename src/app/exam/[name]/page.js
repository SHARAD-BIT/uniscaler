import Exam from "@/Components/Exam";
import { EXAM_CATEGORIES } from "@/lib/catalog";
import { pageMetadata, titleizeSlug } from "@/lib/seo";
import { notFound } from "next/navigation";

// Renders Exam, not ExamList. The old route table nested
// <Route path=":name" element={<ExamList />} /> inside <Route path="/exam">,
// but Exam never rendered an <Outlet>, so that child never mounted. Exam
// branches on the URL segment itself and shows ExamDetails or ExamList.

export function generateStaticParams() {
  return EXAM_CATEGORIES.map((name) => ({ name }));
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  const category = titleizeSlug(name);

  return pageMetadata({
    title: `${category} Entrance Exams — Eligibility & Exam Pattern`,
    description: `${category} entrance exams in India: eligibility, age limit, number of attempts, exam pattern and the colleges that accept each score.`,
    keywords: `${category.toLowerCase()} entrance exam, ${category.toLowerCase()} exam eligibility, ${category.toLowerCase()} exam pattern, ${category.toLowerCase()} colleges india`,
    path: `/exam/${name}`,
  });
}

export default async function Page({ params }) {
  const { name } = await params;

  // Exam.jsx matches the segment case-insensitively, so the guard has to as
  // well or /exam/Engineering would 404 while /exam/engineering renders.
  if (!EXAM_CATEGORIES.includes(decodeURIComponent(name).toLowerCase())) {
    notFound();
  }

  return <Exam />;
}
