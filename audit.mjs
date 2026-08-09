/**
 * Whole-site audit for the Next port.
 *
 *   npm run audit                 (expects the app on :3001)
 *   BASE=http://localhost:5000 npm run audit    (to audit the original instead)
 *
 * Every defect reported so far in this migration belonged to a class a generic
 * check can find. This runs those checks over every route instead of waiting
 * for someone to stumble into them:
 *
 *   1. page returns 200
 *   2. no console errors / uncaught page errors
 *   3. no failed network requests
 *   4. no broken <img> - "[object Object]", "undefined", empty, or non-200
 *   5. no relative internal links (they resolve against the current URL in
 *      Next, so they compound as you navigate)
 *   6. no interactive element that has text but measures 0x0 while nothing in
 *      its ancestry is deliberately hiding it
 *   7. no horizontal page overflow
 *
 * Checks 1-5 run once at desktop width; 6-7 run at every viewport, since those
 * are the ones that depend on layout.
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3001";

const ROUTES = [
  "/", "/about", "/college", "/college/engineering", "/college/management",
  "/blogs", "/videos", "/contact", "/login", "/register", "/scholarship",
  "/privacy-policy", "/admission", "/direct-admission", "/ai", "/refer-and-earn",
  "/exam", "/exam/jee", "/course", "/course/engineering", "/help", "/report",
  "/terms-and-conditions", "/refund-policy", "/copyright", "/education-loan",
  "/common-application-form", "/user-dashboard", "/admin-dashboard", "/sitemap",
  "/college-info/Greater-Noida-Institute-of-Technology", "/college-details/1",
  "/caf-details/1", "/online-course/test", "/college-search-by-location/noida",
  "/blogs/test",
];

const VIEWPORTS = [
  { name: "desktop", w: 1366, h: 768 },
  { name: "short", w: 1366, h: 600 },
  { name: "mobile", w: 390, h: 844 },
];

const findings = [];
const add = (kind, route, viewport, detail) =>
  findings.push({ kind, route, viewport, detail });

const imageUrls = new Set();

/** Dismiss the register popup RootLayOut opens 5s after mount. */
const dismissPopup = (page) =>
  page.evaluate(() => {
    const p = document.querySelector(".popup");
    if (p) p.remove();
    document.body.style.overflow = "auto";
  });

const collectPageIssues = () => {
  // Runs in the browser.
  const out = { images: [], relativeLinks: [], invisible: [], overflow: null };

  for (const img of document.querySelectorAll("img")) {
    const raw = img.getAttribute("src");
    if (!raw || raw === "undefined" || raw === "[object Object]" || raw === "null") {
      out.images.push({ src: String(raw), alt: img.getAttribute("alt") || "", bad: "placeholder" });
    } else {
      out.images.push({ src: raw, alt: img.getAttribute("alt") || "" });
    }
  }

  for (const a of document.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (!href) continue;
    if (/^(https?:|mailto:|tel:|#|\/|data:)/.test(href)) continue;
    out.relativeLinks.push({ href, text: (a.textContent || "").trim().slice(0, 40) });
  }

  // Something is "unexpectedly invisible" when it has text and zero size, and
  // nothing in its ancestry is deliberately collapsing it (a closed dropdown,
  // a display:none block, and so on).
  const deliberatelyHidden = (el) => {
    let n = el;
    while (n && n !== document.body) {
      const cs = getComputedStyle(n);
      if (cs.display === "none" || cs.visibility === "hidden") return true;
      if (parseFloat(cs.opacity) === 0) return true;
      const t = cs.transform;
      if (t && /matrix\(0,\s*0,\s*0,\s*0/.test(t)) return true;
      if (cs.scale === "0") return true;
      if (n.hasAttribute("hidden")) return true;
      n = n.parentElement;
    }
    return false;
  };

  for (const el of document.querySelectorAll("a, button")) {
    const text = (el.textContent || "").trim();
    if (!text) continue;
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) continue;
    if (deliberatelyHidden(el)) continue;
    out.invisible.push({
      tag: el.tagName.toLowerCase(),
      text: text.slice(0, 40),
      cls: String(el.className).slice(0, 40),
    });
  }

  const de = document.documentElement;
  if (de.scrollWidth > de.clientWidth + 2) {
    out.overflow = { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
  }
  return out;
};

const run = async () => {
  console.log(`auditing ${BASE}\n`);
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

  for (const vp of VIEWPORTS) {
    const deep = vp.name === "desktop";
    console.log(`--- ${vp.name} (${vp.w}x${vp.h}) ${deep ? "[full checks]" : "[layout checks]"} ---`);

    const page = await browser.newPage();
    await page.setViewport({ width: vp.w, height: vp.h });

    for (const route of ROUTES) {
      const consoleErrors = [];
      const failed = [];
      const onConsole = (m) => m.type() === "error" && consoleErrors.push(m.text());
      const onPageError = (e) => consoleErrors.push("uncaught: " + e.message);
      const onResponse = (r) => {
        if (r.status() >= 400) failed.push(`${r.status()} ${r.url().replace(BASE, "")}`);
      };
      page.on("console", onConsole);
      page.on("pageerror", onPageError);
      page.on("response", onResponse);

      let status = 0;
      try {
        const resp = await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 30000 });
        status = resp ? resp.status() : 0;
      } catch (e) {
        add("load-error", route, vp.name, e.message.slice(0, 80));
      }
      await new Promise((r) => setTimeout(r, 900));
      await dismissPopup(page);

      if (deep && status !== 200) add("bad-status", route, vp.name, String(status));

      let issues = null;
      try {
        issues = await page.evaluate(collectPageIssues);
      } catch (e) {
        add("eval-error", route, vp.name, e.message.slice(0, 80));
      }

      if (issues) {
        if (deep) {
          for (const img of issues.images) {
            if (img.bad) add("broken-image", route, vp.name, `src="${img.src}" alt="${img.alt}"`);
            else imageUrls.add(img.src);
          }
          for (const l of issues.relativeLinks)
            add("relative-link", route, vp.name, `href="${l.href}" (${l.text})`);
        }
        for (const el of issues.invisible)
          add("invisible-element", route, vp.name, `<${el.tag}> "${el.text}" class="${el.cls}"`);
        if (issues.overflow)
          add("horizontal-overflow", route, vp.name, `${issues.overflow.scrollWidth} > ${issues.overflow.clientWidth}`);
      }

      if (deep) {
        for (const c of [...new Set(consoleErrors)]) add("console-error", route, vp.name, c.slice(0, 120));
        for (const f of [...new Set(failed)]) add("failed-request", route, vp.name, f.slice(0, 120));
      }

      page.off("console", onConsole);
      page.off("pageerror", onPageError);
      page.off("response", onResponse);
    }
    await page.close();
  }

  await browser.close();

  // Fetch every distinct image once, from Node rather than from a page —
  // fetching inside the browser hits CORS for third-party hosts and cannot
  // resolve relative paths against a blank document.
  const sameOrigin = [...imageUrls].filter((s) => !/^https?:/.test(s));
  const external = [...imageUrls].filter((s) => /^https?:/.test(s));
  console.log(`\n--- fetching ${sameOrigin.length} local images (${external.length} third-party, listed separately) ---`);

  for (const src of sameOrigin) {
    const url = BASE + (src.startsWith("/") ? src : "/" + src);
    try {
      const r = await fetch(url, { method: "GET" });
      if (r.status !== 200) add("image-not-200", "(various)", "-", `${r.status} ${src}`);
    } catch (e) {
      add("image-fetch-failed", "(various)", "-", `${src} (${e.message.slice(0, 40)})`);
    }
  }

  for (const src of external) {
    try {
      const r = await fetch(src, { method: "GET", redirect: "follow" });
      if (r.status !== 200) add("third-party-image", "(various)", "-", `${r.status} ${src.slice(0, 90)}`);
    } catch (e) {
      add("third-party-image", "(various)", "-", `unreachable ${src.slice(0, 80)}`);
    }
  }

  // ---- report ----
  console.log("\n" + "=".repeat(74));
  if (!findings.length) {
    console.log("no issues found");
    return;
  }
  const byKind = {};
  for (const f of findings) (byKind[f.kind] = byKind[f.kind] || []).push(f);

  for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n### ${kind}  (${list.length})`);
    const seen = new Set();
    for (const f of list) {
      const key = f.kind + f.detail;
      if (seen.has(key)) continue;
      seen.add(key);
      const routes = list.filter((x) => x.detail === f.detail).map((x) => x.route);
      const where = routes.length > 3 ? `${routes.length} routes` : routes.join(", ");
      console.log(`  ${f.detail}`);
      console.log(`      on: ${where}${f.viewport !== "-" ? `  [${f.viewport}]` : ""}`);
    }
  }
  console.log("\n" + "=".repeat(74));
  console.log(`${findings.length} findings across ${Object.keys(byKind).length} categories`);
  process.exitCode = 1;
};

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
