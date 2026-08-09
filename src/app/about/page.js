import About from "@/Components/About";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Uniscaler helps students find the right college, course and career path in India — with verified college data, expert counselling and end-to-end admission support.",
  path: "/about",
});

export default function Page() {
  return <About />;
}
