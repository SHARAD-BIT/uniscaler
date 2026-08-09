import CAFDetails from "@/Components/CAFDetails";
import { pageMetadata } from "@/lib/seo";

// A submitted applicant's own form. Never for search results.
export const metadata = pageMetadata({
  title: "Application Details",
  description: "Your Common Application Form details on Uniscaler.",
  path: "/common-application-form",
  noIndex: true,
});

export default function Page() {
  return <CAFDetails />;
}
