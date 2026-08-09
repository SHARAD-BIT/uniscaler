import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });
await page.goto("http://localhost:3001/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1500));

const info = await page.evaluate(() => {
  const lis = [...document.querySelectorAll("nav li")];
  const li = lis.find((el) => {
    const own = [...el.childNodes]
      .map((n) => (n.nodeType === 3 ? n.textContent : n.className === "link" ? n.textContent : ""))
      .join("")
      .trim();
    return /^more$/i.test(own);
  });
  if (!li) return { found: false };
  const label = li.querySelector(".link") || li;
  const lr = label.getBoundingClientRect();
  const sub = li.querySelector(".sub-menu");
  const sr = sub.getBoundingClientRect();
  return {
    found: true,
    liClass: li.className,
    labelTag: label.tagName + "." + label.className,
    labelRect: { x: Math.round(lr.left), y: Math.round(lr.top), w: Math.round(lr.width), h: Math.round(lr.height) },
    subTransformIdle: getComputedStyle(sub).transform,
    subRectIdle: { w: Math.round(sr.width), h: Math.round(sr.height) },
  };
});
console.log("idle:", JSON.stringify(info, null, 1));

if (info.found) {
  const cx = info.labelRect.x + info.labelRect.w / 2;
  const cy = info.labelRect.y + info.labelRect.h / 2;
  console.log(`moving mouse to ${Math.round(cx)},${Math.round(cy)}`);
  await page.mouse.move(cx, cy);
  await new Promise((r) => setTimeout(r, 1200));

  const after = await page.evaluate(() => {
    const lis = [...document.querySelectorAll("nav li")];
    const li = lis.find((el) => {
      const own = [...el.childNodes]
        .map((n) => (n.nodeType === 3 ? n.textContent : n.className === "link" ? n.textContent : ""))
        .join("")
        .trim();
      return /^more$/i.test(own);
    });
    const sub = li.querySelector(".sub-menu");
    const sr = sub.getBoundingClientRect();
    return {
      liMatchesHover: li.matches(":hover"),
      subTransform: getComputedStyle(sub).transform,
      subRect: { w: Math.round(sr.width), h: Math.round(sr.height) },
    };
  });
  console.log("after hover:", JSON.stringify(after, null, 1));
}

await browser.close();
