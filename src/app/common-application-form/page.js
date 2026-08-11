// The card landing page this route used to render is still there, untouched, in
// CommonApplication.jsx — swapping the import back is the whole revert.
import CommonApplicationForm from "@/Components/CommonApplicationForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Common Application Form",
  description:
    "One form, many colleges. Fill the Uniscaler Common Application Form once and apply to multiple colleges without repeating your details.",
  path: "/common-application-form",
});

export default function Page() {
  return <CommonApplicationForm />;
}
