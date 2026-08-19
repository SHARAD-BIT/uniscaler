/**
 * Builds the "One path, multiple destinations" section's data and assets.
 *
 *   node scripts/fetch-destinations.mjs
 *
 * Produces:
 *   src/lib/studyAbroadDestinations.js   — the eight destination cards
 *   public/study-abroad/world-map.svg    — the map behind them
 *   public/study-abroad/flags/ireland.svg
 *
 * WHAT IS AND IS NOT TAKEN FROM upGrad
 *
 * The card copy — country name, the course list, the one-line economy claim —
 * is read out of upgrad.com/study-abroad, the same source the main catalog in
 * `studyAbroadData.js` was extracted from.
 *
 * Their **images are not**. Each of their cards is fronted by a licensed stock
 * photograph of the city, and their world map is their own artwork; copying
 * either onto a client site is a licensing problem, not a technical one. So:
 *
 *   - the map is Wikimedia Commons' `BlankMap-World.svg`, which is public
 *     domain, Robinson-projected, and — the reason it is worth 1MB — carries an
 *     ISO 3166-1 alpha-2 `id` on every country path, so the destinations can be
 *     highlighted by id instead of having pins guessed on top of a flat image;
 *   - the card photos are left empty. Every entry has `photo: null`, and the
 *     component falls back to a flag-on-gradient panel. Drop licensed images
 *     into `public/study-abroad/cities/` and fill the field in to use them.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public", "study-abroad");
const OUT = join(ROOT, "src", "lib", "studyAbroadDestinations.js");
const SOURCE = "https://www.upgrad.com/study-abroad/";
const MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/4/4d/BlankMap-World.svg";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36";

/**
 * Their country label -> our slug and ISO code. Explicit because the two do not
 * agree: they write "UK", the catalog uses `united-kingdom`, and the map path is
 * `gb`. Ireland is new — it is a destination here but has no programs in the
 * catalog, so it has no page to link to and the card links to /contact.
 */
const COUNTRIES = [
  { label: "USA", name: "USA", slug: "united-states", iso: "us" },
  { label: "Germany", name: "Germany", slug: "germany", iso: "de" },
  { label: "France", name: "France", slug: "france", iso: "fr" },
  { label: "Finland", name: "Finland", slug: "finland", iso: "fi" },
  { label: "UK", name: "UK", slug: "united-kingdom", iso: "gb" },
  { label: "Canada", name: "Canada", slug: "canada", iso: "ca" },
  { label: "Australia", name: "Australia", slug: "australia", iso: "au" },
  { label: "Ireland", name: "Ireland", slug: "ireland", iso: "ie" },
];

/**
 * Which parameters of each path command are coordinates, and on which axis.
 * `null` means "not a coordinate" — an arc's radii and flags, which must be
 * rounded but never carry error, since they are not positions.
 */
const PARAMS = {
  m: ["x", "y"],
  l: ["x", "y"],
  t: ["x", "y"],
  h: ["x"],
  v: ["y"],
  c: ["x", "y", "x", "y", "x", "y"],
  s: ["x", "y", "x", "y"],
  q: ["x", "y", "x", "y"],
  a: [null, null, null, null, null, "x", "y"],
  z: [],
};

/**
 * Cuts path coordinates to one decimal place. The map is 2754 units wide and is
 * displayed around 700px, so one unit is a quarter of a pixel — 0.1 of a unit is
 * far below anything visible, and this is a little over half the file.
 *
 * The catch is that this map is drawn almost entirely in *relative* commands
 * (`m`, `c`), where rounding each number on its own accumulates: a thousand
 * segments each rounded 0.04 the same way walks the coastline off by 40 units.
 * So each axis carries its rounding error forward into the next coordinate,
 * which keeps absolute positions correct no matter how long the chain is.
 * Absolute commands re-anchor the position, so the residual resets there.
 */
function roundPath(d) {
  const out = [];
  let cmd = "";
  let residual = { x: 0, y: 0 };
  let paramIndex = 0;

  for (const token of d.match(/[a-zA-Z]|-?[\d.]+(?:e-?\d+)?/g) || []) {
    if (/[a-zA-Z]/.test(token)) {
      cmd = token;
      paramIndex = 0;
      if (token === token.toUpperCase()) residual = { x: 0, y: 0 };
      out.push(token);
      continue;
    }

    const spec = PARAMS[cmd.toLowerCase()] || [];
    const axis = spec.length ? spec[paramIndex % spec.length] : null;
    paramIndex++;

    const value = parseFloat(token);
    if (!axis || cmd === cmd.toUpperCase()) {
      out.push(trim(Math.round(value * 10) / 10));
      continue;
    }
    const carried = value + residual[axis];
    const rounded = Math.round(carried * 10) / 10;
    residual[axis] = carried - rounded;
    out.push(trim(rounded));
  }

  // Re-emit compactly: a space only where two numbers would otherwise run
  // together, none before or after a command letter.
  let s = "";
  for (const t of out) {
    if (/[a-zA-Z]/.test(t)) s += t;
    else s += (s && /[\d.]$/.test(s) ? "," : "") + t;
  }
  return s;
}

const trim = (n) => String(n).replace(/^(-?)0\./, "$1.");

const decode = (s) =>
  s
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/’/g, "'")
    .trim();

// ── 1. the card copy ────────────────────────────────────────────────────────
console.log(`reading ${SOURCE}`);
const html = await fetch(SOURCE, { headers: { "User-Agent": UA } }).then((r) => {
  if (!r.ok) throw new Error(`source returned HTTP ${r.status}`);
  return r.text();
});

// Their markup wraps each fact in a bare <span>. Anchoring on the country label
// and taking the next two is far more stable than matching their utility-class
// soup, which is generated and changes on every deploy.
const spans = [...html.matchAll(/<span>([^<]{2,90})<\/span>/g)].map((m) =>
  decode(m[1])
);

const destinations = [];
for (const c of COUNTRIES) {
  const at = spans.indexOf(c.label);
  if (at === -1 || !spans[at + 1] || !spans[at + 2]) {
    console.log(`  ! ${c.label}: not found in the page — skipped`);
    continue;
  }
  destinations.push({
    name: c.name,
    slug: c.slug,
    iso: c.iso,
    courses: spans[at + 1],
    highlight: spans[at + 2],
    // Their first card is badged; nothing else on the page is.
    topChoice: c.slug === "united-states",
    photo: null,
  });
}
console.log(`  ${destinations.length}/${COUNTRIES.length} cards read`);

// ── 2. the map ──────────────────────────────────────────────────────────────
console.log("fetching world map (public domain, Wikimedia Commons)");
let map = await fetch(MAP_URL, { headers: { "User-Agent": UA } }).then((r) => {
  if (!r.ok) throw new Error(`map returned HTTP ${r.status}`);
  return r.text();
});

const before = map.length;
map = map
  .replace(/<metadata[\s\S]*?<\/metadata>/g, "")
  .replace(/<sodipodi:namedview[\s\S]*?\/>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/\s(inkscape|sodipodi):[\w-]+="[^"]*"/g, "")
  .replace(/\n\s*\n/g, "\n");

map = map.replace(/ d="([^"]+)"/g, (_, d) => ` d="${roundPath(d)}"`);

// The source file carries `width="2754" height="1398"` and **no viewBox**, so it
// has no intrinsic aspect ratio to scale by — set a width on it and it renders a
// crop rather than a smaller map. Everything downstream (responsive sizing, the
// percentage pin overlay) depends on this line.
const size = map.match(/width="(\d+)"[\s\S]{0,200}?height="(\d+)"/);
if (!size) throw new Error("map has neither viewBox nor width/height to derive one from");
map = map.replace(/<svg/, `<svg viewBox="0 0 ${size[1]} ${size[2]}"`);

// Styles go inside the file rather than on the page, because the map is served
// as an <img> — a 1MB inline SVG in the HTML would be paid for on every render,
// and nothing here needs to be interactive.
// The source ships its own stylesheet, which paints countries by class at a
// specificity our rules would have to fight. Dropping it is simpler than
// out-ranking it, and nothing else in the file depends on it.
map = map.replace(/<style id="style_css_sheet"[\s\S]*?<\/style>/g, "");

// Selectors are `#xx path`, not `#xx`. Every country here is a <g> wrapping its
// paths (France is a <g> inside a <g>), and a bare `path` rule sets fill on the
// paths directly — which beats a colour merely inherited from an ancestor group.
// The first attempt used `#in { fill }` and India came out the same grey as
// everywhere else. `#in path` is (1,0,1) and wins outright.
const isoList = destinations.map((d) => d.iso);
// `circle` as well as `path`: the map draws its 103 smallest islands as circles,
// and styling only paths left every one of them at the SVG default fill — a
// scatter of black dots across all four oceans once the source stylesheet was
// removed.
const style = `<style>
  path, circle { fill:#e7e9ee; stroke:#ffffff; stroke-width:1.1; stroke-linejoin:round; }
  ${isoList.map((i) => `#${i} path, #${i} circle`).join(", ")} { fill:#f6c9cb; }
  #in path, #in circle { fill:#ef4b52; }
</style>`;
map = map.replace(/(<svg[^>]*>)/, `$1\n${style}`);

await mkdir(PUBLIC_DIR, { recursive: true });
await writeFile(join(PUBLIC_DIR, "world-map.svg"), map);
console.log(
  `  world-map.svg ${(before / 1024) | 0}KB -> ${(map.length / 1024) | 0}KB`
);

// ── 3. Ireland's flag — it is a destination but not in the catalog ──────────
const ie = await fetch("https://flagcdn.com/ie.svg", {
  headers: { "User-Agent": UA },
}).then((r) => (r.ok ? r.arrayBuffer() : null));
if (ie) {
  await mkdir(join(PUBLIC_DIR, "flags"), { recursive: true });
  await writeFile(join(PUBLIC_DIR, "flags", "ireland.svg"), Buffer.from(ie));
  console.log("  flags/ireland.svg");
} else {
  console.log("  ! ireland flag could not be fetched");
}

// ── 4. pin positions ────────────────────────────────────────────────────────
// Left as a hand-maintained table rather than computed here: it is read off the
// map's own geometry by `scripts/measure-map-pins.mjs`, which needs a browser to
// call getBBox(). Values are percentages of the map box.
const PINS = JSON.parse(
  await readFile(join(ROOT, "scripts", "map-pins.json"), "utf8").catch(
    () => "{}"
  )
);
for (const d of destinations) d.pin = PINS[d.iso] || null;
const missing = destinations.filter((d) => !d.pin).map((d) => d.iso);
if (missing.length)
  console.log(`  ! no pin position for: ${missing.join(", ")} — run scripts/measure-map-pins.mjs`);

// ── 5. write the module ─────────────────────────────────────────────────────
const file = `/**
 * Destination cards for the "One path, multiple destinations" section.
 *
 * GENERATED by scripts/fetch-destinations.mjs — do not hand-edit; re-run it.
 * Card copy is read from upgrad.com/study-abroad. \`photo\` is deliberately null
 * on every entry: their cards use licensed stock photography we have no right
 * to, so the component falls back to a flag panel. Put licensed images in
 * public/study-abroad/cities/ and set the field to use them.
 *
 * \`pin\` is {x, y} as a percentage of public/study-abroad/world-map.svg, read
 * off that file's own country geometry — see scripts/map-pins.json.
 */
export const studyAbroadDestinations = ${JSON.stringify(destinations, null, 2)};
`;
await writeFile(OUT, file);
console.log(`\nwrote ${destinations.length} destinations to src/lib/studyAbroadDestinations.js`);
