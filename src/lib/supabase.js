/**
 * supabase.js — Supabase Client Utility
 *
 * FILE LOCATION: src/lib/supabase.js
 *
 * WHY THIS FILE EXISTS:
 * This is the single connection point between your Next.js app
 * and your Supabase project. Every login, database query, and
 * auth check flows through one of these two clients.
 *
 * TWO CLIENTS, ONE PURPOSE:
 * Next.js App Router has two types of components:
 *   1. Client components (run in the browser — interactive UI)
 *   2. Server components (run on the server — data fetching, API routes)
 *
 * Each needs its own Supabase client because they handle cookies
 * differently. The browser client reads cookies from the browser.
 * The server client reads cookies from the incoming HTTP request.
 *
 * USAGE:
 *   Client component: import { createBrowserClient } from '@/lib/supabase'
 *   Server component:  import { createServerClient } from '@/lib/supabase'
 */

import { createBrowserClient as createBrowserSupabaseClient } from "@supabase/ssr";
import { createServerClient as createServerSupabaseClient } from "@supabase/ssr";

/* ─── Browser Client ─────────────────────────────────────────────────────────
 * Used in client components ("use client" files).
 * Handles auth state, login/logout, and real-time subscriptions.
 * Reads the NEXT_PUBLIC_ env vars that are exposed to the browser.
 * ─────────────────────────────────────────────────────────────────────────── */
export function createBrowserClient() {
  return createBrowserSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/* ─── Server Client ──────────────────────────────────────────────────────────
 * Used in server components, API routes, and server actions.
 * Requires the cookies() function from next/headers so it can
 * read and write auth cookies on the server side.
 *
 * USAGE IN A SERVER COMPONENT OR API ROUTE:
 *   import { cookies } from 'next/headers'
 *   import { createServerClient } from '@/lib/supabase'
 *
 *   const cookieStore = await cookies()
 *   const supabase = createServerClient(cookieStore)
 *   const { data } = await supabase.from('organizations').select('*')
 * ─────────────────────────────────────────────────────────────────────────── */
export function createServerClient(cookieStore) {
  return createServerSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll can fail in Server Components (read-only context).
            // This is expected — auth cookies get set via middleware instead.
          }
        },
      },
    }
  );
}