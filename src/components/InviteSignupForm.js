"use client";

/**
 * InviteSignupForm.js — Invite Signup Form Component
 *
 * FILE LOCATION: src/components/InviteSignupForm.js
 *
 * WHAT THIS DOES:
 * Renders a simplified signup form for invited users. The email,
 * organization, and role are pre-set from the invitation. The
 * user only enters their name and password.
 *
 * Submits to /api/auth/invite/accept which creates the user
 * account, links it to the correct org, and marks the
 * invitation as accepted.
 */

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Eye, EyeOff, AlertCircle, Mail } from "lucide-react";
import styles from "@/app/signup/page.module.css";

export default function InviteSignupForm({
  token,
  email,
  role,
  organizationName,
  error: initialError,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(initialError || null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* If there's an initial error (bad token), show error state only */
  if (initialError) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrap}>
              <AlertCircle size={24} />
            </div>
            <h1 className={styles.title}>Invalid Invitation</h1>
            <p className={styles.subtitle}>{initialError}</p>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.footerLink}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  function getRoleLabel(r) {
    if (r === "manager") return "Manager";
    return "Team Member";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/invite/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
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

  /* Success state */
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

  /* Invite signup form */
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <UserPlus size={24} />
          </div>
          <h1 className={styles.title}>Join {organizationName}</h1>
          <p className={styles.subtitle}>
            You've been invited to join as a {getRoleLabel(role)}.
            Set up your account to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Email — read only, pre-filled from invitation */}
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              className={styles.input}
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
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
                Last Name
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
            {loading ? "Creating account..." : "Join Team"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.footerLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}