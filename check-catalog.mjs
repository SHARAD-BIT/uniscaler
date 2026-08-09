/**
 * Asserts that src/lib/catalog.js still matches the client-side data it mirrors.
 *
 * catalog.js exists because AllCourse / onlineCourseDetails live in Helper.js
 * and the exam categories live inline in Components/Exam.jsx — all of which are
 * "use client" modules, whose exports a server component cannot read. That
 * duplication is only safe if it is checked, which is what this does.
 *
 * Run with `npm run check:catalog`.
 */
import fs from "node:fs";
import {
  COURSE_CATEGORIES,
  EXAM_CATEGORIES,
  ONLINE_COURSES,
} from "./src/lib/catalog.js";

const helper = fs.readFileSync("src/Helper/Helper.js", "utf8");
const exam = fs.readFileSync("src/Components/Exam.jsx", "utf8");

const names = (source, pattern) =>
  [...source.matchAll(pattern)].map((match) => match[1]);

// AllCourse[].name — the slice ends where the next export begins so the
// online-course names are not swept up with them.
const courseSource = helper.slice(
  helper.indexOf("export const AllCourse"),
  helper.indexOf("export const onlineCourseDetails")
);

const checks = [
  {
    label: "COURSE_CATEGORIES vs AllCourse in Helper.js",
    expected: names(courseSource, /name: "([^"]+)"/g),
    actual: COURSE_CATEGORIES,
  },
  {
    label: "ONLINE_COURSES vs onlineCourseDetails in Helper.js",
    // Top-level entries only: those are indented four spaces, nested `ddp`
    // entries are indented further.
    expected: names(
      helper.slice(helper.indexOf("export const onlineCourseDetails")),
      /\n    name: "([^"]+)"/g
    ),
    actual: ONLINE_COURSES,
  },
  {
    label: "EXAM_CATEGORIES vs the data array in Exam.jsx",
    // Exam.jsx matches the URL segment lowercased, and its own array mixes
    // cases ("Engineering", "law"), so compare on the same footing.
    expected: names(exam, /\n      name: "([^"]+)"/g).map((name) =>
      name.toLowerCase()
    ),
    actual: EXAM_CATEGORIES,
  },
];

let failed = false;

for (const { label, expected, actual } of checks) {
  const missing = expected.filter((name) => !actual.includes(name));
  const extra = actual.filter((name) => !expected.includes(name));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`ok    ${label} (${expected.length} entries)`);
    continue;
  }

  failed = true;
  console.error(`FAIL  ${label}`);
  if (missing.length) {
    console.error(`        missing from catalog.js: ${missing.join(", ")}`);
  }
  if (extra.length) {
    console.error(`        no longer in the source:  ${extra.join(", ")}`);
  }
}

if (failed) {
  console.error(
    "\nsrc/lib/catalog.js has drifted. Update it so /course, /exam and\n" +
      "/online-course keep generating the right pages and sitemap entries."
  );
  process.exit(1);
}
