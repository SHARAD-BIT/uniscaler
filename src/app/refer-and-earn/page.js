import Referral from "@/Components/Referral";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refer & Earn",
  description:
    "Refer a friend to Uniscaler and earn rewards when they secure admission. Share your referral link and track your rewards.",
  path: "/refer-and-earn",
});

export default function Page() {
  return <Referral />;
}
