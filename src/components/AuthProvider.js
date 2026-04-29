"use client";

/**
 * AuthProvider.js — Authentication Context Provider
 *
 * FILE LOCATION: src/components/AuthProvider.js
 *
 * WHY THIS FILE EXISTS:
 * This component wraps the entire app and provides auth state
 * (is the user logged in? who are they? what org? what role?)
 * to every page and component without each one needing to
 * check independently.
 *
 * HOW IT WORKS:
 * On mount, it checks Supabase for an active session. If someone
 * is logged in, it fetches their profile (role, org, name) and
 * stores it in React context. Every child component can then call
 * useAuth() to access this data.
 *
 * It also listens for auth state changes (login, logout, token
 * refresh) and updates automatically.
 *
 * USAGE IN ANY CLIENT COMPONENT:
 *   import { useAuth } from '@/components/AuthProvider'
 *
 *   function MyComponent() {
 *     const { user, profile, loading } = useAuth();
 *     if (loading) return <p>Loading...</p>;
 *     if (!user) return <p>Not logged in</p>;
 *     return <p>Welcome, {profile.first_name}</p>;
 *   }
 */

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [supabase] = useState(() => createBrowserClient());
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ── Fetch the user's profile and organization from the database ── */
  async function loadUserData(activeUser) {
    if (!activeUser) {
      setUser(null);
      setProfile(null);
      setOrganization(null);
      setLoading(false);
      return;
    }

    setUser(activeUser);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", activeUser.id)
      .single();

    if (profileError || !profileData) {
      setProfile(null);
      setOrganization(null);
      setLoading(false);
      return;
    }

    setProfile(profileData);

    if (profileData.organization_id) {
      const { data: orgData } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", profileData.organization_id)
        .single();

      setOrganization(orgData || null);
    }

    setLoading(false);
  }

  /* ── On mount: check for existing session ── */
  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadUserData(session?.user || null);
    }

    init();

    /* ── Listen for auth state changes (login, logout, token refresh) ── */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      await loadUserData(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Sign out helper ── */
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setOrganization(null);
  }

  const value = {
    user,
    profile,
    organization,
    loading,
    signOut,
    supabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ── Hook for consuming auth state in any component ── */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}