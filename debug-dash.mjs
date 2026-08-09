import puppeteer from "puppeteer";

const BASE = "http://localhost:3001";
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

const errs = [];
page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
page.on("pageerror", (e) => errs.push("uncaught: " + e.message));

const dismiss = () =>
  page.evaluate(() => {
    const p = document.querySelector(".popup");
    if (p) p.remove();
  });

// user login
await page.goto(`${BASE}/login`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));
await dismiss();
await page.type('input[name="email"]', "test@uniscaler.local");
await page.type('input[name="password"]', "Test@1234");
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {}),
  page.click('form button[type="submit"]'),
]);
await new Promise((r) => setTimeout(r, 2500));

errs.length = 0;
await page.goto(`${BASE}/user-dashboard/dashboard`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1500));
await dismiss();
const userText = await page.evaluate(() => document.body.innerText.trim().slice(0, 300));
console.log("=== USER /dashboard ===");
console.log(userText);
console.log("errors:", [...new Set(errs)].slice(0, 3));

// admin
await page.goto(`${BASE}/admin-dashboard`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1200));
await dismiss();
if (await page.$('input[name="email"]')) {
  await page.type('input[name="email"]', "admin@uniscaler.local");
  await page.type('input[name="password"]', "admin123");
  await page.click('form button[type="submit"]');
  await new Promise((r) => setTimeout(r, 2500));
}
for (const p of ["users", "userEnquiry"]) {
  errs.length = 0;
  await page.goto(`${BASE}/admin-dashboard/${p}`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1500));
  await dismiss();
  const t = await page.evaluate(() => document.body.innerText.trim().slice(0, 300));
  console.log(`\n=== ADMIN /${p} ===`);
  console.log(t);
  console.log("errors:", [...new Set(errs)].slice(0, 2));
}

await browser.close();
