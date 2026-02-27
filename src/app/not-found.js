/**
 * not-found.js — Custom 404 Page
 *
 * FILE LOCATION: src/app/not-found.js
 * Place this directly inside src/app/ at the same level as layout.js.
 *
 * Next.js automatically uses this file whenever someone hits
 * a URL that doesn't exist on your site.
 */

import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page Not Found | Restaurant Standards",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primary}>
          Return Home
        </Link>
        <Link href="/about" className={styles.secondary}>
          About
        </Link>
      </div>
    </div>
  );
}