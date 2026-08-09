import Help from "@/Components/Help";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Help & Support",
  description:
    "Answers to common questions about applying through Uniscaler — accounts, applications, documents, fees and counselling.",
  path: "/help",
});

export default function Page() {
  return <Help />;
}
