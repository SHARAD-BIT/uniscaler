import Register from "@/Components/Register";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Create an Account",
  description:
    "Create a free Uniscaler account to apply to colleges, save shortlists and track your admission status.",
  path: "/register",
  noIndex: true,
});

export default function Page() {
  return <Register />;
}
