"use client";

/**
 * Dashboard.js — Dashboard Client Component
 *
 * FILE LOCATION: src/components/Dashboard.js
 *
 * WHY THIS IS A CLIENT COMPONENT:
 * The page.js server component handles auth and data fetching.
 * This component receives that data as props and renders the
 * interactive dashboard UI. Client-side because it uses the
 * useAuth hook for sign-out and will later handle interactive
 * features like progress updates.
 *
 * ROLE-BASED RENDERING:
 * - Owner: org overview, team stats, management actions, training access
 * - Manager: team stats, management actions, training access
 * - Employee: personal progress, training access
 */

import Link from "next/link";
import {
  Award,
  MessageSquareText,
  ClipboardCheck,
  Target,
  ClipboardList,
  Users,
  Settings,
  UserPlus,
  Building2,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import styles from "@/app/dashboard/page.module.css";

export default function Dashboard({ profile, organization, teamCount }) {
  const { signOut } = useAuth();

  const isManager = profile.role === "owner" || profile.role === "manager";
  const displayName = profile.first_name || "there";

  function getRoleLabel(role) {
    if (role === "owner") return "Owner";
    if (role === "manager") return "Manager";
    return "Team Member";
  }

  return (
    <div className={styles.page}>

      {/* ── Welcome Header ── */}
      <section className={styles.welcome}>
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeTitle}>Welcome, {displayName}</h1>
          <p className={styles.welcomeMeta}>
            {getRoleLabel(profile.role)}
            {organization && <> &middot; {organization.name}</>}
          </p>
        </div>
        <button onClick={signOut} className={styles.signOutButton}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </section>

      {/* ── Organization Overview (Owners & Managers) ── */}
      {isManager && (
        <section className={styles.orgOverview}>
          <div className={styles.overviewStat}>
            <Users size={20} className={styles.overviewIcon} />
            <div>
              <span className={styles.overviewValue}>{teamCount}</span>
              <span className={styles.overviewLabel}>
                {teamCount === 1 ? "Team Member" : "Team Members"}
              </span>
            </div>
          </div>

          <div className={styles.overviewActions}>
            <Link href="/dashboard/settings" className={styles.overviewLink}>
              <Settings size={14} />
              Settings
            </Link>
            <Link href="/dashboard/settings" className={styles.overviewLink}>
              <UserPlus size={14} />
              Invite Team
            </Link>
          </div>
        </section>
      )}

      {/* ── Training Modules ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Training</h2>

        <div className={styles.modules}>
          <Link href="/course" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Award size={20} />
            </div>
            <div className={styles.moduleContent}>
              <div className={styles.moduleTitle}>5 Steps to 5 Stars</div>
              <div className={styles.moduleDescription}>
                Five classes defining elevated guest service
              </div>
            </div>
            <ChevronRight size={18} className={styles.moduleArrow} />
          </Link>

          <Link href="/ai-agent" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <MessageSquareText size={20} />
            </div>
            <div className={styles.moduleContent}>
              <div className={styles.moduleTitle}>AI Training Agent</div>
              <div className={styles.moduleDescription}>
                Practice real scenarios with AI coaching
              </div>
            </div>
            <ChevronRight size={18} className={styles.moduleArrow} />
          </Link>

          <Link href="/standards" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <ClipboardCheck size={20} />
            </div>
            <div className={styles.moduleContent}>
              <div className={styles.moduleTitle}>Service Standards</div>
              <div className={styles.moduleDescription}>
                The complete standards system across all operational areas
              </div>
            </div>
            <ChevronRight size={18} className={styles.moduleArrow} />
          </Link>

          <Link href="/checklists" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <ClipboardList size={20} />
            </div>
            <div className={styles.moduleContent}>
              <div className={styles.moduleTitle}>Operational Checklists</div>
              <div className={styles.moduleDescription}>
                Pre-shift walkthroughs and service audit tools
              </div>
            </div>
            <ChevronRight size={18} className={styles.moduleArrow} />
          </Link>

          <Link href="/quiz" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Target size={20} />
            </div>
            <div className={styles.moduleContent}>
              <div className={styles.moduleTitle}>Knowledge Assessment</div>
              <div className={styles.moduleDescription}>
                Test service knowledge with section-based quizzes
              </div>
            </div>
            <ChevronRight size={18} className={styles.moduleArrow} />
          </Link>
        </div>
      </section>

      {/* ── Organization Branding (Owners only) ── */}
      {profile.role === "owner" && organization && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Organization</h2>

          <div className={styles.orgCard}>
            <div className={styles.orgIcon}>
              <Building2 size={20} />
            </div>
            <div className={styles.orgContent}>
              <div className={styles.orgName}>{organization.name}</div>
              <div className={styles.orgSlug}>
                restaurantstandards.com/preview/{organization.slug}
              </div>
            </div>
            <Link href="/dashboard/settings" className={styles.orgSettingsLink}>
              <Settings size={16} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}