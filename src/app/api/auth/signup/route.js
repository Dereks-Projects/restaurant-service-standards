/**
 * route.js — Signup API Route
 *
 * FILE LOCATION: src/app/api/auth/signup/route.js
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
    let serviceClient;
    try {
      serviceClient = createServiceClient();
    } catch (err) {
      console.error("[SIGNUP] Service client creation failed:", err.message);
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

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
    const { data: existingOrg, error: slugCheckError } = await serviceClient
      .from("organizations")
      .select("id")
      .eq("slug", slug)
      .single();

    if (slugCheckError && slugCheckError.code !== "PGRST116") {
      console.error("[SIGNUP] Slug check error:", slugCheckError.message, slugCheckError.code);
      return NextResponse.json(
        { error: "Failed to verify organization name. Please try again." },
        { status: 500 }
      );
    }

    if (existingOrg) {
      return NextResponse.json(
        { error: "An organization with that name already exists. Please choose a different name." },
        { status: 409 }
      );
    }

    /* Step 3: Create the organization */
    const { data: orgData, error: orgError } = await serviceClient
      .from("organizations")
      .insert({
        name: orgName.trim(),
        slug,
      })
      .select()
      .single();

    if (orgError) {
      console.error("[SIGNUP] Org creation error:", orgError.message, orgError.code, orgError.details);
      return NextResponse.json(
        { error: "Failed to create organization. Please try again." },
        { status: 500 }
      );
    }

    /* Step 4: Create the auth user via signUp (triggers confirmation email) */
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
      console.error("[SIGNUP] Auth error:", authError.message);
      /* Rollback: delete the org since user creation failed */
      await serviceClient.from("organizations").delete().eq("id", orgData.id);

      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    console.log("[SIGNUP] Success for:", email.trim().toLowerCase());

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
    console.error("[SIGNUP] Unexpected error:", err.message, err.stack);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}