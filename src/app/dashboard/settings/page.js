/**
 * page.js — Dashboard Settings Page
 *
 * FILE LOCATION: src/app/dashboard/settings/page.js
 *
 * WHY THIS IS A SERVER COMPONENT:
 * Auth verification, role checking, and data fetching happen
 * server-side. Only owners and managers can access this page.
 * Employees are redirected to the main dashboard.
 *
 * Data fetched: organization details, team member list, pending
 * invitations. All passed as props to the client component.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import DashboardSettings from "@/components/DashboardSettings";

export const metadata = {
  title: "Settings",
  description: "Manage your organization, team, and account settings.",
};

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  /* ── Verify authentication ── */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  /* ── Fetch profile ── */
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  /* ── Only owners and managers can access settings ── */
  if (profile.role === "employee") {
    redirect("/dashboard");
  }

  /* ── Fetch organization ── */
  const { data: organization } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", profile.organization_id)
    .single();

  /* ── Fetch team members ── */
  const { data: teamMembers } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role, job_title, is_active, created_at")
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: true });

  /* ── Fetch pending invitations ── */
  const { data: invitations } = await supabase
    .from("invitations")
    .select("id, email, role, status, created_at, expires_at")
    .eq("organization_id", profile.organization_id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (
    <DashboardSettings
      profile={profile}
      organization={organization}
      teamMembers={teamMembers || []}
      invitations={invitations || []}
    />
  );
}