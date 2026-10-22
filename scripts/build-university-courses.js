// Rebuilds src/lib/universityCourses.js — university name -> its real online
// course names — from the JSONs in src/lib/university-details/. No network:
// run it after scripts/extract-university-details.js whenever those change.
// The Common Application Form's Online mode reads this so its course
// dropdowns hold what each university actually runs.
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..");
const DIR = path.join(APP, "src", "lib", "university-details");

(async () => {
  const { ONLINE_UNIVERSITIES } = await import(
    "file:///" +
      path.join(APP, "src/lib/onlineUniversities.js").replace(/\\/g, "/")
  );
  const map = {};
  for (const u of ONLINE_UNIVERSITIES) {
    try {
      const d = JSON.parse(
        fs.readFileSync(path.join(DIR, `${u.slug}.json`), "utf8")
      );
      map[u.name] = (d.courses || []).map((c) => c.name).filter(Boolean);
    } catch {
      map[u.name] = [];
    }
  }
  const module_ = `// GENERATED ${new Date().toISOString().slice(0, 10)} by scripts/build-university-courses.js
// from src/lib/university-details/*.json: university name -> the course names
// it actually runs. Regenerate with the script rather than hand-editing.
export const UNIVERSITY_COURSES = ${JSON.stringify(map, null, 2)};
`;
  fs.writeFileSync(path.join(APP, "src/lib/universityCourses.js"), module_);
  const empty = Object.values(map).filter((v) => !v.length).length;
  console.log(
    `universities: ${Object.keys(map).length}, without courses: ${empty}`
  );
})();
