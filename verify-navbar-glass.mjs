/**
 * Checks the navbar's frosted-glass treatment: that the blur is actually
 * applied, that content behind it really is blurred rather than merely covered,
 * that the bar stays readable, and that the effect does not break the fixed
 * position of the dropdown panels.
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3001";
const OUT = process.env.OUT || ".";

const fail = [];
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail.push(label);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(`${BASE}/college/engineering`, { waitUntil: "networkidle2" });
await page.waitForSelector("nav", { timeout: 20000 });
await page.waitForSelector(".college-card", { timeout: 20000 });
await wait(1500);

const styleOf = () =>
  page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector("nav"));
    return {
      backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
      background: cs.backgroundImage.slice(0, 60),
      shadow: cs.boxShadow,
      position: cs.position,
      sticky: document.querySelector("nav").classList.contains("sticky"),
    };
  });

const top = await styleOf();
check(
  "blur and saturate are applied at rest",
  /blur\(\d+px\)/.test(top.backdrop) && /saturate/.test(top.backdrop),
  top.backdrop
);
check("bar carries a tint layer", top.background.includes("gradient"));
check("top edge highlight present", top.shadow.includes("inset"));

// Scroll so real content passes under the bar, then confirm the pixels behind
// it are genuinely blurred: a hard edge in the page becomes a soft ramp.
await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
await wait(900);
const scrolled = await styleOf();
check("sticky state engages on scroll", scrolled.sticky);
check(
  "sticky state thickens the blur",
  parseInt(/blur\((\d+)px\)/.exec(scrolled.backdrop)?.[1] ?? 0, 10) >
    parseInt(/blur\((\d+)px\)/.exec(top.backdrop)?.[1] ?? 0, 10),
  `${top.backdrop} -> ${scrolled.backdrop}`
);

// "It just looks white." A pane of glass with content moving under it shows
// structure; a white bar is flat. Sample a strip inside the bar that none of
// its own children occupy, and require both that something is visible through
// it (spread) and that it stays light enough for the navy link text (mean).
// The bar's inner column fills its full height, so there is no clear horizontal
// band. Find the see-through pixels instead: walk across the bar and keep the
// columns where the topmost element is the bar itself, not one of its children.
const seeThrough = await page.evaluate(() => {
  const nav = document.querySelector("nav");
  const r = nav.getBoundingClientRect();
  const ys = [r.top + r.height * 0.28, r.top + r.height * 0.5, r.top + r.height * 0.78];
  const points = [];
  for (const y of ys) {
    for (let x = 2; x < window.innerWidth - 2; x += 3) {
      const el = document.elementFromPoint(x, y);
      if (el === nav || (el && el.classList.contains("wrapperBox"))) {
        points.push([Math.round(x), Math.round(y)]);
      }
    }
  }
  return points;
});
check(
  "found see-through pixels inside the bar to sample",
  seeThrough.length > 200,
  `${seeThrough.length} sample points`
);
const barShot = await page.screenshot({ encoding: "base64" });
const spread = await page.evaluate(
  async (b64, pts) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const lums = pts.map(([x, y]) => {
      const d = ctx.getImageData(x, y, 1, 1).data;
      return 0.299 * d[0] + 0.587 * d[1] + 0.114 * d[2];
    });
    const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
    const sd = Math.sqrt(
      lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length
    );
    return { mean, sd, samples: lums.length };
  },
  barShot,
  seeThrough
);
check(
  "content is visible through the bar, so it does not read as flat white",
  spread.sd > 3,
  `luminance spread ${spread.sd.toFixed(2)} across ${spread.samples} px (flat white would be ~0)`
);
check(
  "bar still light enough for the navy link text",
  spread.mean > 170,
  `mean luminance ${spread.mean.toFixed(1)}`
);

// A computed style only proves the declaration survived, not that it changes
// what is drawn. Photograph the bar, switch the filter off, photograph it
// again: if the blur were inert the two images would be identical.
// (Sampling pixel rows inside the bar does not work — those rows are mostly the
// navbar's own logo and links, not the backdrop behind it.)
// A clip rectangle is page-relative, so at scroll 700 it would photograph the
// blank top of the document rather than the bar. Shoot the viewport instead.
const withGlass = await page.screenshot();
await page.addStyleTag({
  content:
    "nav{backdrop-filter:none !important;-webkit-backdrop-filter:none !important}",
});
await wait(400);
const withoutGlass = await page.screenshot();
check(
  "the blur changes what is drawn behind the bar",
  !withGlass.equals(withoutGlass),
  `${withGlass.length} vs ${withoutGlass.length} bytes`
);
await page.reload({ waitUntil: "networkidle2" });
await page.waitForSelector("nav");
await wait(1200);

// backdrop-filter makes an element a containing block for fixed descendants.
// The nav already had a transform so this should be unchanged, but the dropdown
// is position:fixed and would jump if it were not.
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await wait(600);
// The panel opens on CSS :hover, which a dispatched MouseEvent does not
// trigger — it stays display:none and every measurement comes back 0, which
// would pass a containment check for the wrong reason. Move the real pointer.
const triggerBox = await page.evaluate(() => {
  const trigger = [...document.querySelectorAll("nav .menu-links .links > li")].find(
    (li) => li.querySelector(".subMenuList, .sub-menu")
  );
  if (!trigger) return null;
  const r = trigger.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});

if (triggerBox) {
  await page.mouse.move(triggerBox.x, triggerBox.y);
  await wait(600);
  const dropdown = await page.evaluate(() => {
    const panel = document.querySelector("nav .subMenuList, nav .sub-menu");
    const r = panel.getBoundingClientRect();
    return {
      left: r.left,
      width: r.width,
      display: getComputedStyle(panel).display,
      viewport: window.innerWidth,
    };
  });
  check(
    "dropdown actually opened, so the next check means something",
    dropdown.display !== "none" && dropdown.width > 100,
    `display ${dropdown.display}, width ${dropdown.width.toFixed(0)}px`
  );
  check(
    "dropdown still sits inside the viewport",
    dropdown.left >= -1 && dropdown.left + dropdown.width <= dropdown.viewport + 1,
    `left ${dropdown.left.toFixed(0)}, right ${(dropdown.left + dropdown.width).toFixed(0)}, viewport ${dropdown.viewport}`
  );
  await page.mouse.move(0, 400);
  await wait(300);
} else {
  console.log("SKIP  dropdown check — no sub-menu trigger found");
}

await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
await wait(700);
await page.screenshot({ path: `${OUT}/navbar-glass.png` });

// ---- mobile drawer -------------------------------------------------------
// The drawer is a child of the bar, and the bar has backdrop-filter. That makes
// the bar a backdrop root, which can leave a descendant's own backdrop-filter
// sampling nothing but its parent's background. Whether the drawer's blur does
// anything therefore has to be measured, not assumed.
await page.setViewport({ width: 420, height: 900 });
await wait(600);
await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
await wait(600);
await page.evaluate(() =>
  document.querySelector("nav .menu-links").classList.add("active")
);
await wait(900);

const drawer = await page.evaluate(() => {
  const el = document.querySelector("nav .menu-links");
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
    open: r.width > 100 && r.height > 100,
    box: { x: r.left, y: r.top, w: r.width, h: r.height },
  };
});
check("drawer opens at mobile width", drawer.open, `${drawer.box.w}x${drawer.box.h}`);
check(
  "drawer declares its own blur",
  /blur\(24px\)/.test(drawer.backdrop),
  drawer.backdrop
);

const drawerWith = await page.screenshot();
await page.addStyleTag({
  content:
    "nav .menu-links{backdrop-filter:none !important;-webkit-backdrop-filter:none !important}",
});
await wait(500);
const drawerWithout = await page.screenshot();
check(
  "drawer blur changes what is drawn (not cancelled by the bar's backdrop root)",
  !drawerWith.equals(drawerWithout),
  `${drawerWith.length} vs ${drawerWithout.length} bytes`
);

// Whatever the blur does, the links must stay readable: sample the drawer's
// lower area, away from its own text, and require it to be close to white.
await page.reload({ waitUntil: "networkidle2" });
await page.waitForSelector("nav");
await wait(1200);
await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
await page.evaluate(() =>
  document.querySelector("nav .menu-links").classList.add("active")
);
await wait(900);
const shot = await page.screenshot({ encoding: "base64" });
const luminance = await page.evaluate(async (b64) => {
  const img = new Image();
  img.src = `data:image/png;base64,${b64}`;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  c.getContext("2d").drawImage(img, 0, 0);
  const d = c.getContext("2d").getImageData(0, 700, img.width, 60).data;
  let min = 255;
  let sum = 0;
  for (let i = 0; i < d.length; i += 4) {
    const l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    min = Math.min(min, l);
    sum += l;
  }
  return { mean: sum / (d.length / 4), min };
}, shot);
check(
  "page behind the drawer does not bleed through",
  luminance.mean > 225,
  `mean luminance ${luminance.mean.toFixed(1)}, darkest ${luminance.min.toFixed(0)}`
);

await page.screenshot({ path: `${OUT}/navbar-drawer-glass.png` });

await browser.close();
console.log(fail.length ? `\n${fail.length} FAILED` : "\nall checks passed");
process.exit(fail.length ? 1 : 0);
