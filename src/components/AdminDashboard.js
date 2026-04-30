"use client";

/**
 * AdminDashboard.js — Admin Dashboard Client Component
 *
 * FILE LOCATION: src/components/AdminDashboard.js
 *
 * SECTIONS:
 * 1. Platform stats bar
 * 2. Alerts (unverified accounts, etc.)
 * 3. Organizations table
 * 4. Users table
 * 5. Pending invitations
 * 6. Recent preview visits
 */

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Building2,
  Users,
  Mail,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import styles from "@/app/admin/page.module.css";

export default function AdminDashboard({
  stats,
  organizations,
  users,
  invitations,
  previewVisits,
}) {
  const [expandedSection, setExpandedSection] = useState("organizations");

  function toggleSection(section) {
    setExpandedSection((current) => (current === section ? null : section));
  }

  function formatDate(dateStr) {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatDateTime(dateStr) {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function getRoleLabel(role) {
    if (role === "owner") return "Owner";
    if (role === "manager") return "Manager";
    return "Employee";
  }

  function getTierLabel(tier) {
    if (tier === "trial") return "Trial";
    if (tier === "starter") return "Starter";
    if (tier === "professional") return "Professional";
    if (tier === "enterprise") return "Enterprise";
    return tier;
  }

  const unverifiedUsers = users.filter((u) => !u.email_confirmed);

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Shield size={20} className={styles.headerIcon} />
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
        </div>
        <Link href="/dashboard" className={styles.backLink}>
          Back to Dashboard
        </Link>
      </div>

      {/* ── Stats Bar ── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalOrgs}</span>
          <span className={styles.statLabel}>Organizations</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalUsers}</span>
          <span className={styles.statLabel}>Total Users</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.verifiedUsers}</span>
          <span className={styles.statLabel}>Verified</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.pendingInvites}</span>
          <span className={styles.statLabel}>Pending Invites</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalPreviewVisits}</span>
          <span className={styles.statLabel}>Preview Visits</span>
        </div>
      </div>

      {/* ── Alerts ── */}
      {unverifiedUsers.length > 0 && (
        <div className={styles.alert}>
          <AlertTriangle size={16} />
          <span>
            {unverifiedUsers.length} unverified{" "}
            {unverifiedUsers.length === 1 ? "account" : "accounts"} pending.
            Accounts older than 48 hours are cleaned up automatically.
          </span>
        </div>
      )}

      {/* ── Organizations ── */}
      <section className={styles.section}>
        <button
          className={styles.sectionToggle}
          onClick={() => toggleSection("organizations")}
        >
          <div className={styles.sectionToggleLeft}>
            <Building2 size={16} />
            <span>Organizations ({organizations.length})</span>
          </div>
          {expandedSection === "organizations" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSection === "organizations" && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Tier</th>
                  <th>Status</th>
                  <th>Seats</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => {
                  const memberCount = users.filter(
                    (u) => u.organization_id === org.id
                  ).length;
                  return (
                    <tr key={org.id}>
                      <td className={styles.cellBold}>{org.name}</td>
                      <td className={styles.cellMuted}>{org.slug}</td>
                      <td>{getTierLabel(org.subscription_tier)}</td>
                      <td>
                        <span
                          className={
                            org.subscription_status === "active" ||
                            org.subscription_status === "trialing"
                              ? styles.statusActive
                              : styles.statusInactive
                          }
                        >
                          {org.subscription_status}
                        </span>
                      </td>
                      <td>
                        {memberCount} / {org.max_seats}
                      </td>
                      <td className={styles.cellMuted}>
                        {formatDate(org.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Users ── */}
      <section className={styles.section}>
        <button
          className={styles.sectionToggle}
          onClick={() => toggleSection("users")}
        >
          <div className={styles.sectionToggleLeft}>
            <Users size={16} />
            <span>Users ({users.length})</span>
          </div>
          {expandedSection === "users" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSection === "users" && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Org</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Last Sign In</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className={styles.cellBold}>
                      {u.first_name} {u.last_name}
                      {u.is_super_admin && (
                        <Shield size={12} className={styles.adminBadge} />
                      )}
                    </td>
                    <td className={styles.cellMuted}>{u.email}</td>
                    <td>{u.organization_name}</td>
                    <td>{getRoleLabel(u.role)}</td>
                    <td>
                      {u.email_confirmed ? (
                        <CheckCircle size={14} className={styles.iconGreen} />
                      ) : (
                        <XCircle size={14} className={styles.iconRed} />
                      )}
                    </td>
                    <td className={styles.cellMuted}>
                      {formatDateTime(u.last_sign_in)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Pending Invitations ── */}
      <section className={styles.section}>
        <button
          className={styles.sectionToggle}
          onClick={() => toggleSection("invitations")}
        >
          <div className={styles.sectionToggleLeft}>
            <Mail size={16} />
            <span>Pending Invitations ({invitations.length})</span>
          </div>
          {expandedSection === "invitations" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSection === "invitations" && (
          <div className={styles.tableWrap}>
            {invitations.length === 0 ? (
              <p className={styles.emptyState}>No pending invitations</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Org</th>
                    <th>Role</th>
                    <th>Sent</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.map((inv) => {
                    const org = organizations.find(
                      (o) => o.id === inv.organization_id
                    );
                    return (
                      <tr key={inv.id}>
                        <td className={styles.cellBold}>{inv.email}</td>
                        <td>{org?.name || "Unknown"}</td>
                        <td>{getRoleLabel(inv.role)}</td>
                        <td className={styles.cellMuted}>
                          {formatDate(inv.created_at)}
                        </td>
                        <td className={styles.cellMuted}>
                          {formatDate(inv.expires_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>

      {/* ── Preview Visits ── */}
      <section className={styles.section}>
        <button
          className={styles.sectionToggle}
          onClick={() => toggleSection("previews")}
        >
          <div className={styles.sectionToggleLeft}>
            <Eye size={16} />
            <span>Recent Preview Visits ({previewVisits.length})</span>
          </div>
          {expandedSection === "previews" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSection === "previews" && (
          <div className={styles.tableWrap}>
            {previewVisits.length === 0 ? (
              <p className={styles.emptyState}>No preview visits yet</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Org</th>
                    <th>Page</th>
                    <th>Visited</th>
                  </tr>
                </thead>
                <tbody>
                  {previewVisits.map((v) => {
                    const org = organizations.find(
                      (o) => o.id === v.organization_id
                    );
                    return (
                      <tr key={v.id}>
                        <td className={styles.cellBold}>
                          {org?.name || "Unknown"}
                        </td>
                        <td className={styles.cellMuted}>
                          {v.page_path || "/"}
                        </td>
                        <td className={styles.cellMuted}>
                          {formatDateTime(v.visited_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>
    </div>
  );
}