"use client";

// Native CSS scroll-behavior: smooth is used instead of Lenis
// to avoid conflicts with Next.js App Router navigation and
// the fixed navbar. If you later want Lenis back, re-enable
// the useEffect body below.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
