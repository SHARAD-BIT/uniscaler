import DirectAdmission from "@/Components/DirectAdmission";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Direct Admission in Top Colleges",
  description:
    "Secure direct admission in management-quota and open seats at top Indian colleges. Uniscaler counsellors handle eligibility, documents and the application.",
  path: "/direct-admission",
});

export default function Page() {
  return <DirectAdmission />;
}
