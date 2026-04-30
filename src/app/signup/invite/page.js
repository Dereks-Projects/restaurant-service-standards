/**
 * page.js — Invite Signup Page
 *
 * FILE LOCATION: src/app/signup/invite/page.js
 *
 * WHY THIS EXISTS:
 * When an invited user clicks "Accept Invitation" in their email,
 * the link includes a token: /signup/invite?token=xxx
 *
 * This server component looks up the token, retrieves the
 * invitation details (org name, role, email), and passes them
 * to the client form. The invited user only needs to enter
 * their name and password — everything else is pre-filled.
 *
 * If the token is invalid, expired, or already used, the page
 * shows an appropriate error.
 */

import { createServiceClient } from "@/lib/supabase-server";
import InviteSignupForm from "@/components/InviteSignupForm";

export const metadata = {
  title: "Accept Invitation",
  description: "Accept your invitation and join your team on Restaurant Standards.",
};

export default async function InviteSignupPage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return (
      <InviteSignupForm
        error="No invitation token provided. Please use the link from your invitation email."
      />
    );
  }

  const serviceClient = createServiceClient();

  /* Look up the invitation by token */
  const { data: invitation, error: inviteError } = await serviceClient
    .from("invitations")
    .select("id, email, role, status, expires_at, organization_id")
    .eq("token", token)
    .single();

  if (inviteError || !invitation) {
    return (
      <InviteSignupForm
        error="This invitation link is not valid. Please ask your manager to send a new one."
      />
    );
  }

  if (invitation.status === "accepted") {
    return (
      <InviteSignupForm
        error="This invitation has already been used. If you already have an account, please sign in."
      />
    );
  }

  if (invitation.status === "expired" || new Date(invitation.expires_at) < new Date()) {
    return (
      <InviteSignupForm
        error="This invitation has expired. Please ask your manager to send a new one."
      />
    );
  }

  /* Fetch the organization name for display */
  const { data: organization } = await serviceClient
    .from("organizations")
    .select("name")
    .eq("id", invitation.organization_id)
    .single();

  return (
    <InviteSignupForm
      token={token}
      email={invitation.email}
      role={invitation.role}
      organizationName={organization?.name || "your organization"}
    />
  );
}