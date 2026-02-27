/**
 * operators/page.js — For Operators Page
 *
 * FILE LOCATION: src/app/operators/page.js
 * Create a new folder called "operators" inside src/app/
 * and place this file inside it.
 *
 * AUDIENCE: GMs, F&B Directors, VPs of Operations, ownership groups.
 * This page speaks to the buyer, not the end user.
 * Goal: convert a skeptical decision-maker into a believer.
 */

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  MessageSquareText,
  ClipboardCheck,
  Award,
  CheckCircle,
  Mail,
  Zap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "For Operators | Restaurant Standards",
  description:
    "Restaurant Standards is a hospitality training platform built for operators. Deploy a complete service framework across your property or group — with AI coaching, 79 standards, and structured onboarding tools.",
};

export default function OperatorsPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>For Operators</div>
        <h1 className={styles.heroTitle}>
          The Gap Between Your Standards and Your Guest Experience Is a Training Problem.
        </h1>
        <p className={styles.heroSubtitle}>
          Restaurant Standards gives your team a complete, deployable service framework — structured curriculum, a 79-standard reference library, and an AI coaching agent available before every shift. Built for fine dining, luxury hotels, and hospitality groups that operate at the highest level.
        </p>
        <div className={styles.heroActions}>
          <Link href="/ai-agent" className={styles.heroCta}>
            See the AI Agent <ArrowRight size={16} />
          </Link>
          <a href="mailto:derekengles@gmail.com" className={styles.heroContact}>
            Contact Us <Mail size={16} />
          </a>
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>The Reality</div>
        <h2 className={styles.sectionTitle}>
          What Every Operator Already Knows
        </h2>
        <p className={styles.sectionIntro}>
          High-performance service doesn't happen by accident. It happens when expectations are explicit, training is consistent, and your team has tools that match how they actually work.
        </p>

        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <Users size={22} className={styles.problemIcon} />
            <h3 className={styles.problemTitle}>Turnover Never Stops</h3>
            <p className={styles.problemText}>
              New hires take months to reach standard — if the standard is ever clearly communicated at all. Every departure resets the clock on consistency.
            </p>
          </div>
          <div className={styles.problemCard}>
            <BarChart3 size={22} className={styles.problemIcon} />
            <h3 className={styles.problemTitle}>No Scalable System</h3>
            <p className={styles.problemText}>
              Most operations run on institutional knowledge and verbal handoffs. What works at one property or under one manager doesn't transfer. There's nothing to scale.
            </p>
          </div>
          <div className={styles.problemCard}>
            <TrendingUp size={22} className={styles.problemIcon} />
            <h3 className={styles.problemTitle}>Recognition Requires Proof</h3>
            <p className={styles.problemText}>
              Michelin, Forbes, and AAA evaluators measure execution — not intention. Without documented standards and a trained team, the gap between aspiration and recognition stays wide.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Platform ──────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>The Platform</div>
        <h2 className={styles.sectionTitle}>
          A Complete Service Infrastructure
        </h2>
        <p className={styles.sectionIntro}>
          Not a video library. Not a PDF handbook. A structured, interactive training system your team can use on the floor, before service, and at their own pace.
        </p>

        <div className={styles.featureStack}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ClipboardCheck size={24} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>79 Service Standards Across 5 Operational Areas</h3>
              <p className={styles.featureText}>
                A complete reference library covering reservations, arrival and departure, dinner service, food and beverage quality, and facilities presentation. Every standard includes a classification, the full expectation, and a practical training tip. This is the playbook your team can actually hold to.
              </p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Award size={24} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>5 Steps to 5 Stars — Structured Onboarding Course</h3>
              <p className={styles.featureText}>
                A five-class curriculum that builds the foundations of elevated guest service. New hires understand not just what to do, but why it matters and how it connects to the larger service framework. Estimated 60–75 minutes. Self-paced and mobile-friendly.
              </p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ClipboardCheck size={24} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Operational Checklists — 94 Sequential Touchpoints</h3>
              <p className={styles.featureText}>
                A floor-ready reference tool organized by the guest journey. Every touchpoint links to the deeper standard behind it. Built for pre-shift walkthroughs, service audits, and manager accountability rounds.
              </p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ShieldCheck size={24} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Knowledge Assessment — Section-Based Quiz System</h3>
              <p className={styles.featureText}>
                Test comprehension across all five operational areas. Immediate feedback, detailed results breakdown, and per-question training tips give your team a clear picture of where they stand and what to reinforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Agent Spotlight ────────────────────────────────────────── */}
      <section className={styles.aiSection}>
        <div className={styles.aiInner}>
          <div className={styles.aiBadge}>
            <Zap size={14} />
            AI-Powered Coaching
          </div>
          <h2 className={styles.aiTitle}>
            Your Team Gets a Hospitality Coach in Their Pocket
          </h2>
          <p className={styles.aiSubtitle}>
            Available before every shift. Fluent in your service standards. Ready for any question your team will actually ask.
          </p>

          <div className={styles.aiPoints}>
            <div className={styles.aiPoint}>
              <CheckCircle size={18} className={styles.aiCheck} />
              <div>
                <strong>Role and situation aware.</strong> A server asking about a complaint gets a different answer than a manager asking the same question. The AI adapts its coaching to the role and the specific service touchpoint.
              </div>
            </div>
            <div className={styles.aiPoint}>
              <CheckCircle size={18} className={styles.aiCheck} />
              <div>
                <strong>Built for how your team actually communicates.</strong> The agent handles misspellings, shorthand, and incomplete sentences — because that's how a server types at 5:45pm before a full book. It interprets intent and responds professionally regardless.
              </div>
            </div>
            <div className={styles.aiPoint}>
              <CheckCircle size={18} className={styles.aiCheck} />
              <div>
                <strong>Grounded in your standards system.</strong> Every response cites the specific standard and section it's drawing from. The AI doesn't invent answers — it coaches from the framework you've already established.
              </div>
            </div>
            <div className={styles.aiPoint}>
              <CheckCircle size={18} className={styles.aiCheck} />
              <div>
                <strong>Structured output every time.</strong> What to do. What to say. What not to do. Standard reference. Four sections, every response. Consistent enough for training, practical enough for the floor.
              </div>
            </div>
          </div>

          <Link href="/ai-agent" className={styles.aiCta}>
            Try the AI Agent <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Who It's For</div>
        <h2 className={styles.sectionTitle}>
          Built for Operations That Hold the Line
        </h2>

        <div className={styles.audienceGrid}>
          <div className={styles.audienceCard}>
            <Building2 size={24} className={styles.audienceIcon} />
            <h3 className={styles.audienceTitle}>Fine Dining Independents</h3>
            <p className={styles.audienceText}>
              Pursuing Michelin, Forbes Five Star, or AAA Diamond recognition. You need documented standards, a trained team, and a system that proves your operation executes at the level you claim.
            </p>
          </div>
          <div className={styles.audienceCard}>
            <Building2 size={24} className={styles.audienceIcon} />
            <h3 className={styles.audienceTitle}>Boutique and Independent Hotels</h3>
            <p className={styles.audienceText}>
              Building or refining an F&B program that matches the quality of your property. Your service team needs the same caliber of training your rooms product receives.
            </p>
          </div>
          <div className={styles.audienceCard}>
            <Building2 size={24} className={styles.audienceIcon} />
            <h3 className={styles.audienceTitle}>Restaurant Groups</h3>
            <p className={styles.audienceText}>
              Standardizing service execution across multiple locations. One framework. Consistent delivery. A shared language for what excellent looks like regardless of which property the guest visits.
            </p>
          </div>
        </div>
      </section>

      {/* ── Credibility ───────────────────────────────────────────────── */}
      <section className={styles.credSection}>
        <h2 className={styles.credTitle}>Built From the Inside</h2>
        <p className={styles.credText}>
          Restaurant Standards was developed by Derek Engles — a certified sommelier with over 20 years of luxury hospitality experience at properties including Wynn Resort and MGM Grand, with business leadership credentials from Harvard Business School and Northwestern University. This is not a training product built by instructional designers who have never run a service. It was built by someone who has stood on the floor, managed the team, and answered to the same standards your guests expect.
        </p>
        <p className={styles.credText}>
          Restaurant Standards is part of the Informative Media portfolio — a network of hospitality and beverage education platforms including Somm.Site, Beverage.fyi, Hospitality.fyi, Backbar.fyi, and Somm.Tips. A serious content operation behind a serious training product.
        </p>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Close the Gap?</h2>
        <p className={styles.ctaText}>
          If you're evaluating this platform for your property or group, reach out directly. We'll discuss what deployment looks like for your operation, your team size, and your service objectives.
        </p>
        <a href="mailto:derekengles@gmail.com" className={styles.ctaButton}>
          Get in Touch <Mail size={16} />
        </a>
        <p className={styles.ctaNote}>
          Enterprise packaging, white-label options, and multi-property deployment available in Phase 2.
        </p>
      </section>

    </div>
  );
}