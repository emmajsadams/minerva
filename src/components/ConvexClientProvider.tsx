"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

// Handle cases where CONVEX_URL might not be available during build time
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

let convex: ConvexReactClient | null = null;

// Only create the client if we have a URL (avoids build-time errors)
if (convexUrl) {
  convex = new ConvexReactClient(convexUrl);
}

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // If no convex client available (during build), just render children
  if (!convex) {
    return <>{children}</>;
  }

  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider
        client={convex}
        storage={typeof window !== "undefined" ? localStorage : undefined}
      >
        {children}
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}
