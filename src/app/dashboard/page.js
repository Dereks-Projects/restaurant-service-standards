/**
 * page.js — Dashboard Page
 *
 * FILE LOCATION: src/app/dashboard/page.js
 *
 * WHY THIS IS A SERVER COMPONENT:
 * Auth verification and data fetching happen server-side before
 * any HTML reaches the browser. If the user is not authenticated,
 * they are redirected to /login immediately — they never see a
 * flash of dashboard content. This is the standard SaaS pattern.
 *
 * Data fetched here (profile, organization) is passed as props
 * to the Dashboard client component, which handles interactive UI.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import Dashboard from "@/components/Dashboard";

export const metadata = {
  title: "Dashboard",
  description: "Your Restaurant Standards training dashboard.",
};

export default async function DashboardPage() {
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

  /* ── Fetch profile (role, name, job title) ── */
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  /* ── Fetch organization ── */
  const { data: organization } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", profile.organization_id)
    .single();

  /* ── Fetch team count (for owners and managers) ── */
  let teamCount = 0;

  if (profile.role === "owner" || profile.role === "manager") {
    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", profile.organization_id)
      .eq("is_active", true);

    teamCount = count || 0;
  }

  /* ── Pass everything to the client component ── */
  return (
    <Dashboard
      profile={profile}
      organization={organization}
      teamCount={teamCount}
    />
  );
}