/**
 * route.js — Admin Preview Organizations API
 *
 * FILE LOCATION: src/app/api/admin/organizations/route.js
 *
 * Handles create / update / delete of preview organizations.
 *
 * SECURITY (applied to every handler):
 *   - Origin header check (CSRF guard against cross-site POSTs)
 *   - Session check via supabase.auth.getUser()
 *   - is_super_admin check against profiles
 *   - Service client used ONLY after authorization passes
 *   - Full input validation (name, slug, colors, logo URL)
 *   - Logo URL blocked from javascript:, data:, file:, vbscript: schemes
 *   - HTTPS-only enforcement on logo URLs
 *   - Slug uniqueness enforced both at app level and DB level (23505)
 *   - is_preview = true guard on update/delete (cannot touch real customer orgs)
 *   - Every privileged action written to admin_audit_log
 *   - All responses sent with Cache-Control: no-store
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase-server";

const ALLOWED_ORIGINS = [
  "https://restaurantstandards.com",
  "http://localhost:3000",
];

const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

/* ── Validation helpers ── */

function validateName(name) {
  if (typeof name !== "string") return "Name is required";
  const t = name.trim();
  if (t.length < 1) return "Name is required";
  if (t.length > 100) return "Name must be 100 characters or less";
  return null;
}

function validateSlug(slug) {
  if (typeof slug !== "string") return "Slug is required";
  const t = slug.trim().toLowerCase();
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(t)) {
    return "Slug must be lowercase letters, numbers, and hyphens (e.g. marriott-marquis)";
  }
  if (t.length > 50) return "Slug must be 50 characters or less";
  return null;
}

function validateColor(value, label) {
  if (typeof value !== "string") return `${label} is required`;
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
    return `${label} must be a hex color (e.g. #e8c547)`;
  }
  return null;
}

function validateLogoUrl(url) {
  if (!url || (typeof url === "string" && url.trim() === "")) return null;
  if (typeof url !== "string") return "Invalid logo URL";
  if (url.length > 500) return "Logo URL is too long";

  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();

  /* Defense in depth: explicit blocklist before parsing */
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("file:") ||
    lower.startsWith("vbscript:")
  ) {
    return "Invalid logo URL";
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return "Logo URL must be a valid URL";
  }

  if (parsed.protocol !== "https:") {
    return "Logo URL must use HTTPS";
  }

  return null;
}

function checkOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

async function authorize(request) {
  if (!checkOrigin(request)) {
    return { error: "Forbidden", status: 403 };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized", status: 401 };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_super_admin")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_super_admin) {
    return { error: "Forbidden", status: 403 };
  }

  return { user };
}

async function logAction(serviceClient, actorId, action, targetId, metadata) {
  await serviceClient.from("admin_audit_log").insert({
    actor_id: actorId,
    action,
    target_type: "organization",
    target_id: targetId,
    metadata,
  });
}

function jsonError(message, status) {
  return NextResponse.json(
    { error: message },
    { status, headers: NO_STORE_HEADERS }
  );
}

/* ── POST: Create preview org ── */

export async function POST(request) {
  const auth = await authorize(request);
  if (auth.error) return jsonError(auth.error, auth.status);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const { name, slug, logo_url, brand_primary, brand_secondary } = body;

  const errors = [
    validateName(name),
    validateSlug(slug),
    validateColor(brand_primary, "Primary color"),
    validateColor(brand_secondary, "Secondary color"),
    validateLogoUrl(logo_url),
  ].filter(Boolean);

  if (errors.length > 0) return jsonError(errors[0], 400);

  const serviceClient = createServiceClient();
  const cleanSlug = slug.trim().toLowerCase();

  /* App-level uniqueness check for friendly error message */
  const { data: existing } = await serviceClient
    .from("organizations")
    .select("id")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (existing) return jsonError("Slug already in use", 409);

  const { data: newOrg, error: insertError } = await serviceClient
    .from("organizations")
    .insert({
      name: name.trim(),
      slug: cleanSlug,
      logo_url: logo_url ? logo_url.trim() : null,
      brand_primary,
      brand_secondary,
      is_preview: true,
      subscription_tier: "trial",
      subscription_status: "trialing",
      max_seats: 0,
      trial_ends_at: new Date("2099-12-31T00:00:00Z").toISOString(),
    })
    .select(
      "id, name, slug, logo_url, brand_primary, brand_secondary, created_at, updated_at"
    )
    .single();

  if (insertError) {
    /* DB-level uniqueness fallback (race condition guard) */
    if (insertError.code === "23505") {
      return jsonError("Slug already in use", 409);
    }
    console.error("Org creation failed:", insertError);
    return jsonError("Failed to create organization", 500);
  }

  await logAction(serviceClient, auth.user.id, "create_preview_org", newOrg.id, {
    name: newOrg.name,
    slug: newOrg.slug,
  });

  return NextResponse.json(
    { org: { ...newOrg, visitCount: 0, lastVisit: null } },
    { status: 201, headers: NO_STORE_HEADERS }
  );
}

/* ── PATCH: Update preview org ── */

export async function PATCH(request) {
  const auth = await authorize(request);
  if (auth.error) return jsonError(auth.error, auth.status);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const { id, name, slug, logo_url, brand_primary, brand_secondary } = body;

  if (!id || typeof id !== "string") return jsonError("ID required", 400);

  const errors = [
    validateName(name),
    validateSlug(slug),
    validateColor(brand_primary, "Primary color"),
    validateColor(brand_secondary, "Secondary color"),
    validateLogoUrl(logo_url),
  ].filter(Boolean);

  if (errors.length > 0) return jsonError(errors[0], 400);

  const serviceClient = createServiceClient();
  const cleanSlug = slug.trim().toLowerCase();

  /* Verify target exists AND is a preview org */
  const { data: target } = await serviceClient
    .from("organizations")
    .select("id, is_preview, slug")
    .eq("id", id)
    .single();

  if (!target) return jsonError("Organization not found", 404);
  if (!target.is_preview) {
    return jsonError("This route only manages preview organizations", 403);
  }

  /* Check slug uniqueness only if it's actually changing */
  if (cleanSlug !== target.slug) {
    const { data: conflict } = await serviceClient
      .from("organizations")
      .select("id")
      .eq("slug", cleanSlug)
      .maybeSingle();

    if (conflict) return jsonError("Slug already in use", 409);
  }

  const { data: updated, error: updateError } = await serviceClient
    .from("organizations")
    .update({
      name: name.trim(),
      slug: cleanSlug,
      logo_url: logo_url ? logo_url.trim() : null,
      brand_primary,
      brand_secondary,
    })
    .eq("id", id)
    .eq("is_preview", true)
    .select(
      "id, name, slug, logo_url, brand_primary, brand_secondary, created_at, updated_at"
    )
    .single();

  if (updateError) {
    if (updateError.code === "23505") {
      return jsonError("Slug already in use", 409);
    }
    console.error("Org update failed:", updateError);
    return jsonError("Failed to update", 500);
  }

  await logAction(serviceClient, auth.user.id, "update_preview_org", updated.id, {
    name: updated.name,
    slug: updated.slug,
  });

  return NextResponse.json({ org: updated }, { headers: NO_STORE_HEADERS });
}

/* ── DELETE: Remove preview org ── */

export async function DELETE(request) {
  const auth = await authorize(request);
  if (auth.error) return jsonError(auth.error, auth.status);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return jsonError("ID required", 400);

  const serviceClient = createServiceClient();

  const { data: target } = await serviceClient
    .from("organizations")
    .select("id, name, slug, is_preview")
    .eq("id", id)
    .single();

  if (!target) return jsonError("Not found", 404);
  if (!target.is_preview) {
    return jsonError("This route only manages preview organizations", 403);
  }

  /* Clean up dependent rows first; preview_visits has no ON DELETE CASCADE */
  await serviceClient.from("preview_visits").delete().eq("organization_id", id);

  const { error: deleteError } = await serviceClient
    .from("organizations")
    .delete()
    .eq("id", id)
    .eq("is_preview", true);

  if (deleteError) {
    console.error("Org delete failed:", deleteError);
    return jsonError("Failed to delete", 500);
  }

  await logAction(serviceClient, auth.user.id, "delete_preview_org", id, {
    name: target.name,
    slug: target.slug,
  });

  return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
}