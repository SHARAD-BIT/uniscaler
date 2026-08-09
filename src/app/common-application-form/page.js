import CommonApplication from "@/Components/CommonApplication";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Common Application Form",
  description:
    "One form, many colleges. Fill the Uniscaler Common Application Form once and apply to multiple colleges without repeating your details.",
  path: "/common-application-form",
});

export default function Page() {
  return <CommonApplication />;
}
