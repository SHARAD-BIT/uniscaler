// Rebuilds src/lib/universityCards.js — the card-ready view of the online
// universities grid: banner, rating, review count, average fee, typical
// duration and top course names, merged from src/lib/onlineUniversities.js
// and the JSONs in src/lib/university-details/. No network; run it after the
// extractors whenever either source changes.
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..");
const DIR = path.join(APP, "src", "lib", "university-details");

(async () => {
  const { ONLINE_UNIVERSITIES } = await import(
    "file:///" +
      path.join(APP, "src/lib/onlineUniversities.js").replace(/\\/g, "/")
  );

  const rows = ONLINE_UNIVERSITIES.map((u) => {
    let d = {};
    try {
      d = JSON.parse(fs.readFileSync(path.join(DIR, `${u.slug}.json`), "utf8"));
    } catch {
      /* card renders with what the grid row alone provides */
    }
    const courses = d.courses || [];
    const fees = courses
      .map((c) => c.fee)
      .filter((n) => typeof n === "number" && n > 0);
    const avgFee = fees.length
      ? Math.round(fees.reduce((a, b) => a + b, 0) / fees.length)
      : null;
    // The card shows one duration; take the most common one across courses.
    const tally = {};
    for (const c of courses)
      if (c.duration) tally[c.duration] = (tally[c.duration] || 0) + 1;
    const duration =
      Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return {
      name: u.name,
      slug: u.slug,
      logo: u.logo,
      location: u.location,
      courses: u.courses,
      banner: d.banner ?? null,
      rating: d.rating ?? null,
      reviews: d.reviewStats?.total ?? 0,
      avgFee,
      duration,
      courseNames: courses.slice(0, 3).map((c) => c.name),
    };
  });

  const module_ = `// GENERATED ${new Date().toISOString().slice(0, 10)} by scripts/build-university-cards.js
// from onlineUniversities.js + university-details/*.json. Regenerate with the
// script rather than hand-editing.
export const UNIVERSITY_CARDS = ${JSON.stringify(rows, null, 2)};
`;
  fs.writeFileSync(path.join(APP, "src/lib/universityCards.js"), module_);
  const noBanner = rows.filter((r) => !r.banner).length;
  const noFee = rows.filter((r) => r.avgFee == null).length;
  console.log(
    `cards: ${rows.length}, without banner: ${noBanner}, without fee: ${noFee}`
  );
})();
