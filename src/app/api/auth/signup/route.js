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
 *   3. Creates the organization using the service role client
 *   4. Creates the auth user with org metadata
 *   5. If step 4 fails, deletes the org from step 3 (rollback)
 *   6. Returns success or a specific error message
 *
 * The handle_new_user database trigger automatically creates
 * the profiles row when the auth user is created in step 4.
 *
 * EMAIL VERIFICATION:
 * Supabase Auth is configured to require email confirmation.
 * After signup, the user receives a confirmation email. They
 * cannot access protected routes until they confirm. The API
 * returns a flag indicating verification is required so the
 * frontend can show the appropriate message.
 */

import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

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

    const supabase = createServiceClient();

    /* Step 2: Check for duplicate slug */
    const { data: existingOrg } = await supabase
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

    /* Step 3: Create the organization */
    const { data: orgData, error: orgError } = await supabase
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

    /* Step 4: Create the auth user */
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: email.trim().toLowerCase(),
        password,
        email_confirm: false,
        user_metadata: {
          organization_id: orgData.id,
          role: "owner",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      });

    if (authError) {
      /* Rollback: delete the org we just created */
      await supabase.from("organizations").delete().eq("id", orgData.id);

      /* Provide user-friendly error messages */
      if (authError.message.includes("already been registered")) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please sign in instead." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    /* Step 5: Success */
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