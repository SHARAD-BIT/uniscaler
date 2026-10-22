// Regenerates src/lib/onlineUniversities.js from the "100+ Online
// Universities" section of collegevidya.com's homepage (its __NEXT_DATA__
// payload), and downloads any missing university logo into
// public/online-universities/.
//
//   node scripts/extract-universities.js
//
// The "UpGrad" rows are excluded — client rule: upGrad must never appear
// user-facing. The filter is by name AND slug: the source lists Woolf
// University under the slug "upgrad-college-uk-woolf", which would otherwise
// put the word in a URL.
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..");
const LOGO_DIR = path.join(APP, "public", "online-universities");
const CDN = "https://cdn.collegevidya.com/";
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" };

(async () => {
  const res = await fetch("https://collegevidya.com/", { headers: UA });
  if (!res.ok) throw new Error("homepage fetch failed: HTTP " + res.status);
  const html = await res.text();
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/
  );
  if (!m) throw new Error("no __NEXT_DATA__ in homepage");
  const universities = JSON.parse(m[1]).props.pageProps.universities.filter(
    (u) => !/upgrad/i.test(u.name) && !/upgrad/i.test(u.slug || "")
  );

  fs.mkdirSync(LOGO_DIR, { recursive: true });

  const rows = universities.map((u) => {
    const file = u.logo ? path.basename(u.logo) : null;
    return {
      name: u.name,
      slug: u.slug,
      courses: u.course_count ?? 0,
      // Some rows lack city or state — join only what exists.
      location: [u.city?.city, u.state?.state].filter(Boolean).join(", "),
      logo: file ? `/online-universities/${file}` : null,
      remote: u.logo ? CDN + u.logo : null,
    };
  });

  let ok = 0;
  const fail = [];
  for (const r of rows) {
    if (!r.remote) continue;
    const dest = path.join(LOGO_DIR, path.basename(r.logo));
    if (fs.existsSync(dest)) {
      ok++;
      continue;
    }
    try {
      const dl = await fetch(r.remote, { headers: UA });
      if (!dl.ok) throw new Error("HTTP " + dl.status);
      fs.writeFileSync(dest, Buffer.from(await dl.arrayBuffer()));
      ok++;
    } catch (e) {
      fail.push(`${r.name}: ${e.message}`);
      r.logo = null; // the grid falls back to a monogram tile
    }
  }

  const body = rows.map(({ remote, ...keep }) => keep);
  const module_ = `// GENERATED ${new Date().toISOString().slice(0, 10)} by scripts/extract-universities.js
// from the "100+ Online Universities" section of collegevidya.com's homepage
// (__NEXT_DATA__ -> props.pageProps.universities; upGrad rows excluded — see
// the script header). Logos live in public/online-universities/; nothing on
// the page fetches from their CDN. Regenerate with the script rather than
// hand-editing. \`slug\` keys the /university/[slug] detail pages.
export const ONLINE_UNIVERSITIES = ${JSON.stringify(body, null, 2)};
`;
  fs.writeFileSync(path.join(APP, "src/lib/onlineUniversities.js"), module_);
  console.log(`rows: ${body.length}, logos ok: ${ok}, failed: ${fail.length}`);
  fail.forEach((f) => console.log("  FAIL", f));
})();
