/**
 * BottomNav.js — Floating bottom tab bar (mobile only)
 *
 * Updated icon set to match homepage:
 * Home, Award, MessageSquareText, ClipboardCheck, Lightbulb
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Award,
  MessageSquareText,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";
import siteConfig from "@/config/siteConfig";
import styles from "./BottomNav.module.css";

/* Map icon name strings from siteConfig to actual components */
const iconMap = {
  Home,
  Award,
  MessageSquareText,
  ClipboardCheck,
  Lightbulb,
};

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      {siteConfig.bottomNav.map((tab) => {
        const IconComponent = iconMap[tab.icon];

        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.navItem} ${
              isActive ? styles.navItemActive : ""
            }`}
          >
            {IconComponent && <IconComponent size={22} />}
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}