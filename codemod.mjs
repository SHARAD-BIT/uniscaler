/**
 * One-pass codemod: Vite/React-Router source -> Next.js App Router.
 *
 * Run from uniscaler-next/:  node codemod.mjs
 *
 * Deliberately conservative. Anything it cannot translate with confidence is
 * left alone and reported at the end, so the follow-up list is explicit rather
 * than discovered later at runtime.
 */
import fs from "fs";
import path from "path";

const SRC = path.join(process.cwd(), "src");
const DIRS = ["Components", "Decorators", "Utils", "Dashboard", "Helper"];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    return /\.jsx?$/.test(d.name) ? [p] : [];
  });

const stats = {
  files: 0,
  env: 0,
  routerImports: 0,
  linkTo: 0,
  navLink: 0,
  useNavigate: 0,
  navigateCalls: 0,
  useClient: 0,
};
const manual = [];

for (const dir of DIRS) {
  const full = path.join(SRC, dir);
  if (!fs.existsSync(full)) continue;

  for (const file of walk(full)) {
    let code = fs.readFileSync(file, "utf8");
    const before = code;
    const rel = path.relative(SRC, file).replace(/\\/g, "/");

    // 1. import.meta.env.VITE_X -> process.env.NEXT_PUBLIC_X
    code = code.replace(/import\.meta\.env\.VITE_([A-Z0-9_]+)/g, (_, name) => {
      stats.env++;
      return `process.env.NEXT_PUBLIC_${name}`;
    });

    // 2. react-router-dom imports -> next/link + next/navigation
    code = code.replace(
      /import\s*\{([^}]*)\}\s*from\s*["']react-router-dom["'];?\n?/g,
      (_, names) => {
        stats.routerImports++;
        const imported = names.split(",").map((n) => n.trim()).filter(Boolean);
        const lines = [];
        if (imported.some((n) => n === "Link" || n === "NavLink")) {
          lines.push(`import Link from "next/link";`);
        }
        const nav = [];
        if (imported.includes("useNavigate")) nav.push("useRouter");
        if (imported.includes("useLocation")) nav.push("usePathname", "useSearchParams");
        if (imported.includes("useParams")) nav.push("useParams");
        if (nav.length) {
          lines.push(`import { ${[...new Set(nav)].join(", ")} } from "next/navigation";`);
        }
        // Outlet has no drop-in equivalent - layouts receive `children`.
        if (imported.includes("Outlet")) {
          manual.push(`${rel}: uses <Outlet> - convert to a layout with {children}`);
        }
        for (const leftover of imported) {
          if (!["Link", "NavLink", "useNavigate", "useLocation", "useParams", "Outlet"].includes(leftover)) {
            manual.push(`${rel}: unhandled react-router import "${leftover}"`);
          }
        }
        return lines.join("\n") + (lines.length ? "\n" : "");
      }
    );

    // 3. <Link to=  ->  <Link href=   (and NavLink -> Link)
    code = code.replace(/<Link\s+([^>]*?)\bto=/g, (m, pre) => {
      stats.linkTo++;
      return `<Link ${pre}href=`;
    });
    code = code.replace(/<NavLink\s+([^>]*?)\bto=/g, (m, pre) => {
      stats.navLink++;
      return `<Link ${pre}href=`;
    });
    code = code.replace(/<\/NavLink>/g, "</Link>");

    // NavLink's className-as-function API has no Next equivalent.
    if (/className=\{\s*\(\s*\{\s*isActive/.test(code)) {
      manual.push(`${rel}: NavLink isActive callback - rewrite using usePathname()`);
    }

    // 4. useNavigate -> useRouter, and navigate(...) -> router.*
    if (/useNavigate\s*\(/.test(code)) {
      stats.useNavigate++;
      code = code.replace(/const\s+(\w+)\s*=\s*useNavigate\s*\(\s*\)/g, "const $1 = useRouter()");
      code = code.replace(/useNavigate\s*\(\s*\)/g, "useRouter()");
    }
    // navigate("/x", { replace: true }) -> navigate.replace("/x")
    code = code.replace(
      /\bnavigate\s*\(\s*(["'`][^"'`]*["'`])\s*,\s*\{\s*replace:\s*true\s*\}\s*\)/g,
      (_, target) => {
        stats.navigateCalls++;
        return `navigate.replace(${target})`;
      }
    );
    code = code.replace(/\bnavigate\s*\(\s*-1\s*\)/g, () => {
      stats.navigateCalls++;
      return "navigate.back()";
    });
    // plain navigate("/x") -> navigate.push("/x")
    code = code.replace(/\bnavigate\s*\(\s*(?!\.)([^)]+)\)/g, (m, arg) => {
      if (/^\s*\./.test(arg)) return m;
      stats.navigateCalls++;
      return `navigate.push(${arg.trim()})`;
    });

    // useLocation() destructuring has no single equivalent - flag it.
    if (/useLocation\s*\(/.test(code)) {
      manual.push(`${rel}: useLocation() - needs usePathname/useSearchParams, or the nav store if it reads .state`);
    }

    // 5. 'use client' - data fetching stays client-side, so every component needs it
    if (!/^\s*["']use client["']/.test(code)) {
      code = `"use client";\n` + code;
      stats.useClient++;
    }

    if (code !== before) {
      fs.writeFileSync(file, code);
      stats.files++;
    }
  }
}

console.log("=== codemod applied ===");
console.log(`  files rewritten          : ${stats.files}`);
console.log(`  env vars converted       : ${stats.env}`);
console.log(`  react-router imports     : ${stats.routerImports}`);
console.log(`  <Link to> -> href        : ${stats.linkTo}`);
console.log(`  <NavLink> -> <Link>      : ${stats.navLink}`);
console.log(`  useNavigate -> useRouter : ${stats.useNavigate}`);
console.log(`  navigate() calls         : ${stats.navigateCalls}`);
console.log(`  'use client' added       : ${stats.useClient}`);

console.log(`\n=== needs manual work: ${manual.length} ===`);
const grouped = {};
for (const m of manual) {
  const kind = m.split(": ")[1];
  grouped[kind] = (grouped[kind] || 0) + 1;
}
Object.entries(grouped)
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}`));
