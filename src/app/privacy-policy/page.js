import PrivacyPolicy from "@/Components/PrivacyPolicy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What personal data Uniscaler collects, why we collect it, how long we keep it, and the choices you have over it.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicy />;
}
