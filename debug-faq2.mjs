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

const probe = await page.evaluate(() => {
  const out = [];
  const items = [...document.querySelectorAll(".faq-item")];
  items.forEach((item, n) => {
    item.scrollIntoView({ block: "center" });
    const span = item.querySelector("h3 span");
    const svg = item.querySelector("h3 svg");
    const at = (el) => {
      if (!el) return "none";
      const r = el.getBoundingClientRect();
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      if (!top) return "nothing (offscreen?)";
      const path = [];
      let p = top;
      for (let i = 0; i < 3 && p; i++) {
        path.push(p.tagName.toLowerCase() + (p.className && typeof p.className === "string" ? "." + p.className.split(" ")[0] : ""));
        p = p.parentElement;
      }
      const inside = item.contains(top);
      return `${path.join(" < ")}  ${inside ? "[inside item]" : "[OUTSIDE -> blocked]"}`;
    };
    const r = item.getBoundingClientRect();
    out.push({
      n,
      title: (span && span.textContent || "").slice(0, 28),
      itemRect: `${Math.round(r.width)}x${Math.round(r.height)} @y=${Math.round(r.top)}`,
      spanHit: at(span),
      svgHit: at(svg),
    });
  });
  return out;
});

for (const p of probe) {
  console.log(`\n[${p.n}] ${p.title}   ${p.itemRect}`);
  console.log(`     span -> ${p.spanHit}`);
  console.log(`     svg  -> ${p.svgHit}`);
}

await browser.close();
