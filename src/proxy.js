/**
 * proxy.js — Edge Middleware
 *
 * FILE LOCATION: src/proxy.js
 *
 * Three responsibilities, in order of execution:
 *
 *   1. Geo-block: deny requests from regions associated with high
 *      scraping/bot traffic. Fails fast before any other work.
 *
 *   2. Session refresh: validate the Supabase auth session on every
 *      request, refreshing the access token if it has expired. This
 *      is required by @supabase/ssr to keep sessions alive between
 *      requests. Without this, sessions decay over time and pages
 *      hang on auth checks.
 *
 *   3. Security headers: applied to every response. Standard
 *      enterprise hardening: HSTS, MIME-type protection, clickjack
 *      protection, referrer privacy.
 *
 * proxy.js replaces the older middleware.js convention in Next.js 16+.
 * The matcher excludes static assets so the function only runs on
 * actual page and API requests.
 */

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/* Countries blocked at the edge. Update as needed. */
const BLOCKED_COUNTRIES = ["RU", "CN", "KP"];

export async function proxy(request) {
  /* ── 1. Geo-block (fast exit) ── */
  const country = request.geo?.country;
  if (country && BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse(
      "Access to this service is not available in your region.",
      {
        status: 451,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }

  /* ── 2. Session refresh ──
     `response` is reassigned inside `setAll` if Supabase needs to
     write refreshed cookies. Closures keep the latest reference. */
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  /* getUser() forces session validation. If the access token has
     expired, Supabase uses the refresh token to issue a new one,
     and setAll above writes it back to the browser. Wrapped in
     try/catch so a transient Supabase failure cannot hard-fail
     every request — pages handle anonymous users on their own. */
  try {
    await supabase.auth.getUser();
  } catch (err) {
    console.warn("[proxy] Session refresh skipped:", err?.message);
  }

  /* ── 3. Security headers (every response) ── */
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

/* ── Matcher ──
   Run on all routes except static assets and Next.js internals.
   This keeps the proxy off image/JS/CSS requests where it would
   add latency without delivering value. */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};