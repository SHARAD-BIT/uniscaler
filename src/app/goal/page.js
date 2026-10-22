import OnlineUniversities from "@/Utils/OnlineUniversities";
import { pageMetadata } from "@/lib/seo";
import "./goal.css";

export const metadata = pageMetadata({
  title: "100+ Online Universities — UGC-Approved",
  description:
    "Browse 100+ UGC-approved online universities across India — compare course counts, locations and accreditation to find the one that fits your goal.",
  keywords:
    "online universities india, ugc approved online university, online degree university list",
  path: "/goal",
});

export default function Page() {
  return (
    <main className="top goalPage">
      <OnlineUniversities heading="h1" />
    </main>
  );
}
