/**
 * route.js — Bulk Invite API Route
 *
 * FILE LOCATION: src/app/api/auth/invite/bulk/route.js
 *
 * WHY THIS EXISTS:
 * A GM with 30 front-of-house staff shouldn't type 30 emails
 * one at a time. This route accepts an array of invitations,
 * validates them all, creates records, and sends emails.
 *
 * ACCEPTS:
 * POST body: { invitations: [{ email, role }] }
 *
 * RETURNS:
 * { results: [{ email, status: "sent" | "failed", error? }] }
 *
 * Each invitation is processed independently so one failure
 * doesn't block the rest.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase-server";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    /* Step 1: Verify authentication */
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    /* Step 2: Verify caller is owner or manager */
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

    /* Step 3: Parse input */
    const body = await request.json();
    const { invitations } = body;

    if (!invitations || !Array.isArray(invitations) || invitations.length === 0) {
      return NextResponse.json(
        { error: "No invitations provided." },
        { status: 400 }
      );
    }

    if (invitations.length > 50) {
      return NextResponse.json(
        { error: "Maximum 50 invitations per batch." },
        { status: 400 }
      );
    }

    const serviceClient = createServiceClient();

    /* Step 4: Fetch org details */
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

    const currentTotal = (currentMembers || 0) + (pendingInvites || 0);
    const remainingSeats = organization.max_seats - currentTotal;

    if (invitations.length > remainingSeats) {
      return NextResponse.json(
        {
          error: `Only ${remainingSeats} seats remaining. Reduce your list or contact support to increase your limit.`,
        },
        { status: 403 }
      );
    }

    /* Step 6: Get existing users and pending invites for dedup */
    const { data: authData } = await serviceClient.auth.admin.listUsers();
    const existingEmails = new Set(
      (authData?.users || []).map((u) => u.email?.toLowerCase())
    );

    const { data: existingInvitations } = await serviceClient
      .from("invitations")
      .select("email")
      .eq("organization_id", organization.id)
      .eq("status", "pending");

    const pendingEmails = new Set(
      (existingInvitations || []).map((i) => i.email?.toLowerCase())
    );

    /* Step 7: Process each invitation */
    const results = [];

    for (const inv of invitations) {
      const email = inv.email?.trim().toLowerCase();
      const role = ["manager", "employee"].includes(inv.role)
        ? inv.role
        : "employee";

      /* Validate email format */
      if (!email || !email.includes("@") || !email.includes(".")) {
        results.push({ email: inv.email || "", status: "failed", error: "Invalid email" });
        continue;
      }

      /* Check for existing user */
      if (existingEmails.has(email)) {
        results.push({ email, status: "failed", error: "Already has an account" });
        continue;
      }

      /* Check for duplicate pending invite */
      if (pendingEmails.has(email)) {
        results.push({ email, status: "failed", error: "Already invited" });
        continue;
      }

      /* Create invitation record */
      const { data: invitation, error: invError } = await serviceClient
        .from("invitations")
        .insert({
          organization_id: organization.id,
          email,
          role,
          invited_by: callerProfile.id,
        })
        .select()
        .single();

      if (invError) {
        results.push({ email, status: "failed", error: "Database error" });
        continue;
      }

      /* Send email via Resend */
      const inviteUrl = `https://restaurantstandards.com/signup/invite?token=${invitation.token}`;

      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Restaurant Standards <noreply@restaurantstandards.com>",
            to: [email],
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
          /* Email failed — delete the invitation record */
          await serviceClient.from("invitations").delete().eq("id", invitation.id);
          results.push({ email, status: "failed", error: "Email delivery failed" });
          continue;
        }

        /* Track this email as pending to prevent duplicates within the batch */
        pendingEmails.add(email);
        results.push({ email, status: "sent" });
      } catch {
        await serviceClient.from("invitations").delete().eq("id", invitation.id);
        results.push({ email, status: "failed", error: "Email delivery failed" });
      }
    }

    const sentCount = results.filter((r) => r.status === "sent").length;
    const failedCount = results.filter((r) => r.status === "failed").length;

    return NextResponse.json(
      {
        success: true,
        sent: sentCount,
        failed: failedCount,
        results,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[BULK INVITE] Unexpected error:", err.message);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}