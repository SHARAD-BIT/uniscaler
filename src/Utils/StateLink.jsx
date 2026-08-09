"use client";

import NextLink from "next/link";
import { useNavigationState } from "../Helper/NavigationState";

/**
 * Drop-in replacement for next/link that also carries React Router's `state`.
 *
 * The original app passed data between pages with `<Link to={...} state={...}>`
 * and read it back with `useLocation().state`. Next has no equivalent — its
 * Link takes no `state` prop — so without this the receiving pages saw nothing
 * and bounced to their fallback route. That is why "Apply Now" landed on the
 * home page instead of /admission.
 *
 * Writes the payload to the navigation store on click, immediately before
 * navigating. Links that pass no `state` behave exactly like next/link.
 */
const StateLink = ({ state, onClick, children, ...rest }) => {
  const { setNavState } = useNavigationState();
  return (
    <NextLink
      {...rest}
      onClick={(event) => {
        if (state !== undefined) setNavState(state);
        if (onClick) onClick(event);
      }}
    >
      {children}
    </NextLink>
  );
};

export default StateLink;
