import Home from "@/Components/Home";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Uniscaler - Discover Top Colleges & Universities",
    description:
      "Explore the best colleges and universities with Uniscaler. Discover top-ranked institutions, academic programs, and valuable insights for your educational journey.",
    path: "/",
  }),
  // The home page is the one place the brand suffix would read as
  // "Uniscaler - ... | Uniscaler", so it opts out of the layout's template.
  title: { absolute: "Uniscaler - Discover Top Colleges & Universities" },
};

export default function Page() {
  return <Home />;
}
