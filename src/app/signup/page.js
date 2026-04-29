/**
 * page.js — Signup Page
 *
 * FILE LOCATION: src/app/signup/page.js
 *
 * This is a server component. It exports SEO metadata and renders
 * the SignupForm client component. All interactive logic (form state,
 * org creation, Supabase auth) lives in SignupForm.js.
 */

import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Create Your Account",
  description:
    "Create your organization account on Restaurant Standards and start training your team with luxury hospitality standards.",
};

export default function SignupPage() {
  return <SignupForm />;
}