/**
 * route.js — Auth Callback Handler
 *
 * FILE LOCATION: src/app/auth/callback/route.js
 *
 * WHY THIS FILE EXISTS:
 * When a user clicks the verification link in their email,
 * Supabase confirms their email on its server, then redirects
 * the user back to your site with an authorization code in
 * the URL. This route receives that code, exchanges it for
 * a valid session (setting auth cookies), and then redirects
 * the user to the dashboard — fully logged in.
 *
 * Without this route, the verification link would dump users
 * on the homepage with no session. They'd have to manually
 * navigate to /login and sign in, which is poor UX.
 *
 * FLOW:
 * 1. User signs up → receives verification email
 * 2. User clicks link → Supabase verifies email
 * 3. Supabase redirects to: restaurantstandards.com/auth/callback?code=xyz
 * 4. This route exchanges the code for a session
 * 5. User is redirected to /dashboard, fully authenticated
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  /* If no code or exchange failed, send to login */
  return NextResponse.redirect(`${origin}/login`);
}