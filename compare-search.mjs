/**
 * Compares the hero search box between the original Vite build (Express :5000)
 * and the Next port (:3001), reading computed styles from a real browser.
 */
import puppeteer from "puppeteer";

const TARGETS = [
  { name: "ORIGINAL (Vite via Express)", url: "http://localhost:5000/" },
  { name: "NEXT", url: "http://localhost:3001/" },
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

for (const t of TARGETS) {
  console.log(`\n=== ${t.name} ===`);
  await page.goto(t.url, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.evaluate(() => {
    const p = document.querySelector(".popup");
    if (p) p.remove();
  });

  const out = await page.evaluate(() => {
    const set = document.querySelector(".searchSet");
    if (!set) return { found: false };
    const input = set.querySelector("input");
    const btn = set.querySelector("button");
    const pick = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        padding: cs.padding,
        fontSize: cs.fontSize,
        maxWidth: cs.maxWidth,
        display: cs.display,
        borderRadius: cs.borderRadius,
      };
    };
    // Walk up the ancestors: if .searchSet measures right but looks clipped,
    // the constraint is above it.
    const chain = [];
    let el = set;
    for (let i = 0; i < 5 && el && el !== document.body; i++) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      chain.push({
        tag: el.tagName + (el.className ? "." + String(el.className).split(" ")[0] : ""),
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        overflow: cs.overflow,
        height: cs.height,
        maxHeight: cs.maxHeight,
        display: cs.display,
        flex: cs.flex,
      });
      el = el.parentElement;
    }

    return { found: true, set: pick(set), input: pick(input), button: pick(btn), chain };
  });

  if (!out.found) {
    console.log("  .searchSet not found");
    continue;
  }
  for (const k of ["set", "input", "button"]) {
    const v = out[k];
    if (!v) continue;
    console.log(`  ${k.padEnd(7)} size=${v.size.padEnd(12)} padding=${v.padding.padEnd(22)} font=${v.fontSize.padEnd(8)} maxW=${v.maxWidth}`);
  }
  console.log("  ancestors:");
  out.chain.forEach((c, i) =>
    console.log(
      `    ${"  ".repeat(i)}${c.tag.padEnd(24)} size=${c.size.padEnd(12)} h=${c.height.padEnd(10)} overflow=${c.overflow.padEnd(8)} display=${c.display}`
    )
  );
}

await browser.close();
