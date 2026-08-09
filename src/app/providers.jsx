"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { SnackbarProvider } from "notistack";
import { NavigationStateProvider } from "@/Helper/NavigationState";

/**
 * Client-side providers for the whole app.
 *
 * AppRouterCacheProvider is what keeps MUI's emotion styles server-rendered.
 * Without it the three MUI-using pages paint unstyled before hydration.
 */
export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <SnackbarProvider>
        <NavigationStateProvider>{children}</NavigationStateProvider>
      </SnackbarProvider>
    </AppRouterCacheProvider>
  );
}
