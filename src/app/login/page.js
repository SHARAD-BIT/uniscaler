import Login from "@/Components/Login";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Log In",
  description:
    "Log in to your Uniscaler account to track your applications.",
  path: "/login",
  noIndex: true,
});

export default function Page() {
  return <Login />;
}
