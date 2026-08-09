import Scholarship from "@/Components/Scholarship";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scholarships for Indian Students",
  description:
    "Government and private scholarships for Indian students — eligibility, award amount, deadlines and how to apply.",
  path: "/scholarship",
});

export default function Page() {
  return <Scholarship />;
}
