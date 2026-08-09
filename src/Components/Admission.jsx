"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useEffect } from "react";
import ApplyForm from "../Utils/ApplyForm";
import NewsLetter from "../Decorators/NewsLetter";
import "./styles/admission.css";
const Admission = () => {
  const { navState: state } = useNavigationState();
  const navigate = useRouter();
  useEffect(() => {
    const title = document.title;
    if (!state) {
      navigate.replace("/");
    }
    document.title = `Get Admission in ${state?.name} - Uniscaler`;
    window.scrollTo(0, 0);
    return () => {
      document.title = title;
    };
  }, []);
  // No navigation state means this page was opened directly. The effect above
  // redirects; render nothing until it does, rather than dereferencing null.
  if (!state) return null;
  return (
    <main className="top admission">
      <h1>
        Get admission in{" "}
        <span style={{ color: "var(--accent)" }}>{state?.name}</span>
      </h1>
      <ApplyForm name={state?.name} />
      <NewsLetter />
    </main>
  );
};

export default Admission;
