"use client";

/**
 * Header.js — Top Navigation Bar
 *
 * FILE LOCATION: src/components/Header.js
 *
 * AUTH-AWARE NAVIGATION:
 * - Logged out: Sign In + Start Free Trial (prominent), product links below
 * - Logged in: Dashboard at top, product links, Sign Out at bottom
 *
 * TWO DROPDOWN PANELS:
 * 1. Portfolio (left chevron) — ecosystem sites
 * 2. Menu (right hamburger) — auth-aware navigation
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import siteConfig from "@/config/siteConfig";
import styles from "./Header.module.css";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Header() {
  const [openPanel, setOpenPanel] = useState(null);
  const pathname = usePathname();
  const { user, profile, signOut, loading } = useAuth();

  const isLoggedIn = !loading && !!user;

  function togglePanel(panel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  async function handleSignOut() {
    setOpenPanel(null);
    await signOut();
    window.location.href = "/";
  }

  const regularLinks = siteConfig.menuLinks.filter((l) => !l.operator);

  return (
    <header className={styles.header}>
      {/* --- Left: Portfolio Dropdown Trigger --- */}
      <button
        className={styles.portfolioBtn}
        onClick={() => togglePanel("portfolio")}
        aria-label="Portfolio sites"
      >
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${
            openPanel === "portfolio" ? styles.chevronOpen : ""
          }`}
        />
      </button>

      {/* --- Center: Site Title --- */}
      <Link href="/" className={styles.title} onClick={() => setOpenPanel(null)}>
        {siteConfig.name}
      </Link>

      {/* --- Right: Hamburger / Close Button --- */}
      <button
        className={styles.hamburgerBtn}
        onClick={() => togglePanel("menu")}
        aria-label="Toggle menu"
      >
        {openPanel === "menu" ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* --- Portfolio Dropdown Panel --- */}
      {openPanel === "portfolio" && (
        <nav className={`${styles.dropdownPanel} ${styles.portfolioPanel}`}>
          <div className={styles.panelLabel}>Our Partners</div>

          {siteConfig.ecosystem.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ecosystemLink}
              onClick={() => setOpenPanel(null)}
            >
              <span className={styles.ecosystemName}>{site.name}</span>
              <span className={styles.ecosystemDesc}>{site.description}</span>
            </a>
          ))}

          <div className={styles.accentDivider} />

          <a
            href={siteConfig.parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.parentLink}
            onClick={() => setOpenPanel(null)}
          >
            {siteConfig.parentCompany.name}
          </a>
        </nav>
      )}

      {/* --- Hamburger Menu Panel --- */}
      {openPanel === "menu" && (
        <nav className={`${styles.dropdownPanel} ${styles.menuPanel}`}>

          {/* ── Auth Section ── */}
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className={`${styles.menuLink} ${styles.dashboardLink} ${
                  pathname === "/dashboard" ? styles.menuLinkActive : ""
                }`}
                onClick={() => setOpenPanel(null)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className={`${styles.menuLink} ${
                  pathname === "/dashboard/settings" ? styles.menuLinkActive : ""
                }`}
                onClick={() => setOpenPanel(null)}
              >
                Settings
              </Link>
              <div className={styles.accentDivider} />
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className={styles.menuCtaPrimary}
                onClick={() => setOpenPanel(null)}
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className={styles.menuCtaSecondary}
                onClick={() => setOpenPanel(null)}
              >
                Sign In
              </Link>
              <div className={styles.accentDivider} />
            </>
          )}

          {/* ── Product Links ── */}
          {regularLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${
                  isActive ? styles.menuLinkActive : ""
                }`}
                onClick={() => setOpenPanel(null)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className={styles.accentDivider} />

          {/* ── Social Icons ── */}
          <div className={styles.socialRow}>
            {siteConfig.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label={social.platform}
                onClick={() => setOpenPanel(null)}
              >
                {social.platform === "instagram" && <InstagramIcon />}
                {social.platform === "linkedin" && <LinkedInIcon />}
              </a>
            ))}
          </div>

          <div className={styles.accentDivider} />

          {/* ── Legal Links ── */}
          <div className={styles.legalRow}>
            {siteConfig.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.legalLink}
                onClick={() => setOpenPanel(null)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Sign Out (logged in only) ── */}
          {isLoggedIn && (
            <>
              <div className={styles.accentDivider} />
              <button
                onClick={handleSignOut}
                className={styles.signOutLink}
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </>
          )}
        </nav>
      )}

      {/* --- Backdrop --- */}
      {openPanel && (
        <div
          className={styles.backdrop}
          onClick={() => setOpenPanel(null)}
        />
      )}
    </header>
  );
}