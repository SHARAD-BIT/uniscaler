/**
 * Builds the site-wide Open Graph share image: 1200x630 (the 1.91:1 that
 * WhatsApp / Facebook / LinkedIn render as a large banner rather than a
 * thumbnail), kept well under the ~600KB WhatsApp gives up on.
 *
 * Run: node make-og-image.mjs   →   public/og-image.jpg
 *
 * Everything here comes from assets already in public/, so the share image
 * cannot drift from the brand:
 *   - the logo is the supplied master artwork,
 *     public/2429_150425_uniscaler_BS-SVG-01.svg, rasterised — not redrawn. An
 *     earlier pass hand-traced it from the stale mainLogo.png and got both
 *     halves wrong; the real mark is a U in #2A40D1 blue and #09CC58 green, not
 *     the brown and navy bowl that file still shows.
 *   - the photo is public/heroImg.jpg, the same creative HeroSection renders as
 *     heroImg.webp.
 *
 * The background is white because the mark's white negative space — the raised
 * arms and the gap around them — is part of the drawing. On a colour it fills
 * in and the figure disappears. The site puts the logo on a white navbar for
 * the same reason.
 */
import sharp from "sharp";
import path from "node:path";

const PUB = "c:/Users/akshi/Desktop/uniscaler/uniscaler/public";
const OUT = path.join(PUB, "og-image.jpg");

const W = 1200;
const H = 630;

const PHOTO_W = 600;
const PHOTO_X = W - PHOTO_W;

// The creative, cropped to exactly the panel's 600:630 so nothing is squeezed.
// top=200 drops its baked-in "Uniscaler!" line, which would otherwise sit
// opposite the real wordmark on the left; what remains is what the homepage
// shows — the student, the "Har sapne ka Pehla Kadam" card, and the icons.
const photo = await sharp(path.join(PUB, "heroImg.jpg"))
  .extract({ left: 132, top: 200, width: 838, height: 880 })
  .resize(PHOTO_W, H, { fit: "cover" })
  .toBuffer();

// The supplied master artwork, per the client. Note it letters the wordmark
// "UniScaler" with a capital S, where the site's own mainLogo.svg /
// uniscalerWordmark.svg read "Uniscaler" — this file is the authority.
//
// Its viewBox is 0 0 1000 1000 but the ink is a band across the middle, so it
// is rendered large and trimmed to its own extent (2083x2083 of canvas down to
// 1642x283 of drawing) before being scaled. Resizing without that would size
// the empty square and leave a logo a fraction of the intended width.
const LOGO_W = 280;
const logo = await sharp(
  path.join(PUB, "2429_150425_uniscaler_BS-SVG-01.svg"),
  { density: 150 }
)
  .trim()
  .resize({ width: LOGO_W })
  .toBuffer();

const FONT = "Segoe UI, Arial, Helvetica, sans-serif";

const canvas = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect x="${PHOTO_X - 4}" y="0" width="4" height="${H}" fill="#09CC58"/>
</svg>`);

const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_X}" height="${H}">
  <text x="76" y="250" font-family="${FONT}" font-size="46" font-weight="700"
        fill="#111C3A" letter-spacing="-0.8">Discover top colleges</text>
  <text x="76" y="306" font-family="${FONT}" font-size="46" font-weight="700"
        fill="#111C3A" letter-spacing="-0.8">&amp; universities in India</text>

  <rect x="76" y="342" width="76" height="5" rx="2.5" fill="#09CC58"/>

  <text x="76" y="404" font-family="${FONT}" font-size="24" font-weight="400"
        fill="#4A5670">Compare courses, fees and placements.</text>
  <text x="76" y="442" font-family="${FONT}" font-size="24" font-weight="400"
        fill="#4A5670">Free counselling for every applicant.</text>

  <text x="76" y="522" font-family="${FONT}" font-size="23" font-weight="600"
        fill="#2A40D1" letter-spacing="1.2">uniscaler.in</text>
</svg>`);

await sharp(canvas)
  .composite([
    { input: photo, left: PHOTO_X, top: 0 },
    { input: logo, left: 76, top: 92 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(OUT);

const { width, height } = await sharp(OUT).metadata();
const { size } = await import("node:fs").then((fs) => fs.statSync(OUT));
console.log(`wrote ${OUT} — ${width}x${height}, ${(size / 1024).toFixed(0)} KB`);
