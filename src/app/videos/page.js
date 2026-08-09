import Videos from "@/Components/Videos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Campus Videos",
  description:
    "Campus tours, hostel walkthroughs and student interviews from colleges across India — see a campus before you apply.",
  path: "/videos",
});

export default function Page() {
  return <Videos />;
}
