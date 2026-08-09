import EducationLoan from "@/Components/EducationLoan";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Education Loan for Students",
  description:
    "Compare education loan options for Indian and overseas study — interest rates, collateral, moratorium and eligibility — and apply with help from Uniscaler.",
  path: "/education-loan",
});

export default function Page() {
  return <EducationLoan />;
}
