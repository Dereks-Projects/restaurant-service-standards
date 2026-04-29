"use client";

/**
 * SignupForm.js — Signup Form Component
 *
 * FILE LOCATION: src/components/SignupForm.js
 *
 * WHY THIS IS A SEPARATE COMPONENT:
 * Same pattern as LoginForm. Interactive form logic lives in a
 * "use client" component. The page file stays as a server component
 * for SEO metadata and clean prerendering.
 *
 * WHAT HAPPENS ON SUBMIT:
 * 1. Creates a row in the organizations table (name, slug)
 * 2. Signs up the user via Supabase Auth with metadata
 *    (org_id, role=owner, first_name, last_name)
 * 3. The database trigger (handle_new_user) automatically
 *    creates the matching profiles row
 * 4. Redirects to the dashboard
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
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
  const router = useRouter();
  const [supabase] = useState(() => createBrowserClient());

  const [orgName, setOrgName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    /* Step 1: Create the organization */
    const { data: orgData, error: orgError } = await supabase
      .from("organizations")
      .insert({ name: orgName.trim(), slug })
      .select()
      .single();

    if (orgError) {
      if (orgError.code === "23505") {
        setError(
          "An organization with that name already exists. Please choose a different name."
        );
      } else {
        setError(orgError.message);
      }
      setLoading(false);
      return;
    }

    /* Step 2: Create the auth user with metadata */
    /* The handle_new_user trigger auto-creates the profiles row */
    const { error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          organization_id: orgData.id,
          role: "owner",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

    if (authError) {
      /* Clean up: remove the org since signup failed */
      await supabase.from("organizations").delete().eq("id", orgData.id);
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
            <Building2 size={24} />
          </div>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>
            Set up your organization and start training your team today.
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
            {loading ? "Creating account..." : "Get Started"}
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