// Fetches every university's pages from collegevidya (one per slug in
// src/lib/onlineUniversities.js — run scripts/extract-universities.js first):
// the main page plus the emi-details, admission-open, examination-pattern,
// placement-partners and faculty tab sub-pages. Extracts what the
// /university/[slug] page renders, downloads banners, approval/partner logos
// and faculty photos, and writes one JSON per university into
// src/lib/university-details/. (The coupons and LMS tabs are deliberately not
// mirrored: both are collegevidya-platform features, not university data.)
//
//   node scripts/extract-university-details.js
//
// HTML prose (about, FAQ answers) is flattened to typed plain-text blocks at
// build time, so the pages render text only — no innerHTML anywhere. Blocks
// naming upGrad are dropped (client rule; see hitUpgrad below).
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..");
const OUT_DIR = path.join(APP, "src", "lib", "university-details");
const BANNER_DIR = path.join(APP, "public", "university", "banners");
const APPROVAL_DIR = path.join(APP, "public", "university", "approvals");
const PARTNER_DIR = path.join(APP, "public", "university", "partners");
const FACULTY_DIR = path.join(APP, "public", "university", "faculty");
const CDN = "https://cdn.collegevidya.com/";
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" };

for (const d of [OUT_DIR, BANNER_DIR, APPROVAL_DIR, PARTNER_DIR, FACULTY_DIR])
  fs.mkdirSync(d, { recursive: true });

const decode = (s) =>
  String(s)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&rsquo;|&#8217;/g, "\u2019")
    .replace(/&ndash;|&#8211;/g, "\u2013")
    .replace(/&mdash;|&#8212;/g, "\u2014");

// HTML -> [{t: "h"|"p"|"li", text}] plus {t: "table", rows} blocks.
// Headings h1-h6 become "h", list items "li", tables keep their row/cell
// structure (the reference renders them as real tables — the "Explorer Online
// Learning Courses" grid in About, exam-pattern tables, dates tables), and
// everything else that yields text becomes a paragraph.
function htmlToBlocks(html) {
  if (!html) return [];
  // Their CMS content can carry whole <style> blocks (one university's about
  // text shipped a page of CSS) — those and scripts/comments are containers of
  // non-prose, so drop them before splitting into blocks.
  html = String(html)
    .replace(/<(style|script|noscript)\b[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const blocks = [];
  const clean = (raw) =>
    decode(raw.replace(/<[^>]*>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
  const push = (t, raw) => {
    const text = clean(raw);
    if (text) blocks.push({ t, text });
  };

  const parseTable = (tableHtml) => {
    const rows = [];
    for (const rowPart of tableHtml.split(/<tr[\s>]/i).slice(1)) {
      const cells = [];
      let header = false;
      const cellRe = /<(t[dh])\b[^>]*>([\s\S]*?)<\/t[dh]\s*>/gi;
      let m;
      while ((m = cellRe.exec(rowPart))) {
        if (m[1].toLowerCase() === "th") header = true;
        cells.push(clean(m[2]));
      }
      if (cells.some(Boolean)) rows.push({ cells, header });
    }
    if (rows.length) blocks.push({ t: "table", rows });
  };

  // The capture group keeps each whole <table> as its own segment, in order.
  for (const seg of String(html).split(/(<table[\s\S]*?<\/table\s*>)/i)) {
    if (/^<table/i.test(seg)) {
      parseTable(seg);
      continue;
    }
    // Split on the openers of block-level elements, keeping the tag name. A
    // stray <tr> outside a <table> still lands as a bullet.
    const parts = seg.split(
      /<(?=(?:h[1-6]|p|li|div|tr)[\s>])|<\/(?:ul|ol|table)>/i
    );
    for (const part of parts) {
      const m = part.match(/^(h[1-6]|p|li|div|tr)[\s>]/i);
      if (!m) {
        push("p", part);
        continue;
      }
      const tag = m[1].toLowerCase();
      const body = part.slice(part.indexOf(">") + 1);
      push(
        tag.startsWith("h") ? "h" : tag === "li" || tag === "tr" ? "li" : "p",
        body
      );
    }
  }
  return blocks;
}

const plain = (html) =>
  htmlToBlocks(html)
    .map((b) =>
      b.t === "table"
        ? b.rows.map((r) => r.cells.join(" ")).join(" ")
        : b.text
    )
    .join(" ");

// Client rule: upGrad must never appear user-facing. Word-boundary match, so
// "upgrade"/"upgraded"/"upgradation" survive.
const hitUpgrad = (s) => /\bupgrad\b/i.test(String(s || ""));

async function download(remote, dest) {
  if (fs.existsSync(dest)) return true;
  const res = await fetch(CDN + remote, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${remote}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return true;
}

async function fetchPageProps(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const html = await res.text();
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/
  );
  if (!m) throw new Error("no __NEXT_DATA__");
  return JSON.parse(m[1]).props.pageProps;
}

// Table blocks are scrubbed row by row; prose blocks whole.
const scrubBlocks = (blocks) =>
  blocks
    .map((b) =>
      b.t === "table"
        ? { ...b, rows: b.rows.filter((r) => !r.cells.some(hitUpgrad)) }
        : b
    )
    .filter((b) => (b.t === "table" ? b.rows.length > 0 : !hitUpgrad(b.text)));

(async () => {
  const { ONLINE_UNIVERSITIES } = await import(
    "file:///" +
      path.join(APP, "src/lib/onlineUniversities.js").replace(/\\/g, "/")
  );
  const fails = [];
  let done = 0;

  for (const { slug } of ONLINE_UNIVERSITIES) {
    if (!slug) continue;
    const outFile = path.join(OUT_DIR, slug + ".json");
    try {
      const base = `https://collegevidya.com/university/${slug}/`;
      const pp = await fetchPageProps(base);
      const core = pp.universityPageCoreData || {};
      const key = pp.keyApiData || {};

      // The other tab sections live on per-tab sub-pages (same Next page,
      // different pageKey). A university without a tab 404s — that just means
      // an empty section, not a failure.
      const sub = async (seg) => {
        await new Promise((r) => setTimeout(r, 150));
        try {
          return (await fetchPageProps(base + seg + "/")).keyApiData ?? null;
        } catch {
          return null;
        }
      };
      const emi = await sub("emi-details");
      const adm = await sub("admission-open");
      const exam = await sub("examination-pattern");
      const plc = await sub("placement-partners");
      const fac = await sub("faculty");

      const partners = [];
      for (const p of plc?.partners || []) {
        const lg = p?.placement_partner_logo;
        if (!lg?.logo) continue;
        const file = path.basename(lg.logo);
        try {
          await download(lg.logo, path.join(PARTNER_DIR, file));
          partners.push({
            title: lg.title || "",
            logo: `/university/partners/${file}`,
          });
        } catch {
          /* skip a partner whose image fails */
        }
      }

      const faculty = [];
      for (const f of Array.isArray(fac) ? fac : []) {
        if (hitUpgrad(f?.name) || hitUpgrad(f?.description)) continue;
        let photo = null;
        if (f?.profile_pic) {
          const file = path.basename(f.profile_pic);
          try {
            await download(f.profile_pic, path.join(FACULTY_DIR, file));
            photo = `/university/faculty/${file}`;
          } catch {
            photo = null;
          }
        }
        faculty.push({
          name: f?.name || "",
          title: f?.title || "",
          description: plain(f?.description || ""),
          photo,
        });
      }

      // Banner (first desktop one, if any).
      let banner = null;
      const remoteBanner = core.banners?.[0]?.banner;
      if (remoteBanner) {
        const ext = path.extname(remoteBanner) || ".webp";
        try {
          await download(
            remoteBanner,
            path.join(BANNER_DIR, slug + ext)
          );
          banner = `/university/banners/${slug}${ext}`;
        } catch {
          banner = null;
        }
      }

      // Approval logos, deduped across universities by filename.
      const approvals = [];
      for (const a of core.approval_details_sorted || []) {
        const logo = a?.approval_logo;
        if (!logo?.logo) continue;
        const file = path.basename(logo.logo);
        try {
          await download(logo.logo, path.join(APPROVAL_DIR, file));
          approvals.push({
            title: logo.title || "",
            logo: `/university/approvals/${file}`,
          });
        } catch {
          /* skip an approval whose image fails */
        }
      }

      const stats = core.review_statistics || {};
      const detail = {
        slug,
        name: core.name || slug,
        establishedYear: core.establishment_year || null,
        location: [core.city?.city, core.state?.state]
          .filter(Boolean)
          .join(", "),
        rating: core.cv_rating ?? null,
        reviewStats: {
          stars: [
            stats.one_star_count || 0,
            stats.two_star_count || 0,
            stats.three_star_count || 0,
            stats.four_star_count || 0,
            stats.five_star_count || 0,
          ],
          total: stats.total_reviews || 0,
        },
        banner,
        approvals,
        about: scrubBlocks(htmlToBlocks(key.about)),
        aboutBoxes: (key.about_boxes || [])
          .map((b) => ({
            title: b.title || "",
            content: b.content || "",
          }))
          .filter((b) => !hitUpgrad(b.title) && !hitUpgrad(b.content)),
        facts: (key.facts || [])
          .map((f) => plain(f.content))
          .filter(Boolean)
          .filter((f) => !hitUpgrad(f)),
        courses: (key.course || [])
          .map((c) => ({
            name: c.display_name || c.name || "",
            fee: c.fee ?? null,
            duration: c.duration || "",
            // The per-head fee breakdown ("Registration Fee (One Time)" etc.)
            // feeds the Course Fees section.
            feeDetails: (c.fee_details || [])
              .map((fd) => ({
                type: fd?.fee_type?.fee_type || "",
                fee: fd?.fee ?? "",
              }))
              .filter((fd) => fd.type),
          }))
          .filter((c) => !hitUpgrad(c.name)),
        emi: scrubBlocks(htmlToBlocks(emi?.emi_description)),
        admission: scrubBlocks(htmlToBlocks(adm?.admission_open)),
        importantDates: scrubBlocks(htmlToBlocks(adm?.important_dates)),
        examination: scrubBlocks(
          htmlToBlocks(
            [exam?.examination, exam?.exam_pattern].filter(Boolean).join("\n")
          )
        ),
        placementText: scrubBlocks(htmlToBlocks(plc?.placement_partners)),
        placementPartners: partners,
        faculty,
        reviews: (pp.univReviewsData?.reviews || [])
          .slice(0, 4)
          .map((r) => ({
            name: (r.user?.name || r.name || "Verified learner").trim(),
            rating: r.rating ?? null,
            date: (r.created_date_time || "").slice(0, 10),
            content: plain(r.content),
          }))
          .filter((r) => !hitUpgrad(r.content) && !hitUpgrad(r.name)),
        faqs: (pp.faqData || [])
          .map((f) => ({ q: plain(f.title), a: plain(f.content) }))
          .filter((f) => f.q && f.a)
          .filter((f) => !hitUpgrad(f.q) && !hitUpgrad(f.a)),
      };

      fs.writeFileSync(outFile, JSON.stringify(detail, null, 1));
      done++;
      process.stdout.write(`${done} ${slug}\n`);
    } catch (e) {
      fails.push(`${slug}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(`\nwritten: ${done}, failed: ${fails.length}`);
  fails.forEach((f) => console.log("  FAIL", f));
})();
