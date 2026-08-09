import CryptoJS from "crypto-js";

/**
 * The handshake every public backend endpoint expects.
 *
 * Components build this inline today (Card, PopularCollege, ExploreByCollege,
 * BlogsContent, ...). It is duplicated here rather than imported from one of
 * them because those are all client components, and the server fetchers in
 * ./api.js need the same value without pulling "use client" into the server
 * graph.
 *
 * crypto-js is isomorphic, so this produces a token the backend accepts
 * identically whether it ran in the browser or in Node — no backend change.
 */
export function publicToken() {
  const dayOfMonth = new Date().getDate();
  return CryptoJS.AES.encrypt(
    JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + dayOfMonth),
    process.env.NEXT_PUBLIC_PUBLIC_ENC
  ).toString();
}
