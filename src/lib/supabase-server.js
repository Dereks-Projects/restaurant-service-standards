/**
 * supabase-server.js — Server-Only Supabase Admin Client
 *
 * FILE LOCATION: src/lib/supabase-server.js
 *
 * WHY THIS FILE EXISTS:
 * The browser client (supabase.js) uses the anon key and is
 * subject to Row-Level Security. That's correct for user-facing
 * operations — users should only see their own data.
 *
 * But some operations need to bypass RLS:
 *   - Creating an organization during signup (no user exists yet)
 *   - Admin queries across organizations
 *   - Cleanup operations on failed signups
 *
 * This client uses the service role key, which has full database
 * access. It must NEVER be imported in client components or
 * exposed to the browser. It's restricted to API routes and
 * server-side functions only.
 *
 * SECURITY:
 * The SUPABASE_SERVICE_ROLE_KEY env var has no NEXT_PUBLIC_ prefix,
 * which means Next.js will never bundle it into client-side code.
 * This is enforced at the framework level.
 */

import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Check your .env.local and Vercel environment variables."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}