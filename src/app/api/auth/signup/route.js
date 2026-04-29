/**
 * route.js — Signup API Route
 *
 * FILE LOCATION: src/app/api/auth/signup/route.js
 *
 * WHY THIS EXISTS:
 * Signup requires two database operations: create an organization,
 * then create a user linked to that organization. If either fails,
 * both must be rolled back. This cannot be done safely from the
 * browser because:
 *   1. RLS blocks unauthenticated inserts into organizations
 *   2. Client-side rollback is unreliable (network failures, tab closes)
 *   3. The service role key must never reach the browser
 *
 * HOW IT WORKS:
 * The browser form POSTs JSON to /api/auth/signup. This route:
 *   1. Validates all inputs server-side
 *   2. Checks for duplicate org slugs
 *   3. Creates the organization using the service role client (bypasses RLS)
 *   4. Creates the auth user via auth.signUp() which triggers a
 *      confirmation email through the configured SMTP provider (Resend)
 *   5. If step 4 fails, deletes the org from step 3 (rollback)
 *   6. Returns success with a verification-required flag
 *
 * The handle_new_user database trigger automatically creates
 * the profiles row when the auth user is created in step 4.
 *
 * EMAIL VERIFICATION:
 * auth.signUp() sends a confirmation email automatically via the
 * SMTP provider configured in Supabase (Resend → restaurantstandards.com).
 * The user cannot log in until they click the confirmation link.
 */

import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

/* ── Input validation ──────────────────────────────────────────────────── */

function validateInputs({ orgName, firstName, lastName, email, password }) {
  const errors = [];

  if (!orgName || orgName.trim().length < 2) {
    errors.push("Organization name must be at least 2 characters.");
  }

  if (!firstName || firstName.trim().length === 0) {
    errors.push("First name is required.");
  }

  if (!lastName || lastName.trim().length === 0) {
    errors.push("Last name is required.");
  }

  if (!email || !email.includes("@") || !email.includes(".")) {
    errors.push("A valid email address is required.");
  }

  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return errors;
}

/* ── Slug generation ───────────────────────────────────────────────────── */

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ── POST handler ──────────────────────────────────────────────────────── */

export async function POST(request) {
  try {
    const body = await request.json();
    const { orgName, firstName, lastName, email, password } = body;

    /* Step 1: Validate inputs */
    const validationErrors = validateInputs({
      orgName,
      firstName,
      lastName,
      email,
      password,
    });

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors[0] },
        { status: 400 }
      );
    }

    const slug = generateSlug(orgName);

    if (!slug) {
      return NextResponse.json(
        { error: "Organization name produces an invalid URL. Please use letters and numbers." },
        { status: 400 }
      );
    }

    /* Service client for database operations (bypasses RLS) */
    const serviceClient = createServiceClient();

    /* Standard client for auth.signUp() (triggers confirmation email) */
    const authClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    /* Step 2: Check for duplicate slug */
    const { data: existingOrg } = await serviceClient
      .from("organizations")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existingOrg) {
      return NextResponse.json(
        { error: "An organization with that name already exists. Please choose a different name." },
        { status: 409 }
      );
    }

    /* Step 3: Check for existing email */
    const { data: existingUsers } = await serviceClient
      .auth.admin.listUsers();

    const emailTaken = existingUsers?.users?.some(
      (u) => u.email === email.trim().toLowerCase()
    );

    if (emailTaken) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    /* Step 4: Create the organization */
    const { data: orgData, error: orgError } = await serviceClient
      .from("organizations")
      .insert({
        name: orgName.trim(),
        slug,
      })
      .select()
      .single();

    if (orgError) {
      return NextResponse.json(
        { error: "Failed to create organization. Please try again." },
        { status: 500 }
      );
    }

    /* Step 5: Create the auth user via signUp (triggers confirmation email) */
    const { data: authData, error: authError } = await authClient.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          organization_id: orgData.id,
          role: "owner",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

    if (authError) {
      /* Rollback: delete the org since user creation failed */
      await serviceClient.from("organizations").delete().eq("id", orgData.id);

      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    /* Step 6: Success */
    return NextResponse.json(
      {
        success: true,
        requiresVerification: true,
        message: "Account created. Please check your email to verify your address.",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}