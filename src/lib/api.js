import { cache } from "react";
import { publicToken } from "./publicToken";

/**
 * Server-side readers for the public backend endpoints.
 *
 * These hit exactly the same routes, with the same POST body, as the client
 * components already do — the backend is unchanged. They exist so that
 * generateMetadata can resolve a page's real title/description before the HTML
 * is sent, instead of the page setting document.title in an effect where no
 * crawler will see it.
 *
 * Two layers of caching, because both are needed:
 *   - React cache(): Next only memoizes GET fetches within a render pass, and
 *     these are POST. Without this, generateMetadata and the page would each
 *     hit the backend.
 *   - next.revalidate: the persistent data cache, shared across requests.
 *
 * Every reader returns a safe empty value on failure. A backend hiccup should
 * cost the page its metadata, not crash the route — the client components will
 * still fetch and render as they do today.
 */

/**
 * NEXT_PUBLIC_WEBSITE_API is a same-origin path (`/api/website/v1`) so that the
 * browser's calls survive being reached through a tunnel — see the rewrites in
 * next.config.mjs. There is no origin to be relative *to* on the server, so the
 * same path is resolved against the backend here, which also skips a pointless
 * hop back through our own proxy. An absolute value is left alone, so a
 * deployment that points these at a real domain keeps working unchanged.
 */
const WEBSITE_API = (() => {
  const configured = process.env.NEXT_PUBLIC_WEBSITE_API;
  if (!configured) return null;
  if (/^https?:\/\//i.test(configured)) return configured;

  const origin = (process.env.BACKEND_ORIGIN || "").replace(/\/+$/, "");
  return origin ? `${origin}${configured}` : null;
})();

// Long enough that metadata for a college or blog is not re-fetched on every
// crawl, short enough that an edit in the admin dashboard shows up the same day.
const REVALIDATE_SECONDS = 600;

async function postPublic(endpoint, body = {}) {
  if (!WEBSITE_API) return null;

  try {
    const res = await fetch(`${WEBSITE_API}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: publicToken(), ...body }),
      next: { revalidate: REVALIDATE_SECONDS, tags: [endpoint] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.code === 200 ? json.data : null;
  } catch {
    // Backend down, DNS failure, build running without a reachable API — all
    // are non-fatal here.
    return null;
  }
}

export const getBlogs = cache(async () => {
  const data = await postPublic("fetchBlogs");
  return Array.isArray(data) ? data : [];
});

/**
 * Blog URLs are /blogs/<timeStamp> (see Blogs.jsx), so the timestamp segment is
 * what identifies a post from the URL alone.
 */
export const getBlogByTimestamp = cache(async (timeStamp) => {
  if (!timeStamp) return null;
  const blogs = await getBlogs();
  const wanted = decodeURIComponent(timeStamp);
  return blogs.find((blog) => String(blog.timeStamp) === wanted) ?? null;
});

export const getCollegesForSearch = cache(async (searchTerm = "") => {
  const data = await postPublic("fetchCollegeForSearch", { searchTerm });
  return Array.isArray(data) ? data : [];
});

/**
 * The blog `description` and `image` columns are stored as JSON-encoded arrays
 * of strings. Callers that only want plain text for a <meta> tag should not
 * have to know that, and a malformed row must not throw during metadata
 * generation.
 */
export function firstFromJsonArray(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed[0] ?? null) : null;
  } catch {
    return typeof value === "string" ? value : null;
  }
}
