"use client";

/**
 * BottomNav.js — Floating Bottom Tab Bar (Mobile Only)
 *
 * FILE LOCATION: src/components/BottomNav.js
 *
 * AUTH-AWARE:
 * - Logged out: Home, Course, AI Agent, Standards, Sign In
 * - Logged in: Dashboard, Course, AI Agent, Standards, Quiz
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Award,
  MessageSquareText,
  ClipboardCheck,
  Target,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import styles from "./BottomNav.module.css";

const loggedOutTabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/course", icon: Award, label: "Course" },
  { href: "/ai-agent", icon: MessageSquareText, label: "AI Agent" },
  { href: "/standards", icon: ClipboardCheck, label: "Standards" },
  { href: "/login", icon: LogIn, label: "Sign In" },
];

const loggedInTabs = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/course", icon: Award, label: "Course" },
  { href: "/ai-agent", icon: MessageSquareText, label: "AI Agent" },
  { href: "/standards", icon: ClipboardCheck, label: "Standards" },
  { href: "/quiz", icon: Target, label: "Quiz" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isLoggedIn = !loading && !!user;
  const tabs = isLoggedIn ? loggedInTabs : loggedOutTabs;

  return (
    <nav className={styles.bottomNav}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
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
            <IconComponent size={22} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}