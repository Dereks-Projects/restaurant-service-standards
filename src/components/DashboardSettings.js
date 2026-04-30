"use client";

/**
 * DashboardSettings.js — Settings Client Component
 *
 * FILE LOCATION: src/components/DashboardSettings.js
 *
 * SECTIONS:
 * 1. Organization info
 * 2. Team members list
 * 3. Pending invitations
 * 4. Invite single team member
 * 5. Bulk invite (CSV upload or paste emails)
 */

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Users,
  UserPlus,
  Mail,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  Upload,
  FileSpreadsheet,
} from "lucide-react";
import styles from "@/app/dashboard/settings/page.module.css";

export default function DashboardSettings({
  profile,
  organization,
  teamMembers,
  invitations,
}) {
  /* Single invite state */
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("employee");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState(null);
  const [inviteSuccess, setInviteSuccess] = useState(null);

  /* Bulk invite state */
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkRole, setBulkRole] = useState("employee");
  const [bulkParsed, setBulkParsed] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState(null);
  const [bulkResults, setBulkResults] = useState(null);
  const fileInputRef = useRef(null);

  function getRoleLabel(role) {
    if (role === "owner") return "Owner";
    if (role === "manager") return "Manager";
    return "Team Member";
  }

  function getInitials(firstName, lastName) {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last || "?";
  }

  /* ── Single Invite Handler ── */
  async function handleInvite(e) {
    e.preventDefault();
    setInviteError(null);
    setInviteSuccess(null);
    setInviteLoading(true);

    try {
      const response = await fetch("/api/auth/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail.trim().toLowerCase(),
          role: inviteRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setInviteError(data.error || "Failed to send invitation.");
        setInviteLoading(false);
        return;
      }

      setInviteSuccess(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setInviteRole("employee");
      setInviteLoading(false);
    } catch {
      setInviteError("Unable to send invitation. Please try again.");
      setInviteLoading(false);
    }
  }

  /* ── Bulk: Parse Text Input ── */
  function parseBulkText(text) {
    const lines = text
      .split(/[\n,;]+/)
      .map((line) => line.trim().toLowerCase())
      .filter((line) => line.length > 0 && line.includes("@"));

    const unique = [...new Set(lines)];

    return unique.map((email) => ({
      email,
      role: bulkRole,
    }));
  }

  function handleBulkPreview() {
    const parsed = parseBulkText(bulkText);
    setBulkParsed(parsed);
    setBulkError(null);
    setBulkResults(null);

    if (parsed.length === 0) {
      setBulkError("No valid email addresses found. Enter one email per line.");
    }
  }

  /* ── Bulk: Handle CSV Upload ── */
  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== "string") return;

      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);

      if (lines.length === 0) {
        setBulkError("File is empty.");
        return;
      }

      /* Check if first line is a header */
      const firstLine = lines[0].toLowerCase();
      const hasHeader =
        firstLine.includes("email") || firstLine.includes("address");
      const dataLines = hasHeader ? lines.slice(1) : lines;

      /* Find email column index */
      let emailIndex = 0;
      let roleIndex = -1;

      if (hasHeader) {
        const headers = firstLine.split(",").map((h) => h.trim());
        emailIndex = headers.findIndex(
          (h) => h.includes("email") || h.includes("address")
        );
        roleIndex = headers.findIndex((h) => h.includes("role"));
        if (emailIndex === -1) emailIndex = 0;
      }

      const parsed = [];
      const seen = new Set();

      for (const line of dataLines) {
        const cols = line.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
        const email = cols[emailIndex]?.toLowerCase();

        if (!email || !email.includes("@") || !email.includes(".")) continue;
        if (seen.has(email)) continue;
        seen.add(email);

        let role = bulkRole;
        if (roleIndex >= 0 && cols[roleIndex]) {
          const r = cols[roleIndex].toLowerCase();
          if (r === "manager") role = "manager";
          else role = "employee";
        }

        parsed.push({ email, role });
      }

      if (parsed.length === 0) {
        setBulkError(
          "No valid emails found in the file. Make sure the file has an 'email' column."
        );
        return;
      }

      setBulkText(parsed.map((p) => p.email).join("\n"));
      setBulkParsed(parsed);
      setBulkError(null);
      setBulkResults(null);
    };

    reader.readAsText(file);
    e.target.value = "";
  }

  /* ── Bulk: Submit ── */
  async function handleBulkSubmit() {
    if (bulkParsed.length === 0) return;

    setBulkLoading(true);
    setBulkError(null);
    setBulkResults(null);

    try {
      const response = await fetch("/api/auth/invite/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitations: bulkParsed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setBulkError(data.error || "Bulk invite failed.");
        setBulkLoading(false);
        return;
      }

      setBulkResults(data);
      setBulkLoading(false);
    } catch {
      setBulkError("Unable to connect. Please try again.");
      setBulkLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* ── Back to Dashboard ── */}
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <h1 className={styles.pageTitle}>Settings</h1>

      {/* ══════════════════════════════════════════════════════════
          ORGANIZATION SECTION
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Building2 size={18} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Organization</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Name</span>
            <span className={styles.infoValue}>{organization?.name}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Preview URL</span>
            <span className={styles.infoValueMuted}>
              restaurantstandards.com/preview/{organization?.slug}
            </span>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Plan</span>
            <span className={styles.infoValue}>
              {organization?.subscription_tier === "trial"
                ? "Free Trial"
                : organization?.subscription_tier}
            </span>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Team Seats</span>
            <span className={styles.infoValue}>
              {teamMembers.length} / {organization?.max_seats}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TEAM MEMBERS SECTION
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Users size={18} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>
            Team Members ({teamMembers.length})
          </h2>
        </div>

        <div className={styles.card}>
          {teamMembers.map((member, index) => (
            <div key={member.id}>
              {index > 0 && <div className={styles.divider} />}
              <div className={styles.memberRow}>
                <div className={styles.memberAvatar}>
                  {getInitials(member.first_name, member.last_name)}
                </div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>
                    {member.first_name} {member.last_name}
                  </span>
                  <span className={styles.memberMeta}>
                    {getRoleLabel(member.role)}
                    {member.job_title && <> &middot; {member.job_title}</>}
                  </span>
                </div>
                <div className={styles.memberStatus}>
                  {member.is_active ? (
                    <span className={styles.statusActive}>Active</span>
                  ) : (
                    <span className={styles.statusInactive}>Inactive</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PENDING INVITATIONS
          ══════════════════════════════════════════════════════════ */}
      {invitations.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Clock size={18} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              Pending Invitations ({invitations.length})
            </h2>
          </div>

          <div className={styles.card}>
            {invitations.map((inv, index) => (
              <div key={inv.id}>
                {index > 0 && <div className={styles.divider} />}
                <div className={styles.inviteRow}>
                  <div className={styles.inviteIcon}>
                    <Mail size={16} />
                  </div>
                  <div className={styles.inviteInfo}>
                    <span className={styles.inviteEmail}>{inv.email}</span>
                    <span className={styles.inviteMeta}>
                      {getRoleLabel(inv.role)} &middot; Sent{" "}
                      {new Date(inv.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={styles.statusPending}>Pending</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          INVITE TEAM MEMBER
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <UserPlus size={18} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Invite Team Member</h2>
        </div>

        <div className={styles.card}>
          {/* Tab toggle */}
          <div className={styles.inviteTabs}>
            <button
              className={`${styles.inviteTab} ${!bulkMode ? styles.inviteTabActive : ""}`}
              onClick={() => setBulkMode(false)}
            >
              Single Invite
            </button>
            <button
              className={`${styles.inviteTab} ${bulkMode ? styles.inviteTabActive : ""}`}
              onClick={() => setBulkMode(true)}
            >
              <FileSpreadsheet size={14} />
              Bulk Invite
            </button>
          </div>

          {/* ── Single Invite Form ── */}
          {!bulkMode && (
            <form onSubmit={handleInvite} className={styles.inviteForm}>
              {inviteError && (
                <div className={styles.error}>
                  <AlertCircle size={16} />
                  <span>{inviteError}</span>
                </div>
              )}

              {inviteSuccess && (
                <div className={styles.success}>
                  <CheckCircle size={16} />
                  <span>{inviteSuccess}</span>
                </div>
              )}

              <div className={styles.inviteFields}>
                <div className={styles.field}>
                  <label htmlFor="inviteEmail" className={styles.label}>
                    Email Address
                  </label>
                  <input
                    id="inviteEmail"
                    type="email"
                    required
                    placeholder="team@restaurant.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="inviteRole" className={styles.label}>
                    Role
                  </label>
                  <select
                    id="inviteRole"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className={styles.select}
                  >
                    <option value="employee">Team Member</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>

              <div className={styles.roleNote}>
                <Shield size={14} />
                <span>
                  Managers can view team progress and invite members.
                  Team members access training content only.
                </span>
              </div>

              <button
                type="submit"
                disabled={inviteLoading}
                className={styles.inviteButton}
              >
                {inviteLoading ? "Sending..." : "Send Invitation"}
              </button>
            </form>
          )}

          {/* ── Bulk Invite Form ── */}
          {bulkMode && (
            <div className={styles.inviteForm}>
              {bulkError && (
                <div className={styles.error}>
                  <AlertCircle size={16} />
                  <span>{bulkError}</span>
                </div>
              )}

              {bulkResults && (
                <div className={bulkResults.failed > 0 ? styles.bulkResultsMixed : styles.success}>
                  <CheckCircle size={16} />
                  <span>
                    {bulkResults.sent} sent, {bulkResults.failed} failed
                  </span>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>
                  Default Role
                </label>
                <select
                  value={bulkRole}
                  onChange={(e) => setBulkRole(e.target.value)}
                  className={styles.select}
                >
                  <option value="employee">Team Member</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Email Addresses
                </label>
                <textarea
                  placeholder={"server1@restaurant.com\nserver2@restaurant.com\nmanager@restaurant.com"}
                  value={bulkText}
                  onChange={(e) => {
                    setBulkText(e.target.value);
                    setBulkParsed([]);
                    setBulkResults(null);
                  }}
                  className={styles.textarea}
                  rows={6}
                />
                <span className={styles.bulkHint}>
                  One email per line, or upload a CSV file below
                </span>
              </div>

              <div className={styles.bulkActions}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.uploadButton}
                >
                  <Upload size={14} />
                  Upload CSV
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  onClick={handleBulkPreview}
                  className={styles.previewButton}
                  disabled={!bulkText.trim()}
                >
                  Preview ({parseBulkText(bulkText).length})
                </button>
              </div>

              {/* Preview table */}
              {bulkParsed.length > 0 && !bulkResults && (
                <div className={styles.bulkPreview}>
                  <div className={styles.bulkPreviewHeader}>
                    {bulkParsed.length} invitation{bulkParsed.length !== 1 ? "s" : ""} ready to send
                  </div>
                  <div className={styles.bulkPreviewList}>
                    {bulkParsed.map((inv, i) => (
                      <div key={i} className={styles.bulkPreviewItem}>
                        <span className={styles.bulkPreviewEmail}>{inv.email}</span>
                        <span className={styles.bulkPreviewRole}>
                          {inv.role === "manager" ? "Manager" : "Team Member"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results table */}
              {bulkResults && bulkResults.results && (
                <div className={styles.bulkPreview}>
                  <div className={styles.bulkPreviewHeader}>Results</div>
                  <div className={styles.bulkPreviewList}>
                    {bulkResults.results.map((r, i) => (
                      <div key={i} className={styles.bulkPreviewItem}>
                        <span className={styles.bulkPreviewEmail}>{r.email}</span>
                        <span
                          className={
                            r.status === "sent"
                              ? styles.statusActive
                              : styles.statusFailed
                          }
                        >
                          {r.status === "sent" ? "Sent" : r.error || "Failed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bulkParsed.length > 0 && !bulkResults && (
                <button
                  type="button"
                  onClick={handleBulkSubmit}
                  disabled={bulkLoading}
                  className={styles.inviteButton}
                >
                  {bulkLoading
                    ? `Sending ${bulkParsed.length} invitations...`
                    : `Send ${bulkParsed.length} Invitations`}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}