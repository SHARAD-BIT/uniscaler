import { notFound } from "next/navigation";
import { studyAbroadTools } from "@/lib/studyAbroadTools";
import { pageMetadata } from "@/lib/seo";
import ToolsClient from "./ToolsClient";

// Pre-render all four tool slugs at build time, as the country pages do.
export function generateStaticParams() {
  return studyAbroadTools.map((t) => ({ tool: t.slug }));
}

// params is a Promise in Next 16 — same trap, and the same fix, as the
// country route: read it synchronously and both metadata and the page fall
// through to their empty paths.
export async function generateMetadata({ params }) {
  const { tool: slug } = await params;
  const tool = studyAbroadTools.find((t) => t.slug === slug);
  if (!tool) return {};

  return pageMetadata({
    title: `${tool.name} Calculator`,
    description: tool.description,
    path: `/study-abroad/tools/${tool.slug}`,
    keywords: [
      `${tool.name.toLowerCase()} calculator`,
      "study abroad tools",
      "study abroad",
    ],
  });
}

export default async function ToolPage({ params }) {
  const { tool: slug } = await params;
  const tool = studyAbroadTools.find((t) => t.slug === slug);
  if (!tool) notFound();
  return <ToolsClient slug={slug} />;
}
