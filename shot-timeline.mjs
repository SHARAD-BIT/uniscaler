/**
 * Captures the search box at several points after load, to catch a transient
 * unstyled/collapsed state rather than the settled one.
 */
import puppeteer from "puppeteer";

const OUT = process.env.OUT || ".";
const TARGETS = [
  { name: "original", url: "http://localhost:5000/" },
  { name: "next", url: "http://localhost:3001/" },
];
const MARKS = [0, 150, 400, 900, 2000];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const t of TARGETS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  console.log(`\n=== ${t.name} ===`);

  await page.goto(t.url, { waitUntil: "domcontentloaded" });

  let last = 0;
  for (const m of MARKS) {
    await new Promise((r) => setTimeout(r, m - last));
    last = m;
    const s = await page.evaluate(() => {
      const set = document.querySelector(".searchSet");
      if (!set) return null;
      const r = set.getBoundingClientRect();
      const input = set.querySelector("input");
      const ir = input ? input.getBoundingClientRect() : null;
      return {
        set: `${Math.round(r.width)}x${Math.round(r.height)}`,
        input: ir ? `${Math.round(ir.width)}x${Math.round(ir.height)}` : "-",
        sheets: document.styleSheets.length,
      };
    });
    console.log(`  t=${String(m).padStart(4)}ms  set=${s ? s.set.padEnd(10) : "(absent)".padEnd(10)} input=${s ? s.input.padEnd(10) : "-"} stylesheets=${s ? s.sheets : "-"}`);
  }

  const el = await page.$(".searchSet");
  if (el) await el.screenshot({ path: `${OUT}/search-${t.name}.png` });
  await page.close();
}

await browser.close();
