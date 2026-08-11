import { notFound } from "next/navigation";
import { studyAbroadCountries } from "@/lib/studyAbroadData";
import { pageMetadata } from "@/lib/seo";
import CountryPageClient from "./CountryPageClient";

// Pre-render all 9 country slugs at build time → no SSR hit at runtime
export function generateStaticParams() {
  return studyAbroadCountries.map((c) => ({ country: c.slug }));
}

// params is a Promise in Next 16. Read synchronously it is undefined, which
// silently cost this route both halves of its job: generateMetadata returned
// {} so all nine countries inherited the section layout's one generic title and
// its /study-abroad canonical, and the page below fell straight through to
// notFound().
export async function generateMetadata({ params }) {
  const { country: slug } = await params;
  const country = studyAbroadCountries.find((c) => c.slug === slug);
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

export default async function CountryPage({ params }) {
  const { country: slug } = await params;
  const country = studyAbroadCountries.find((c) => c.slug === slug);
  if (!country) notFound();
  return <CountryPageClient country={country} />;
}
