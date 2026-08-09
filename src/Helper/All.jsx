"use client";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";

import { RiWhatsappFill } from "react-icons/ri";
import "./styles/all.css"
const All = () => {
  return (
    <section className="all">
      <Link href="tel:+919667956655">
        <BiSolidPhoneCall /> Call Us
      </Link>
      <Link href="https://wa.me/+919667956655?text=hi">
        <RiWhatsappFill /> Chat Now
      </Link>
    </section>
  );
};

export default All;
