import ContactUs from "@/Components/ContactUs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Talk to a Uniscaler counsellor about colleges, courses, fees or admission deadlines. Call, WhatsApp or send us your question and we will get back to you.",
  path: "/contact",
});

export default function Page() {
  return <ContactUs />;
}
