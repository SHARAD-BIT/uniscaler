/**
 * Server-safe copies of the category lists that drive /course/[name] and
 * /exam/[name].
 *
 * The data itself lives in client modules — AllCourse in Helper.js (which is
 * "use client") and the exam array inline in Components/Exam.jsx. Every export
 * of a "use client" module becomes a client reference in the RSC graph, so a
 * server component that imported AllCourse would get a proxy, not an array.
 * These are the slugs only, which is all generateMetadata and
 * generateStaticParams need.
 *
 * Keep in sync when a category is added: the lists are asserted against their
 * sources by `npm run check:catalog`.
 */

/** Matches AllCourse[].name in src/Helper/Helper.js. */
export const COURSE_CATEGORIES = [
  "medical",
  "engineering",
  "management",
  "computer",
  "law",
  "finance",
  "design",
  "arts",
  "commerce",
  "architecture",
  "biotechnology",
  "agriculture",
  "hotel-management",
  "mass-communication",
  "education",
  "pharmacy",
  "aviation",
  "environment",
  "journalism",
  "animation",
  "nursing",
  "tourism",
];

/**
 * Matches data[].name in src/Components/Exam.jsx.
 *
 * Exam.jsx lowercases the URL segment before comparing, so these are stored
 * lowercase and the route matches case-insensitively — "/exam/Engineering" and
 * "/exam/engineering" resolve to the same category, as they already do today.
 */
export const EXAM_CATEGORIES = [
  "engineering",
  "medical",
  "law",
  "architecture",
  "commerce",
  "science",
  "management",
  "it",
  "pharmacy",
  "design",
  "art",
  "aviation",
  "biotechnology",
  "communication",
];

/** Matches onlineCourseDetails[].name in src/Helper/Helper.js. */
export const ONLINE_COURSES = [
  "BBA",
  "BCA",
  "MBA",
  "MCA",
  "M.Com",
  "MSc. Applied Mathematics",
  "MA – English Language Teaching",
  "MA – Journalism and Mass Communication",
  "MA – Clinical Psychology",
  "MSW",
];

/**
 * Links are built as `name.replace(/\s/g, "-")`, so the URL segment for an
 * online course is not the name verbatim. Resolving a segment back to a name
 * has to undo that.
 */
export function findOnlineCourse(segment) {
  if (!segment) return null;
  const wanted = decodeURIComponent(String(segment)).toLowerCase();
  return (
    ONLINE_COURSES.find(
      (name) => name.replace(/\s/g, "-").toLowerCase() === wanted
    ) ?? null
  );
}
