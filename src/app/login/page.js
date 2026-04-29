/**
 * page.js — Login Page
 *
 * FILE LOCATION: src/app/login/page.js
 *
 * This is a server component. It exports SEO metadata and renders
 * the LoginForm client component. All interactive logic (form state,
 * Supabase auth calls) lives in LoginForm.js.
 */

import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Sign In",
  description:
    "Sign in to your Restaurant Standards training dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}