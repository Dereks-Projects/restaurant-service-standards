"use client";

/**
 * LoginForm.js — Login Form Component
 *
 * FILE LOCATION: src/components/LoginForm.js
 *
 * WHY THIS IS A SEPARATE COMPONENT:
 * Next.js App Router requires interactive UI (forms, hooks, browser
 * APIs) to live in "use client" components. The page file stays as a
 * server component so it can export SEO metadata and prerender cleanly.
 * This component handles all the login form state and Supabase auth.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
import styles from "@/app/login/page.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserClient());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <LogIn size={24} />
          </div>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>
            Welcome back. Sign in to access your training dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

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
                autoComplete="current-password"
                placeholder="Enter your password"
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className={styles.footerLink}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}