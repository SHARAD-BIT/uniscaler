/**
 * Drives a real browser through the navigation-state journeys — the ones that
 * pass data via <Link state> in the original and cannot be checked with curl.
 *
 *   node verify-flows.mjs            (expects the app on :3001)
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3001";
const results = [];

const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`  [${ok ? "PASS" : "FAIL"}] ${name}${detail ? " - " + detail : ""}`);
};

const run = async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  // Desktop width matters: below the navbar's breakpoint the menu switches to
  // the mobile layout, where the submenu is display:none and opens on click
  // rather than hover. Puppeteer's default 800x600 lands on the wrong side.
  await page.setViewport({ width: 1400, height: 900 });

  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`);
  });

  // --- Apply Now on a course listing should land on /admission ---
  //
  // This is a <button> with an onClick that navigates programmatically, not an
  // <a href>. The first version of this check clicked a footer link that
  // happened to point at /admission and passed while the real button was still
  // broken — so match on the button text.
  await page.goto(`${BASE}/college/engineering`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2500)); // results load client-side

  const buttons = await page.$$("button");
  let target = null;
  for (const b of buttons) {
    const t = await b.evaluate((e) => e.textContent || "");
    if (/apply now/i.test(t)) {
      target = b;
      break;
    }
  }

  if (!target) {
    record("Apply Now button present on /college/engineering", false, "no button matched");
  } else {
    record("Apply Now button present on /college/engineering", true);
    await target.click();
    await new Promise((r) => setTimeout(r, 2000));

    const url = page.url();
    const onAdmission = url.includes("/admission");
    record("lands on /admission (not bounced home)", onAdmission, url);

    if (onAdmission) {
      const heading = await page.$eval("h1", (el) => el.textContent.trim()).catch(() => "");
      record(
        "college name carried through in the heading",
        /get admission in \S/i.test(heading) && !/undefined/.test(heading),
        heading.slice(0, 70)
      );
    }
  }

  // --- A college card should reach the info page with its data ---
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1500));
  const infoLink = await page.$('a[href^="/college-info/"]');
  if (!infoLink) {
    record("college card link on home", false, "none rendered");
  } else {
    record("college card link on home", true);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
      infoLink.click(),
    ]);
    await new Promise((r) => setTimeout(r, 1200));
    const url = page.url();
    record("stays on /college-info (not bounced to /college)", url.includes("/college-info/"), url);
  }

  // --- Repeat course clicks must not stack /college segments ---
  await page.goto(`${BASE}/college/management`, { waitUntil: "networkidle2" });
  const hrefs = await page.$$eval('a[href*="/college/"]', (as) =>
    as.map((a) => a.getAttribute("href")).slice(0, 40)
  );
  const stacked = hrefs.filter((h) => (h.match(/\/college\//g) || []).length > 1);
  record("no stacked /college/college/ links", stacked.length === 0, stacked.slice(0, 3).join(", "));

  // --- "More" menu must open on hover and its links must be clickable ---
  //
  // Purely CSS-driven (li:hover .sub-menu). It broke because the minifier folded
  // a standalone `scale: 0` into the transform, which the :hover `scale: 1`
  // could no longer override — so measure real geometry, not just presence.
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1500));

  // RootLayOut opens a register popup 5s after mount, which overlays the navbar
  // and swallows the hover. Dismiss it if it is up before testing the menu.
  await page.evaluate(() => {
    const popup = document.querySelector(".popup");
    if (popup) popup.remove();
    document.body.style.overflow = "auto";
  });

  const moreHandle = await page.evaluateHandle(() => {
    const lis = [...document.querySelectorAll("nav li")];
    return lis.find((el) => {
      const own = [...el.childNodes]
        .map((n) => (n.nodeType === 3 ? n.textContent : n.className === "link" ? n.textContent : ""))
        .join("")
        .trim();
      return /^more$/i.test(own);
    });
  });

  const moreEl = moreHandle.asElement();
  if (!moreEl) {
    record("'More' menu present", false, "no matching <li>");
  } else {
    record("'More' menu present", true);
    // Hover the inner label, not the <li>: the li itself has no reliable
    // clickable point. Move the mouse to its centre by coordinate so the CSS
    // :hover on the ancestor li actually triggers.
    const box = await moreEl.evaluate((li) => {
      li.scrollIntoView({ block: "center" });
      const label = li.querySelector(".link") || li;
      const r = label.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await page.mouse.move(box.x, box.y);
    await new Promise((r) => setTimeout(r, 900));

    const opened = await moreEl.evaluate((li) => {
      const sub = li.querySelector(".sub-menu");
      if (!sub) return null;
      const r = sub.getBoundingClientRect();
      const links = [...sub.querySelectorAll("a")].map((a) => a.getAttribute("href"));
      // Is the first link actually the topmost element at its own centre?
      let clickable = false;
      const first = sub.querySelector("a");
      if (first) {
        const fr = first.getBoundingClientRect();
        const top = document.elementFromPoint(fr.left + fr.width / 2, fr.top + fr.height / 2);
        clickable = !!(top && (top === first || first.contains(top)));
      }
      return { w: Math.round(r.width), h: Math.round(r.height), links, clickable };
    });

    if (!opened) {
      record("'More' submenu exists", false, "no .sub-menu");
    } else {
      record(
        "'More' submenu opens on hover",
        opened.w > 50 && opened.h > 50,
        `${opened.w}x${opened.h}`
      );
      record("submenu links are hit-testable", opened.clickable, opened.links.slice(0, 3).join(", "));
      record(
        "submenu link targets resolve",
        opened.links.length > 0 && opened.links.every((h) => h && h.startsWith("/")),
        `${opened.links.length} links`
      );
    }
  }

  // --- FAQ accordion must open, close, and be driven from the arrow too ---
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => {
    const p = document.querySelector(".popup");
    if (p) p.remove();
  });

  const faqState = async () =>
    page.evaluate(() => {
      const items = [...document.querySelectorAll(".faq-item")];
      return {
        count: items.length,
        open: items.filter((i) => i.classList.contains("active")).length,
        firstOpen: items[0] ? items[0].classList.contains("active") : null,
      };
    });

  // Real mouse clicks at real coordinates, not dispatched MouseEvents — a
  // synthetic event bypasses hit-testing and would pass even if something
  // overlaid the control.
  //
  // globals.css sets `scroll-behavior: smooth`, so scrollIntoView animates.
  // Coordinates read before it settles are stale and the click lands nowhere;
  // wait for scrollY to stop changing first.
  // Give the animation a moment to start before polling, otherwise scrollY
  // reads its pre-scroll value twice and this returns while still at the top.
  const settleScroll = async () => {
    await new Promise((r) => setTimeout(r, 250));
    let last = -1;
    for (let i = 0; i < 40; i++) {
      const y = await page.evaluate(() => window.scrollY);
      if (y === last) return;
      last = y;
      await new Promise((r) => setTimeout(r, 100));
    }
  };

  const clickFaq = async (index, onArrow) => {
    // Scroll, settle, then confirm the point really belongs to this item before
    // clicking — a click at stale coordinates lands on nothing and silently
    // "passes" as a no-op.
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.evaluate((i) => {
        const item = document.querySelectorAll(".faq-item")[i];
        if (item) item.scrollIntoView({ block: "center" });
      }, index);
      await settleScroll();

      const box = await page.evaluate(
        (i, arrow) => {
          const item = document.querySelectorAll(".faq-item")[i];
          if (!item) return null;
          // The arrow's <svg>/<path> is the target the old handler mishandled.
          const el = arrow
            ? item.querySelector("h3 svg path") || item.querySelector("h3 svg")
            : item.querySelector("h3 span");
          const r = el.getBoundingClientRect();
          const x = r.left + r.width / 2;
          const y = r.top + r.height / 2;
          return { x, y, hittable: item.contains(document.elementFromPoint(x, y)) };
        },
        index,
        onArrow
      );
      if (!box) return false;
      if (!box.hittable) continue;
      await page.mouse.click(box.x, box.y);
      return true;
    }
    return false;
  };

  const before = await faqState();
  record("FAQ items render", before.count > 0, `${before.count} items, ${before.open} open`);

  if (before.count > 0) {
    await clickFaq(0, false);
    await new Promise((r) => setTimeout(r, 400));
    const opened = await faqState();
    record("clicking the title opens it", opened.firstOpen === true, `open=${opened.open}`);

    await clickFaq(0, false);
    await new Promise((r) => setTimeout(r, 400));
    const closed = await faqState();
    record("clicking it again closes it", closed.firstOpen === false, `open=${closed.open}`);

    await clickFaq(0, true);
    await new Promise((r) => setTimeout(r, 400));
    const viaArrow = await faqState();
    record("clicking the arrow opens it", viaArrow.firstOpen === true, `open=${viaArrow.open}`);

    await clickFaq(0, true);
    await new Promise((r) => setTimeout(r, 400));
    const arrowClosed = await faqState();
    record("clicking the arrow again closes it", arrowClosed.firstOpen === false, `open=${arrowClosed.open}`);

    if (before.count > 1) {
      await clickFaq(0, false);
      await new Promise((r) => setTimeout(r, 300));
      await clickFaq(1, false);
      await new Promise((r) => setTimeout(r, 400));
      const single = await faqState();
      record("opening another closes the first", single.open === 1 && single.firstOpen === false, `open=${single.open}`);
    }
  }

  // --- hero search box must not collapse on short viewports ---
  //
  // It is a flex item in a column; without flex-shrink:0 a short viewport
  // squeezed it to a few pixels and `overflow: hidden` clipped the field.
  for (const h of [768, 640, 600]) {
    await page.setViewport({ width: 1366, height: h });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1200));
    const box = await page.evaluate(() => {
      const set = document.querySelector(".searchSet");
      if (!set) return null;
      const r = set.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    record(
      `hero search box keeps its height at 1366x${h}`,
      !!box && box.h >= 45,
      box ? `${box.w}x${box.h}` : "not found"
    );
  }
  await page.setViewport({ width: 1400, height: 900 });

  const uniqueFailed = [...new Set(failedRequests)];
  if (uniqueFailed.length) {
    console.log("\n  failed requests:");
    uniqueFailed.forEach((u) => console.log("    " + u));
  }
  record(
    "no failed requests",
    uniqueFailed.length === 0,
    `${uniqueFailed.length} distinct`
  );

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log("\n" + "=".repeat(60));
  console.log(`${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) process.exitCode = 1;
};

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
