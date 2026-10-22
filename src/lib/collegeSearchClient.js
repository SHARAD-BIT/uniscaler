"use client";

import { publicToken } from "./publicToken";

/**
 * Client-side counterpart to `getCollegesForSearch` in ./api.js — that one
 * runs server-side (build/request time, cached); this is what runs in the
 * browser, where the exact same request can genuinely fail mid-flight in a
 * way a retry can ride out: this app is developed behind an ngrok tunnel
 * (see next.config.mjs), and a tunnel hop plus a mobile connection is a
 * real source of one-off dropped requests that have nothing to do with the
 * backend itself.
 *
 * Previously reimplemented inline, slightly differently, in four places
 * (ExploreByCollege, CollegeSearch, DirectAdmission, CommonApplicationForm)
 * — none of which retried, so a single dropped connection surfaced as a
 * bare `TypeError: Load failed` and an empty result list every time.
 *
 * One retry, not a loop: a second attempt catches the transient blip this
 * exists for without turning a genuinely-down backend into several seconds
 * of silent retrying. AbortError is rethrown untouched — that is the
 * caller's own cleanup (component unmounted, a newer request superseded
 * this one), not something to retry.
 */
export async function fetchCollegesForSearch(searchTerm = "", { signal } = {}) {
  const body = JSON.stringify({ token: publicToken(), searchTerm });
  const attempt = () =>
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchCollegeForSearch`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      signal,
    }).then((res) => res.json());

  try {
    return await attempt();
  } catch (err) {
    if (err.name === "AbortError") throw err;
    // Long enough for a dropped connection to reconnect, short enough not
    // to read as a hang.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return await attempt();
  }
}
