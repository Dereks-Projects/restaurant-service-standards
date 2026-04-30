"use client";

/**
 * DashboardSettings.js — Settings Client Component
 *
 * FILE LOCATION: src/components/DashboardSettings.js
 *
 * SECTIONS:
 * 1. Organization info (name, preview URL)
 * 2. Team members list with roles
 * 3. Pending invitations
 * 4. Invite new team member form
 *
 * The invite form submits to /api/auth/invite (built separately).
 */

import { useState } from "react";
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
} from "lucide-react";
import styles from "@/app/dashboard/settings/page.module.css";

export default function DashboardSettings({
  profile,
  organization,
  teamMembers,
  invitations,
}) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("employee");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState(null);
  const [inviteSuccess, setInviteSuccess] = useState(null);

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

  return (
    <div className={styles.page}>
      {/* ── Back to Dashboard ── */}
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <h1 className={styles.pageTitle}>Settings</h1>

      {/* ── Organization Section ── */}
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

      {/* ── Team Members Section ── */}
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

      {/* ── Pending Invitations ── */}
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

      {/* ── Invite Team Member ── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <UserPlus size={18} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Invite Team Member</h2>
        </div>

        <div className={styles.card}>
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
        </div>
      </section>
    </div>
  );
}