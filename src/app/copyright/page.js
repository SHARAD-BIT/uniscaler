import Copyright from "@/Components/Copyright";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Copyright Policy",
  description:
    "How Uniscaler handles copyright, content ownership and takedown requests for material published on this site.",
  path: "/copyright",
});

export default function Page() {
  return <Copyright />;
}
