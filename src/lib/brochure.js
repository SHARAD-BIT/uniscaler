/**
 * Cleans a catalog `syllabusUrl` enough to be put in an href.
 *
 * The values are not fit for that as they stand. Of the 203 that exist, 31
 * carry an interior space (`WHU- MSc Management-….pdf`), one carries trailing
 * whitespace, and four already contain a percent-escape — the same untrimmed,
 * inconsistent shape the rest of this project's text data has.
 *
 * Browsers do percent-encode a space in an href themselves, so most of the 31
 * happen to work anyway. That is the browser repairing our data rather than the
 * data being right, and it does not repair the trailing-whitespace one, which
 * resolves to a key the bucket does not hold.
 *
 * Only the space is substituted, and that is deliberate. `encodeURI` is the
 * obvious reach and is wrong here: it escapes `%` as well, so the four URLs
 * already carrying `%20` would go out as `%2520` and 404. Parentheses and
 * brackets are legal in a path and are left alone.
 *
 * Returns "" for a missing or blank value, which is what the cards test to
 * decide whether to show the brochure button at all.
 */
export const brochureUrl = (url) => (url || "").trim().replaceAll(" ", "%20");
