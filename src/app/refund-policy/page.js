import Refund from "@/Components/Refund";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "Uniscaler's refund terms — what is refundable, the timelines involved, and how to raise a refund request.",
  path: "/refund-policy",
});

export default function Page() {
  return <Refund />;
}
