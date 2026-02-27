/**
 * ai-agent/page.js — AI Training Agent Interface
 *
 * WHAT THIS PAGE DOES:
 * Lets the user pick their role and a touchpoint,
 * type a question, and get a structured training response
 * powered by GPT-4o-mini through our secure server route.
 *
 * THE FLOW:
 * 1. User picks a role (Server, Host, Manager, etc.)
 * 2. User picks a touchpoint (Reservations, Arrival, etc.)
 * 3. User types a question
 * 4. We send it to /api/agent (our server route)
 * 5. Server calls OpenAI, returns structured answer
 * 6. We display it in formatted sections
 *
 * WHY "use client":
 * This page has lots of interactivity: selecting pills,
 * typing input, submitting, and displaying responses.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

/* Role options the user can pick from */
const roles = ["Server", "Host", "Bartender", "Manager", "Trainer"];

/* Touchpoint options — these map to sections in the server route */
const touchpoints = [
  { label: "Reservations", value: "reservations" },
  { label: "Arrival", value: "arrival" },
  { label: "Dining Service", value: "dining" },
  { label: "Food & Beverage", value: "food" },
  { label: "Departure", value: "departure" },
  { label: "Facilities", value: "facilities" },
  { label: "Complaints", value: "complaints" },
  { label: "General", value: "general" },
];

/*
 * Parse the AI response into sections.
 * The server returns text with **What to Do**, **What to Say**, etc.
 * We split it into an array of { title, content } objects
 * so we can render each one in its own styled panel.
 */
function parseResponse(text) {
  const sections = [];
  const pattern = /\*\*(.+?)\*\*/g;
  const titles = [];
  let match;

  /* Find all **bold headings** */
  while ((match = pattern.exec(text)) !== null) {
    titles.push({ title: match[1], index: match.index, length: match[0].length });
  }

  /* Split content between headings */
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
  const [touchpoint, setTouchpoint] = useState("general");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    /* Don't submit if empty or already loading */
    if (!question.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      /* Send the question to our server route */
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question.trim(),
          role: role.toLowerCase(),
          touchpoint,
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

  /* Handle Enter key to submit */
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  /* Check if the response is an out-of-scope redirect */
  const isOutOfScope =
    response && response.includes("outside the scope of this training system");

  /* Parse the response into sections for display */
  const parsedSections = response && !isOutOfScope ? parseResponse(response) : [];

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>AI Training Agent</h1>
      <p className={styles.pageSubtitle}>
        Select your role and a service touchpoint, then ask a question.
        Responses are guided by the Restaurant Standards system.
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

      {/* Touchpoint selector */}
      <div className={styles.selectorGroup}>
        <div className={styles.selectorLabel}>Service Touchpoint</div>
        <div className={styles.pills}>
          {touchpoints.map((t) => (
            <button
              key={t.value}
              className={`${styles.pill} ${
                touchpoint === t.value ? styles.pillActive : ""
              }`}
              onClick={() => setTouchpoint(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question input */}
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
            onClick={handleSubmit}
            disabled={loading || !question.trim()}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className={styles.loading}>
          <span className={styles.loadingDot}>Analyzing standards and preparing your training response</span>
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
        </div>
      )}
    </div>
  );
}