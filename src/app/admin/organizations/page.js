/**
 * page.js — Admin Preview Organizations
 *
 * FILE LOCATION: src/app/admin/organizations/page.js
 *
 * SUPER-ADMIN ONLY. Manages white-label preview orgs used as
 * outbound sales assets. Real customer orgs (is_preview = false)
 * are NEVER returned by this page.
 *
 * SECURITY:
 *   - Layer 1: session check via supabase.auth.getUser()
 *   - Layer 2: is_super_admin check against profiles
 *   - Service client used only after both checks pass
 *   - Query is scoped to is_preview = true; customer org data
 *     is structurally unreachable from this route
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase-server";
import AdminOrganizations from "@/components/AdminOrganizations";

export const metadata = {
  title: "Preview Organizations",
  description: "Manage white-label preview organizations.",
  robots: { index: false, follow: false },
};

export default async function AdminOrganizationsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  /* Layer 1: Authenticated? */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  /* Layer 2: Super-admin? */
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_super_admin")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_super_admin) {
    redirect("/dashboard");
  }

  /* Service client: cross-org reads bypass RLS */
  const serviceClient = createServiceClient();

  const { data: previewOrgs } = await serviceClient
    .from("organizations")
    .select("id, name, slug, logo_url, brand_primary, brand_secondary, created_at, updated_at")
    .eq("is_preview", true)
    .order("created_at", { ascending: false });

  const { data: visitData } = await serviceClient
    .from("preview_visits")
    .select("organization_id, visited_at")
    .eq("event_type", "page_view")
    .order("visited_at", { ascending: false });

  /* Aggregate visits per org. visitData is sorted DESC, so the first
     entry seen for each org is the most recent visit. */
  const visitStats = {};
  (visitData || []).forEach((v) => {
    if (!visitStats[v.organization_id]) {
      visitStats[v.organization_id] = { count: 0, lastVisit: null };
    }
    visitStats[v.organization_id].count++;
    if (!visitStats[v.organization_id].lastVisit) {
      visitStats[v.organization_id].lastVisit = v.visited_at;
    }
  });

  const orgsWithStats = (previewOrgs || []).map((org) => ({
    ...org,
    visitCount: visitStats[org.id]?.count || 0,
    lastVisit: visitStats[org.id]?.lastVisit || null,
  }));

  return <AdminOrganizations initialOrgs={orgsWithStats} />;
}