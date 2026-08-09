import AdminDashboard from "@/Dashboard/Admin/AdminDashboard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Uniscaler administration.",
  path: "/admin-dashboard",
  noIndex: true,
});

// Renders AdminDashboard, not DashboardUser. The old route table nested
// <Route path=":id" element={<DashboardUser />} /> under /admin-dashboard —
// almost certainly a copy-paste slip — but AdminDashboard renders no <Outlet>,
// so that child never mounted. AdminDashboard reads the URL segment itself and
// switches panels on it.
export default function Page() {
  return <AdminDashboard />;
}
