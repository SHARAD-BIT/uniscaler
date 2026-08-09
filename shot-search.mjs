/**
 * Screenshots the hero text block from both apps so they can be compared
 * visually, and dumps every CSS rule the browser resolved for the search input.
 */
import puppeteer from "puppeteer";
import fs from "fs";

const OUT = process.env.OUT || ".";
const TARGETS = [
  { name: "original", url: "http://localhost:5000/" },
  { name: "next", url: "http://localhost:3001/" },
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 768 });

for (const t of TARGETS) {
  await page.goto(t.url, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => {
    const p = document.querySelector(".popup");
    if (p) p.remove();
    document.body.style.overflow = "auto";
  });

  const el = await page.$(".text-wrapper");
  if (el) {
    await el.screenshot({ path: `${OUT}/hero-${t.name}.png` });
    console.log(`wrote hero-${t.name}.png`);
  }

  const rules = await page.evaluate(() => {
    const input = document.querySelector(".searchSet input");
    if (!input) return null;
    const matched = [];
    for (const sheet of document.styleSheets) {
      let list;
      try {
        list = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of list) {
        if (!rule.selectorText) continue;
        try {
          if (input.matches(rule.selectorText)) {
            matched.push(rule.selectorText + " { " + rule.style.cssText.slice(0, 160) + " }");
          }
        } catch {}
      }
    }
    return matched;
  });

  console.log(`\n--- ${t.name}: rules matching .searchSet input (${rules ? rules.length : 0}) ---`);
  (rules || []).forEach((r) => console.log("   " + r));
}

await browser.close();
