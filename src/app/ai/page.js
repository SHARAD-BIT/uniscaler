import Ai from "@/Components/Ai";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI College Finder",
  description:
    "Tell our AI what you want to study, where and at what budget, and get a shortlist of colleges in India matched to your profile in seconds.",
  path: "/ai",
});

export default function Page() {
  return <Ai />;
}
