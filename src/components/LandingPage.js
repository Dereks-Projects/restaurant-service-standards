/**
 * LandingPage.js — Sales Landing Page
 *
 * FILE LOCATION: src/components/LandingPage.js
 *
 * NARRATIVE ARC:
 * 1. Hero — the one-liner
 * 2. Stats — key numbers
 * 3. Pain — three problems the buyer already knows
 * 4. The Framework — standards + course as foundation and conviction
 * 5. The AI Coach — elevated, its own moment
 * 6. The Buyer's View — management visibility, the data story
 * 7. Credibility — Forbes, Michelin, AAA
 * 8. White-label teaser
 * 9. Final CTA
 */

import Link from "next/link";
import {
  ArrowRight,
  TrendingDown,
  Shuffle,
  EyeOff,
  ClipboardCheck,
  Award,
  MessageSquareText,
  BarChart3,
  Users,
  Building2,
  Star,
  Target,
  ClipboardList,
} from "lucide-react";
import styles from "@/app/page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>

      {/* ══════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroTag}>Enterprise Hospitality Training</p>

          <h1 className={styles.heroTitle}>
            The training platform that turns Forbes, Michelin, and AAA
            service criteria into a working system for the floor.
          </h1>

          <p className={styles.heroSubtitle}>
            79 codified standards. An AI coach that never sleeps.
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

        <div className={styles.heroAccent} aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR
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
            <span className={styles.statLabel}>Training Classes</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>AI</span>
            <span className={styles.statLabel}>Coaching Agent</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>94</span>
            <span className={styles.statLabel}>Touchpoints</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THE PROBLEM
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
              <h3 className={styles.painCardTitle}>
                You lose everything when someone leaves.
              </h3>
              <p className={styles.painCardText}>
                Your best captain trained three people before they moved on.
                Now those three are training the next wave from memory.
                The standard degrades with every generation.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <Shuffle size={22} />
              </div>
              <h3 className={styles.painCardTitle}>
                Every manager trains differently.
              </h3>
              <p className={styles.painCardText}>
                Monday night service looks nothing like Saturday.
                Location A runs a different standard than Location B.
                There&apos;s no single source of truth for what excellence means.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <EyeOff size={22} />
              </div>
              <h3 className={styles.painCardTitle}>
                You can&apos;t measure what you can&apos;t see.
              </h3>
              <p className={styles.painCardText}>
                Did the team actually learn it, or just sit through it?
                Without tracked assessments and coaching data, training
                is an expense you hope works. Hope is not a system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THE FRAMEWORK
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.frameworkSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionTag}>The Foundation</p>
          <h2 className={styles.sectionTitle}>
            A standards system and the knowledge layer that brings it to life.
          </h2>

          <div className={styles.frameworkGrid}>
            <div className={styles.frameworkCard}>
              <div className={styles.frameworkCardAccent} />
              <div className={styles.frameworkIcon}>
                <ClipboardCheck size={24} />
              </div>
              <h3 className={styles.frameworkCardTitle}>
                The Operating System
              </h3>
              <p className={styles.frameworkCardLabel}>
                79 Service Standards
              </p>
              <p className={styles.frameworkCardText}>
                Every service expectation codified in instructional prose,
                organized across five operational areas. This is the
                single source of truth for what your team does and how
                they do it. The same document, the same language, the
                same standard for every shift, every location, every hire.
              </p>
              <div className={styles.frameworkModules}>
                <div className={styles.frameworkModule}>
                  <ClipboardList size={14} />
                  <span>Operational Checklists</span>
                </div>
                <div className={styles.frameworkModule}>
                  <Target size={14} />
                  <span>Knowledge Assessments</span>
                </div>
              </div>
            </div>

            <div className={styles.frameworkCard}>
              <div className={styles.frameworkCardAccent} />
              <div className={styles.frameworkIcon}>
                <Award size={24} />
              </div>
              <h3 className={styles.frameworkCardTitle}>
                The Knowledge Layer
              </h3>
              <p className={styles.frameworkCardLabel}>
                5 Steps to 5 Stars
              </p>
              <p className={styles.frameworkCardText}>
                Five structured classes that build the mindset behind
                the standards. Not a video library. Not a compliance
                checklist. This is the reasoning, the science, the
                information layer that gets your team genuinely invested
                in guest service at the highest level. The course builds
                conviction. The standards define the actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THE AI COACH
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.aiSection}>
        <div className={styles.aiInner}>
          <div className={styles.aiIcon}>
            <MessageSquareText size={28} />
          </div>

          <p className={styles.sectionTag}>AI Coaching Agent</p>

          <h2 className={styles.aiTitle}>
            Your training doesn&apos;t end when the meeting does.
          </h2>

          <p className={styles.aiDescription}>
            An AI coach trained on all 79 standards, every timing expectation,
            and the full course curriculum. Your team practices real service
            scenarios, gets immediate feedback, and builds muscle memory for
            high-pressure moments. Available at 2am before a Saturday double,
            not just during the Tuesday pre-shift.
          </p>

          <div className={styles.aiFeatures}>
            <div className={styles.aiFeature}>
              <span className={styles.aiFeatureLabel}>Trained on your standards</span>
              <span className={styles.aiFeatureText}>
                Every response is grounded in the 79 standards, not generic advice
              </span>
            </div>
            <div className={styles.aiFeature}>
              <span className={styles.aiFeatureLabel}>Scenario-based coaching</span>
              <span className={styles.aiFeatureText}>
                Practice service recovery, wine service, VIP handling, and more
              </span>
            </div>
            <div className={styles.aiFeature}>
              <span className={styles.aiFeatureLabel}>Always available</span>
              <span className={styles.aiFeatureText}>
                Your team trains on their schedule, not yours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THE BUYER'S VIEW
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.buyerSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionTag}>For the Operator</p>
          <h2 className={styles.sectionTitle}>
            See exactly who&apos;s trained, who&apos;s not, and where
            the gaps are. Before the inspector finds them.
          </h2>

          <div className={styles.buyerGrid}>
            <div className={styles.buyerCard}>
              <BarChart3 size={20} className={styles.buyerCardIcon} />
              <h3 className={styles.buyerCardTitle}>Team Progress Tracking</h3>
              <p className={styles.buyerCardText}>
                See which team members completed training, which classes
                they finished, and their assessment scores. Improvement
                over time, not just pass/fail.
              </p>
            </div>

            <div className={styles.buyerCard}>
              <Users size={20} className={styles.buyerCardIcon} />
              <h3 className={styles.buyerCardTitle}>Role-Based Access</h3>
              <p className={styles.buyerCardText}>
                Managers see the full picture. Employees see their own path.
                Owners see across the organization. Everyone operates from
                the same standard with the right level of visibility.
              </p>
            </div>

            <div className={styles.buyerCard}>
              <Building2 size={20} className={styles.buyerCardIcon} />
              <h3 className={styles.buyerCardTitle}>Multi-Property Ready</h3>
              <p className={styles.buyerCardText}>
                Restaurant groups and hotel F&amp;B operations deploy once,
                roll out everywhere. Each property maintains its own team
                and data, all on the same infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CREDIBILITY
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.credibilitySection}>
        <div className={styles.credibilityInner}>
          <div className={styles.credibilityStars}>
            <Star size={14} />
            <Star size={14} />
            <Star size={14} />
            <Star size={14} />
            <Star size={14} />
          </div>

          <h2 className={styles.credibilityTitle}>
            Reverse-engineered from the published evaluation criteria
            used by Forbes, Michelin, and AAA.
          </h2>

          <p className={styles.credibilitySubtitle}>
            Not inspired by. Not aligned with. Reverse-engineered.
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
          WHITE-LABEL TEASER
          ══════════════════════════════════════════════════════════ */}
      <section id="preview" className={styles.previewSection}>
        <div className={styles.sectionInner}>
          <div className={styles.previewContent}>
            <div className={styles.previewIcon}>
              <Building2 size={28} />
            </div>

            <p className={styles.sectionTag}>
              For Hotel Groups &amp; Multi-Location Operators
            </p>

            <h2 className={styles.previewTitle}>
              See it with your brand.
            </h2>

            <p className={styles.previewDescription}>
              Restaurant Standards deploys as a white-label platform.
              Your logo, your colors, your name in the header. Your team
              sees their property&apos;s training system, not ours.
              Single properties, restaurant groups, and hotel F&amp;B
              operations all run on the same infrastructure with full
              brand isolation.
            </p>

            <Link href="/signup" className={styles.ctaPrimary}>
              Start Your Free Trial
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════════════════════════ */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>
            Start building a training program your inspectors
            would recognize.
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