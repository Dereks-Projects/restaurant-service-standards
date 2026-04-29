/**
 * route.js — Auth Callback Handler
 *
 * FILE LOCATION: src/app/auth/callback/route.js
 *
 * WHY THIS FILE EXISTS:
 * When a user clicks the verification link in their email,
 * Supabase redirects them here with either:
 *   - A "code" parameter (PKCE flow)
 *   - A "token_hash" and "type" parameter (email verification flow)
 *
 * This route handles both, verifies the token with Supabase,
 * sets the auth cookies, and redirects to the dashboard.
 *
 * FLOW:
 * 1. User signs up, receives verification email
 * 2. User clicks "Verify My Email" link
 * 3. Link sends them here with token_hash and type=signup
 * 4. This route verifies the token with Supabase
 * 5. User is redirected to /dashboard, fully authenticated
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") || "/dashboard";

  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  /* ── Handle PKCE code exchange ── */
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  /* ── Handle email verification via token_hash ── */
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type,
    });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  /* If nothing worked, send to login */
  return NextResponse.redirect(`${origin}/login`);
}