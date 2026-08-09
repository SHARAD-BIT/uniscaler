import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
