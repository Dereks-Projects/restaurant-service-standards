"use client";

/**
 * SignupForm.js — Signup Form Component
 *
 * FILE LOCATION: src/components/SignupForm.js
 *
 * THIS IS THE ORG CREATION FLOW:
 * Only the buyer/decision-maker uses this page. They create
 * the organization and become the owner. Everyone else on
 * their team enters via invitation only.
 *
 * The messaging makes this clear: headline, subtitle, and a
 * notice for employees who landed here by mistake.
 */

import { useState } from "react";
import Link from "next/link";
import { Building2, Eye, EyeOff, AlertCircle, Mail } from "lucide-react";
import styles from "@/app/signup/page.module.css";

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function SignupForm() {
  const [orgName, setOrgName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const slug = generateSlug(orgName);

    if (!slug) {
      setError("Please enter a valid organization name.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName: orgName.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Unable to connect. Please check your internet and try again.");
      setLoading(false);
    }
  }

  /* ── Success state: show verification message ── */
  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrap}>
              <Mail size={24} />
            </div>
            <h1 className={styles.title}>Check Your Email</h1>
            <p className={styles.subtitle}>
              We sent a verification link to <strong>{email}</strong>.
              Click the link in your email to activate your account,
              then return here to sign in.
            </p>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already verified?{" "}
              <Link href="/login" className={styles.footerLink}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Signup form ── */
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <Building2 size={24} />
          </div>
          <h1 className={styles.title}>Set Up Your Organization</h1>
          <p className={styles.subtitle}>
            Register your restaurant, hotel, or group to deploy
            Restaurant Standards across your team.
          </p>
        </div>

        <form onSubmit={handleSignup} className={styles.form}>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="orgName" className={styles.label}>
              Organization Name
            </label>
            <input
              id="orgName"
              type="text"
              required
              placeholder="Starr Restaurants"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className={styles.input}
            />
            {orgName && (
              <span className={styles.slugPreview}>
                restaurantstandards.com/preview/{generateSlug(orgName)}
              </span>
            )}
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                Your First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                autoComplete="given-name"
                placeholder="First"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Your Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Creating organization..." : "Get Started"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.footerLink}>
              Sign in
            </Link>
          </p>
          <p className={styles.inviteNotice}>
            Were you invited by your manager?{" "}
            Check your email for an invite link.
          </p>
        </div>
      </div>
    </div>
  );
}