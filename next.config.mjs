import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Where the Express backend actually listens.
 *
 * Deliberately NOT prefixed with NEXT_PUBLIC_ — it must never be inlined into
 * browser code. The browser reaches the backend through the proxy below, on
 * whatever origin the page itself was served from.
 */
const BACKEND_ORIGIN = (
  process.env.BACKEND_ORIGIN || "http://localhost:5000"
).replace(/\/+$/, "");

/** Backend paths the browser has to be able to reach: the API routers mounted
 * in `index.js`, and the upload folders under its `public/`. */
const PROXIED_BACKEND_PATHS = [
  "api",
  "user-image",
  "popularCollegeLogo",
  "collegeGallery",
];

/**
 * The backend host is not a constant — it is localhost:5000 in development and
 * a real domain in production. Hard-coding either one into remotePatterns would
 * break the other environment, so the allow-list is derived from the same env
 * vars the components already build their <img> srcs from.
 */
const remoteImageOrigins = [
  process.env.NEXT_PUBLIC_IMAGE_URL,
  process.env.NEXT_PUBLIC_BLOG_IMAGES,
  process.env.NEXT_PUBLIC_SERVER_URL,
]
  .filter(Boolean)
  .map((value) => {
    try {
      return new URL(value);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

// Dedupe by origin — the three vars above are usually paths on the same host.
const remotePatterns = [
  ...new Map(
    remoteImageOrigins.map((url) => [
      url.origin,
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      },
    ])
  ).values(),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Express backend at the repo root has its own package-lock.json, so Next
  // infers the workspace root one level too high and warns. Pin it to this app.
  outputFileTracingRoot: __dirname,

  // The dev server is shared over an ngrok tunnel (`ngrok start consultease`,
  // upstream :3000). Next blocks cross-origin requests to dev-only assets —
  // HMR and /_next/* — from any host it was not started on, so the tunnel host
  // has to be listed here or the page loads unstyled and never hot-reloads.
  allowedDevOrigins: [
    "gumball-vaguely-defection.ngrok-free.dev",
    "*.ngrok-free.dev",
  ],

  /**
   * The browser must never be handed an absolute `http://localhost:5000` URL.
   * Reached over the tunnel, `localhost` is the *visitor's* machine, and an
   * https page is not allowed to call an http origin in any case — both show up
   * as a bare `TypeError: Failed to fetch` with nothing in the backend log.
   *
   * So the client-side env vars are same-origin paths (`/api/website/v1`, …)
   * and this proxies them on to the real backend. Server-side readers resolve
   * the same paths against BACKEND_ORIGIN directly — see `src/lib/api.js`.
   *
   * Returned as an array, so these are matched after pages and `public/` files:
   * a real route always wins over the proxy.
   */
  async rewrites() {
    return PROXIED_BACKEND_PATHS.map((prefix) => ({
      source: `/${prefix}/:path*`,
      destination: `${BACKEND_ORIGIN}/${prefix}/:path*`,
    }));
  },

  images: {
    remotePatterns,
    // Next 16 requires an explicit allow-list; anything else 400s. 75 is the
    // default, 90 is for the few images we render large (hero, college logos).
    qualities: [75, 90],
    // The backend runs on localhost in development, and the optimizer refuses
    // private-network sources unless this is set. Never enabled in production.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
