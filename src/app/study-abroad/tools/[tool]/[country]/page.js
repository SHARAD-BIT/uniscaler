import { notFound } from "next/navigation";
import { COST_COUNTRIES } from "@/lib/studyAbroadTools";
import { pageMetadata } from "@/lib/seo";
import CostWizardClient from "./CostWizardClient";
import LoanWizardClient from "./LoanWizardClient";

/**
 * Per-country pages for the two tools that have them — cost-of-living's
 * question wizard and education-loan's eligibility form. Both draw on the
 * same ten destinations (COST_COUNTRIES), so the params are the cross
 * product of these two tools and those slugs (bottom-up generation covers
 * both segments; see the Next docs on multiple dynamic segments). Any
 * other tool/country combination 404s.
 */
const COUNTRY_TOOLS = ["cost-of-living", "education-loan"];

export function generateStaticParams() {
  return COUNTRY_TOOLS.flatMap((tool) =>
    COST_COUNTRIES.map((c) => ({ tool, country: c.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { tool, country: slug } = await params;
  const country = COST_COUNTRIES.find((c) => c.slug === slug);
  if (!COUNTRY_TOOLS.includes(tool) || !country) return {};

  if (tool === "education-loan") {
    return pageMetadata({
      title: `${country.card} Education Loan Calculator`,
      description: `Estimate the education loan you could be eligible for to study in ${country.key} — co-applicant income, expenses and collateral in, an indicative amount and EMI out.`,
      path: `/study-abroad/tools/education-loan/${country.slug}`,
      keywords: [
        `education loan for ${country.key.toLowerCase()}`,
        "education loan calculator",
        "study abroad tools",
      ],
    });
  }

  return pageMetadata({
    title: `${country.card} Cost of Living Calculator`,
    description: `Estimate your monthly living costs as a student in ${country.key}, in rupees — answer a few quick questions and edit any line of the result.`,
    path: `/study-abroad/tools/cost-of-living/${country.slug}`,
    keywords: [
      `cost of living in ${country.key.toLowerCase()}`,
      "cost of living calculator",
      "study abroad tools",
    ],
  });
}

export default async function ToolCountryPage({ params }) {
  const { tool, country: slug } = await params;
  const country = COST_COUNTRIES.find((c) => c.slug === slug);
  if (!COUNTRY_TOOLS.includes(tool) || !country) notFound();
  if (tool === "education-loan") return <LoanWizardClient slug={slug} />;
  return <CostWizardClient slug={slug} />;
}
