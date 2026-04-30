/**
 * page.js — Admin Dashboard
 *
 * FILE LOCATION: src/app/admin/page.js
 *
 * SUPER-ADMIN ONLY:
 * This page is only accessible to users with is_super_admin = true.
 * Everyone else gets redirected. Uses the service role client to
 * query across all organizations — bypasses RLS intentionally.
 *
 * DATA SHOWN:
 * - All organizations with subscription status
 * - All users across all orgs
 * - Pending invitations platform-wide
 * - Unverified accounts (cleanup candidates)
 * - Platform-wide stats
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase-server";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin",
  description: "Platform administration dashboard.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
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

  /* ── Verify super-admin status ── */
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_super_admin")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_super_admin) {
    redirect("/dashboard");
  }

  /* ── Use service client for cross-org queries ── */
  const serviceClient = createServiceClient();

  /* Fetch all organizations */
  const { data: organizations } = await serviceClient
    .from("organizations")
    .select("*")
    .order("created_at", { ascending: false });

  /* Fetch all profiles with org names */
  const { data: allProfiles } = await serviceClient
    .from("profiles")
    .select("id, first_name, last_name, role, is_active, is_super_admin, created_at, organization_id")
    .order("created_at", { ascending: false });

  /* Fetch all auth users for verification status */
  const { data: authData } = await serviceClient.auth.admin.listUsers();
  const authUsers = authData?.users || [];

  /* Fetch pending invitations */
  const { data: pendingInvitations } = await serviceClient
    .from("invitations")
    .select("id, email, role, status, organization_id, created_at, expires_at")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  /* Fetch preview visits */
  const { data: previewVisits } = await serviceClient
    .from("preview_visits")
    .select("id, organization_id, visited_at, page_path")
    .order("visited_at", { ascending: false })
    .limit(50);

  /* Build user map with email verification status */
  const usersWithStatus = (allProfiles || []).map((p) => {
    const authUser = authUsers.find((u) => u.id === p.id);
    const org = (organizations || []).find((o) => o.id === p.organization_id);
    return {
      ...p,
      email: authUser?.email || "unknown",
      email_confirmed: !!authUser?.email_confirmed_at,
      last_sign_in: authUser?.last_sign_in_at || null,
      organization_name: org?.name || "No org",
    };
  });

  /* Platform stats */
  const stats = {
    totalOrgs: (organizations || []).length,
    totalUsers: (allProfiles || []).length,
    verifiedUsers: usersWithStatus.filter((u) => u.email_confirmed).length,
    unverifiedUsers: usersWithStatus.filter((u) => !u.email_confirmed).length,
    pendingInvites: (pendingInvitations || []).length,
    totalPreviewVisits: (previewVisits || []).length,
  };

  return (
    <AdminDashboard
      stats={stats}
      organizations={organizations || []}
      users={usersWithStatus}
      invitations={pendingInvitations || []}
      previewVisits={previewVisits || []}
    />
  );
}