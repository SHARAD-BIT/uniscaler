import { studyAbroadCountries } from "./studyAbroadData";
import { pathwayProgramDetails } from "./pathwayProgramDetails";
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

/**
 * Post-study work eligibility per destination, for the listing card's
 * "Post Study Work Visa Eligibility" line — the reference carries the same
 * line on its cards. These are the standard published routes (OPT, UK
 * Graduate Route, PGWP, subclass 485, the German job-seeker permit, APS,
 * Ireland's 1G, and Hungary's job-search stay), stated as "up to" figures
 * as of mid-2026. Immigration rules move: verify against the official
 * route before quoting a figure anywhere weightier than this card. UAE has
 * no standard post-study route (work visas are employer-sponsored), so it
 * is absent and the card simply omits the line.
 */
export const POST_STUDY_WORK = {
  "United States": "Up to 12 months (3 years with STEM OPT)",
  "United Kingdom": "Up to 2 years",
  Canada: "Up to 3 years",
  Australia: "Up to 3 years",
  Germany: "Up to 18 months",
  France: "Up to 2 years",
  Ireland: "Up to 2 years",
  Finland: "Up to 2 years",
  Hungary: "Up to 9 months",
};

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
        // Durations, fees and visa months, where the one-time extraction has
        // them (184 of 197 keys) — the card omits what is absent.
        const details =
          pathwayProgramDetails[course.programPackageKey] || {};
        const searchText = [
          course.title,
          course.university,
          country.name,
          category.name,
        ]
          .join(" ")
          .toLowerCase();
        out.push({
          // Precomputed for searchPrograms below — one normalisation at
          // module load instead of one per keystroke per program.
          searchText,
          searchWords: searchText.split(/[^a-z0-9&]+/).filter(Boolean),
          onlineMonths: details.onlineMonths || null,
          campusMonths: details.campusMonths || null,
          onlineFee: details.onlineFee || null,
          campusFee: details.campusFee || null,
          visaMonths: details.visaMonths || null,
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
 * Levenshtein distance with a ceiling: the loop abandons a row the moment
 * every cell exceeds `max`, because the caller only asks "within 1 or 2
 * edits?", never "how far exactly?".
 */
function editDistanceAtMost(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      next[j] = Math.min(next[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      if (next[j] < rowMin) rowMin = next[j];
    }
    if (rowMin > max) return false;
    prev = next;
  }
  return prev[b.length] <= max;
}

/**
 * Elastic-style search over the flat list, client-side — for 203 static
 * programs a search server would be infrastructure with nothing to do, so
 * the behaviour people mean by it lives here instead: every query word must
 * match somewhere in the program's title, university, country or domain
 * (AND across words), where "match" is a substring hit or, for words of
 * four letters and up, a typo-tolerant one (edit distance 1, or 2 from
 * seven letters — "managment" finds Management, "germny" finds Germany).
 * Results come back ranked: whole-word and prefix hits above mid-word
 * substrings above fuzzy rescues.
 */
export function searchPrograms(list, query) {
  const tokens = (query || "")
    .toLowerCase()
    .split(/[^a-z0-9&]+/)
    .filter(Boolean);
  if (!tokens.length) return list;

  const scoreToken = (program, token) => {
    if (program.searchWords.includes(token)) return 4;
    if (program.searchWords.some((w) => w.startsWith(token))) return 3;
    if (program.searchText.includes(token)) return 2;
    if (token.length >= 4) {
      const max = token.length >= 7 ? 2 : 1;
      if (
        program.searchWords.some((w) => editDistanceAtMost(token, w, max))
      )
        return 1;
    }
    return 0;
  };

  const scored = [];
  for (const program of list) {
    let total = 0;
    let all = true;
    for (const token of tokens) {
      const s = scoreToken(program, token);
      if (s === 0) {
        all = false;
        break;
      }
      total += s;
    }
    if (all) scored.push([total, program]);
  }
  return scored.sort((a, b) => b[0] - a[0]).map(([, program]) => program);
}

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
