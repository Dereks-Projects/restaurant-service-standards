/**
 * page.js — Homepage / Sales Landing Page
 *
 * FILE LOCATION: src/app/page.js
 *
 * BEHAVIOR:
 * - Logged-in users: redirected to /dashboard
 * - Visitors: see the sales landing page
 *
 * This is a server component. Auth check happens server-side
 * so logged-in users never see the landing page — no flash.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import LandingPage from "@/components/LandingPage";

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}