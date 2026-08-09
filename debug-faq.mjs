/**
 * Drives the FAQ with real mouse clicks at real coordinates, which is closer to
 * what a person does than dispatching a synthetic MouseEvent.
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

// Is the running build the fixed one?
const usesState = await page.evaluate(async () => {
  const links = [...document.querySelectorAll("script[src]")].map((s) => s.src);
  for (const l of links) {
    const t = await (await fetch(l)).text();
    if (t.includes("aria-expanded") || t.includes("ariaExpanded")) return true;
  }
  return false;
});
console.log("build contains the rewritten FaqItem (aria-expanded):", usesState);

const state = () =>
  page.evaluate(() => {
    const items = [...document.querySelectorAll(".faq-item")];
    return items.map((i, n) => ({
      n,
      active: i.classList.contains("active"),
      title: (i.querySelector("h3 span") || {}).textContent?.slice(0, 30),
    }));
  });

const realClick = async (index, part) => {
  const box = await page.evaluate(
    (i, p) => {
      const item = document.querySelectorAll(".faq-item")[i];
      item.scrollIntoView({ block: "center" });
      const el = p === "arrow" ? item.querySelector("h3 svg") : item.querySelector("h3 span");
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    },
    index,
    part
  );
  await page.mouse.click(box.x, box.y);
  await new Promise((r) => setTimeout(r, 500));
};

console.log("\ninitial:", (await state()).map((s) => `${s.n}:${s.active ? "OPEN" : "closed"}`).join("  "));

await realClick(0, "title");
console.log("after click 0 (title):", (await state()).map((s) => `${s.n}:${s.active ? "OPEN" : "closed"}`).join("  "));

await realClick(0, "title");
console.log("after click 0 again  :", (await state()).map((s) => `${s.n}:${s.active ? "OPEN" : "closed"}`).join("  "));

await realClick(1, "arrow");
console.log("after click 1 (arrow):", (await state()).map((s) => `${s.n}:${s.active ? "OPEN" : "closed"}`).join("  "));

await realClick(1, "arrow");
console.log("after click 1 again  :", (await state()).map((s) => `${s.n}:${s.active ? "OPEN" : "closed"}`).join("  "));

await browser.close();
