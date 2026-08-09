import Term from "@/Components/Term";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of Uniscaler — your responsibilities, ours, and the limits of the service.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <Term />;
}
