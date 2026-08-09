import Admission from "@/Components/Admission";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apply for Admission",
  description:
    "Start your college admission with Uniscaler. Share your details once and our counsellors match you with colleges that fit your marks, budget and preferred course.",
  path: "/admission",
});

export default function Page() {
  return <Admission />;
}
