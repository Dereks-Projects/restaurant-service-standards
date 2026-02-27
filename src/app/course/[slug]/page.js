"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import overview from "@/data/courseOverview.json";
import course1 from "@/data/course1.json";
import course2 from "@/data/course2.json";
import course3 from "@/data/course3.json";
import course4 from "@/data/course4.json";
import course5 from "@/data/course5.json";
import styles from "./page.module.css";

const courseMap = {
  "architecture-of-excellence": course1,
  "precision-in-preparation": course2,
  "mastering-the-first-impression": course3,
  "execution-under-pressure": course4,
  "legacy-and-recovery": course5,
};

const slugOrder = [
  "architecture-of-excellence",
  "precision-in-preparation",
  "mastering-the-first-impression",
  "execution-under-pressure",
  "legacy-and-recovery",
];

export default function ClassArticle({ params }) {
  const { slug } = use(params);
  const course = courseMap[slug];

  if (!course) {
    return (
      <div className={styles.page}>
        <Link href="/course" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to course
        </Link>
        <h2>Class not found</h2>
      </div>
    );
  }

  const currentIndex = slugOrder.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugOrder.length - 1 ? slugOrder[currentIndex + 1] : null;
  const prevModule = prevSlug ? overview.modules.find((m) => m.slug === prevSlug) : null;
  const nextModule = nextSlug ? overview.modules.find((m) => m.slug === nextSlug) : null;

  return (
    <div className={styles.page}>
      <Link href="/course" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to course
      </Link>

      <div className={styles.classLabel}>
        Class {course.order} of {slugOrder.length}
      </div>
      <h1 className={styles.title}>{course.title}</h1>
      <div className={styles.time}>
        <Clock size={14} />
        {course.estimatedTime}
      </div>

      {/* Intro block */}
      <div className={styles.intro}>
        <h2 className={styles.introHeadline}>{course.intro.headline}</h2>
        <p className={styles.introParagraph}>{course.intro.paragraph}</p>
      </div>

      {/* Content blocks */}
      {course.contentBlocks.map((block, i) => {
        if (block.type === "image") {
          return (
            <img
              key={i}
              src={block.src}
              alt={block.alt}
              className={styles.articleImage}
            />
          );
        }

        if (block.type === "paragraphSplit") {
          return (
            <div key={i} className={styles.section}>
              <h3 className={styles.sectionHeading}>{block.heading}</h3>
              <p className={styles.sectionParagraph}>{block.part1}</p>
              <p className={styles.sectionParagraph}>{block.part2}</p>
            </div>
          );
        }

        return null;
      })}

      {/* Key points */}
      <div className={styles.keyPoints}>
        <h3 className={styles.keyPointsTitle}>Key Takeaways</h3>
        <div className={styles.keyPointsList}>
          {course.keyPoints.map((point, i) => (
            <div key={i} className={styles.keyPoint}>
              <CheckCircle size={16} className={styles.keyPointIcon} />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div className={styles.conclusion}>
        <p className={styles.conclusionParagraph}>{course.conclusion.paragraph}</p>
      </div>

      <div className={styles.callout}>{course.conclusion.callout}</div>

      {/* Prev / Next navigation */}
      <nav className={styles.courseNav}>
        {prevModule ? (
          <Link href={`/course/${prevSlug}`} className={styles.navLink}>
            <span className={styles.navDirection}>Previous</span>
            <span className={styles.navTitle}>{prevModule.title}</span>
          </Link>
        ) : (
          <div className={styles.navSpacer} />
        )}

        {nextModule ? (
          <Link href={`/course/${nextSlug}`} className={`${styles.navLink} ${styles.navLinkNext}`}>
            <span className={styles.navDirection}>Next</span>
            <span className={styles.navTitle}>{nextModule.title}</span>
          </Link>
        ) : (
          <div className={styles.navSpacer} />
        )}
      </nav>
    </div>
  );
}