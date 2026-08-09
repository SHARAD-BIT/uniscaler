"use client";
import { RiWhatsappLine } from "react-icons/ri";
import Link from "next/link";

import "./styles/whatsapp.css";
const WhatsApp = () => {
  const message =
    "Hello! I hope this message finds you well. I'm reaching out to inquire about Colleges. I'm interested in learning more about the programs offered, admission requirements, and any upcoming events or campus tours. Could you please provide me with more information or direct me to someone who can assist me further? Thank you in advance for your help!";

  const encodedMessage = encodeURIComponent(message);
  return (
    <div className="whatsapp">
      <Link href={`https://wa.me/919667956655?text=${encodedMessage}`}
        target="_blank"
      >
        <RiWhatsappLine size={"1.5rem"} /> Need Help ?
      </Link>
    </div>
  );
};

export default WhatsApp;
