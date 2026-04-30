/**
 * LandingPage.js — Sales Landing Page
 *
 * FILE LOCATION: src/components/LandingPage.js
 *
 * The public-facing homepage for restaurantstandards.com.
 * Designed for the buyer: GM, F&B director, hotel executive,
 * restaurant group owner.
 *
 * SECTIONS:
 * 1. Hero — one-liner, subtitle, two CTAs
 * 2. Stats bar — key numbers
 * 3. Pain — three problems every operator knows
 * 4. Solution — what's inside, framed as outcomes
 * 5. Credibility — Forbes, Michelin, AAA foundation
 * 6. White-label teaser — see it with your brand
 * 7. Final CTA
 */

import Link from "next/link";
import {
  Award,
  MessageSquareText,
  ClipboardCheck,
  Target,
  ClipboardList,
  Users,
  ArrowRight,
  TrendingDown,
  Shuffle,
  EyeOff,
  Building2,
  Star,
} from "lucide-react";
import styles from "@/app/page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroTag}>Enterprise Hospitality Training</p>

          <h1 className={styles.heroTitle}>
            The training platform that turns Forbes, Michelin, and AAA service
            criteria into a working system for the floor.
          </h1>

          <p className={styles.heroSubtitle}>
            79 codified standards. Five-class certification. AI coaching.
            Deployed across your property in minutes, not months.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/signup" className={styles.ctaPrimary}>
              Start Free Trial
              <ArrowRight size={16} />
            </Link>
            <Link href="#preview" className={styles.ctaSecondary}>
              See It With Your Brand
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2: STATS BAR
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statValue}>79</span>
            <span className={styles.statLabel}>Service Standards</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>5</span>
            <span className={styles.statLabel}>Certification Classes</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>AI</span>
            <span className={styles.statLabel}>Coaching Agent</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>94</span>
            <span className={styles.statLabel}>Service Touchpoints</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3: THE PROBLEM
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.painSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionTag}>The Problem</p>
          <h2 className={styles.sectionTitle}>
            Luxury service shouldn&apos;t depend on who&apos;s working tonight.
          </h2>

          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <TrendingDown size={22} />
              </div>
              <h3 className={styles.painTitle}>
                You lose everything when someone leaves.
              </h3>
              <p className={styles.painDescription}>
                Your best captain trained three people before they moved on.
                Now those three are training the next wave from memory.
                The standard degrades with every generation.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <Shuffle size={22} />
              </div>
              <h3 className={styles.painTitle}>
                Every manager trains differently.
              </h3>
              <p className={styles.painDescription}>
                Monday night service looks nothing like Saturday.
                Location A runs a different standard than Location B.
                There&apos;s no single source of truth for what &ldquo;excellent&rdquo; means.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <EyeOff size={22} />
              </div>
              <h3 className={styles.painTitle}>
                You can&apos;t measure what you can&apos;t see.
              </h3>
              <p className={styles.painDescription}>
                Did the team actually learn it, or just sit through it?
                Without tracked assessments and coaching data, training
                is an expense you hope works. Hope is not a system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4: WHAT'S INSIDE
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.solutionSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionTag}>What&apos;s Inside</p>
          <h2 className={styles.sectionTitle}>
            A complete system, not another training binder.
          </h2>

          <div className={styles.solutionGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <ClipboardCheck size={22} />
              </div>
              <h3 className={styles.solutionCardTitle}>
                79 Codified Standards
              </h3>
              <p className={styles.solutionCardDescription}>
                Every service expectation written in instructional prose,
                organized across five operational areas. Your team reads
                exactly what to do and why it matters.
              </p>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <Award size={22} />
              </div>
              <h3 className={styles.solutionCardTitle}>
                5-Class Certification Course
              </h3>
              <p className={styles.solutionCardDescription}>
                Structured from first principles to advanced execution.
                60 to 75 minutes of focused content that builds
                sequentially, not a random collection of videos.
              </p>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <MessageSquareText size={22} />
              </div>
              <h3 className={styles.solutionCardTitle}>
                AI Coaching Agent
              </h3>
              <p className={styles.solutionCardDescription}>
                Practice real service scenarios with an AI trained on the
                full standards system. Your team gets coaching at 2am
                before a Saturday double, not just during the Tuesday meeting.
              </p>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <Target size={22} />
              </div>
              <h3 className={styles.solutionCardTitle}>
                Knowledge Assessments
              </h3>
              <p className={styles.solutionCardDescription}>
                Section-based quizzes that prove comprehension. Every
                attempt is tracked so managers see improvement over time,
                not just a single pass/fail.
              </p>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <ClipboardList size={22} />
              </div>
              <h3 className={styles.solutionCardTitle}>
                Operational Checklists
              </h3>
              <p className={styles.solutionCardDescription}>
                Pre-shift walkthroughs and service audit tools built for
                the floor. Not laminated sheets from 2014. Digital, current,
                and tied to the same standards your team is learning.
              </p>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <Users size={22} />
              </div>
              <h3 className={styles.solutionCardTitle}>
                Team Management
              </h3>
              <p className={styles.solutionCardDescription}>
                Invite your team. Assign roles. Track who has completed what.
                Managers see the full picture. Employees see their own path.
                Everyone operates from the same standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5: CREDIBILITY
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.credibilitySection}>
        <div className={styles.credibilityInner}>
          <div className={styles.credibilityStars}>
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
          </div>

          <h2 className={styles.credibilityTitle}>
            Reverse-engineered from the evaluation criteria used by
            Forbes, Michelin, and AAA.
          </h2>

          <p className={styles.credibilitySubtitle}>
            Every standard, scenario, and assessment is built from the
            same framework the inspectors apply. Your team trains against
            the actual criteria, not someone&apos;s interpretation of it.
          </p>

          <div className={styles.credibilityPillars}>
            <span className={styles.pillar}>Measurable</span>
            <span className={styles.pillarDot}>&middot;</span>
            <span className={styles.pillar}>Repeatable</span>
            <span className={styles.pillarDot}>&middot;</span>
            <span className={styles.pillar}>Audit-Ready</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6: WHITE-LABEL TEASER
          ══════════════════════════════════════════════════════════ */}
      <section id="preview" className={styles.previewSection}>
        <div className={styles.sectionInner}>
          <div className={styles.previewContent}>
            <div className={styles.previewIcon}>
              <Building2 size={28} />
            </div>

            <p className={styles.sectionTag}>For Hotel Groups &amp; Multi-Location Operators</p>

            <h2 className={styles.previewTitle}>
              See it with your brand.
            </h2>

            <p className={styles.previewDescription}>
              Restaurant Standards deploys as a white-label platform.
              Your logo, your colors, your name in the header. Your team
              sees their property&apos;s training system, not ours.
              Single properties, restaurant groups, and hotel F&amp;B operations
              all run on the same infrastructure with full brand isolation.
            </p>

            <Link href="/signup" className={styles.ctaPrimary}>
              Start Your Free Trial
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7: FINAL CTA
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>
            Start building a training program your inspectors would recognize.
          </h2>

          <p className={styles.finalCtaSubtitle}>
            Free trial. No credit card. Deploy across your team in minutes.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/signup" className={styles.ctaPrimary}>
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}