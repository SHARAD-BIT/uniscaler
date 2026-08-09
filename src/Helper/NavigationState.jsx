"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Stand-in for React Router's `<Link state>` / `useLocation().state`.
 *
 * Next has no equivalent — its Link takes no `state` prop and there is no
 * useLocation. Several pages receive their data that way (Admission,
 * CollegeInfo, CollegeDetails, OnlineCourse, CAFDetails, BlogsContent) and
 * redirect away when it is absent.
 *
 * Written by StateLink on click, read by the destination page on mount.
 *
 * The payload is held in a module-scoped variable, not only in React state,
 * because the write and the navigation happen in the same click handler. A
 * plain state update is applied asynchronously, so the destination page could
 * mount before it lands and bounce to its fallback route. The module variable
 * is set synchronously, so the value is always there by the time the next page
 * renders; the React state alongside it exists only to trigger re-renders.
 *
 * Like React Router's state, this lives in memory and is lost on a hard
 * refresh — opening such a page directly still redirects, exactly as before.
 */
let currentNavState = null;

const NavigationStateContext = createContext({
  navState: null,
  setNavState: () => {},
});

export function NavigationStateProvider({ children }) {
  const [version, setVersion] = useState(0);

  const setNavState = useCallback((value) => {
    currentNavState = value;
    setVersion((n) => n + 1);
  }, []);

  const value = useMemo(
    () => ({ navState: currentNavState, setNavState }),
    // `version` is the dependency that matters: currentNavState is a module
    // variable, so it cannot be tracked directly.
    [version, setNavState]
  );

  return (
    <NavigationStateContext.Provider value={value}>
      {children}
    </NavigationStateContext.Provider>
  );
}

/** Mirrors `const { state } = useLocation()` at the call sites. */
export function useNavigationState() {
  const ctx = useContext(NavigationStateContext);
  // Prefer the synchronously-written module value; the context keeps this
  // component subscribed to changes.
  return { navState: currentNavState, setNavState: ctx.setNavState };
}
