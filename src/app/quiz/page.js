/**
 * quiz/page.js — Quiz System
 *
 * THREE PHASES:
 * 1. SETUP: User picks a section (or All) via pills, sees question count, hits Start
 * 2. ACTIVE: Progress bar, question card, 4 answer buttons, feedback + training tip
 * 3. RESULTS: Score, percentage, per-question breakdown with correct answers and tips
 *
 * DATA SOURCE:
 * Each standard in standards.json has a "quiz" field with question, choices, and answer.
 * We pull those out and filter by section.
 *
 * FUTURE-PROOFING:
 * Quiz results are stored in a clean results array. When Supabase is added in Phase 2,
 * we just push that array to the database instead of rebuilding anything.
 */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import standards from "@/data/standards.json";
import styles from "./page.module.css";

/* Get unique section names from the JSON */
const sectionNames = [...new Set(standards.map((s) => s.section))];

/*
 * Build quiz questions from standards.json.
 * Each standard has a quiz object: { question, choices, answer }
 * We add the section name and training tip for the results screen.
 */
function getQuestions(section) {
  const filtered = section === "All"
    ? standards
    : standards.filter((s) => s.section === section);

  return filtered
    .filter((s) => s.quiz) /* only items that have a quiz field */
    .map((s) => ({
      question: s.quiz.question,
      choices: s.quiz.choices,
      answer: s.quiz.answer,
      section: s.section,
      trainingTip: s.trainingTip,
    }));
}

/* Shuffle an array (randomize question order) */
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* Score message based on percentage */
function getMessage(percent) {
  if (percent === 100) return "Perfect score. You set the standard.";
  if (percent >= 80) return "Strong performance. A few areas to tighten up.";
  if (percent >= 60) return "Solid foundation. Review the tips below and try again.";
  if (percent >= 40) return "Room to grow. Focus on the missed items and retake the quiz.";
  return "Time to hit the training materials. Review the course and standards, then come back.";
}

export default function QuizPage() {
  /* --- STATE --- */
  const [selectedSection, setSelectedSection] = useState("All");
  const [phase, setPhase] = useState("setup"); /* setup | active | results */
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState([]); /* { question, yourAnswer, correctAnswer, correct, trainingTip, section } */

  /* Preview how many questions are available */
  const availableCount = useMemo(
    () => getQuestions(selectedSection).length,
    [selectedSection]
  );

  /* --- HANDLERS --- */

  function handleStart() {
    const q = shuffle(getQuestions(selectedSection)).slice(0, 10);
    setQuestions(q);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setResults([]);
    setPhase("active");
  }

  function handleAnswer(choice) {
    if (selectedAnswer) return; /* already answered */
    setSelectedAnswer(choice);

    const current = questions[currentIndex];
    setResults((prev) => [
      ...prev,
      {
        question: current.question,
        yourAnswer: choice,
        correctAnswer: current.answer,
        correct: choice === current.answer,
        trainingTip: current.trainingTip,
        section: current.section,
      },
    ]);
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setPhase("results");
    }
  }

  function handleRestart() {
    setPhase("setup");
    setSelectedAnswer(null);
    setResults([]);
    setCurrentIndex(0);
  }

  /* --- COMPUTED VALUES --- */
  const current = questions[currentIndex];
  const correctCount = results.filter((r) => r.correct).length;
  const totalCount = results.length;
  const percent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  /* =================== SETUP PHASE =================== */
  if (phase === "setup") {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Quiz</h1>
        <p className={styles.pageSubtitle}>
          Test your knowledge of the service standards. Pick a section or quiz across all areas.
        </p>

        <div className={styles.selectorGroup}>
          <div className={styles.selectorLabel}>Choose a Section</div>
          <div className={styles.pills}>
            <button
              className={`${styles.pill} ${
                selectedSection === "All" ? styles.pillActive : ""
              }`}
              onClick={() => setSelectedSection("All")}
            >
              All Sections
            </button>
            {sectionNames.map((name) => (
              <button
                key={name}
                className={`${styles.pill} ${
                  selectedSection === name ? styles.pillActive : ""
                }`}
                onClick={() => setSelectedSection(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.questionCount}>
          {Math.min(availableCount, 10)} questions{availableCount > 10 ? ` (from ${availableCount} available)` : ""}
        </p>

        <button className={styles.startBtn} onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    );
  }

  /* =================== ACTIVE PHASE =================== */
  if (phase === "active" && current) {
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const isAnswered = selectedAnswer !== null;

    return (
      <div className={styles.page}>
        {/* Progress bar */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressLabel}>
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{current.section}</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className={styles.questionCard}>
          <span className={styles.sectionBadge}>{current.section}</span>
          <p className={styles.questionText}>{current.question}</p>
        </div>

        {/* Answer buttons */}
        <div className={styles.answers}>
          {current.choices.map((choice, i) => {
            let btnClass = styles.answerBtn;

            if (isAnswered) {
              if (choice === current.answer) {
                btnClass += ` ${styles.answerCorrect}`;
              } else if (choice === selectedAnswer) {
                btnClass += ` ${styles.answerWrong}`;
              } else {
                btnClass += ` ${styles.answerBtnDisabled}`;
              }
            }

            return (
              <button
                key={i}
                className={btnClass}
                onClick={() => handleAnswer(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {/* Feedback after answering */}
        {isAnswered && (
          <>
            <div
              className={`${styles.feedback} ${
                selectedAnswer === current.answer
                  ? styles.feedbackCorrect
                  : styles.feedbackWrong
              }`}
            >
              <div
                className={`${styles.feedbackTitle} ${
                  selectedAnswer === current.answer
                    ? styles.feedbackTitleCorrect
                    : styles.feedbackTitleWrong
                }`}
              >
                {selectedAnswer === current.answer
                  ? "Correct"
                  : "Incorrect"}
              </div>

              {selectedAnswer !== current.answer && (
                <p className={styles.feedbackCorrectAnswer}>
                  Correct answer: {current.answer}
                </p>
              )}

              <p className={styles.feedbackTip}>
                Training Tip: {current.trainingTip}
              </p>
            </div>

            <button className={styles.nextBtn} onClick={handleNext}>
              {currentIndex + 1 < questions.length
                ? "Next Question"
                : "See Results"}
            </button>
          </>
        )}
      </div>
    );
  }

  /* =================== RESULTS PHASE =================== */
  if (phase === "results") {
    return (
      <div className={styles.page}>
        <div className={styles.results}>
          {/* Score card */}
          <div className={styles.scoreCard}>
            <div className={styles.scoreTitle}>Quiz Complete</div>
            <div className={styles.scoreValue}>
              {correctCount} / {totalCount}
            </div>
            <div className={styles.scorePercent}>{percent}%</div>
            <p className={styles.scoreMessage}>{getMessage(percent)}</p>
          </div>

          {/* Per-question breakdown */}
          <h2 className={styles.breakdownTitle}>Question Breakdown</h2>
          {results.map((r, i) => (
            <div key={i} className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <span className={styles.resultQuestion}>
                  {i + 1}. {r.question}
                </span>
                <span
                  className={`${styles.resultBadge} ${
                    r.correct
                      ? styles.resultBadgeCorrect
                      : styles.resultBadgeWrong
                  }`}
                >
                  {r.correct ? "Correct" : "Missed"}
                </span>
              </div>

              {!r.correct && (
                <>
                  <p className={styles.resultYourAnswer}>
                    Your answer: {r.yourAnswer}
                  </p>
                  <p className={styles.resultCorrectAnswer}>
                    Correct: {r.correctAnswer}
                  </p>
                </>
              )}

              <p className={styles.resultTip}>
                Tip: {r.trainingTip}
              </p>
            </div>
          ))}

          {/* Action buttons */}
          <div className={styles.resultActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>
              Retake Quiz
            </button>
            <Link href="/" className={styles.backBtn}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}