/**
 * about/page.js — About Page
 *
 * Simple static page. No interactivity, no "use client" needed.
 * Ecosystem links pull from siteConfig for consistency.
 */

import Link from "next/link";
import siteConfig from "@/config/siteConfig";
import styles from "./page.module.css";

export const metadata = {
  title: "About | Restaurant Standards",
  description: "Learn about Restaurant Standards, the modern restaurant performance system built by Informative Media.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>About Restaurant Standards</h1>
      <p className={styles.pageSubtitle}>
        A framework to elevate service, reinforce consistency, and deliver 5-star results.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About the Platform</h2>
        <p className={styles.paragraph}>
          Restaurant Standards is a structured training system designed for real restaurant teams. Built around 79 service standards across five operational areas, it gives managers, servers, hosts, and bartenders a shared playbook for delivering consistent, high-performance guest experiences.
        </p>
        <p className={styles.paragraph}>
          The platform includes a full training course, an AI-powered coaching agent, a quiz system for knowledge reinforcement, and a curated resource network. Every feature is designed to be practical, mobile-friendly, and deployable in real hospitality environments.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>For Operators</h2>
        <p className={styles.paragraph}>
          If you are evaluating Restaurant Standards for deployment across a property or group — a fine dining operation, boutique hotel, or multi-location restaurant group — the platform is built for that scale. Enterprise packaging, white-label options, and multi-property deployment are on the roadmap.
        </p>
        <Link href="/operators" className={styles.link}>
          Learn more about deploying this platform for your organization →
        </Link>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Philosophy</h2>
        <p className={styles.paragraph}>
          Standards are not restrictions. They are performance amplifiers. When expectations are clear and execution is reinforced, teams move with confidence and guests feel the difference. This platform exists because structured systems produce better outcomes than good intentions alone.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Ecosystem</h2>
        <p className={styles.paragraph}>
          Restaurant Standards is part of the Informative Media network, a portfolio of hospitality and beverage education platforms built to serve the industry from every angle.
        </p>
        <div className={styles.ecosystemLinks}>
          {siteConfig.ecosystem.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ecosystemLink}
            >
              {site.name}
              <span className={styles.ecosystemLinkDesc}>
                {site.description}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Created By</h2>
        <p className={styles.paragraph}>
          Restaurant Standards was created by Derek Engles, a hospitality professional with over 20 years of experience at luxury properties including Wynn Resort and MGM Grand. Drawing from real-world operations and recognized service frameworks, this platform translates elite standards into practical, trainable systems.
        </p>
        <p className={styles.paragraph}>
          <a
            href="https://derekengles.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Learn more about Derek Engles
          </a>
        </p>
      </section>

      <div className={styles.meta}>
        <p>
          Restaurant Standards is a product of{" "}
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Informative Media
          </a>
          .
        </p>
      </div>
    </div>
  );
}