import Blogs from "@/Components/Blogs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Education Blog",
  description:
    "Admission news, exam updates, course guides and career advice for Indian students — written and updated by the Uniscaler counselling team.",
  path: "/blogs",
});

export default function Page() {
  return <Blogs />;
}
