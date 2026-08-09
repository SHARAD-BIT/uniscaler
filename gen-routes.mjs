/**
 * Generates the app/ route tree from the old App.jsx route table.
 *
 * Each page is a thin wrapper around the ported component. No params are
 * threaded through, because the original uses useParams zero times — every
 * page reads either the pathname or the navigation state.
 */
import fs from "fs";
import path from "path";

const APP = path.join(process.cwd(), "src", "app");

// [route path, component import path, component name]
const ROUTES = [
  ["", "@/Components/Home", "Home"],
  ["about", "@/Components/About", "About"],
  ["college", "@/Components/College", "College"],
  ["college/[detail]", "@/Components/CollegeSearch", "CollegeSearch"],
  ["exam", "@/Components/Exam", "Exam"],
  ["exam/[name]", "@/Utils/ExamList", "ExamList"],
  ["blogs", "@/Components/Blogs", "Blogs"],
  ["blogs/[name]", "@/Components/BlogsContent", "BlogsContent"],
  ["college-search-by-location/[location]", "@/Components/CollegeByLocation", "CollegeByLocation"],
  ["course", "@/Components/Course", "Course"],
  ["course/[name]", "@/Components/Course", "Course"],
  ["help", "@/Components/Help", "Help"],
  ["report", "@/Components/Report", "Report"],
  ["copyright", "@/Components/Copyright", "Copyright"],
  ["privacy-policy", "@/Components/PrivacyPolicy", "PrivacyPolicy"],
  ["contact", "@/Components/ContactUs", "ContactUs"],
  ["terms-and-conditions", "@/Components/Term", "Term"],
  ["videos", "@/Components/Videos", "Videos"],
  ["register", "@/Components/Register", "Register"],
  ["login", "@/Components/Login", "Login"],
  ["admission", "@/Components/Admission", "Admission"],
  ["direct-admission", "@/Components/DirectAdmission", "DirectAdmission"],
  ["college-info/[college]", "@/Components/CollegeInfo", "CollegeInfo"],
  ["education-loan", "@/Components/EducationLoan", "EducationLoan"],
  ["scholarship", "@/Components/Scholarship", "Scholarship"],
  ["college-details/[id]", "@/Components/CollegeDetails", "CollegeDetails"],
  ["common-application-form", "@/Components/CommonApplication", "CommonApplication"],
  ["caf-details/[id]", "@/Components/CAFDetails", "CAFDetails"],
  ["user-dashboard", "@/Dashboard/User/DashboardUser", "DashboardUser"],
  ["user-dashboard/[id]", "@/Dashboard/User/DashboardUser", "DashboardUser"],
  ["admin-dashboard", "@/Dashboard/Admin/AdminDashboard", "AdminDashboard"],
  ["admin-dashboard/[id]", "@/Dashboard/User/DashboardUser", "DashboardUser"],
  ["refer-and-earn", "@/Components/Referral", "Referral"],
  ["refund-policy", "@/Components/Refund", "Refund"],
  ["ai", "@/Components/Ai", "Ai"],
  ["online-course/[name]", "@/Components/OnlineCourse", "OnlineCourse"],
];

let made = 0;
for (const [route, importPath, name] of ROUTES) {
  const dir = route ? path.join(APP, ...route.split("/")) : APP;
  fs.mkdirSync(dir, { recursive: true });
  const body = `import ${name} from "${importPath}";

export default function Page() {
  return <${name} />;
}
`;
  fs.writeFileSync(path.join(dir, "page.js"), body);
  made++;
}

// Catch-all 404, replacing the old <Route path="*" element={<PageNotFound />} />
fs.writeFileSync(
  path.join(APP, "not-found.js"),
  `import PageNotFound from "@/Helper/PageNotFound";

export default function NotFound() {
  return <PageNotFound />;
}
`
);

// Route-level error boundary, replacing errorElement={<Error />}
fs.writeFileSync(
  path.join(APP, "error.js"),
  `"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
`
);

// The old app showed <Loader /> via Suspense at the router root.
fs.writeFileSync(
  path.join(APP, "loading.js"),
  `import Loader from "@/Utils/Loader";

export default function Loading() {
  return <Loader />;
}
`
);

console.log(`generated ${made} page.js files + not-found, error, loading`);
