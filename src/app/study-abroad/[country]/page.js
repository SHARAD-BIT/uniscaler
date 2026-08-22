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
  // Only the fields CountryPageClient reads. Passed whole, every course also
  // carried syllabusUrl (upgrad-abroad-files S3 links) and programPackageKey
  // ("…-upgra-…" keys) into the page's serialized props — never rendered,
  // but sitting in the page source, and the client's rule (2026-08-21) is
  // that the name appears nowhere. Slimming also drops ~10KB of URLs a page.
  const slim = {
    name: country.name,
    slug: country.slug,
    flag: country.flag,
    totalPrograms: country.totalPrograms,
    categories: (country.categories || []).map((cat) => ({
      name: cat.name,
      courses: (cat.courses || []).map(
        ({ id, title, university, logo }) => ({ id, title, university, logo })
      ),
    })),
  };
  return <CountryPageClient country={slim} />;
}
