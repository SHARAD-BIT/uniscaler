/**
 * Works out where each destination's pin sits on the world map and writes
 * scripts/map-pins.json, which fetch-destinations.mjs folds into the data.
 *
 *   node scripts/measure-map-pins.mjs      (needs the dev server on :3000)
 *
 * The first attempt at this took each country's bounding box and used its
 * centre. That is wrong in a way worth recording, because it looks right until
 * you check: the `us` path includes Alaska and Hawaii, so its bbox centre is in
 * the Pacific north of Canada; `fr` includes French Guiana and Réunion, which
 * drags it into the South Atlantic; `gb` reaches Shetland. Six of the nine pins
 * landed in the sea.
 *
 * So the pins are projected from real latitude and longitude instead. The map is
 * Robinson, not equirectangular — the meridians curve and the corners are
 * rounded — so a linear projection is an approximation, not the real inverse.
 * It is a good one *here*, because all nine destinations sit between roughly
 * 25°N and 65°N (plus Australia at 27°S), the band where Robinson is closest to
 * linear. Adding a destination near a pole would need this revisited; the
 * rendered check below is what would catch it.
 *
 * The two constants are solved from the map's own geometry rather than assumed:
 * two compact countries with no overseas territories, far apart in latitude,
 * whose bbox centres therefore *are* close to their real centroids. Verify the
 * result by eye — render the map with these pins on it before trusting them.
 */

import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(ROOT, "package.json"));
const puppeteer = require("puppeteer");

/** Calibration pair: compact, contiguous, far apart in latitude. */
const CALIBRATE = {
  de: { lat: 51.16, lon: 10.45 }, // Germany
  bo: { lat: -16.29, lon: -63.59 }, // Bolivia
};

/** Where each pin belongs — the country's populated centre, not its centroid. */
const PLACES = {
  us: { lat: 39.0, lon: -96.5 },
  ca: { lat: 55.0, lon: -100.0 },
  gb: { lat: 53.5, lon: -2.2 },
  ie: { lat: 53.3, lon: -7.9 },
  fr: { lat: 46.6, lon: 2.4 },
  de: { lat: 51.2, lon: 10.4 },
  fi: { lat: 62.5, lon: 26.0 },
  au: { lat: -27.0, lon: 134.0 },
  in: { lat: 22.5, lon: 79.0 },
};

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox"],
  protocolTimeout: 120000,
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

// Loaded as a document, not an <img>: getBBox() needs a live SVG DOM.
await page.goto("http://localhost:3000/study-abroad/world-map.svg", {
  waitUntil: "networkidle2",
  timeout: 90000,
});

const measured = await page.evaluate((ids) => {
  const svg = document.querySelector("svg");
  const out = {
    w: svg.width.baseVal.value || 2754,
    h: svg.height.baseVal.value || 1398,
    boxes: {},
  };
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const b = el.getBBox();
    out.boxes[id] = { cx: b.x + b.width / 2, cy: b.y + b.height / 2 };
  }
  return out;
}, Object.keys(CALIBRATE));

await browser.close();

const [a, b] = Object.keys(CALIBRATE);
const A = measured.boxes[a];
const B = measured.boxes[b];
if (!A || !B) throw new Error(`calibration paths missing: ${a}/${b}`);

// Two points, one straight line, per axis.
const sx = (A.cx - B.cx) / (CALIBRATE[a].lon - CALIBRATE[b].lon);
const x0 = A.cx - CALIBRATE[a].lon * sx;
const sy = (A.cy - B.cy) / (CALIBRATE[b].lat - CALIBRATE[a].lat);
const y0 = A.cy + CALIBRATE[a].lat * sy;

console.log(
  `calibrated: ${sx.toFixed(3)} px/deg lon, ${sy.toFixed(3)} px/deg lat ` +
    `(a true 2:1 map would be ${(measured.w / 360).toFixed(3)} both ways)`
);

const pins = {};
for (const [iso, { lat, lon }] of Object.entries(PLACES)) {
  pins[iso] = {
    x: +(((x0 + lon * sx) / measured.w) * 100).toFixed(2),
    y: +(((y0 - lat * sy) / measured.h) * 100).toFixed(2),
  };
}

await writeFile(
  join(ROOT, "scripts", "map-pins.json"),
  JSON.stringify(pins, null, 2) + "\n"
);
for (const [iso, p] of Object.entries(pins))
  console.log(`  ${iso}  ${p.x}%  ${p.y}%`);
