import Report from "@/Components/Report";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Report a Problem",
  description:
    "Found wrong college information, a broken page or misleading content? Report it and the Uniscaler team will review it.",
  path: "/report",
});

export default function Page() {
  return <Report />;
}
