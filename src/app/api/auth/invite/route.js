/**
 * route.js — Invite API Route
 *
 * FILE LOCATION: src/app/api/auth/invite/route.js
 *
 * WHY THIS EXISTS:
 * When an owner or manager invites a team member, this route:
 *   1. Verifies the caller is authenticated and has permission
 *   2. Checks seat limits and duplicate invites
 *   3. Creates an invitation record with a unique token
 *   4. Sends a branded invitation email via Resend
 *   5. Returns success or a specific error
 *
 * The invited person receives an email with a link to
 * /signup/invite?token=xxx which will pre-fill their org
 * and role during signup.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase-server";

/* ── POST handler ──────────────────────────────────────────────────────── */

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    /* Step 1: Verify the caller is authenticated */
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to invite team members." },
        { status: 401 }
      );
    }

    /* Step 2: Verify the caller is an owner or manager */
    const { data: callerProfile } = await supabase
      .from("profiles")
      .select("id, organization_id, role")
      .eq("id", user.id)
      .single();

    if (!callerProfile || !["owner", "manager"].includes(callerProfile.role)) {
      return NextResponse.json(
        { error: "Only owners and managers can invite team members." },
        { status: 403 }
      );
    }

    /* Step 3: Parse and validate input */
    const body = await request.json();
    const { email, role } = body;

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!["employee", "manager"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'employee' or 'manager'." },
        { status: 400 }
      );
    }

    const serviceClient = createServiceClient();

    /* Step 4: Fetch organization for seat limits and branding */
    const { data: organization } = await serviceClient
      .from("organizations")
      .select("id, name, slug, max_seats")
      .eq("id", callerProfile.organization_id)
      .single();

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found." },
        { status: 500 }
      );
    }

    /* Step 5: Check seat limits */
    const { count: currentMembers } = await serviceClient
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organization.id)
      .eq("is_active", true);

    const { count: pendingInvites } = await serviceClient
      .from("invitations")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organization.id)
      .eq("status", "pending");

    const totalSeats = (currentMembers || 0) + (pendingInvites || 0);

    if (totalSeats >= organization.max_seats) {
      return NextResponse.json(
        {
          error: `Your organization has reached its limit of ${organization.max_seats} seats. Contact support to increase your limit.`,
        },
        { status: 403 }
      );
    }

    /* Step 6: Check for existing user with this email */
    const { data: existingUsers } = await serviceClient.auth.admin.listUsers();
    const emailTaken = existingUsers?.users?.some(
      (u) => u.email === email.trim().toLowerCase()
    );

    if (emailTaken) {
      return NextResponse.json(
        { error: "A user with this email already has an account." },
        { status: 409 }
      );
    }

    /* Step 7: Check for duplicate pending invitation */
    const { data: existingInvite } = await serviceClient
      .from("invitations")
      .select("id")
      .eq("organization_id", organization.id)
      .eq("email", email.trim().toLowerCase())
      .eq("status", "pending")
      .single();

    if (existingInvite) {
      return NextResponse.json(
        { error: "An invitation has already been sent to this email." },
        { status: 409 }
      );
    }

    /* Step 8: Create the invitation record */
    const { data: invitation, error: inviteError } = await serviceClient
      .from("invitations")
      .insert({
        organization_id: organization.id,
        email: email.trim().toLowerCase(),
        role,
        invited_by: callerProfile.id,
      })
      .select()
      .single();

    if (inviteError) {
      console.error("[INVITE] Insert error:", inviteError.message);
      return NextResponse.json(
        { error: "Failed to create invitation. Please try again." },
        { status: 500 }
      );
    }

    /* Step 9: Send the invitation email via Resend */
    const inviteUrl = `https://restaurantstandards.com/signup/invite?token=${invitation.token}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Restaurant Standards <noreply@restaurantstandards.com>",
        to: [email.trim().toLowerCase()],
        subject: `You're invited to join ${organization.name} on Restaurant Standards`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
            <h2 style="color: #1e1e1e; font-size: 22px; margin-bottom: 8px;">You've been invited</h2>
            <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
              ${callerProfile.role === "owner" ? "The owner" : "A manager"} of
              <strong>${organization.name}</strong> has invited you to join their
              team on Restaurant Standards as a
              <strong>${role === "manager" ? "Manager" : "Team Member"}</strong>.
            </p>
            <a href="${inviteUrl}"
               style="display: inline-block; background-color: #e8c547; color: #1e1e1e;
                      font-weight: 600; font-size: 15px; padding: 12px 28px;
                      border-radius: 8px; text-decoration: none;">
              Accept Invitation
            </a>
            <p style="color: #999; font-size: 13px; margin-top: 24px; line-height: 1.5;">
              This invitation expires in 7 days. If you didn't expect this email,
              you can safely ignore it.
            </p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.json();
      console.error("[INVITE] Resend error:", resendError);

      /* Invitation record exists but email failed — mark it so we can retry */
      return NextResponse.json(
        { error: "Invitation created but email delivery failed. Please try again." },
        { status: 500 }
      );
    }

    /* Step 10: Success */
    return NextResponse.json(
      {
        success: true,
        message: `Invitation sent to ${email.trim().toLowerCase()}`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[INVITE] Unexpected error:", err.message);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}