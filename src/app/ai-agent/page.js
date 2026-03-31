/**
 * ai-agent/page.js — AI Training Coach Interface
 *
 * LAYOUT (v3):
 * 1. Title + subtitle
 * 2. Role selector (top — affects AI coaching voice)
 * 3. Category selector (matches real standards sections)
 * 4. Input field (hero — the draw)
 * 5. Quick questions (subtle suggestions below input)
 * 6. Response panel (four coaching sections)
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const roles = ["Server", "Host", "Bartender", "Manager", "Trainer"];

const categories = [
  { label: "All", value: "general" },
  { label: "Reservations", value: "reservations" },
  { label: "Arrival & Departure", value: "arrival" },
  { label: "Dinner Service", value: "dining" },
  { label: "Food & Beverage", value: "food" },
  { label: "Facilities", value: "facilities" },
];

const quickQuestions = {
  general: [
    "How quickly should I get drinks to the table after seating?",
    "How do I handle a guest complaint on the floor?",
    "What does anticipatory service look like in practice?",
  ],
  reservations: [
    "How should I greet a guest calling to book?",
    "What information should I be able to answer during a reservation call?",
    "How do we handle dietary restrictions at the reservation stage?",
  ],
  arrival: [
    "How quickly should a reserved table be ready?",
    "What happens when the table is not ready on time?",
    "What is the standard for escorting guests to their seats?",
  ],
  dining: [
    "How long do I have to greet a table after seating?",
    "What is the protocol for bottled water service?",
    "When should refills be offered?",
  ],
  food: [
    "What are the wine service standards for by-the-glass pours?",
    "What should I know about presenting an amuse bouche?",
    "How do I handle a guest who asks about seasonal menu items?",
  ],
  facilities: [
    "How often should restrooms be checked during service?",
    "What is the standard for table condition and setup?",
    "What defines proper lighting and ambiance?",
  ],
};

function parseResponse(text) {
  const sections = [];
  const pattern = /\*\*(.+?)\*\*/g;
  const titles = [];
  let match;

  while ((match = pattern.exec(text)) !== null) {
    titles.push({ title: match[1], index: match.index, length: match[0].length });
  }

  for (let i = 0; i < titles.length; i++) {
    const start = titles[i].index + titles[i].length;
    const end = i + 1 < titles.length ? titles[i + 1].index : text.length;
    const content = text.slice(start, end).trim();
    sections.push({ title: titles[i].title, content });
  }

  return sections;
}

export default function AIAgentPage() {
  const [role, setRole] = useState("Server");
  const [category, setCategory] = useState("general");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(submittedQuestion) {
    const q = submittedQuestion || question;
    if (!q.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q.trim(),
          role: role.toLowerCase(),
          touchpoint: category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setResponse(data.answer);
    } catch (err) {
      setError("Could not connect to the training agent. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleQuickQuestion(q) {
    setQuestion(q);
    handleSubmit(q);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const isOutOfScope =
    response && response.includes("outside the scope of this training system");

  const parsedSections = response && !isOutOfScope ? parseResponse(response) : [];

  const activeQuestions = quickQuestions[category] || quickQuestions.general;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>AI Training Coach</h1>
      <p className={styles.pageSubtitle}>
        Coaching powered by 79 service standards and Forbes timing benchmarks.
      </p>

      {/* Role selector */}
      <div className={styles.selectorGroup}>
        <div className={styles.selectorLabel}>Your Role</div>
        <div className={styles.pills}>
          {roles.map((r) => (
            <button
              key={r}
              className={`${styles.pill} ${role === r ? styles.pillActive : ""}`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Category selector */}
      <div className={styles.selectorGroup}>
        <div className={styles.selectorLabel}>Category</div>
        <div className={styles.pills}>
          {categories.map((c) => (
            <button
              key={c.value}
              className={`${styles.pill} ${
                category === c.value ? styles.pillActive : ""
              }`}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area — hero */}
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Ask a training question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className={styles.submitBtn}
            onClick={() => handleSubmit()}
            disabled={loading || !question.trim()}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>

      {/* Quick questions — subtle suggestions */}
      {!response && !loading && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsLabel}>Try asking</div>
          <div className={styles.suggestionsList}>
            {activeQuestions.map((q, i) => (
              <button
                key={i}
                className={styles.suggestion}
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className={styles.loading}>
          <span className={styles.loadingDot}>
            Analyzing standards and preparing your coaching response
          </span>
        </div>
      )}

      {/* Error */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Out of scope redirect */}
      {isOutOfScope && (
        <div className={styles.outOfScope}>
          <p>{response}</p>
          <Link href="/learn-more" className={styles.learnMoreLink}>
            Go to Learn More <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Structured response */}
      {parsedSections.length > 0 && (
        <div className={styles.responsePanel}>
          {parsedSections.map((section, i) => (
            <div key={i} className={styles.responseSection}>
              <div className={styles.responseSectionTitle}>
                {section.title}
              </div>
              <div className={styles.responseSectionContent}>
                {section.content}
              </div>
            </div>
          ))}

          <button
            className={styles.newQuestionBtn}
            onClick={() => {
              setResponse(null);
              setQuestion("");
              setError(null);
            }}
          >
            Ask Another Question
          </button>
        </div>
      )}
    </div>
  );
}