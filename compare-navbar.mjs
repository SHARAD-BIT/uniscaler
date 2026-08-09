/**
 * Compares the "More" submenu between the original Vite build (served by
 * Express on :5000) and the Next port on :3001, by hovering the menu in a real
 * browser and reading back the computed styles.
 */
import puppeteer from "puppeteer";

const TARGETS = [
  { name: "ORIGINAL (Vite via Express)", url: "http://localhost:5000/" },
  { name: "NEXT", url: "http://localhost:3001/" },
];

const inspect = async (page, url) => {
  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2500));

  return page.evaluate(() => {
    // Find the <li> whose own text is "More"
    const lis = [...document.querySelectorAll("nav li")];
    const li = lis.find((el) => {
      const own = [...el.childNodes]
        .map((n) => (n.nodeType === 3 ? n.textContent : n.className === "link" ? n.textContent : ""))
        .join("")
        .trim();
      return /^more$/i.test(own);
    });
    if (!li) return { found: false };

    const sub = li.querySelector(".sub-menu");
    if (!sub) return { found: true, hasSubmenu: false };

    const before = getComputedStyle(sub);
    const snapshot = (cs) => ({
      scale: cs.scale,
      transform: cs.transform,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      position: cs.position,
      zIndex: cs.zIndex,
    });

    const result = { found: true, hasSubmenu: true, idle: snapshot(before) };
    result.linkCount = sub.querySelectorAll("a").length;
    result.rect = (() => {
      const r = sub.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    })();
    return result;
  });
};

const hoverAndMeasure = async (page) =>
  page.evaluate(() => {
    const lis = [...document.querySelectorAll("nav li")];
    const li = lis.find((el) => {
      const own = [...el.childNodes]
        .map((n) => (n.nodeType === 3 ? n.textContent : n.className === "link" ? n.textContent : ""))
        .join("")
        .trim();
      return /^more$/i.test(own);
    });
    if (!li) return null;
    const sub = li.querySelector(".sub-menu");
    if (!sub) return null;
    // Force the hover state via a synthetic match: read the rule that applies
    // on :hover by temporarily adding a class we mirror in a style tag.
    const style = document.createElement("style");
    style.textContent = `.__force_hover .sub-menu { scale: 1 !important; }`;
    document.head.appendChild(style);
    li.classList.add("__force_hover");
    const cs = getComputedStyle(sub);
    const r = sub.getBoundingClientRect();
    const out = {
      scale: cs.scale,
      rect: { w: Math.round(r.width), h: Math.round(r.height) },
    };
    li.classList.remove("__force_hover");
    style.remove();
    return out;
  });

const run = async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  for (const t of TARGETS) {
    console.log(`\n=== ${t.name} ===`);
    try {
      const idle = await inspect(page, t.url);
      if (!idle.found) {
        console.log("  'More' <li> not found");
        continue;
      }
      if (!idle.hasSubmenu) {
        console.log("  no .sub-menu inside it");
        continue;
      }
      console.log(`  submenu links: ${idle.linkCount}`);
      console.log(`  idle   scale=${idle.idle.scale}  size=${idle.rect.w}x${idle.rect.h}  visibility=${idle.idle.visibility}  display=${idle.idle.display}`);
      const hovered = await hoverAndMeasure(page);
      if (hovered) {
        console.log(`  forced scale=1 -> size=${hovered.rect.w}x${hovered.rect.h}`);
      }
    } catch (e) {
      console.log("  ERROR:", e.message);
    }
  }

  await browser.close();
};

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
