/**
 * Downloads the four student photos used by the "Globally acclaimed domains"
 * cards into public/study-abroad/domains/, and writes their credits alongside.
 *
 *   node scripts/fetch-domain-photos.mjs      (needs puppeteer, for the resize)
 *
 * WHY THESE IMAGES AND NOT upGRAD'S
 *
 * The reference design fronts each card with licensed stock photography. These
 * are Creative Commons instead, found through Openverse and filtered to
 * commercial-use licences. All four are **CC BY 2.0**, which permits commercial
 * use and adaptation and *requires attribution* — so the section renders a
 * credit line, fed by the `src/lib/domainPhotoCredits.js` this writes. Do not
 * drop that line without replacing the images.
 *
 * `focal` is the CSS `object-position` for each. The card panel is 16:11 and
 * these were not shot for it — the internships photo is portrait, and a centred
 * crop of it framed an empty brick wall with the subject cut off underneath.
 *
 * CC BY-SA candidates were rejected on purpose. Share-alike is fine for
 * displaying a photo untouched, but these are cropped to a 16:11 panel and
 * tinted, which is arguably an adaptation — and an adaptation of BY-SA has to
 * carry the same licence. Not a fight worth having over a card header.
 *
 * The originals are ~1024px and the card renders around 300px wide, so each is
 * re-encoded to 720px WebP here rather than shipping four full-size JPEGs.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(ROOT, "package.json"));
const puppeteer = require("puppeteer");

const OUT_DIR = join(ROOT, "public", "study-abroad", "domains");
const UA = "uniscaler-asset-sync/1.0";
const WIDTH = 720;

/**
 * Chosen by eye from Openverse results — see the contact sheets in the
 * 2026-08-13 CHANGELOG entry for what was rejected and why. `key` matches
 * GOAL_DOMAINS in src/app/study-abroad/page.js.
 */
const PHOTOS = [
  {
    key: "management",
    focal: "50% 16%",
    src: "https://live.staticflickr.com/2936/14387367072_85312c31b3_b.jpg",
    alt: "A young professional in a blazer, smiling",
    title: "business woman",
    creator: "citirecruitment",
  },
  {
    key: "stem",
    focal: "50% 32%",
    src: "https://live.staticflickr.com/4036/4500255129_8110733d18_b.jpg",
    alt: "University students gathered around laboratory equipment",
    title: "Truman University Students Visit NASA Goddard",
    creator: "NASA Goddard Photo and Video",
  },
  {
    key: "undergraduate",
    focal: "50% 24%",
    src: "https://live.staticflickr.com/2940/14222463315_5b8361dd4f_b.jpg",
    alt: "A graduating student in cap and gown at a commencement ceremony",
    title: "College of DuPage 2014 Commencement Ceremony",
    creator: "COD Newsroom",
  },
  {
    key: "internships",
    focal: "50% 60%",
    src: "https://live.staticflickr.com/65535/47977792257_8bc784708f_b.jpg",
    alt: "A young woman working at a laptop",
    title: "Geschäftsfrau arbeitet am Laptop im modernen Büro",
    creator: "Ivan Radic",
  },
];

/**
 * Every one of these is a Flickr static URL, whose filename begins with the
 * photo id — so the canonical page is derivable and needs no second request.
 * The earlier version asked Openverse to look each one up by filename, which
 * matches nothing there and quietly produced credits reading "?".
 */
const flickrPage = (src) => {
  const id = (src.split("/").pop() || "").split("_")[0];
  if (!/^\d+$/.test(id)) throw new Error(`cannot derive a source page from ${src}`);
  return `https://www.flickr.com/photo.gne?id=${id}`;
};

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox"],
  protocolTimeout: 180000,
});
const page = await browser.newPage();

await mkdir(OUT_DIR, { recursive: true });
const credits = [];

for (const p of PHOTOS) {
  // Re-encode in the browser: it is the only image pipeline this project has,
  // and adding sharp for four files would be a dependency for a one-off.
  const dataUrl = await page.evaluate(
    async (src, width) => {
      const img = await new Promise((res, rej) => {
        const i = new Image();
        i.crossOrigin = "anonymous";
        i.onload = () => res(i);
        i.onerror = () => rej(new Error("image failed to load"));
        i.src = src;
      });
      const scale = width / img.naturalWidth;
      const c = document.createElement("canvas");
      c.width = width;
      c.height = Math.round(img.naturalHeight * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/webp", 0.82);
    },
    p.src,
    WIDTH
  );

  const bytes = Buffer.from(dataUrl.split(",")[1], "base64");
  await writeFile(join(OUT_DIR, `${p.key}.webp`), bytes);

  credits.push({
    key: p.key,
    alt: p.alt,
    focal: p.focal,
    title: p.title,
    creator: p.creator,
    source: flickrPage(p.src),
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  });
  console.log(
    `${p.key.padEnd(14)} ${(bytes.length / 1024).toFixed(0).padStart(4)}KB  ${p.creator}  CC BY 2.0`
  );
}

await browser.close();

await writeFile(
  join(ROOT, "src", "lib", "domainPhotoCredits.js"),
  `/**
 * GENERATED by scripts/fetch-domain-photos.mjs — do not hand-edit.
 *
 * Attribution for the four card photos in "Globally acclaimed domains". Every
 * one is CC BY, which *requires* credit, so the section renders this. Removing
 * the credit line means removing the photos.
 */
export const domainPhotoCredits = ${JSON.stringify(credits, null, 2)};
`
);
console.log("\nwrote src/lib/domainPhotoCredits.js");
