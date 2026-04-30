"use client";

/**
 * Footer.js — SaaS Footer
 *
 * FILE LOCATION: src/components/Footer.js
 *
 * Multi-column layout on desktop, stacked on mobile.
 * Auth-aware CTA: logged-out visitors see "Start Free Trial",
 * logged-in users see "Go to Dashboard".
 */

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight } from "lucide-react";
import styles from "./Footer.module.css";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const { user, loading } = useAuth();
  const isLoggedIn = !loading && !!user;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>

        {/* ── Brand Column ── */}
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.brandName}>
            Restaurant Standards
          </Link>
          <p className={styles.brandTagline}>
            Luxury hospitality training built on Forbes, Michelin,
            and AAA service criteria.
          </p>

          <div className={styles.socialRow}>
            <a
              href="https://www.instagram.com/restaurantstandards"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/restaurantstandards"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* ── Product Column ── */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnTitle}>Product</h4>
          <Link href="/course" className={styles.footerLink}>Training Course</Link>
          <Link href="/standards" className={styles.footerLink}>Service Standards</Link>
          <Link href="/ai-agent" className={styles.footerLink}>AI Coaching Agent</Link>
          <Link href="/checklists" className={styles.footerLink}>Checklists</Link>
          <Link href="/quiz" className={styles.footerLink}>Assessments</Link>
        </div>

        {/* ── Company Column ── */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnTitle}>Company</h4>
          <Link href="/about" className={styles.footerLink}>About</Link>
          <Link href="/operators" className={styles.footerLink}>For Organizations</Link>
          <a href="mailto:derek@informativemedia.com" className={styles.footerLink}>Contact</a>
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Informative Media
          </a>
        </div>

        {/* ── Legal Column ── */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnTitle}>Legal</h4>
          <Link href="/legal/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <Link href="/legal/terms" className={styles.footerLink}>Terms of Service</Link>
          <Link href="/legal/cookies" className={styles.footerLink}>Cookie Policy</Link>
        </div>
      </div>

      {/* ── CTA Bar ── */}
      <div className={styles.ctaBar}>
        {isLoggedIn ? (
          <Link href="/dashboard" className={styles.ctaButton}>
            Go to Dashboard
            <ArrowRight size={15} />
          </Link>
        ) : (
          <Link href="/signup" className={styles.ctaButton}>
            Start Free Trial
            <ArrowRight size={15} />
          </Link>
        )}
      </div>

      {/* ── Copyright ── */}
      <div className={styles.copyright}>
        <p>&copy; {year} Restaurant Standards &middot; Informative Media</p>
      </div>
    </footer>
  );
}