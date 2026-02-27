# SYNOPSIS — Restaurant Standards v2

## What This Is
A Next.js 16 App Router training platform for luxury hospitality. JSON-driven, CSS Modules (no Tailwind), pnpm, Lucide icons, dark theme (#313131 base, #e8c547 gold accent, Inter font). Mobile-first with floating bottom nav; desktop gets footer + wider layouts. Part of the Informative Media portfolio (Somm.Site, Somm.Tips, Beverage.fyi, Backbar.fyi, Hospitality.fyi). All branding centralized in `src/config/siteConfig.js` for white-label capability.

## What's Built (Phase 1 Complete)
- **Homepage**: Hero panel (no box on desktop), stats bar, flagship card, module stack
- **Course (5 Steps to 5 Stars)**: 5-class curriculum with article pages, prev/next nav. Data: `courseOverview.json`, `course1-5.json`
- **AI Training Agent**: Role + touchpoint selection → GPT-4o-mini via `/api/agent/route.js`. System prompt tolerates misspellings/shorthand. Structured response: What to Do, What to Say, What NOT to Do, Standard Reference
- **Standards (Guest Service Excellence)**: 79 standards across 5 sections, filtered by classification. Data: `standards.json`
- **Operational Checklists**: 94 sequential touchpoints with accordion reveal. Data: `checklists.json`
- **Quiz**: 10 random questions per session, section filtering, detailed results breakdown
- **Learn More**: Live Sanity CMS integration (project: 21zbxo34). Pulls from Hospitality.fyi, Backbar.fyi, Somm.Site (wine only)
- **Header**: Portfolio dropdown (left) with ecosystem + Informative Media. Hamburger (right) with all pages, social icons (Instagram/LinkedIn), legal links
- **ScrollToTop**: Resets scroll on every page navigation
- **About + Legal pages** (Privacy, Terms, Cookies)
- **Metadata**: Favicon + Open Graph social card wired in `layout.js`

## Phase 2 (Not Built)
Supabase auth, progress tracking, preview gating (timed paywall), rate limiting, analytics dashboard, checklist persistence, Google Analytics.

## Developer Notes
Derek is a novice coder. Always: specify exact file paths, explain why, provide complete files for download (not inline snippets). Use restaurant analogies for technical concepts. Never use Tailwind.