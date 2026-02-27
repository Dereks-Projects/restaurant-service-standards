/**
 * page.js — Homepage (System Control Panel)
 *
 * Updated icon set:
 * - Award: flagship course (excellence/achievement)
 * - MessageSquareText: AI agent (conversation without robot face)
 * - ClipboardCheck: standards (checklist/system)
 * - Target: quiz (precision/accuracy)
 * - Lightbulb: learn more (insight)
 * - Building2: operators (business/property)
 */

import Link from "next/link";
import {
  Award,
  MessageSquareText,
  ClipboardCheck,
  Target,
  ClipboardList,
  Lightbulb,
  ChevronRight,
  Clock,
  Building2,
} from "lucide-react";
import siteConfig from "@/config/siteConfig";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* --- Hero Panel --- */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{siteConfig.tagline}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.subtitle}</p>

        {/* Two CTAs: one for individuals, one for operators/organizations */}
        <div className={styles.heroCtaRow}>
          <Link href="/course" className={styles.heroCta}>
            <Award size={15} />
            Start Training
          </Link>
          <Link href="/operators" className={styles.heroCtaSecondary}>
            <Building2 size={15} />
            For Organizations
          </Link>
        </div>
      </section>

      {/* --- Stats Bar --- */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>79</span>
          <span className={styles.statLabel}>Standards</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>5</span>
          <span className={styles.statLabel}>Operational Areas</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>AI</span>
          <span className={styles.statLabel}>Training Coach</span>
        </div>
      </div>

      {/* --- Flagship Card (5 Steps to 5 Stars) --- */}
      <Link href="/course" className={styles.flagship}>
        <div className={styles.flagshipIcon}>
          <Award size={28} />
        </div>
        <div className={styles.flagshipContent}>
          <div className={styles.flagshipTitle}>5 Steps to 5 Stars</div>
          <div className={styles.flagshipDescription}>
            Five classes that define elevated guest service. A structured framework for consistent, high-performance execution.
          </div>
          <div className={styles.flagshipMeta}>
            <Clock size={12} />
            60-75 minutes across 5 classes
          </div>
        </div>
      </Link>

      {/* --- Module Stack --- */}
      <div className={styles.modules}>
        <Link href="/ai-agent" className={styles.moduleCard}>
          <div className={styles.moduleIcon}>
            <MessageSquareText size={20} />
          </div>
          <div className={styles.moduleContent}>
            <div className={styles.moduleTitle}>AI Training Agent</div>
            <div className={styles.moduleDescription}>
              Practice real scenarios with AI coaching powered by the standards system
            </div>
          </div>
          <ChevronRight size={18} className={styles.moduleArrow} />
        </Link>

        <Link href="/standards" className={styles.moduleCard}>
          <div className={styles.moduleIcon}>
            <ClipboardCheck size={20} />
          </div>
          <div className={styles.moduleContent}>
            <div className={styles.moduleTitle}>Guest Service Excellence</div>
            <div className={styles.moduleDescription}>
              The complete standards system across all five operational areas
            </div>
          </div>
          <ChevronRight size={18} className={styles.moduleArrow} />
        </Link>

        <Link href="/quiz" className={styles.moduleCard}>
          <div className={styles.moduleIcon}>
            <Target size={20} />
          </div>
          <div className={styles.moduleContent}>
            <div className={styles.moduleTitle}>Quiz</div>
            <div className={styles.moduleDescription}>
              Test your service knowledge with section-based assessments
            </div>
          </div>
          <ChevronRight size={18} className={styles.moduleArrow} />
        </Link>

        <Link href="/checklists" className={styles.moduleCard}>
          <div className={styles.moduleIcon}>
            <ClipboardList size={20} />
          </div>
          <div className={styles.moduleContent}>
            <div className={styles.moduleTitle}>Operational Checklists</div>
            <div className={styles.moduleDescription}>
              Pre-shift walkthroughs and service audit tools for the floor
            </div>
          </div>
          <ChevronRight size={18} className={styles.moduleArrow} />
        </Link>

        <Link href="/learn-more" className={styles.moduleCard}>
          <div className={styles.moduleIcon}>
            <Lightbulb size={20} />
          </div>
          <div className={styles.moduleContent}>
            <div className={styles.moduleTitle}>From the Network</div>
            <div className={styles.moduleDescription}>
              Curated articles from the Informative Media ecosystem
            </div>
          </div>
          <ChevronRight size={18} className={styles.moduleArrow} />
        </Link>

        {/* Operators card — separated, gold treatment */}
        <Link href="/operators" className={`${styles.moduleCard} ${styles.moduleCardOperator}`}>
          <div className={`${styles.moduleIcon} ${styles.moduleIconOperator}`}>
            <Building2 size={20} />
          </div>
          <div className={styles.moduleContent}>
            <div className={`${styles.moduleTitle} ${styles.moduleTitleOperator}`}>
              For Organizations
            </div>
            <div className={styles.moduleDescription}>
              Deploy this platform across your property or group — hotels, restaurants, multi-location operations
            </div>
          </div>
          <ChevronRight size={18} className={styles.moduleArrow} />
        </Link>
      </div>
    </div>
  );
}