/**
 * Hosts whose images next/image is allowed to fetch and re-encode.
 *
 * Mirrors the remotePatterns in next.config.mjs, which are derived from the
 * NEXT_PUBLIC_*_URL env vars — i.e. our own backend, wherever it happens to be
 * in this environment.
 */
const OPTIMIZABLE_ORIGINS = [
  process.env.NEXT_PUBLIC_IMAGE_URL,
  process.env.NEXT_PUBLIC_BLOG_IMAGES,
  process.env.NEXT_PUBLIC_SERVER_URL,
]
  .filter(Boolean)
  .map((value) => {
    try {
      return new URL(value).origin;
    } catch {
      return null;
    }
  })
  .filter(Boolean);

/**
 * Whether next/image should optimize this src, or hand it to the browser
 * untouched.
 *
 * Several banner images are hotlinked straight from third-party sites
 * (images.pexels.com, york.ac.uk, forbes.com and others — see the <Header>
 * calls in College, Help, Exam, PrivacyPolicy, Term, Copyright, FrequentAsk).
 * Routing those through the optimizer would mean our server fetching them on
 * every cache miss, and a host that blocks datacenter traffic would turn a
 * working banner into a broken one. They are also not ours to re-encode.
 *
 * So: our own images get optimized, everything remote and foreign is passed
 * through exactly as the browser loads it today.
 *
 * These banners really want to be self-hosted rather than hotlinked; until
 * they are, this keeps them rendering.
 */
export function isOptimizable(src) {
  if (typeof src !== "string") return true; // static import — always ours
  if (!/^https?:\/\//i.test(src)) return true; // /public or relative — ours

  try {
    return OPTIMIZABLE_ORIGINS.includes(new URL(src).origin);
  } catch {
    return false;
  }
}
