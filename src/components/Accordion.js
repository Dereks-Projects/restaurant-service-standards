/**
 * Accordion.js — Expandable/collapsible panel
 *
 * HOW TO USE:
 *   <Accordion
 *     items={[
 *       { title: "Reservations", content: <div>...</div> },
 *       { title: "Arrival", content: <div>...</div> },
 *     ]}
 *   />
 *
 * WHY "use client":
 * We need useState to track which panel is open/closed.
 *
 * BEHAVIOR:
 * Only one panel open at a time (like a real accordion).
 * Clicking an open panel closes it.
 */
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

export default function Accordion({ items }) {
  /* Track the index of the currently open panel (null = all closed) */
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            {/* Clickable header */}
            <button
              className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                size={18}
                className={`${styles.triggerIcon} ${
                  isOpen ? styles.triggerIconOpen : ""
                }`}
              />
            </button>

            {/* Content panel — only renders when open */}
            {isOpen && <div className={styles.panel}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}