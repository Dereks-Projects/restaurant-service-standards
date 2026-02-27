# SYNOPSIS — Restaurant Standards v2

## What This Is
A Next.js 16 App Router training platform for luxury hospitality. JSON-driven, CSS Modules (no Tailwind), pnpm, Lucide icons, dark theme (#313131 base, #e8c547 gold accent, Inter font). Mobile-first with floating bottom nav; desktop gets footer + wider layouts. Part of the Informative Media portfolio (Somm.Site, Somm.Tips, Beverage.fyi, Backbar.fyi, Hospitality.fyi). All branding centralized in `src/config/siteConfig.js` for white-label capability. Live at restaurantstandards.com. Deployed via GitHub → Vercel. Local folder: `service-standards-app`.

## What's Built (Phase 1 Complete)
- **Homepage**: Hero panel (no box on mobile or desktop), stats bar, flagship card, module stack. Two CTAs in hero: "Start Training" (gold filled) and "For Organizations" (gold outlined). Both buttons icon-left, same width. Operators module card at bottom of stack with gold border treatment.
- **Course (5 Steps to 5 Stars)**: 5-class curriculum with article pages, prev/next nav. Data: `courseOverview.json`, `course1-5.json`. Slugs: `architecture-of-excellence`, `precision-in-preparation`, `mastering-the-first-impression`, `execution-under-pressure`, `legacy-and-recovery`.
- **AI Training Agent**: Role + touchpoint selection → GPT-4o-mini via `/api/agent/route.js`. System prompt tolerates misspellings/shorthand. Structured response: What to Do, What to Say, What NOT to Do, Standard Reference. IP-based rate limiting: 10 requests per 60 seconds per IP.
- **Standards (Guest Service Excellence)**: 79 standards across 5 sections, filtered by classification. Data: `standards.json`. Slugs: `reservation-system`, `arrival-departure`, `dinner-service`, `food-beverage-quality`, `presentation-of-facilities`.
- **Operational Checklists**: 94 sequential touchpoints with accordion reveal. Data: `checklists.json`
- **Quiz**: 10 random questions per session, section filtering, detailed results breakdown
- **Learn More**: Live Sanity CMS integration (project: 21zbxo34). Pulls from Hospitality.fyi, Backbar.fyi, Somm.Site (wine only)
- **For Operators page** (`/operators`): Business-facing page targeting GMs, F&B Directors, VPs of Operations. Sections: hero with two CTAs, The Reality (problem), The Platform (features), AI Agent spotlight, Who It's For, Credibility, contact CTA. mailto: derekengles@gmail.com (temporary, update to business email).
- **Header**: Portfolio dropdown (left) with ecosystem + Informative Media. Hamburger (right) with all pages + For Operators link (gold, bold, below accent divider, above social icons, accent divider below it too). Social icons (Instagram/LinkedIn). Legal links.
- **Footer**: Desktop only. Includes For Operators link in gold.
- **ScrollToTop**: Resets scroll on every page navigation
- **About page**: Includes For Operators section with link to `/operators`
- **Legal pages** (Privacy, Terms, Cookies)
- **404 page**: Custom `not-found.js` with gold 404 code, two buttons — Return Home and About
- **robots.js**: Blocks `/ai-agent`, `/quiz`, `/legal/`, `/api/` from indexing. Located at `src/app/robots.js`.
- **sitemap.js**: All indexable routes with priorities. Located at `src/app/sitemap.js`.
- **proxy.js**: Geo-blocking for RU and CN. Located at `src/proxy.js`. Next.js 16 replacement for middleware.js.
- **Metadata**: Full SEO in `layout.js` — metadataBase, title template, robots, keywords, Open Graph, Twitter card. Google Analytics G-KV806MZ0LT wired via Next.js Script component.
- **Sanity client**: Uses named export `createImageUrlBuilder` (updated from deprecated default export).

## Environment Variables (Vercel Dashboard)
- `OPENAI_API_KEY` — powers AI Training Agent
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — value: `21zbxo34`

## Phase 2 (Not Built)
Supabase auth, progress tracking, preview gating (timed paywall), advanced rate limiting, analytics dashboard, checklist persistence, contact form (replacing mailto link on operators page), business email update on operators page.

## Developer Notes
Derek is a novice coder. Always: specify exact file paths, explain why, provide complete files for download (not inline snippets). Use restaurant/hospitality analogies for technical concepts. Never use Tailwind. Never give surgical edits — always provide the complete file. Step by step instructions, one step at a time, clearly labeled with the folder and filename.