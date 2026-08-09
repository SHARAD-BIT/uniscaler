/**
 * Renders the search box at several viewport heights in both apps, to find the
 * size at which the Next port diverges from the original.
 */
import puppeteer from "puppeteer";

const OUT = process.env.OUT || ".";
const SIZES = [
  { w: 1366, h: 768 },
  { w: 1366, h: 640 },
  { w: 1366, h: 600 },
  { w: 1280, h: 600 },
];
const TARGETS = [
  { name: "original", url: "http://localhost:5000/" },
  { name: "next", url: "http://localhost:3001/" },
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const s of SIZES) {
  console.log(`\n=== ${s.w}x${s.h} ===`);
  for (const t of TARGETS) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto(t.url, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 2000));
    await page.evaluate(() => {
      const p = document.querySelector(".popup");
      if (p) p.remove();
    });

    const m = await page.evaluate(() => {
      const set = document.querySelector(".searchSet");
      if (!set) return null;
      const r = set.getBoundingClientRect();
      const input = set.querySelector("input");
      const btn = set.querySelector("button");
      const ir = input && input.getBoundingClientRect();
      const br = btn && btn.getBoundingClientRect();
      const tw = document.querySelector(".text-wrapper");
      const twr = tw && tw.getBoundingClientRect();
      return {
        set: `${Math.round(r.width)}x${Math.round(r.height)}`,
        input: ir ? `${Math.round(ir.width)}x${Math.round(ir.height)}` : "-",
        button: br ? `${Math.round(br.width)}x${Math.round(br.height)}` : "-",
        wrapper: twr ? `${Math.round(twr.width)}x${Math.round(twr.height)}` : "-",
      };
    });
    console.log(
      `  ${t.name.padEnd(9)} set=${m.set.padEnd(10)} input=${m.input.padEnd(10)} button=${m.button.padEnd(10)} wrapper=${m.wrapper}`
    );
    if (s.h === 640) {
      const el = await page.$(".text-wrapper");
      if (el) await el.screenshot({ path: `${OUT}/h640-${t.name}.png` });
    }
    await page.close();
  }
}

await browser.close();
