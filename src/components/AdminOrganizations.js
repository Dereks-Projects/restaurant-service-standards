"use client";

/**
 * AdminOrganizations.js — Preview Organizations Manager
 *
 * FILE LOCATION: src/components/AdminOrganizations.js
 *
 * Single-page interface for super-admin to create / edit / delete
 * preview organizations. Each preview generates a /preview/[slug]
 * link used as an outbound sales asset.
 *
 * Server-side validation in the API route is the source of truth.
 * Client-side checks here are for UX speed only.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Check,
  X,
  ExternalLink,
  Eye,
  AlertTriangle,
} from "lucide-react";
import styles from "@/app/admin/organizations/page.module.css";

const DEFAULT_PRIMARY = "#e8c547";
const DEFAULT_SECONDARY = "#1e1e1e";

const EMPTY_FORM = {
  name: "",
  slug: "",
  logo_url: "",
  brand_primary: DEFAULT_PRIMARY,
  brand_secondary: DEFAULT_SECONDARY,
};

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50);
}

function relativeTime(dateStr) {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 1) return `${days}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  if (minutes >= 1) return `${minutes}m ago`;
  return "Just now";
}

function getInitials(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function AdminOrganizations({ initialOrgs }) {
  const router = useRouter();

  const [orgs, setOrgs] = useState(initialOrgs);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(null);
  const [logoLoadError, setLogoLoadError] = useState(false);

  const isEditing = editingId !== null;
  const totalVisits = orgs.reduce((sum, o) => sum + (o.visitCount || 0), 0);
  const activeCount = orgs.filter((o) => o.lastVisit).length;

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(t);
  }, [successMessage]);

  useEffect(() => {
    if (!copiedId) return;
    const t = setTimeout(() => setCopiedId(null), 2000);
    return () => clearTimeout(t);
  }, [copiedId]);

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !slugTouched && !isEditing) {
        next.slug = slugify(value);
      }
      return next;
    });
    if (field === "slug") setSlugTouched(true);
    if (field === "logo_url") setLogoLoadError(false);
    setError("");
  }

  function startEdit(org) {
    setEditingId(org.id);
    setForm({
      name: org.name,
      slug: org.slug,
      logo_url: org.logo_url || "",
      brand_primary: org.brand_primary,
      brand_secondary: org.brand_secondary,
    });
    setSlugTouched(true);
    setError("");
    setLogoLoadError(false);
    setConfirmingDelete(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSlugTouched(false);
    setError("");
    setLogoLoadError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim().toLowerCase(),
      logo_url: form.logo_url.trim(),
      brand_primary: form.brand_primary,
      brand_secondary: form.brand_secondary,
    };

    try {
      const res = await fetch("/api/admin/organizations", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { id: editingId, ...payload } : payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setSubmitting(false);
        return;
      }

      if (isEditing) {
        setOrgs((prev) =>
          prev.map((o) => (o.id === editingId ? { ...o, ...data.org } : o))
        );
        setSuccessMessage(`Updated ${data.org.name}`);
      } else {
        setOrgs((prev) => [data.org, ...prev]);
        setSuccessMessage(`Created ${data.org.name}`);
      }

      cancelEdit();
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/admin/organizations?id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete");
        setConfirmingDelete(null);
        return;
      }
      setOrgs((prev) => prev.filter((o) => o.id !== id));
      setSuccessMessage("Deleted");
      setConfirmingDelete(null);
      if (editingId === id) cancelEdit();
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function copyLink(slug, id) {
    const link = `${window.location.origin}/preview/${slug}`;
    navigator.clipboard
      .writeText(link)
      .then(() => setCopiedId(id))
      .catch(() => setError("Could not copy link"));
  }

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Building2 size={20} className={styles.headerIcon} />
          <h1 className={styles.pageTitle}>Preview Organizations</h1>
        </div>
        <Link href="/admin" className={styles.backLink}>
          Back to Admin
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{orgs.length}</span>
          <span className={styles.statLabel}>Preview Orgs</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalVisits}</span>
          <span className={styles.statLabel}>Total Visits</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{activeCount}</span>
          <span className={styles.statLabel}>Visited</span>
        </div>
      </div>

      {/* ── Success Banner ── */}
      {successMessage && (
        <div className={styles.successBanner}>
          <Check size={14} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ── Form ── */}
      <section className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>
            {isEditing ? `Edit ${form.name || "Preview"}` : "Create Preview Organization"}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className={styles.iconButton}
              aria-label="Cancel edit"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="org-name">
              Organization Name
            </label>
            <input
              id="org-name"
              type="text"
              className={styles.input}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              maxLength={100}
              required
              placeholder="Marriott Marquis Times Square"
            />
          </div>

          {/* Slug */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="org-slug">
              URL Slug
            </label>
            <input
              id="org-slug"
              type="text"
              className={styles.input}
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              maxLength={50}
              required
              pattern="[a-z0-9]([a-z0-9\-]*[a-z0-9])?"
              placeholder="marriott-marquis"
            />
            <span className={styles.helperText}>
              restaurantstandards.com/preview/<strong>{form.slug || "..."}</strong>
            </span>
          </div>

          {/* Logo URL */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="org-logo">
              Logo URL
              <span className={styles.optionalTag}>optional</span>
            </label>
            <input
              id="org-logo"
              type="url"
              className={styles.input}
              value={form.logo_url}
              onChange={(e) => updateField("logo_url", e.target.value)}
              maxLength={500}
              placeholder="https://example.com/logo.png"
            />
            <span className={styles.helperText}>
              Right-click their logo on the prospect website and copy the image address. Must be HTTPS.
            </span>

            {form.logo_url && !logoLoadError && (
              <div className={styles.logoPreview}>
                <img
                  src={form.logo_url}
                  alt="Logo preview"
                  onError={() => setLogoLoadError(true)}
                />
              </div>
            )}
            {form.logo_url && logoLoadError && (
              <div className={styles.logoPreviewError}>
                <AlertTriangle size={14} />
                <span>Image failed to load. URL may be broken or blocked.</span>
              </div>
            )}
          </div>

          {/* Brand colors */}
          <div className={styles.colorRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="org-primary">
                Primary Color
              </label>
              <div className={styles.colorInputGroup}>
                <input
                  id="org-primary"
                  type="color"
                  className={styles.colorPicker}
                  value={form.brand_primary}
                  onChange={(e) => updateField("brand_primary", e.target.value)}
                />
                <input
                  type="text"
                  className={styles.hexInput}
                  value={form.brand_primary}
                  onChange={(e) => updateField("brand_primary", e.target.value)}
                  pattern="#[0-9a-fA-F]{6}"
                  maxLength={7}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="org-secondary">
                Secondary Color
              </label>
              <div className={styles.colorInputGroup}>
                <input
                  id="org-secondary"
                  type="color"
                  className={styles.colorPicker}
                  value={form.brand_secondary}
                  onChange={(e) => updateField("brand_secondary", e.target.value)}
                />
                <input
                  type="text"
                  className={styles.hexInput}
                  value={form.brand_secondary}
                  onChange={(e) => updateField("brand_secondary", e.target.value)}
                  pattern="#[0-9a-fA-F]{6}"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Actions */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? (
                isEditing ? "Saving..." : "Creating..."
              ) : isEditing ? (
                "Save Changes"
              ) : (
                <>
                  <Plus size={14} />
                  Create Preview
                </>
              )}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className={styles.cancelButton}
                disabled={submitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ── List ── */}
      <section className={styles.listSection}>
        <h2 className={styles.listTitle}>Existing Previews ({orgs.length})</h2>

        {orgs.length === 0 ? (
          <div className={styles.emptyState}>
            No preview organizations yet. Create one above to generate a sales demo link.
          </div>
        ) : (
          <div className={styles.orgList}>
            {orgs.map((org) => (
              <div key={org.id} className={styles.orgCard}>

                <div className={styles.orgCardLeft}>
                  <div
                    className={styles.orgLogo}
                    style={{
                      backgroundColor: org.brand_secondary,
                      color: org.brand_primary,
                    }}
                  >
                    {org.logo_url ? (
                      <img
                        src={org.logo_url}
                        alt={`${org.name} logo`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.nextSibling) {
                            e.currentTarget.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <span
                      className={styles.orgInitials}
                      style={{ display: org.logo_url ? "none" : "flex" }}
                    >
                      {getInitials(org.name)}
                    </span>
                  </div>

                  <div className={styles.orgInfo}>
                    <div className={styles.orgName}>{org.name}</div>
                    <div className={styles.orgSlug}>/preview/{org.slug}</div>
                    <div className={styles.orgStats}>
                      <span className={styles.orgStat}>
                        <Eye size={12} />
                        {org.visitCount || 0} {org.visitCount === 1 ? "visit" : "visits"}
                      </span>
                      <span className={styles.orgStat}>
                        Last: {relativeTime(org.lastVisit)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.orgCardActions}>
                  <button
                    onClick={() => copyLink(org.slug, org.id)}
                    className={`${styles.actionButton} ${copiedId === org.id ? styles.actionSuccess : ""}`}
                    aria-label="Copy preview link"
                  >
                    {copiedId === org.id ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Link
                      </>
                    )}
                  </button>

                  <a
                    href={`/preview/${org.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    aria-label="Open preview"
                  >
                    <ExternalLink size={14} /> Open
                  </a>

                  <button
                    onClick={() => startEdit(org)}
                    className={styles.actionButton}
                    aria-label="Edit"
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  {confirmingDelete === org.id ? (
                    <div className={styles.confirmDelete}>
                      <span>Delete?</span>
                      <button
                        onClick={() => handleDelete(org.id)}
                        className={styles.confirmYes}
                        disabled={submitting}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmingDelete(null)}
                        className={styles.confirmNo}
                        disabled={submitting}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmingDelete(org.id)}
                      className={`${styles.actionButton} ${styles.actionDanger}`}
                      aria-label="Delete"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}