import AdminDashboard from "@/Dashboard/Admin/AdminDashboard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin Dashboard",
  description:
    "Uniscaler administration.",
  path: "/admin-dashboard",
  noIndex: true,
});

export default function Page() {
  return <AdminDashboard />;
}
