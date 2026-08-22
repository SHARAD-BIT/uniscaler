import { studyAbroadCountries } from "./studyAbroadData";
import { brochureUrl } from "./brochure";

/**
 * The catalog as one flat list of programs, plus the four facets the pathway
 * listing filters on.
 *
 * Built from `studyAbroadData.js` rather than fetched or hand-listed. The
 * facets on the reference page — level of study, country, domain, program type
 * — are all already answerable from what the catalog holds, so nothing new had
 * to be sourced for this; what is offered here is what the site can actually
 * deliver. Their taxonomy is wider than ours in places (Ireland, Business
 * Analytics, Computer Science), and those are deliberately absent: a filter
 * that selects nothing is worse than one that is not there.
 */

/**
 * Bachelor's or master's, read off the qualification the title opens with.
 *
 * Regex rather than a field, because the catalog has no level on a course — the
 * only structural hint is the `Bachelors` category, and that covers 17 of the
 * 49 bachelor's programs. Anchored at the start so "Master of Business
 * Administration at DePaul" is a master's while "BS Management at Northeastern
 * University" is not caught by the "Management" in it.
 *
 * `null` is a real answer and not a fallback: eight entries are neither, being
 * certificates and youth programs ("Professional Certificate in Business
 * Management", "Universal AI Program by MIT"). They drop out of a level filter
 * instead of being forced into the wrong half of it.
 */
const BACHELORS = /^(b\.?a\.?\b|b\.?s\.?c?\.?\b|bba\b|bengg?\.?\b|bachelor)/i;
const MASTERS =
  /^(m\.?a\.?\b|m\.?s\.?c?\.?\b|mba\b|mhsa\b|mps\b|llm\b|master|executive mba|dual master)/i;
/* Two titles carry the qualification somewhere other than the front —
   "International Bachelor of Business Administration at Haaga-Helia" and
   "Digital Business Innovations BBA at Haaga-Helia". Checked only after the
   anchored patterns above, so a master's cannot be pulled into this by a stray
   word. `\b` before BBA is what keeps it off the B in MBA, where there is no
   word boundary. */
const BACHELORS_LATE = /\bbachelor|\bbba\b|\bbeng/i;

function levelOf(course, categoryName) {
  const title = course.title.trim();
  if (BACHELORS.test(title)) return "Bachelors";
  if (MASTERS.test(title)) return "Masters";
  if (BACHELORS_LATE.test(title)) return "Bachelors";
  // The category is the tiebreak, not the first test: "International Bachelor
  // of Business Administration at Haaga-Helia" sits under MBA in the catalog.
  if (categoryName === "Bachelors") return "Bachelors";
  return null;
}

/**
 * The two program types the reference offers, both of which this page already
 * knew how to answer — they are the same definitions the "Globally acclaimed
 * domains" cards on /study-abroad use, kept here as the single copy so the two
 * cannot drift into disagreeing about what counts as STEM.
 */
export const STEM_CATEGORIES = [
  "ENGINEERING",
  "Data Science",
  "AI & ML",
  "Health & Science",
];
export const INTERNSHIP_TITLE = /\b(intern|co-?op)/i;

/** Every course in the catalog, flattened, with its facets resolved once. */
export const pathwayPrograms = (() => {
  const out = [];
  for (const country of studyAbroadCountries)
    for (const category of country.categories || [])
      for (const course of category.courses || []) {
        // A guard now, not a fix — the two entries that named upGrad itself
        // as the university were removed from the catalog on 2026-08-21 (see
        // studyAbroadData.js's header; the client's rule is that the name
        // never appears). Kept in case a re-extraction brings such entries
        // back: this is a page of what Uniscaler offers.
        if (/upgrad/i.test(course.university || "")) continue;
        out.push({
          id: course.id,
          title: course.title.trim(),
          university: course.university.trim(),
          logo: course.logo,
          // Carried through for the card's "Download Brochure" button, cleaned
          // here rather than in the component so no card ever holds a URL it
          // cannot use. Two of the 205 are "" in the catalog; those fall back
          // to counselling rather than showing a button with nothing behind it.
          syllabusUrl: brochureUrl(course.syllabusUrl),
          country: country.name,
          countrySlug: country.slug,
          flag: country.flag,
          domain: category.name,
          level: levelOf(course, category.name),
          stem: STEM_CATEGORIES.includes(category.name),
          internship: INTERNSHIP_TITLE.test(course.title),
        });
      }
  return out;
})();

/**
 * Facet values with their counts, in the order the filter groups are shown.
 *
 * Counts are of the whole catalog, not of the current selection: a pill that
 * renumbered itself as you filtered would make the list feel like it was
 * shrinking for reasons you could not see, and the empty-state below already
 * says when a combination has nothing in it.
 */
const tally = (key) => {
  const counts = new Map();
  for (const p of pathwayPrograms) {
    const value = p[key];
    if (value) counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts]
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, count }));
};

export const pathwayFacets = [
  { key: "level", label: "Browse by Level of Study", options: tally("level") },
  { key: "country", label: "Browse by Country", options: tally("country") },
  { key: "domain", label: "Browse by Domain", options: tally("domain") },
  {
    key: "type",
    label: "Browse by Program Type",
    options: [
      { value: "STEM", count: pathwayPrograms.filter((p) => p.stem).length },
      {
        value: "With Internship",
        count: pathwayPrograms.filter((p) => p.internship).length,
      },
    ],
  },
];

/**
 * Applies a selection. Values within one facet are OR'd and the facets are
 * AND'd together — picking Germany and France means either country, but adding
 * MBA means an MBA in one of them. An empty facet is not a filter at all.
 */
export function filterPrograms(selection) {
  return pathwayPrograms.filter((program) => {
    for (const { key } of pathwayFacets) {
      const chosen = selection[key];
      if (!chosen || chosen.length === 0) continue;
      if (key === "type") {
        const has = chosen.some(
          (v) =>
            (v === "STEM" && program.stem) ||
            (v === "With Internship" && program.internship)
        );
        if (!has) return false;
      } else if (!chosen.includes(program[key])) {
        return false;
      }
    }
    return true;
  });
}
