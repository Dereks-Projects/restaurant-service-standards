/**
 * proxy.js — Geo-Blocking (Network Edge Layer)
 *
 * FILE LOCATION: src/proxy.js
 * This file MUST live in your src/ folder, at the same level as your
 * app/ folder. Not inside app/. Not in components/. In src/ directly.
 *
 * WHY THIS FILE EXISTS:
 * This is Next.js 16's replacement for the old middleware.js file.
 * Think of it as the bouncer at the restaurant entrance — it runs
 * BEFORE any page loads and decides who gets in.
 *
 * It intercepts every incoming request and checks the visitor's country
 * using Vercel's geo-detection headers. If the request originates from
 * a blocked country, it returns a 451 (Unavailable for Legal Reasons)
 * response immediately — the visitor never sees your app at all.
 *
 * WHY 451 (not 403)?
 * HTTP 451 is the standard code for "blocked for legal/regional reasons."
 * It's more accurate than 403 (Forbidden) and signals to crawlers that
 * the block is intentional and geo-based, not a security issue.
 *
 * WHY BLOCK RU + CN?
 * These regions generate high volumes of scraping and bot traffic on
 * training and content platforms. Blocking them at the edge protects
 * your content, your AI agent from abuse, and your Vercel bandwidth.
 *
 * HOW TO ADD/REMOVE COUNTRIES:
 * Add or remove 2-letter country codes to the BLOCKED_COUNTRIES array.
 * Full list of codes: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 *
 * NOTE ON LOCAL DEVELOPMENT:
 * Vercel geo headers are only available on Vercel deployments.
 * In local dev (pnpm dev), request.geo?.country will be undefined,
 * so no blocking occurs. This is expected behavior — works on deploy.
 */

import { NextResponse } from "next/server";

/* ─── Blocked Country Codes ─────────────────────────────────────────────────
 * RU = Russia
 * CN = China
 * Add more ISO 3166-1 alpha-2 codes as needed.
 * ─────────────────────────────────────────────────────────────────────────── */
const BLOCKED_COUNTRIES = ["RU", "CN"];

export function proxy(request) {
  /* Get the visitor's country from Vercel's geo detection */
  const country = request.geo?.country;

  /* If country is detected and is on the blocked list, deny access */
  if (country && BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse(
      "Access to this service is not available in your region.",
      {
        status: 451,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  /* Everyone else passes through normally */
  return NextResponse.next();
}

/* ─── Matcher Config ─────────────────────────────────────────────────────────
 * Tells Next.js which routes this proxy runs on.
 * This pattern runs on ALL routes EXCEPT:
 * - _next (Next.js internal assets like JS bundles, CSS)
 * - favicon.ico (browser favicon requests)
 * Excluding these prevents the proxy from running on static assets,
 * which would add unnecessary overhead.
 * ─────────────────────────────────────────────────────────────────────────── */
export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};