import "./globals.css";
import Providers from "./providers";
import RootLayOut from "@/Helper/RootLayOut";

/**
 * Site-wide metadata defaults.
 *
 * Pages override what is distinct about them via their own `metadata` /
 * `generateMetadata` export (see src/lib/seo.js); anything they leave out is
 * inherited from here. `title.template` is what appends the brand suffix, so
 * pages declare a bare title like "About Us" and get "About Us | Uniscaler".
 */
export const metadata = {
  // Needed to resolve the relative OG/Twitter image paths below into absolute
  // URLs; without it Next falls back to localhost and warns on every render.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://uniscaler.in"
  ),
  title: {
    default: "Uniscaler - Discover Top Colleges & Universities",
    template: "%s | Uniscaler",
  },
  description:
    "Explore the best colleges and universities with Uniscaler. Discover top-ranked institutions, academic programs, and valuable insights for your educational journey.",
  keywords:
    "Uniscaler,top colleges and universities of india, higher education, vocational courses, academic programs,Top colleges in India in 2024,education loan, best course after 12th in 2024, best college for engineering,best college for medical, btech, best college for law",
  robots: "index, follow",
  icons: { icon: "/mainLogoMobile.svg" },
  openGraph: {
    title: "Uniscaler - Discover Top Colleges & Universities",
    description:
      "Explore the best colleges and universities with Uniscaler. Discover top-ranked institutions, academic programs, and valuable insights for your educational journey.",
    images: ["/heroImg.png"],
    // Relative, so it resolves against metadataBase. It used to be hardcoded to
    // https://www.uniscaler.com/ while metadataBase points at uniscaler.in —
    // an og:url on a different host than the canonical splits ranking signals.
    url: "/",
    siteName: "Uniscaler",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uniscaler - Discover Top Colleges & Universities",
    description:
      "Explore the best colleges and universities with Uniscaler. Discover top-ranked institutions, academic programs, and valuable insights for your educational journey.",
    images: ["/heroImg.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#003980",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          heroImg.webp is no longer preloaded here — HeroSection renders it via
          next/image with the `preload` prop, which emits a preload for the
          optimized URL. Keeping this one would have fetched the unoptimized
          original alongside it.
        */}
        <link rel="preload" href="/mainLogo.svg" as="image" />
      </head>
      <body>
        <Providers>
          <RootLayOut>{children}</RootLayOut>
        </Providers>
      </body>
    </html>
  );
}
