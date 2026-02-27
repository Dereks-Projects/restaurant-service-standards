/**
 * standards/[slug]/page.js — Individual Section Detail
 *
 * WHAT THIS PAGE DOES:
 * When the user clicks a section card (e.g. "Dinner Service"),
 * they land here at /standards/dinner-service.
 * This page filters standards.json for that section only,
 * groups them by classification, and displays them.
 *
 * DESKTOP: Two-column
 *   - Left sidebar: filter by classification (Guest Courtesy, etc.)
 *   - Right panel: standard cards for selected classification
 *   - "All" option shows everything
 *
 * MOBILE: Accordion grouped by classification
 *
 * NEXT.JS 16 NOTE:
 * In Next.js 16, the "params" prop is a Promise.
 * We use React's use() hook to unwrap it.
 */
"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import standards from "@/data/standards.json";
import intros from "@/data/sectionOverviewsIntro.json";
import Accordion from "@/components/Accordion";
import styles from "./page.module.css";

/* Same mapping as the index page — connects slugs to section names */
const sectionMap = {
  "reservation-system": { name: "Reservation System", introKey: "reservation" },
  "arrival-departure": { name: "Arrival & Departure", introKey: "arrival" },
  "dinner-service": { name: "Dinner Service", introKey: "dinner" },
  "food-beverage-quality": { name: "Food & Beverage Quality", introKey: "food" },
  "presentation-of-facilities": { name: "Presentation of Facilities", introKey: "presentation" },
};

/* Renders a single standard as a card */
function StandardCard({ item }) {
  return (
    <div className={styles.standardCard}>
      <span className={styles.classification}>{item.classification}</span>
      <p className={styles.standardText}>{item.standard}</p>
      <div className={styles.trainingTip}>
        <span className={styles.tipLabel}>Training Tip:</span>
        {item.trainingTip}
      </div>
    </div>
  );
}

/* Group standards by classification within a section */
function groupByClassification(items) {
  const groups = {};
  items.forEach((item) => {
    if (!groups[item.classification]) {
      groups[item.classification] = [];
    }
    groups[item.classification].push(item);
  });
  return groups;
}

export default function SectionDetail({ params }) {
  /* Unwrap the params Promise (Next.js 16 requirement) */
  const { slug } = use(params);

  /* Look up section info from the slug */
  const section = sectionMap[slug];

  /* Track which classification is active on desktop ("All" by default) */
  const [activeClassification, setActiveClassification] = useState("All");

  /* If the slug doesn't match any section, show a friendly message */
  if (!section) {
    return (
      <div className={styles.notFound}>
        <h2>Section not found</h2>
        <p>
          <Link href="/standards" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to standards
          </Link>
        </p>
      </div>
    );
  }

  /* Filter standards.json for just this section */
  const sectionStandards = standards.filter(
    (s) => s.section === section.name
  );

  /* Group by classification */
  const grouped = groupByClassification(sectionStandards);
  const classificationNames = Object.keys(grouped);

  /* Desktop: which standards to show based on sidebar selection */
  const visibleStandards =
    activeClassification === "All"
      ? sectionStandards
      : grouped[activeClassification] || [];

  /* Mobile: build accordion items from classifications */
  const accordionItems = classificationNames.map((cls) => ({
    title: `${cls} (${grouped[cls].length})`,
    content: (
      <div>
        {grouped[cls].map((item, i) => (
          <StandardCard key={i} item={item} />
        ))}
      </div>
    ),
  }));

  return (
    <div className={styles.page}>
      {/* Back link */}
      <Link href="/standards" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to standards
      </Link>

      <h1 className={styles.pageTitle}>{section.name}</h1>
      <p className={styles.intro}>{intros[section.introKey]}</p>

      {/* --- Desktop: Two-Column Layout --- */}
      <div className={styles.desktopLayout}>
        {/* Left: classification sidebar */}
        <nav className={styles.sidebar}>
          {/* "All" button */}
          <button
            className={`${styles.sidebarBtn} ${
              activeClassification === "All" ? styles.sidebarBtnActive : ""
            }`}
            onClick={() => setActiveClassification("All")}
          >
            All
            <span className={styles.count}>{sectionStandards.length}</span>
          </button>

          {/* One button per classification */}
          {classificationNames.map((cls) => (
            <button
              key={cls}
              className={`${styles.sidebarBtn} ${
                activeClassification === cls ? styles.sidebarBtnActive : ""
              }`}
              onClick={() => setActiveClassification(cls)}
            >
              {cls}
              <span className={styles.count}>{grouped[cls].length}</span>
            </button>
          ))}
        </nav>

        {/* Right: standard cards */}
        <div className={styles.contentPanel}>
          <h2 className={styles.sectionTitle}>
            {activeClassification === "All"
              ? `All Standards (${sectionStandards.length})`
              : `${activeClassification} (${visibleStandards.length})`}
          </h2>
          {visibleStandards.map((item, i) => (
            <StandardCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* --- Mobile: Accordion --- */}
      <div className={styles.mobileLayout}>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}