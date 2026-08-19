/**
 * Pulls every image the Study Abroad catalog references down into `public/` and
 * rewrites `src/lib/studyAbroadData.js` to point at the local copies.
 *
 * Run it again after refreshing the catalog:  node scripts/fetch-study-abroad-assets.mjs
 * It is idempotent — a URL already rewritten to a local path is skipped, and a
 * file already on disk is not re-downloaded unless --force is passed.
 *
 * WHY THIS EXISTS
 * The catalog shipped with every flag and university logo hot-linked straight
 * off upGrad's own infrastructure. Two different failure modes followed:
 *
 *   - The nine country flags pointed at `assets-sa.upgrad.com/767/_next/static/
 *     media/...`, which is a Next.js *build* directory. Those filenames carry a
 *     content hash that changes on every deploy upGrad makes, so the links rot
 *     on somebody else's release schedule. Eight of the nine were already dead
 *     (404 -> Chrome reports ERR_BLOCKED_BY_ORB and the flag renders 0x0); only
 *     UAE still resolved. That is what the blank boxes in the country list were.
 *
 *   - The 82 university logos on `d2o2utebsixu4k.cloudfront.net` mostly still
 *     resolved, but two did not survive the trip through a browser: their URLs
 *     contain characters (`+`, a space) that curl sends literally and Chrome
 *     percent-encodes, and the CDN answers 403 to the encoded form. Saving them
 *     under sanitised filenames removes the ambiguity entirely.
 *
 * The flags are NOT re-fetched from upGrad — a fresh hash would rot the same
 * way. They come from flagcdn.com, keyed off an explicit slug -> ISO 3166-1
 * alpha-2 map below. That map is also the fix for a data bug: Hungary was
 * pointing at Germany's flag file.
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = join(ROOT, "src", "lib", "studyAbroadData.js");
const PUBLIC_DIR = join(ROOT, "public", "study-abroad");
const FORCE = process.argv.includes("--force");

/**
 * Country slug -> ISO 3166-1 alpha-2. Explicit rather than derived: the catalog
 * slugs are upGrad's ("uae", "united-kingdom"), they do not map to ISO codes by
 * any rule, and a wrong guess here puts the wrong flag on a country silently.
 */
const FLAG_CODES = {
  "united-states": "us",
  germany: "de",
  france: "fr",
  "united-kingdom": "gb",
  finland: "fi",
  australia: "au",
  canada: "ca",
  uae: "ae",
  hungary: "hu",
};

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

/**
 * A filename that survives both a shell and a browser: the URL's own basename,
 * percent-decoded first (so `%20` and a literal space collapse to the same
 * name), then reduced to the characters that never need encoding.
 */
function localName(url) {
  let base = decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
  base = base.replace(/\+/g, "-").replace(/[^A-Za-z0-9.\-_]/g, "-");
  return base.replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
}

async function download(url, dest) {
  if (!FORCE && (await exists(dest))) return "cached";
  const res = await fetch(url, {
    // The CDN is fussy about a bare fetch; a normal UA is what the browser that
    // these URLs were scraped from would have sent.
    headers: { "User-Agent": "Mozilla/5.0 (uniscaler asset sync)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = Buffer.from(await res.arrayBuffer());
  // A CDN error page served as 200 would otherwise be written out as an "image"
  // and fail silently at render time, which is the failure we are here to fix.
  if (body.length < 64) throw new Error(`suspiciously small (${body.length}B)`);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, body);
  return `${body.length}B`;
}

let source = await readFile(DATA_FILE, "utf8");
const failures = [];
let flagCount = 0;
let logoCount = 0;

// ---- flags -------------------------------------------------------------
// Matched by the slug on the line above, not by the flag URL itself: the URLs
// are exactly what is wrong here (Hungary shares Germany's), so they cannot be
// the key. `slug` is unique per country and sits directly above `flag`.
for (const [slug, code] of Object.entries(FLAG_CODES)) {
  const pattern = new RegExp(
    `("slug":\\s*"${slug}",\\s*\\n\\s*"flag":\\s*")([^"]+)(")`
  );
  const match = source.match(pattern);
  if (!match) {
    failures.push([slug, "no flag field found next to this slug"]);
    continue;
  }
  const local = `/study-abroad/flags/${slug}.svg`;
  try {
    const size = await download(
      `https://flagcdn.com/${code}.svg`,
      join(PUBLIC_DIR, "flags", `${slug}.svg`)
    );
    if (match[2] !== local) {
      source = source.replace(pattern, `$1${local}$3`);
      console.log(`flag  ${slug.padEnd(16)} ${code}  ${size}`);
    }
    flagCount++;
  } catch (err) {
    failures.push([slug, `flagcdn/${code}: ${err.message}`]);
  }
}

// ---- university logos --------------------------------------------------
const logoUrls = [
  ...new Set(
    [...source.matchAll(/"logo":\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1])
  ),
];

for (const url of logoUrls) {
  const name = localName(url);
  try {
    const size = await download(url, join(PUBLIC_DIR, "logos", name));
    // Split/join rather than a regex: these URLs contain `+`, `(` and `?`, all
    // of which are regex metacharacters.
    source = source.split(`"${url}"`).join(`"/study-abroad/logos/${name}"`);
    logoCount++;
    if (size !== "cached") console.log(`logo  ${name.padEnd(58)} ${size}`);
  } catch (err) {
    failures.push([name, err.message]);
  }
}

await writeFile(DATA_FILE, source);

console.log(
  `\n${flagCount}/9 flags, ${logoCount}/${logoUrls.length} logos now local.`
);
if (failures.length) {
  console.log(`\n${failures.length} could not be fetched — left pointing at the CDN:`);
  for (const [name, why] of failures) console.log(`  ${name}: ${why}`);
}
