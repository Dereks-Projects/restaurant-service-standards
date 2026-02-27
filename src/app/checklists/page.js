/**
 * checklists/page.js — Operational Checklists
 *
 * WHAT THIS PAGE DOES:
 * Presents ~94 operational touchpoints as a quick-reference guide.
 * Five sections, each expanding to show sequential action items
 * with an accordion to reveal the deeper "why" behind each one.
 *
 * HOW IT DIFFERS FROM GUEST SERVICE EXCELLENCE:
 * - Standards page: 79 rules organized by CLASSIFICATION (Guest Courtesy, etc.)
 * - Checklists page: ~94 touchpoints organized by SEQUENCE (guest journey order)
 * - Standards: full text always visible — study & reference
 * - Checklists: short Items visible, Standard hidden — scannable quick-glance
 *
 * DATA SOURCE:
 * checklists.json — array of { Topic, Item, Standard }
 * sectionOverviewsChecklists.json — intro paragraphs for each section
 *
 * UX PATTERN:
 * Section card (tap to expand) → Intro paragraph → Numbered touchpoint list
 * Each touchpoint is an accordion: Item (visible) → Standard (tap to reveal)
 * Timeline connector runs between touchpoints to emphasize sequence.
 */
"use client";

import { useState, useMemo } from "react";
import {
  Phone,
  DoorOpen,
  UtensilsCrossed,
  Wine,
  Building,
  ChevronDown,
  List,
} from "lucide-react";
import checklistData from "@/data/checklists.json";
import styles from "./page.module.css";

/**
 * Section definitions — same 5 sections as the rest of the site.
 * 'topic' matches the "Topic" field in checklists.json.
 * 'intro' is the overview paragraph shown when a section expands.
 */
const sections = [
  {
    topic: "Reservation System",
    icon: Phone,
    intro: "The Reservation System section covers the critical first impression guests receive when interacting with the restaurant. Executing these service points ensures efficient, courteous communication that sets the tone for the entire guest journey. Review the contact points below before moving on to the next section.",
  },
  {
    topic: "Arrival & Departure",
    icon: DoorOpen,
    intro: "Arrival & Departure outlines the guest's entry and exit experience — from the initial greeting to the final farewell. This touchpoint determines how welcomed and valued a guest feels, both when entering and leaving the space. Review the contact points below before moving on to the next section.",
  },
  {
    topic: "Dinner Service",
    icon: UtensilsCrossed,
    intro: "Dinner Service is the core of the hospitality experience, guiding staff through each step of the seated dining sequence. When followed closely, these standards ensure a service flow that is polished, intuitive, and built around the guest's needs. Review the contact points below before moving on to the next section.",
  },
  {
    topic: "Food & Beverage Quality",
    icon: Wine,
    intro: "This section defines the expectations for food presentation, drink execution, and ingredient integrity. Delivering quality at every level is not only about taste — it's about storytelling, intentionality, and exceeding expectations. Review the contact points below before moving on to the next section.",
  },
  {
    topic: "Presentation of Facilities",
    icon: Building,
    intro: "Presentation of Facilities covers the cleanliness, maintenance, and visual appeal of the physical environment. A well-kept space signals professionalism and supports the sense of luxury a guest should feel throughout their visit. Review the contact points below before moving on to the next section.",
  },
];

export default function ChecklistsPage() {
  /* --- STATE --- */

  /** Which section is currently expanded (null = all collapsed) */
  const [expandedSection, setExpandedSection] = useState(null);

  /**
   * Which touchpoint accordion is open.
   * Format: "Topic::index" (e.g., "Dinner Service::3")
   * Only one touchpoint open at a time for clean reading.
   */
  const [openTouchpoint, setOpenTouchpoint] = useState(null);

  /**
   * Pre-compute items per section.
   * Filters checklists.json by Topic and preserves the original order
   * (which IS the sequence — that's the whole point of this page).
   */
  const sectionItems = useMemo(() => {
    const map = {};
    sections.forEach((sec) => {
      map[sec.topic] = checklistData.filter((c) => c.Topic === sec.topic);
    });
    return map;
  }, []);

  /** Total touchpoints for the top badge */
  const totalTouchpoints = checklistData.length;

  /* --- HANDLERS --- */

  function handleExpandSection(topic) {
    setExpandedSection((prev) => (prev === topic ? null : topic));
    setOpenTouchpoint(null); /* collapse any open accordion when switching sections */
  }

  function handleToggleTouchpoint(id) {
    setOpenTouchpoint((prev) => (prev === id ? null : id));
  }

  /* --- RENDER --- */
  return (
    <div className={styles.page}>
      {/* --- Page Header --- */}
      <h1 className={styles.pageTitle}>Operational Checklists</h1>
      <p className={styles.pageSubtitle}>
        The rhythm of service — every touchpoint of the guest interaction, in
        sequence. A quick-reference guide for the floor.
      </p>

      <div className={styles.topMeta}>
        <List size={13} />
        {totalTouchpoints} touchpoints across {sections.length} areas
      </div>

      {/* --- Section Cards --- */}
      <div className={styles.sections}>
        {sections.map((sec) => {
          const Icon = sec.icon;
          const items = sectionItems[sec.topic] || [];
          const isOpen = expandedSection === sec.topic;

          return (
            <div
              key={sec.topic}
              className={`${styles.sectionCard} ${
                isOpen ? styles.sectionCardOpen : ""
              }`}
            >
              {/* --- Section Header (tap to expand) --- */}
              <button
                className={styles.sectionHeader}
                onClick={() => handleExpandSection(sec.topic)}
                aria-expanded={isOpen}
              >
                <div className={styles.sectionIcon}>
                  <Icon size={20} />
                </div>

                <div className={styles.sectionInfo}>
                  <div className={styles.sectionName}>{sec.topic}</div>
                  <div className={styles.sectionCount}>
                    {items.length} touchpoints
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  className={`${styles.chevron} ${
                    isOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>

              {/* --- Expanded Body --- */}
              {isOpen && (
                <div className={styles.sectionBody}>
                  {/* Intro paragraph */}
                  <div className={styles.sectionIntro}>
                    {sec.intro}
                  </div>

                  {/* Sequential touchpoint list */}
                  <div className={styles.touchpoints}>
                    {items.map((item, index) => {
                      const touchpointId = `${sec.topic}::${index}`;
                      const isTouchpointOpen = openTouchpoint === touchpointId;

                      return (
                        <div
                          key={index}
                          className={`${styles.touchpoint} ${
                            isTouchpointOpen ? styles.touchpointOpen : ""
                          }`}
                        >
                          {/* Item row (always visible) */}
                          <button
                            className={styles.touchpointHeader}
                            onClick={() => handleToggleTouchpoint(touchpointId)}
                            aria-expanded={isTouchpointOpen}
                          >
                            <span className={styles.stepNumber}>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className={styles.touchpointTitle}>
                              {item.Item}
                            </span>
                            <ChevronDown
                              size={14}
                              className={styles.touchpointChevron}
                            />
                          </button>

                          {/* Standard text (revealed on tap) */}
                          {isTouchpointOpen && (
                            <div className={styles.touchpointBody}>
                              <div className={styles.standardText}>
                                {item.Standard}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}