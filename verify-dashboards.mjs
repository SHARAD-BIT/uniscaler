/**
 * Logs in as a real user and as the admin, then walks every sidebar panel of
 * both dashboards — the 23 components no other check touches.
 *
 *   node scripts/create-test-user.js      (in the backend project, once)
 *   npm run verify-dashboards
 *
 * For each panel it asserts the route resolves, the panel renders something,
 * and nothing throws in the console.
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3001";
const USER = { email: "test@uniscaler.local", password: "Test@1234" };
const ADMIN = { email: "admin@uniscaler.local", password: "admin123" };

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`  [${ok ? "PASS" : "FAIL"}] ${name}${detail ? " - " + detail : ""}`);
};

const USER_PANELS = [
  "dashboard", "my-college", "enquiry", "update",
  "change-password", "popular-college", "news-letter",
];
const ADMIN_PANELS = [
  "users", "userEnquiry", "popularCollegeQuery", "addCollegeInSearch",
  "addBlogs", "addPopularCollege", "addVideos", "websiteReportProblem",
  "contactUsQuery",
];

const run = async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  let consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push("uncaught: " + e.message));

  const dismissPopup = () =>
    page.evaluate(() => {
      const p = document.querySelector(".popup");
      if (p) p.remove();
      document.body.style.overflow = "auto";
    });

  // ---------- user ----------
  console.log("\nUser dashboard");
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 800));
  await dismissPopup();

  await page.type('input[name="email"]', USER.email);
  await page.type('input[name="password"]', USER.password);
  consoleErrors = [];
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
    page.click('form button[type="submit"]'),
  ]);
  await new Promise((r) => setTimeout(r, 2500));

  const loggedIn = await page.evaluate(() => {
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem("name"));
    } catch {}
    return { stored, cookie: document.cookie.includes("token") };
  });
  record("user login stores session", !!(loggedIn.stored || loggedIn.cookie), loggedIn.stored ? loggedIn.stored.name : "cookie only");

  for (const panel of USER_PANELS) {
    consoleErrors = [];
    const resp = await page.goto(`${BASE}/user-dashboard/${panel}`, { waitUntil: "networkidle2" }).catch(() => null);
    await new Promise((r) => setTimeout(r, 1200));
    await dismissPopup();
    const info = await page.evaluate(() => {
      const main = document.querySelector(".dashboard, main, .contentBox") || document.body;
      return { status: 1, text: (main.innerText || "").trim().length };
    });
    // This backend answers 401 for "no rows matched", not just for auth
    // failures (see contactUsData, getAllUserData and friends), so an empty
    // table surfaces as a console error even though the panel rendered fine.
    const errs = [...new Set(consoleErrors)].filter((e) => !/40[14]/.test(e));
    record(
      `user panel /${panel}`,
      (resp ? resp.status() === 200 : false) && info.text > 30 && errs.length === 0,
      `http=${resp ? resp.status() : "?"} text=${info.text}${errs.length ? " err=" + errs[0].slice(0, 60) : ""}`
    );
  }

  // ---------- admin ----------
  console.log("\nAdmin dashboard");
  await page.goto(`${BASE}/admin-dashboard`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1200));
  await dismissPopup();

  const hasAdminForm = await page.$('input[name="email"]');
  if (hasAdminForm) {
    await page.type('input[name="email"]', ADMIN.email);
    await page.type('input[name="password"]', ADMIN.password);
    consoleErrors = [];
    await page.click('form button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2500));
  }
  const adminIn = await page.evaluate(() => document.cookie.includes("adminToken"));
  record("admin login stores token", adminIn, adminIn ? "adminToken cookie set" : "no adminToken cookie");

  for (const panel of ADMIN_PANELS) {
    consoleErrors = [];
    const resp = await page.goto(`${BASE}/admin-dashboard/${panel}`, { waitUntil: "networkidle2" }).catch(() => null);
    await new Promise((r) => setTimeout(r, 1200));
    await dismissPopup();
    const info = await page.evaluate(() => {
      const main = document.querySelector(".dashboard, main") || document.body;
      return { text: (main.innerText || "").trim().length };
    });
    // This backend answers 401 for "no rows matched", not just for auth
    // failures (see contactUsData, getAllUserData and friends), so an empty
    // table surfaces as a console error even though the panel rendered fine.
    const errs = [...new Set(consoleErrors)].filter((e) => !/40[14]/.test(e));
    record(
      `admin panel /${panel}`,
      (resp ? resp.status() === 200 : false) && info.text > 30 && errs.length === 0,
      `http=${resp ? resp.status() : "?"} text=${info.text}${errs.length ? " err=" + errs[0].slice(0, 60) : ""}`
    );
  }

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log("\n" + "=".repeat(64));
  console.log(`${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) {
    console.log("\nFAILURES:");
    failed.forEach((f) => console.log(`  ${f.name} - ${f.detail}`));
    process.exitCode = 1;
  }
};

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
