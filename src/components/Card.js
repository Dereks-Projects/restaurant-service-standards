/**
 * Card.js — Reusable card component
 *
 * HOW TO USE:
 *   <Card
 *     href="/standards"
 *     icon={<ShieldCheck size={24} />}
 *     title="Guest Service Excellence"
 *     description="The complete standards system"
 *     featured={false}
 *   />
 *
 * WHY IT USES <Link>:
 * Every card is clickable and navigates to a page.
 * Next.js <Link> handles client-side navigation (no full page reload).
 */

import Link from "next/link";
import styles from "./Card.module.css";

export default function Card({ href, icon, title, description, featured }) {
  return (
    <Link
      href={href}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      {/* Icon on the left */}
      {icon && <div className={styles.iconWrapper}>{icon}</div>}

      {/* Title + description on the right */}
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </Link>
  );
}