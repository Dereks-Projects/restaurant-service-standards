/**
 * standards/page.js — Standards Index Page
 *
 * WHAT THIS PAGE DOES:
 * Shows 5 section cards, one for each area of the standards system.
 * Each card shows the section name, standard count, and an intro
 * paragraph from sectionOverviewsIntro.json.
 * Clicking a card takes you to /standards/[slug] for the full detail.
 *
 * WHY THE SECTIONS ARRAY:
 * We need to connect three things:
 *   1. The section name in standards.json ("Reservation System")
 *   2. The key in sectionOverviewsIntro.json ("reservation")
 *   3. The URL slug ("reservation-system")
 * This array maps all three together in one place.
 */

import Link from "next/link";
import {
  Phone,
  DoorOpen,
  UtensilsCrossed,
  Wine,
  Building,
} from "lucide-react";
import standards from "@/data/standards.json";
import intros from "@/data/sectionOverviewsIntro.json";
import styles from "./page.module.css";

/* Maps each section to its slug, intro key, and icon */
const sections = [
  { name: "Reservation System", slug: "reservation-system", introKey: "reservation", icon: Phone },
  { name: "Arrival & Departure", slug: "arrival-departure", introKey: "arrival", icon: DoorOpen },
  { name: "Dinner Service", slug: "dinner-service", introKey: "dinner", icon: UtensilsCrossed },
  { name: "Food & Beverage Quality", slug: "food-beverage-quality", introKey: "food", icon: Wine },
  { name: "Presentation of Facilities", slug: "presentation-of-facilities", introKey: "presentation", icon: Building },
];

export default function StandardsIndex() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Guest Service Excellence</h1>
      <p className={styles.pageSubtitle}>
        The complete standards system. {standards.length} standards across{" "}
        {sections.length} operational areas.
      </p>

      <div className={styles.sections}>
        {sections.map((section) => {
          /* Count how many standards belong to this section */
          const count = standards.filter(
            (s) => s.section === section.name
          ).length;

          const Icon = section.icon;

          return (
            <Link
              key={section.slug}
              href={`/standards/${section.slug}`}
              className={styles.sectionCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Icon size={20} />
                </div>
                <span className={styles.cardTitle}>{section.name}</span>
                <span className={styles.cardCount}>
                  {count} standards
                </span>
              </div>
              <p className={styles.cardDescription}>
                {intros[section.introKey]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}