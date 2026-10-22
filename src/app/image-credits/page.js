import { domainPhotoCredits } from "@/lib/domainPhotoCredits";
import { supportPhotoCredits } from "@/lib/supportPhotoCredits";
import { pageMetadata } from "@/lib/seo";
import "./image-credits.css";

/**
 * The CC BY attributions for the Study Abroad page's photos, moved here from
 * that page on the client's instruction (2026-09-01): they wanted the credit
 * line off the designed pages, but BY attribution has to stay *discoverable*
 * by visitors or the license is not satisfied — a truly invisible credit does
 * not count. This page plus the small "Image credits" link in the footer's
 * copyright line is the minimum compliant footprint: off every designed page,
 * noindexed, but one click away for anyone who looks.
 */
export const metadata = {
  ...pageMetadata({
    title: "Image Credits",
    description:
      "Attribution for the Creative Commons photography used on Uniscaler.",
    path: "/image-credits",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="top image-credits">
      <h1>Image credits</h1>
      <p>
        The photographs below are used under Creative Commons licenses, which
        permit their use here with attribution to their creators.
      </p>
      <ul>
        {[...domainPhotoCredits, ...supportPhotoCredits].map((c) => (
          <li key={c.key}>
            <a href={c.source} target="_blank" rel="noopener noreferrer">
              {c.title}
            </a>{" "}
            by {c.creator} (
            <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
              {c.license}
            </a>
            )
          </li>
        ))}
      </ul>
    </main>
  );
}
