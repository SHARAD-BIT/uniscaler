/**
 * Downloads the five photos used by the "360° support system" accordion into
 * public/study-abroad/support/, and writes their credits alongside.
 *
 *   node scripts/fetch-support-photos.mjs      (needs puppeteer, for the resize)
 *
 * Same approach, and the same reasoning, as fetch-domain-photos.mjs: Creative
 * Commons through Openverse instead of the reference's licensed stock, kept to
 * **CC BY 2.0** — commercial use permitted, attribution *required*. The
 * credits this writes into `src/lib/supportPhotoCredits.js` render in the
 * combined "Photos:" line under "Globally acclaimed domains" (the client asked
 * for no caption under the accordion's figure itself). Do not drop them from
 * that line without replacing the photos.
 *
 * `key` matches SUPPORT_ITEMS in src/app/study-abroad/page.js — one photo per
 * accordion item, swapped as the selection moves.
 *
 * Re-encoded at 900px rather than the domain cards' 720: the photo panel is
 * the right half of a 1300px row, so it renders around 630px and gets none of
 * the cards' three-up shrink.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(ROOT, "package.json"));
const puppeteer = require("puppeteer");

const OUT_DIR = join(ROOT, "public", "study-abroad", "support");
const UA = "uniscaler-asset-sync/1.0";
const WIDTH = 900;

/**
 * Chosen by eye from Openverse results (license=by), 2026-08-21. The first
 * three lean on staged, stock-look sets — NEC's "Education - Creative
 * Commons" shoot and COD Newsroom's commencement coverage, the latter already
 * the source of the undergraduate domain card — so the band reads consistent
 * with the rest of the page.
 */
const PHOTOS = [
  {
    key: "counseling",
    focal: "50% 50%",
    src: "https://live.staticflickr.com/7398/16412471166_2d5a234cb5_b.jpg",
    alt: "Two students talking across a table, one holding a tablet",
    title: "Education - Creative Commons",
    creator: "NEC Corporation of America",
  },
  {
    key: "scholarship",
    focal: "50% 40%",
    src: "https://live.staticflickr.com/2937/14035801608_9cde054c44_b.jpg",
    alt: "A graduate in cap and gown giving a thumbs-up at a commencement ceremony",
    title: "College of DuPage 2014 Commencement Ceremony 85",
    creator: "COD Newsroom",
  },
  {
    key: "ielts",
    focal: "50% 50%",
    src: "https://live.staticflickr.com/8600/16437509602_f125e20bb1_b.jpg",
    alt: "Hands typing an essay on a laptop in a library",
    title: "Education - Creative Commons",
    creator: "NEC Corporation of America",
  },

  {
    key: "loan",
    focal: "50% 50%",
    src: "https://live.staticflickr.com/8697/17309001591_b63c386161_b.jpg",
    alt: "A fan of banknotes beside a calculator",
    title: "Saving Money",
    creator: "free pictures of money",
  },

  {
    key: "visa",
    focal: "50% 50%",
    src: "https://live.staticflickr.com/2404/2094132134_f6cbda35c0_b.jpg",
    alt: "A passport page filled with immigration and visa stamps",
    title: "Passport stamps",
    creator: "madmack66",
  },
];

/** Same derivation as fetch-domain-photos.mjs — see the note there. */
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
  // Re-encode in the browser, as fetch-domain-photos.mjs does: the only image
  // pipeline this project has, and no new dependency for five files.
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
  join(ROOT, "src", "lib", "supportPhotoCredits.js"),
  `/**
 * GENERATED by scripts/fetch-support-photos.mjs — do not hand-edit.
 *
 * Attribution for the "360° support system" accordion's photos. Every one is
 * CC BY, which *requires* credit; it renders in the combined "Photos:" line
 * under "Globally acclaimed domains". Removing them from that line means
 * removing the photos.
 */
export const supportPhotoCredits = ${JSON.stringify(credits, null, 2)};
`
);
console.log("\nwrote src/lib/supportPhotoCredits.js");
