import College from "@/Components/College";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Top Colleges & Universities in India",
  description:
    "Browse top-ranked colleges and universities across India. Compare courses, fees, location and placements, then apply directly through Uniscaler.",
  keywords:
    "top colleges in india, best universities in india, college list, college comparison, college fees, college admission",
  path: "/college",
});

export default function Page() {
  return <College />;
}
