export const SITE_NAME = "Uniscaler";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://uniscaler.in";

/** The site-wide OG image, kept in sync with the one set in app/layout.js. */
const DEFAULT_OG_IMAGE = "/heroImg.png";

/**
 * Builds one page's metadata.
 *
 * Every page needs the same four things — a title, a description, a canonical
 * URL, and OG/Twitter cards that agree with both — and getting any of them
 * subtly different per page is how duplicate-content warnings start. So pages
 * declare only what is distinct about them and this fills in the rest.
 *
 * `title` is returned bare, not suffixed: the root layout defines
 * `title.template`, which appends " | Uniscaler" to every child title.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords,
  type = "website",
  noIndex = false,
  openGraph: openGraphOverrides,
}) {
  const canonical = path;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical },
    // Pages behind a login or holding personal data pass noIndex; without it
    // the root layout's "index, follow" would apply to them too.
    ...(noIndex
      ? { robots: { index: false, follow: false, nocache: true } }
      : {}),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [image],
      locale: "en_IN",
      type,
      ...openGraphOverrides,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

/**
 * Turns a URL segment into something readable for a title: "hotel-management"
 * becomes "Hotel Management", "new%20delhi" becomes "New Delhi".
 */
export function titleizeSlug(slug) {
  if (!slug) return "";
  return decodeURIComponent(String(slug))
    .replace(/[-_+]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Descriptions go into a <meta> tag, so they must be plain text of a sane
 * length. Blog bodies arrive with HTML in them and college descriptions run to
 * paragraphs; both are cut on a word boundary rather than mid-word.
 */
export function toDescription(value, maxLength = 160) {
  const text = String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}
