/**
 * Drives the real search page and asserts the three dropdowns now behave as
 * independent AND-ed filters rather than one shared search term.
 */
import puppeteer from "puppeteer";

const URL = "http://localhost:3001/college/engineering";
const OUT = process.env.OUT || ".";
const GRP = ".college-search .grid-view .filter .filter-btn .grp";

const norm = (v) => String(v ?? "").trim().replace(/s+/g, " ").toLowerCase();
const fail = [];
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail.push(label);
};

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(URL, { waitUntil: "networkidle2" });
await page.waitForSelector(".college-card", { timeout: 20000 });
await new Promise((r) => setTimeout(r, 1500));

const cardState = () =>
  page.evaluate(() =>
    [...document.querySelectorAll(".college-card")].map((card) => ({
      name: card.querySelector("h3")?.textContent.trim(),
      location: card.querySelector(".chip.place")?.textContent.trim(),
      courses: [...card.querySelectorAll(".course-tags span")].map((s) =>
        s.textContent.trim()
      ),
    }))
  );

const openMenu = async (index) => {
  await page.evaluate(
    (sel, i) => document.querySelectorAll(`${sel} label`)[i].click(),
    GRP,
    index
  );
  await new Promise((r) => setTimeout(r, 250));
};

const optionsOf = (index) =>
  page.evaluate(
    (sel, i) =>
      [...document.querySelectorAll(`${sel}`)[i].querySelectorAll(".select input")]
        .map((el) => el.value),
    GRP,
    index
  );

const pickOption = async (index, value) => {
  await page.evaluate(
    (sel, i, v) => {
      const el = [
        ...document.querySelectorAll(`${sel}`)[i].querySelectorAll(".select input"),
      ].find((n) => n.value === v);
      el.click();
    },
    GRP,
    index,
    value
  );
  await new Promise((r) => setTimeout(r, 400));
};

const labelValue = (index) =>
  page.evaluate(
    (sel, i) =>
      document
        .querySelectorAll(`${sel} label`)
        [i].querySelector("span:last-child").textContent.trim(),
    GRP,
    index
  );

const chips = () =>
  page.evaluate(() =>
    [...document.querySelectorAll(".filter-summary .filter-chip")].map((b) =>
      b.textContent.replace("×", "").trim()
    )
  );

// ---------------------------------------------------------------- baseline
const before = await cardState();
check("page renders result cards", before.length > 0, `${before.length} cards`);

// ------------------------------------------------- course options come from
// ------------------------------------------------- every course, not just [0]
await openMenu(1);
const courseOptions = await optionsOf(1);
const totalDistinctCourses = new Set(before.flatMap((c) => c.courses)).size;
check(
  "course dropdown lists more than one option per college",
  courseOptions.length >= totalDistinctCourses,
  `${courseOptions.length} options vs ${before.length} colleges`
);
await openMenu(1); // close

// ---------------------------------------------------------- location filter
await openMenu(0);
const locationOptions = await optionsOf(0);
check("location dropdown has options", locationOptions.length > 0, locationOptions.join(", "));
const pickedLocation = locationOptions[0];
await pickOption(0, pickedLocation);

const afterLocation = await cardState();
check(
  "selected location shows in the label",
  norm(await labelValue(0)) === norm(pickedLocation),
  await labelValue(0)
);
check(
  "every remaining card is in that location",
  afterLocation.length > 0 &&
    afterLocation.every((c) => norm(c.location) === norm(pickedLocation)),
  `${afterLocation.length} cards`
);

// ------------------------------------------- second filter must ADD, not replace
await openMenu(1);
const narrowedCourses = await optionsOf(1);
check(
  "course options narrowed to the chosen location",
  narrowedCourses.length > 0 && narrowedCourses.length <= courseOptions.length,
  `${narrowedCourses.length} of ${courseOptions.length}`
);
const pickedCourse = narrowedCourses.find((v) => v !== "All locations") ?? narrowedCourses[0];
await pickOption(1, pickedCourse);

const afterBoth = await cardState();
check(
  "location survives picking a course (AND, not overwrite)",
  norm(await labelValue(0)) === norm(pickedLocation),
  `location label = ${await labelValue(0)}`
);
check(
  "both filters appear as chips",
  (await chips()).length === 2,
  (await chips()).join(" | ")
);
check(
  "results satisfy both filters at once",
  afterBoth.length > 0 &&
    afterBoth.every(
      (c) =>
        norm(c.location) === norm(pickedLocation) &&
        c.courses.some((t) => norm(t) === norm(pickedCourse))
    ),
  `${afterBoth.length} cards for ${pickedLocation} + ${pickedCourse}`
);
check(
  "narrowing two filters returns no more than one",
  afterBoth.length <= afterLocation.length,
  `${afterBoth.length} <= ${afterLocation.length}`
);

await page.screenshot({ path: `${OUT}/filters-active.png`, fullPage: false });

// ------------------------------------------------------------------- reset
await page.evaluate(() =>
  document.querySelector(".filter-summary .clear-all").click()
);
await new Promise((r) => setTimeout(r, 400));
const afterClear = await cardState();
check(
  "clear all restores the unfiltered result set",
  afterClear.length === before.length,
  `${afterClear.length} vs ${before.length}`
);
check("labels reset to placeholder", (await labelValue(0)) === "Search...");

await browser.close();
console.log(fail.length ? `\n${fail.length} FAILED` : "\nall checks passed");
process.exit(fail.length ? 1 : 0);
