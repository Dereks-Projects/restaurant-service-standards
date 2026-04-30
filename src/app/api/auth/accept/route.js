/**
 * route.js — Accept Invitation API Route
 *
 * FILE LOCATION: src/app/api/auth/invite/accept/route.js
 *
 * WHY THIS EXISTS:
 * When an invited user submits the invite signup form, this route:
 *   1. Looks up the invitation by token
 *   2. Validates it's still pending and not expired
 *   3. Creates the auth user via signUp (triggers confirmation email)
 *   4. Marks the invitation as accepted
 *
 * The handle_new_user database trigger automatically creates
 * the profiles row with the correct org and role.
 */

import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, firstName, lastName, password } = body;

    /* Step 1: Validate inputs */
    if (!token) {
      return NextResponse.json(
        { error: "Missing invitation token." },
        { status: 400 }
      );
    }

    if (!firstName || firstName.trim().length === 0) {
      return NextResponse.json(
        { error: "First name is required." },
        { status: 400 }
      );
    }

    if (!lastName || lastName.trim().length === 0) {
      return NextResponse.json(
        { error: "Last name is required." },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const serviceClient = createServiceClient();

    /* Step 2: Look up the invitation */
    const { data: invitation, error: inviteError } = await serviceClient
      .from("invitations")
      .select("id, email, role, status, expires_at, organization_id")
      .eq("token", token)
      .single();

    if (inviteError || !invitation) {
      return NextResponse.json(
        { error: "This invitation is not valid. Please ask your manager to send a new one." },
        { status: 400 }
      );
    }

    if (invitation.status === "accepted") {
      return NextResponse.json(
        { error: "This invitation has already been used." },
        { status: 400 }
      );
    }

    if (new Date(invitation.expires_at) < new Date()) {
      /* Mark as expired */
      await serviceClient
        .from("invitations")
        .update({ status: "expired" })
        .eq("id", invitation.id);

      return NextResponse.json(
        { error: "This invitation has expired. Please ask your manager to send a new one." },
        { status: 400 }
      );
    }

    /* Step 3: Create the auth user via signUp (triggers confirmation email) */
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

    const { data: authData, error: authError } = await authClient.auth.signUp({
      email: invitation.email,
      password,
      options: {
        data: {
          organization_id: invitation.organization_id,
          role: invitation.role,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

    if (authError) {
      console.error("[INVITE ACCEPT] Auth error:", authError.message);
      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    /* Step 4: Mark invitation as accepted */
    await serviceClient
      .from("invitations")
      .update({ status: "accepted" })
      .eq("id", invitation.id);

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
    console.error("[INVITE ACCEPT] Unexpected error:", err.message);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}