/**
 * Real mouse clicks on the FAQ, with the scroll allowed to settle first.
 * globals.css sets `scroll-behavior: smooth`, so scrollIntoView animates and
 * coordinates read immediately afterwards are stale.
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3001";
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(BASE, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2000));
await page.evaluate(() => {
  const p = document.querySelector(".popup");
  if (p) p.remove();
  document.body.style.overflow = "auto";
});

const settleScroll = async () => {
  let last = -1;
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) return y;
    last = y;
    await new Promise((r) => setTimeout(r, 100));
  }
  return last;
};

const scrollToFaq = async (index) => {
  await page.evaluate((i) => {
    document.querySelectorAll(".faq-item")[i].scrollIntoView({ block: "center" });
  }, index);
  await settleScroll();
};

const state = () =>
  page.evaluate(() =>
    [...document.querySelectorAll(".faq-item")]
      .map((i, n) => `${n}:${i.classList.contains("active") ? "OPEN" : "closed"}`)
      .join("  ")
  );

const clickPart = async (index, part) => {
  await scrollToFaq(index);
  const box = await page.evaluate(
    (i, p) => {
      const item = document.querySelectorAll(".faq-item")[i];
      const el = p === "arrow" ? item.querySelector("h3 svg") : item.querySelector("h3 span");
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const top = document.elementFromPoint(x, y);
      return { x, y, hit: top ? top.tagName.toLowerCase() : "none", inside: item.contains(top) };
    },
    index,
    part
  );
  console.log(`   click ${index} (${part}) at ${Math.round(box.x)},${Math.round(box.y)} -> hits <${box.hit}> inside=${box.inside}`);
  await page.mouse.click(box.x, box.y);
  await new Promise((r) => setTimeout(r, 500));
};

console.log("initial:", await state());
await clickPart(0, "title");
console.log("  ->", await state());
await clickPart(0, "title");
console.log("  ->", await state());
await clickPart(0, "arrow");
console.log("  ->", await state());
await clickPart(0, "arrow");
console.log("  ->", await state());
await clickPart(2, "title");
console.log("  ->", await state());

await browser.close();
