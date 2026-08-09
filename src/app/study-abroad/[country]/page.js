import { notFound } from "next/navigation";
import { studyAbroadCountries } from "@/lib/studyAbroadData";
import { pageMetadata } from "@/lib/seo";
import CountryPageClient from "./CountryPageClient";

// Pre-render all 9 country slugs at build time → no SSR hit at runtime
export function generateStaticParams() {
  return studyAbroadCountries.map((c) => ({ country: c.slug }));
}

export function generateMetadata({ params }) {
  const country = studyAbroadCountries.find((c) => c.slug === params.country);
  if (!country) return {};

  return pageMetadata({
    title: `Study in ${country.name} — ${country.totalPrograms}+ Programs`,
    description: `Explore ${country.totalPrograms} internationally accredited degree programs in ${country.name}. Top universities, 98% admit rate, expert visa counseling.`,
    path: `/study-abroad/${country.slug}`,
    keywords: [
      `study in ${country.name}`,
      `${country.name} universities`,
      `MBA in ${country.name}`,
      "study abroad",
      "international education",
    ],
  });
}

export default function CountryPage({ params }) {
  const country = studyAbroadCountries.find((c) => c.slug === params.country);
  if (!country) notFound();
  return <CountryPageClient country={country} />;
}
