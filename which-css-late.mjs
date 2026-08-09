/**
 * Identifies which stylesheet arrives after first paint, and whether it is the
 * one carrying the search-box rules.
 */
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 768 });

const cssResponses = [];
page.on("response", (r) => {
  if (r.url().endsWith(".css")) cssResponses.push({ url: r.url(), t: Date.now() });
});

const t0 = Date.now();
await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });

const atDCL = await page.evaluate(() =>
  [...document.styleSheets].map((s) => s.href).filter(Boolean)
);
console.log(`stylesheets present at DOMContentLoaded: ${atDCL.length}`);

await new Promise((r) => setTimeout(r, 2500));

const atSettle = await page.evaluate(() =>
  [...document.styleSheets].map((s) => s.href).filter(Boolean)
);
console.log(`stylesheets after settle          : ${atSettle.length}`);

const late = atSettle.filter((h) => !atDCL.includes(h));
console.log(`\narrived late: ${late.length}`);
for (const h of late) {
  const path = h.replace("http://localhost:3001", "");
  const body = await page.evaluate(async (u) => {
    const r = await fetch(u);
    return r.text();
  }, h);
  const hasSearch = /\.searchSet/.test(body);
  console.log(`  ${path}  size=${body.length}  contains .searchSet: ${hasSearch ? "YES" : "no"}`);
  if (hasSearch) {
    const m = body.match(/\.searchSet[^{]*\{[^}]*\}/);
    console.log(`     ${m ? m[0].slice(0, 120) : ""}`);
  }
}

// Are the late ones referenced by <link> in the served HTML, or injected later?
const inHtml = await page.evaluate(() =>
  [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute("href"))
);
console.log(`\n<link rel=stylesheet> tags in DOM now: ${inHtml.length}`);

await browser.close();
