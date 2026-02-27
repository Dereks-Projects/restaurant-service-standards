# Restaurant Standards

**The Modern Restaurant Performance System**

A JSON-driven training platform for luxury hospitality, built to elevate service, reinforce consistency, and deliver 5-star results. Part of the [Informative Media](https://informativemedia.com) portfolio.

Live: [restaurantstandards.com](https://restaurantstandards.com)

---

## Overview

Restaurant Standards is a web-based training system designed for fine dining and luxury hospitality operations. It provides a structured framework of 79 service standards, a 5-class course, AI-powered coaching, interactive quizzes, and operational checklists — all driven by JSON data files for easy content updates and white-label capability.

The platform targets managers, trainers, and service staff at properties pursuing Michelin, Forbes, or AAA Diamond recognition.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | CSS Modules (no Tailwind) |
| Icons | Lucide React |
| CMS | Sanity (shared instance, project ID: `21zbxo34`) |
| AI | OpenAI GPT-4o-mini (via API route) |
| Package Manager | pnpm |
| Font | Inter (Google Fonts) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
git clone https://github.com/your-repo/restaurant-standards-v2.git
cd restaurant-standards-v2
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SANITY_PROJECT_ID=21zbxo34
```

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Powers the AI Training Agent (server-side only) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Connects to the shared Sanity CMS for Learn More articles |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.js                 # Global shell (Header + BottomNav + Footer)
│   ├── page.js                   # Homepage (system control panel)
│   ├── globals.css               # Design tokens + base styles
│   │
│   ├── course/
│   │   ├── page.js               # Course overview (5 Steps to 5 Stars)
│   │   └── [slug]/page.js        # Individual class articles
│   │
│   ├── ai-agent/page.js          # AI Training Agent interface
│   │
│   ├── standards/
│   │   ├── page.js               # Standards index (5 section cards)
│   │   └── [slug]/page.js        # Section detail (filterable by classification)
│   │
│   ├── quiz/page.js              # Interactive quiz system
│   ├── checklists/page.js        # Operational checklists (sequential touchpoints)
│   ├── learn-more/page.js        # Articles from Sanity CMS ecosystem
│   ├── about/page.js             # About page
│   │
│   ├── legal/
│   │   ├── legal.module.css      # Shared legal page styles
│   │   ├── privacy/page.js       # Privacy policy
│   │   ├── terms/page.js         # Terms of service
│   │   └── cookies/page.js       # Cookie policy
│   │
│   └── api/
│       └── agent/route.js        # AI Agent server route (OpenAI)
│
├── components/                   # Reusable UI components
│   ├── Header.js                 # Sticky header (portfolio dropdown + hamburger menu)
│   ├── BottomNav.js              # Floating mobile tab bar
│   ├── Footer.js                 # Desktop footer
│   ├── Card.js                   # Generic card component
│   ├── Button.js                 # Generic button component
│   └── Accordion.js              # Expandable accordion component
│
├── config/
│   └── siteConfig.js             # All branding, nav labels, links (white-label config)
│
├── data/                         # JSON content (the "database")
│   ├── standards.json            # 79 service standards
│   ├── sectionOverviewsIntro.json # Section intro paragraphs (standards pages)
│   ├── checklists.json           # 94 operational touchpoints
│   ├── courseOverview.json        # Course metadata and class summaries
│   ├── course1.json              # Class 1: The Architecture of Service
│   ├── course2.json              # Class 2: Precision in Guest Interaction
│   ├── course3.json              # Class 3: Operational Flow
│   ├── course4.json              # Class 4: Food & Beverage Mastery
│   └── course5.json              # Class 5: Environment & Atmosphere
│
├── lib/
│   └── sanity.js                 # Sanity client + image URL utility
│
public/
├── images/                       # Course article images
├── rs-favicon.png                # Favicon
└── rs-socialcard.png             # Open Graph social card
```

---

## Pages & Features

### Homepage
System control panel layout with hero panel, stats bar (79 Standards / 5 Areas / AI Coach), flagship course card, and module navigation stack.

### 5 Steps to 5 Stars (Course)
Five-class curriculum on luxury guest service. Two-level architecture: overview index with class cards, and individual article pages with section content, images, key takeaways, and prev/next navigation.

### AI Training Agent
Role-based coaching powered by GPT-4o-mini. Users select a role (Server, Host, Bartender, Manager, Trainer) and a touchpoint (Reservations, Arrival, Dining, etc.), then ask a question. The AI responds with structured guidance: What to Do, What to Say, What NOT to Do, and the relevant Standard Reference. Out-of-scope questions redirect to Learn More.

### Guest Service Excellence (Standards)
The 79-standard reference library organized across 5 operational areas. Index page shows section cards with counts. Detail pages feature a two-column desktop layout (sticky classification filter sidebar + scrollable standards) and mobile accordion grouped by classification. Each standard shows its classification label, full text, and training tip.

### Operational Checklists
94 sequential touchpoints organized by the guest journey — what happens first, second, third during each phase of service. Expandable section cards reveal numbered touchpoint lists with a timeline connector. Tap any touchpoint to reveal the deeper standard behind it. Designed as a quick-reference tool for the floor, not a study document.

### Quiz
Section-based knowledge assessments pulled from the quiz fields in standards.json. Three phases: section picker → active quiz with progress bar and immediate feedback → results breakdown with per-question analysis and training tips.

### From the Network (Learn More)
Live articles pulled from the shared Sanity CMS. Three sections: Hospitality.fyi, Backbar.fyi, and Somm.Site (wine category only). Article cards link out to the original sites.

### About
Platform description, philosophy, ecosystem links, bio, and Informative Media credit.

### Legal
Privacy Policy, Terms of Service, and Cookie Policy. Minimal data collection (Google Analytics only, anonymous). Shared CSS module for consistent styling.

---

## Data Architecture

All content is JSON-driven. To update standards, course content, or checklists, edit the files in `src/data/`. No database required for Phase 1.

### standards.json
```json
{
  "section": "Dinner Service",
  "classification": "Technical Execution",
  "standard": "Full standard text...",
  "trainingTip": "Practical training guidance...",
  "quiz": {
    "question": "Quiz question text?",
    "choices": ["A", "B", "C", "D"],
    "answer": "B"
  }
}
```

Used by: Standards pages, Quiz, AI Agent

### checklists.json
```json
{
  "Topic": "Arrival & Departure",
  "Item": "Warm and Timely Greeting at the Door",
  "Standard": "Guests are welcomed immediately upon arrival..."
}
```

Used by: Operational Checklists page

### course[1-5].json
```json
{
  "classLabel": "Class 1",
  "title": "The Architecture of Service",
  "slug": "architecture-of-service",
  "timeEstimate": "12-15 minutes",
  "introBlock": "Opening paragraph...",
  "sections": [...],
  "keyTakeaways": [...],
  "conclusion": {...}
}
```

Used by: Course detail pages

---

## White-Label Configuration

All branding, navigation, and external links are centralized in `src/config/siteConfig.js`. To rebrand for a different restaurant or hospitality company:

1. Update `siteConfig.js` (name, tagline, nav labels, ecosystem links)
2. Replace JSON content files in `src/data/`
3. Swap images in `public/images/`
4. Update `.env.local` with new API keys if needed

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

Mobile-first responsive design. Floating bottom nav on mobile (<769px), footer on desktop (≥769px). Two-column layouts on desktop where appropriate.

### Icon Set (Lucide)

| Feature | Icon | Rationale |
|---------|------|-----------|
| Course | Award | Excellence, achievement |
| AI Agent | MessageSquareText | Conversation without robot face |
| Standards | ClipboardCheck | Reference system, checklist |
| Checklists | ClipboardList | Working document (distinct from ClipboardCheck) |
| Quiz | Target | Precision, accuracy |
| Learn More | Lightbulb | Insight, knowledge |

---

## Ecosystem

Restaurant Standards is part of the Informative Media portfolio:

| Site | Focus |
|------|-------|
| [Somm.Site](https://somm.site) | Wine education & courses |
| [Somm.Tips](https://somm.tips) | Wine & cocktail recommendations |
| [Hospitality.fyi](https://hospitality.fyi) | Industry insights |
| [Beverage.fyi](https://beverage.fyi) | Encyclopedic beverage reference |
| [Backbar.fyi](https://backbar.fyi) | Spirits & cocktails |

All sites share a single Sanity CMS instance (project: somm-site, ID: 21zbxo34).

---

## Deployment

Deployed via Vercel with Git integration. Push to main triggers automatic deployment.

```bash
vercel --prod
```

Environment variables must be set in the Vercel dashboard:
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`

---

## Phase 2 Roadmap

| Feature | Description |
|---------|-------------|
| Supabase Auth | User accounts, login, role-based access |
| Progress Tracking | Course completion, quiz scores, checklist history |
| Preview Gating | Show partial content, redirect to signup |
| Rate Limiting | Protect AI Agent from abuse |
| Analytics Dashboard | Usage metrics, completion rates |
| Enterprise Packaging | Multi-property deployment, team management |
| Google Analytics | Traffic and engagement tracking |
| Checklist Persistence | Shift logs, manager sign-offs via Supabase |

---

## Author

Created by **Derek Engles** — certified sommelier with 20+ years of luxury hospitality experience at properties including Wynn Resort and MGM Grand. Credentials from Harvard Business School and Northwestern University.

[derekengles.com](https://derekengles.com) · [Informative Media](https://informativemedia.com)

---

## License

All rights reserved. © Informative Media.