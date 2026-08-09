import DashboardUser from "@/Dashboard/User/DashboardUser";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "My Dashboard",
  description: "Track your applications and profile on Uniscaler.",
  path: "/user-dashboard",
  noIndex: true,
});

export default function Page() {
  return <DashboardUser />;
}
