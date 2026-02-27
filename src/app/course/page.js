/**
 * course/page.js — Course Index (5 Steps to 5 Stars)
 *
 * WHAT THIS PAGE DOES:
 * Shows the course overview with thesis callout, meta info,
 * and 5 numbered class cards. Each card links to /course/[slug]
 * for the full article-style lesson.
 *
 * DATA SOURCE: courseOverview.json
 */

import Link from "next/link";
import { Clock, Users, BarChart3 } from "lucide-react";
import overview from "@/data/courseOverview.json";
import styles from "./page.module.css";

export default function CourseIndex() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>{overview.title}</h1>
      <p className={styles.tagline}>{overview.subtitle}</p>

      {/* Thesis callout */}
      <div className={styles.thesis}>
        <p className={styles.thesisHeadline}>{overview.thesis.headline}</p>
        <p className={styles.thesisText}>{overview.thesis.supportingText}</p>
      </div>

      {/* Meta info */}
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Clock size={14} />
          {overview.estimatedTotalTime}
        </span>
        <span className={styles.metaItem}>
          <Users size={14} />
          {overview.audience.join(", ")}
        </span>
        <span className={styles.metaItem}>
          <BarChart3 size={14} />
          {overview.level}
        </span>
      </div>

      {/* Class cards */}
      <div className={styles.classes}>
        {overview.modules.map((mod) => (
          <Link
            key={mod.slug}
            href={`/course/${mod.slug}`}
            className={styles.classCard}
          >
            {/* Step number circle */}
            <div className={styles.stepNumber}>{mod.order}</div>

            {/* Card text */}
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{mod.title}</div>
              <div className={styles.cardSubtitle}>{mod.subtitle}</div>
              <p className={styles.cardSummary}>{mod.summary}</p>
              <span className={styles.cardTime}>{mod.estimatedTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}