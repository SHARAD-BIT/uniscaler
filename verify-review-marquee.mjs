/**
 * Opens a college's Reviews tab and checks that the review strip scrolls right
 * to left, loops from a duplicated track, and stops while the pointer is over
 * it so the text stays readable.
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3001";
const OUT = process.env.OUT || ".";

const fail = [];
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail.push(label);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });

// Reach the reviews through the UI: search -> first college -> Reviews tab.
await page.goto(`${BASE}/college/engineering`, { waitUntil: "networkidle2" });
await page.waitForSelector(".college-card h3.linkable", { timeout: 20000 });
await wait(1000);
await page.evaluate(() => document.querySelector(".college-card h3.linkable").click());
await page.waitForSelector(".MuiTab-root", { timeout: 20000 });
await wait(1200);

const openedReviews = await page.evaluate(() => {
  const tab = [...document.querySelectorAll(".MuiTab-root")].find(
    (t) => t.textContent.trim().toLowerCase() === "reviews"
  );
  if (!tab) return false;
  tab.click();
  return true;
});
check("Reviews tab exists and opens", openedReviews);
await page.waitForSelector(".review-marquee .review-track", { timeout: 20000 });
await wait(800);

const shape = await page.evaluate(() => {
  const track = document.querySelector(".review-track");
  const cards = track.querySelectorAll(".review-card");
  const originals = track.querySelectorAll('.review-card:not([aria-hidden="true"])');
  const clones = track.querySelectorAll('.review-card[aria-hidden="true"]');
  return {
    total: cards.length,
    originals: originals.length,
    clones: clones.length,
    animation: getComputedStyle(track).animationName,
    direction: getComputedStyle(track).animationDirection,
    laidOutHorizontally:
      cards.length > 1 &&
      cards[1].getBoundingClientRect().left > cards[0].getBoundingClientRect().left,
  };
});

check("cards are laid out in a row", shape.laidOutHorizontally);

// The loop only lands seamlessly if the track is content-width and the second
// half starts at exactly half of it. `.college-info div { width: 100% }` has
// broken this once already, silently — the strip still scrolled, it just
// snapped back mid-cycle.
const loop = await page.evaluate(() => {
  const track = document.querySelector(".review-track");
  const cards = track.querySelectorAll(".review-card");
  const half = cards.length / 2;
  return {
    trackWidth: track.getBoundingClientRect().width,
    frameWidth: document.querySelector(".review-marquee").getBoundingClientRect().width,
    secondHalfStartsAt: cards[half].offsetLeft - cards[0].offsetLeft,
  };
});
check(
  "track is content-width, not clamped to its frame",
  loop.trackWidth > loop.frameWidth,
  `track ${loop.trackWidth.toFixed(0)}px vs frame ${loop.frameWidth.toFixed(0)}px`
);
check(
  "second copy begins at exactly half the track, so -50% loops seamlessly",
  Math.abs(loop.secondHalfStartsAt - loop.trackWidth / 2) < 1,
  `${loop.secondHalfStartsAt.toFixed(1)}px vs ${(loop.trackWidth / 2).toFixed(1)}px`
);

const header = await page.evaluate(() => {
  const card = document.querySelectorAll(".review-card")[1];
  const px = (sel) => card.querySelector(sel).getBoundingClientRect().width;
  return { name: px(".reviewer-name"), rating: px(".review-rating"), card: px(".review-card, *") };
});
check("reviewer name has width to render in", header.name > 40, `${header.name.toFixed(0)}px`);
check("rating sits beside the name, not across the card", header.rating < 120, `${header.rating.toFixed(0)}px`);
check(
  "track holds two identical halves for a seamless loop",
  shape.originals > 0 && shape.originals === shape.clones,
  `${shape.originals} + ${shape.clones} clones`
);
check("duplicate half is hidden from screen readers", shape.clones > 0);
check("an animation is applied to the track", shape.animation === "review-scroll", shape.animation);

// Direction: the first card's left edge must decrease over time.
const leftEdge = () =>
  page.evaluate(
    () => document.querySelector(".review-track .review-card").getBoundingClientRect().left
  );

const start = await leftEdge();
await wait(1500);
const later = await leftEdge();
check(
  "strip moves right to left",
  later < start,
  `${start.toFixed(1)}px -> ${later.toFixed(1)}px`
);

// Hover must stop it. The strip sits below the fold, and a mouse position
// outside the viewport never produces a hover, so bring it on screen first.
// `scroll-behavior: smooth` is set globally, so an animated scroll would still
// be in flight when the coordinates are read and the pointer would land on
// whatever has drifted into that spot instead.
await page.evaluate(() =>
  document
    .querySelector(".review-marquee")
    .scrollIntoView({ block: "center", behavior: "instant" })
);
await wait(600);
const box = await page.evaluate(() => {
  const r = document.querySelector(".review-marquee").getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
check("strip is on screen before hovering", box.y > 0 && box.y < 900, `y=${box.y.toFixed(0)}`);
await page.mouse.move(box.x, box.y);
await wait(300);
check(
  "pointer actually lands on the strip",
  await page.evaluate(() => document.querySelectorAll(".review-marquee:hover").length === 1)
);
await page.mouse.move(box.x, box.y);
await wait(300);
const hoverStart = await leftEdge();
await wait(1500);
const hoverLater = await leftEdge();
check(
  "hovering pauses the strip",
  Math.abs(hoverLater - hoverStart) < 1,
  `moved ${Math.abs(hoverLater - hoverStart).toFixed(2)}px while hovered`
);

await page.mouse.move(0, 0);
await wait(500);
const marquee = await page.$(".review-marquee");
await marquee.screenshot({ path: `${OUT}/review-marquee.png` });

// The strip must not widen the page.
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
check("strip does not cause horizontal page scroll", overflow <= 0, `${overflow}px`);

await browser.close();
console.log(fail.length ? `\n${fail.length} FAILED` : "\nall checks passed");
process.exit(fail.length ? 1 : 0);
