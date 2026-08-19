import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { pathwayPrograms } from "@/lib/pathwayPrograms";
import PathwayProgramsClient from "./PathwayProgramsClient";

export const metadata = pageMetadata({
  title: `Accelerated Pathway Programs — ${pathwayPrograms.length} Degrees Abroad`,
  description: `Browse all ${pathwayPrograms.length} international degree programs by level of study, country, domain and program type. Start online, finish on campus abroad.`,
  path: "/study-abroad/pathway-programs",
  keywords: [
    "pathway programs",
    "accelerated degree abroad",
    "study abroad programs",
    "credit transfer degree",
    "STEM programs abroad",
  ],
});

/**
 * A static shell around the client listing.
 *
 * The Suspense boundary is required, not stylistic: the listing reads its
 * preselected filters from the query string with `useSearchParams`, and per
 * Next 16's docs a prerendered route that calls it without a boundary builds
 * fine in dev — routes render on demand there — and then fails the production
 * build with "Missing Suspense boundary with useSearchParams".
 */
export default function PathwayProgramsPage() {
  return (
    <Suspense fallback={<div className="pp-page" />}>
      <PathwayProgramsClient />
    </Suspense>
  );
}
