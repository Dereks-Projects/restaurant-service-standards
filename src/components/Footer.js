/**
 * Footer.js — Desktop-only footer
 *
 * WHY THIS EXISTS:
 * On desktop there's no BottomNav, so the footer provides
 * secondary navigation links (About, Privacy, Terms, etc.)
 * plus a copyright line. Hidden on mobile via CSS.
 */

import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "For Operators", href: "/operators" },
  { label: "Content Policy", href: "/legal/content-policy" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Contact", href: "/about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        {footerLinks.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className={`${styles.link} ${
              link.label === "For Operators" ? styles.operatorLink : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className={styles.copyright}>
        &copy; {year} Restaurant Standards &middot; Informative Media
      </p>
    </footer>
  );
}