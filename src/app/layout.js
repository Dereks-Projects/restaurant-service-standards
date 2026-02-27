/**
 * layout.js — Root Layout
 *
 * WHY THIS FILE MATTERS:
 * In Next.js App Router, layout.js wraps EVERY page automatically.
 * Whatever you put here shows on every single page of the site.
 * That makes it the perfect place for the Header and BottomNav,
 * since those appear everywhere.
 *
 * The {children} prop is whatever page the user is currently on.
 * So if they visit "/standards", children = the Standards page content.
 */

import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

/* ─── SEO Metadata ───────────────────────────────────────────────────────────
 *
 * metadataBase: Tells Next.js the root URL of the site.
 * Without this, image URLs in Open Graph/Twitter are relative paths,
 * which social crawlers (LinkedIn, X, iMessage) may fail to resolve.
 * Result: broken preview cards on launch day. This one line fixes that.
 *
 * title.template: Applied to every page that exports its own metadata.
 * Example: the Standards page sets title "Guest Service Excellence"
 * and Next.js automatically renders it as:
 * "Guest Service Excellence | Restaurant Standards"
 * The default is used on pages that export no title of their own.
 *
 * robots: Explicitly instructs Google and Bing to index this site
 * and follow all links. Without this, behavior is assumed — not guaranteed.
 *
 * keywords: Not heavily weighted by Google anymore, but still read
 * by Bing, DuckDuckGo, and other crawlers. Use the terms your audience
 * actually searches for — not just your brand name.
 *
 * twitter.site: Associates your content with your Twitter/X handle
 * for attribution. Minor, but professional.
 * UPDATE THIS with your actual @handle when you have one.
 * ─────────────────────────────────────────────────────────────────────────── */

export const metadata = {

  /* Canonical base URL — fixes social image resolution */
  metadataBase: new URL("https://restaurantstandards.com"),

  /* Title template — subpages prepend their name automatically */
  title: {
    default: "Restaurant Standards | Luxury Hospitality Training System",
    template: "%s | Restaurant Standards",
  },

  description:
    "The Modern Restaurant Performance System. Fine dining training for Michelin, Forbes, and AAA standards. 79 service standards, AI coaching, and staff training tools.",

  /* Robots — tell crawlers to index and follow */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  /* Keywords — terms your audience actually searches */
  keywords: [
    "restaurant staff training",
    "fine dining service standards",
    "luxury hospitality training",
    "Michelin service training",
    "Forbes five star hospitality",
    "AAA diamond service",
    "restaurant manager training",
    "guest service excellence",
    "food and beverage training",
    "hospitality education",
  ],

  icons: {
    icon: "/rs-favicon.png",
    apple: "/rs-favicon.png",
  },

  openGraph: {
    title: "Restaurant Standards | Luxury Hospitality Training System",
    description:
      "The Modern Restaurant Performance System. Fine dining training for Michelin, Forbes, and AAA standards. 79 service standards, AI coaching, and staff training tools.",
    url: "https://restaurantstandards.com",
    siteName: "Restaurant Standards",
    images: [
      {
        url: "/rs-socialcard.png",
        width: 1200,
        height: 630,
        alt: "Restaurant Standards — The Modern Restaurant Performance System",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Restaurant Standards | Luxury Hospitality Training System",
    description:
      "The Modern Restaurant Performance System. Fine dining training for Michelin, Forbes, and AAA standards. 79 service standards, AI coaching, and staff training tools.",
    images: ["/rs-socialcard.png"],
    /* UPDATE: Replace with your actual @handle when available */
    site: "@restaurantstandards",
    creator: "@derekengles",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ── Google Analytics ─────────────────────────────────────────
          * Loads the GA4 tracking script on every page.
          * strategy="afterInteractive" means it loads after the page
          * is ready — so it never slows down your page render.
          * ──────────────────────────────────────────────────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KV806MZ0LT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KV806MZ0LT');
          `}
        </Script>

        <ScrollToTop />
        {/* Header sticks to the top of every page */}
        <Header />

        {/* Main content area — the "main-content" class adds
            bottom padding on mobile so the floating nav doesn't
            cover your content (defined in globals.css) */}
        <main className="main-content">
          {children}
        </main>

        {/* Desktop-only footer (hidden on mobile where BottomNav is used) */}
        <Footer />

        {/* Bottom nav floats at the bottom on mobile, hidden on desktop */}
        <BottomNav />
      </body>
    </html>
  );
}