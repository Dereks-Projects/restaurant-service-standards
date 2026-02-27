/**
 * Header.js — Top navigation bar
*/
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import siteConfig from "@/config/siteConfig";
import styles from "./Header.module.css";

/**
 * Inline SVG icons for Instagram and LinkedIn.
 */
function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Header() {
  const [openPanel, setOpenPanel] = useState(null);
  const pathname = usePathname();

  function togglePanel(panel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  /* Separate regular links from the operator link */
  const regularLinks = siteConfig.menuLinks.filter((l) => !l.operator);
  const operatorLink = siteConfig.menuLinks.find((l) => l.operator);

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
          <div className={styles.panelLabel}>Explore</div>

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

          {/* Regular page links */}
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

          {/* Operator link — gold text, bold, no icon, sits below divider */}
          {operatorLink && (
            <>
              <div className={styles.accentDivider} />
              <Link
                href={operatorLink.href}
                className={`${styles.menuLink} ${styles.operatorLink} ${
                  pathname === operatorLink.href ? styles.menuLinkActive : ""
                }`}
                onClick={() => setOpenPanel(null)}
              >
                {operatorLink.label}
              </Link>
            </>
          )}

          {/* Social icons */}
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

          {/* Legal links (small, gray) */}
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
        </nav>
      )}

      {/* --- Backdrop overlay to close on outside tap --- */}
      {openPanel && (
        <div
          className={styles.backdrop}
          onClick={() => setOpenPanel(null)}
        />
      )}
    </header>
  );
}