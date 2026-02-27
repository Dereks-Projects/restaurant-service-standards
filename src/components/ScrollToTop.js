/**
 * ScrollToTop.js — Reset scroll position on navigation
 *
 * WHY THIS EXISTS:
 * Next.js App Router doesn't always scroll to the top when
 * you navigate between pages. This component watches for
 * URL changes and forces a scroll to the top every time.
 *
 * It's like resetting the table between guests — clean slate.
 */
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; /* This component renders nothing — it just runs the effect */
}