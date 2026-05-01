# Restaurant Standards

**The training platform that turns Forbes, Michelin, and AAA service criteria into a working system for the floor.**

A multi-tenant SaaS platform for luxury hospitality training, built for restaurants and hotels operating at the Forbes, Michelin, and AAA tier. Part of the [Informative Media](https://informativemedia.com) portfolio.

Live: [restaurantstandards.com](https://restaurantstandards.com)

---

## Overview

Restaurant Standards is an enterprise training platform that reverse-engineers the published evaluation criteria from Forbes, Michelin, and AAA into a structured, deployable system. It provides 79 codified service standards, a 5-class training course, an AI coaching agent, interactive quizzes, operational checklists, team management, and a white-label deployment model for hotel groups and multi-location operators.

The platform serves two audiences: the buyer (GM, F&B director, hotel executive, restaurant group owner) and the user (floor-level service staff, bartenders, hosts, managers). The buyer creates the organization, invites their team, and monitors training progress. The user accesses the training content, practices with the AI coach, and completes assessments.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, `src/` directory, Turbopack) |
| Styling | CSS Modules (no Tailwind) |
| Icons | Lucide React |
| Database / Auth | Supabase (PostgreSQL, Row-Level Security, PKCE auth) |
| Email | Resend (SMTP for auth emails, API for invitations) |
| AI | OpenAI GPT-4o-mini (via API route, temperature 0.4) |
| CMS (legacy) | Sanity (shared instance, project ID: `21zbxo34`) |
| Package Manager | pnpm |
| Font | Inter (Google Fonts) |
| Analytics | Google Analytics (`G-KV806MZ0LT`) |
| Deployment | Vercel (auto-deploy on push to main) |
| DNS | GoDaddy |
| Domain | restaurantstandards.com (canonical: non-www) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
git clone https://github.com/Dereks-Projects/restaurant-service-standards.git
cd service-standards-app
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SANITY_PROJECT_ID=21zbxo34
```

| Variable | Purpose | Scope |
|----------|---------|-------|
| `OPENAI_API_KEY` | Powers the AI Training Agent | Server-side only |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Client + Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key (RLS-enforced) | Client + Server |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (bypasses RLS) | Server-side only |
| `RESEND_API_KEY` | Sends invitation emails via Resend API | Server-side only |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity CMS for Learn More articles | Client |

All variables must also be set in **Vercel > Settings > Environment Variables** for production deployment.

### Development

```bash
pnpm dev
```

### Build & Deploy

```bash
pnpm build
git add .
git commit -m "description"
git push origin main
```

Vercel auto-deploys on push to main.

---

## Project Structure

```
src/
├── app/
│   ├── layout.js                     # Root layout (AuthProvider wraps all)
│   ├── page.js                       # Homepage (auth-aware: landing or redirect)
│   ├── page.module.css               # Landing page styles
│   ├── globals.css                   # Design tokens + base styles
│   │
│   ├── login/
│   │   ├── page.js                   # Login page (server component)
│   │   └── page.module.css
│   │
│   ├── signup/
│   │   ├── page.js                   # Org signup page (server component)
│   │   ├── page.module.css
│   │   └── invite/
│   │       └── page.js               # Invite acceptance page (token-based)
│   │
│   ├── dashboard/
│   │   ├── page.js                   # Authenticated dashboard (role-based)
│   │   ├── page.module.css
│   │   └── settings/
│   │       ├── page.js               # Org settings, team, invitations
│   │       └── page.module.css
│   │
│   ├── admin/
│   │   ├── page.js                   # Super-admin platform dashboard
│   │   └── page.module.css
│   │
│   ├── auth/
│   │   └── callback/
│   │       └── route.js              # Email verification callback (PKCE + token_hash)
│   │
│   ├── api/
│   │   ├── agent/route.js            # AI Agent (OpenAI)
│   │   └── auth/
│   │       ├── signup/route.js       # Org + user creation (atomic, server-side)
│   │       └── invite/
│   │           ├── route.js          # Single invitation
│   │           ├── accept/route.js   # Invitation acceptance
│   │           └── bulk/route.js     # Bulk invite (CSV/paste, up to 50)
│   │
│   ├── course/
│   │   ├── page.js                   # Course overview
│   │   └── [slug]/page.js           # Individual class articles
│   │
│   ├── ai-agent/page.js             # AI Training Agent
│   ├── standards/
│   │   ├── page.js                   # Standards index
│   │   └── [slug]/page.js           # Section detail
│   │
│   ├── quiz/page.js                 # Interactive quiz system
│   ├── checklists/page.js           # Operational checklists
│   ├── about/page.js
│   ├── operators/page.js            # (legacy, to be replaced by /demo)
│   ├── learn-more/page.js           # Sanity CMS articles
│   │
│   └── legal/
│       ├── privacy/page.js
│       ├── terms/page.js
│       └── cookies/page.js
│
├── components/
│   ├── AuthProvider.js               # Auth context (wraps entire app)
│   ├── Header.js                     # Auth-aware header + hamburger
│   ├── Footer.js                     # Multi-column SaaS footer
│   ├── BottomNav.js                  # Auth-aware mobile bottom nav
│   ├── LandingPage.js               # Sales landing page
│   ├── LoginForm.js                  # Login form (client component)
│   ├── SignupForm.js                 # Org signup form (client component)
│   ├── InviteSignupForm.js           # Invite acceptance form
│   ├── Dashboard.js                  # Role-based dashboard UI
│   ├── DashboardSettings.js          # Settings with single + bulk invite
│   ├── AdminDashboard.js             # Super-admin platform view
│   ├── ScrollToTop.js
│   ├── Card.js
│   ├── Button.js
│   └── Accordion.js
│
├── config/
│   └── siteConfig.js                 # Branding, nav, links (white-label config)
│
├── data/                             # JSON content
│   ├── standards.json                # 79 service standards
│   ├── sectionOverviewsIntro.json
│   ├── checklists.json               # 94 operational touchpoints
│   ├── courseOverview.json
│   ├── course1.json through course5.json
│   ├── timing.json                   # Role-filtered benchmarks (AI agent)
│   └── coachingBriefs.json           # Operational philosophy (AI agent)
│
├── lib/
│   ├── supabase.js                   # Browser + server client (anon key, RLS)
│   ├── supabase-server.js            # Service role client (bypasses RLS)
│   └── sanity.js                     # Sanity client
│
public/
├── images/
├── rs-favicon.png
└── rs-socialcard.png
```

---

## Database Schema (Supabase)

Six tables with Row-Level Security enabled on all:

| Table | Purpose |
|-------|---------|
| `organizations` | Account-level: name, slug, logo, brand colors, subscription tier/status, seat limits |
| `profiles` | Extends auth.users: org membership, role (owner/manager/employee), name, job title, is_super_admin |
| `invitations` | Invite tokens with email, role, status (pending/accepted/expired), 7-day expiration |
| `course_progress` | Per-user per-class completion tracking |
| `quiz_attempts` | Every quiz submission with scores (all attempts kept) |
| `preview_visits` | White-label demo link visit tracking |

### Key RLS Policies

- Users can only read/write data within their own organization
- Managers can read all team member progress within their org
- Owners can update org settings
- Public can read org branding (for preview system)
- Public can insert preview visits (no auth required)
- `get_user_org_id()` helper function prevents circular policy issues on profiles

### Database Triggers

- `handle_new_user()` — auto-creates a profiles row when a user signs up via auth
- `update_updated_at()` — auto-sets updated_at on organizations and profiles
- `cleanup_unverified_accounts()` — daily cron (4am UTC) deletes unverified accounts and orphaned orgs older than 48 hours

---

## Authentication Architecture

### Signup Flow (Org Creation)

1. Browser form submits to `/api/auth/signup` (server-side API route)
2. API route validates inputs, creates org (service role, bypasses RLS)
3. Creates auth user via `auth.signUp()` (triggers confirmation email via Resend SMTP)
4. `handle_new_user` trigger auto-creates profiles row
5. If user creation fails, org is rolled back
6. User sees "Check Your Email" screen
7. User clicks verification link in email
8. `/auth/callback` exchanges token_hash for session
9. User is redirected to `/dashboard`

### Invite Flow (Team Members)

1. Owner/manager sends invite from Settings page (single or bulk)
2. `/api/auth/invite` or `/api/auth/invite/bulk` creates invitation record and sends email via Resend API
3. Invited user clicks "Accept Invitation" in email
4. Lands on `/signup/invite?token=xxx` with email pre-filled and locked
5. Submits name and password
6. `/api/auth/invite/accept` creates user, marks invitation as accepted
7. User verifies email, logs in

### Role-Based Access

| Role | Dashboard | Settings | Invite | Admin |
|------|-----------|----------|--------|-------|
| Owner | Full + org info | Yes | Yes | No |
| Manager | Full | Yes | Yes | No |
| Employee | Training only | No | No | No |
| Super Admin | Full | Yes | Yes | `/admin` |

---

## Email Configuration

- **Provider:** Resend
- **Domain:** restaurantstandards.com (DKIM, SPF, MX records configured in GoDaddy)
- **SMTP:** Connected to Supabase for auth emails (verification, password reset)
- **API:** Used directly for invitation emails (branded HTML templates)
- **Sender:** `noreply@restaurantstandards.com` / "Restaurant Standards"

---

## AI Agent Architecture

Three-layer RAG with category-based filtering:

| Layer | Source | Purpose |
|-------|--------|---------|
| Primary | `standards.json` | Category-filtered standards (main authority) |
| Secondary | `timing.json` | Role-filtered timing benchmarks |
| Tertiary | `coachingBriefs.json` | Operational philosophy anchors |

Model: GPT-4o-mini, temperature 0.4, max tokens 1200. Timing data only appears as a list when explicitly requested. Forbes classification names are never altered.

---

## Design System

| Token | Value |
|-------|-------|
| Base background | `#313131` |
| Surface | `#3a3a3a` |
| Accent (gold) | `#e8c547` |
| Text | `#f0f0f0` |
| Muted text | `#a8a8a8` |
| Font | Inter |
| Border radius | 8px / 12px / 16px |

Mobile-first responsive design. Auth-aware navigation: Header hamburger and BottomNav render different links for logged-in vs. logged-out users. Multi-column SaaS footer with auth-aware CTA.

---

## Key Architectural Decisions

- **Server components for auth-gated pages.** Auth checks and data fetching happen server-side. Client components handle interactive UI only. This prevents content flash and ensures clean prerendering.
- **Service role client for server-side operations.** Org creation, admin queries, and invite processing use `supabase-server.js` (bypasses RLS). Browser-facing operations use `supabase.js` (RLS-enforced).
- **Atomic signup with rollback.** Org + user creation happens in a single API route. If user creation fails, the org is deleted. No orphaned data.
- **Invite-only team onboarding.** Public signup is for org creation only. Team members enter exclusively via invitation. Prevents rogue account creation.
- **Email verification required.** No access to protected routes until email is confirmed. Auth callback handles both PKCE code exchange and token_hash verification.
- **JSON-driven content.** Standards, course material, and checklists are JSON files. No database dependency for training content. Enables rapid iteration without migrations.
- **proxy.js is never modified** without a confirmed diagnosis. It handles geo-blocking and is considered stable infrastructure.

---

## Supabase Configuration Checklist

- [x] RLS enabled on all tables (enabled by default setting)
- [x] API enabled
- [x] Auto-expose tables via API: OFF (manual GRANT statements used)
- [x] Site URL: `https://restaurantstandards.com`
- [x] Redirect URLs: `https://restaurantstandards.com/dashboard`, `https://restaurantstandards.com/auth/callback`
- [x] Custom SMTP: Resend (host: smtp.resend.com, port: 587, username: resend)
- [x] Email template updated for token_hash confirmation flow
- [x] pg_cron extension enabled (ghost account cleanup)
- [x] GRANT ALL on public schema to service_role, authenticated, anon, supabase_auth_admin

---

## Ecosystem

| Site | Focus |
|------|-------|
| [Somm.Site](https://somm.site) | Wine education & courses |
| [Somm.Tips](https://somm.tips) | Wine & cocktail recommendations |
| [Hospitality.fyi](https://hospitality.fyi) | Industry insights |
| [Beverage.fyi](https://beverage.fyi) | Encyclopedic beverage reference |
| [Backbar.fyi](https://backbar.fyi) | Spirits & cocktails |

All sites share a single Sanity CMS instance (project: somm-site, ID: 21zbxo34).

---

## Author

Created by **Derek Engles** — certified sommelier with 20+ years of luxury hospitality experience at properties including Wynn Resort and MGM Grand. Credentials from Harvard Business School and Northwestern University.

[derekengles.com](https://derekengles.com) · [Informative Media](https://informativemedia.com)

---

## License

All rights reserved. &copy; Informative Media.