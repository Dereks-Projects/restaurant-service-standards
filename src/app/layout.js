/**
 * layout.js — Root Layout
 *
 * In Next.js App Router, layout.js wraps EVERY page automatically.
 * Whatever you put here shows on every single page of the site.
 * The {children} prop is whatever page the user is currently on.
 *
 * WHAT CHANGED:
 * Added AuthProvider import and wrapper around {children}.
 * This gives every page access to auth state (logged in? who? what role?).
 * Everything else is unchanged.
 */

import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  metadataBase: new URL("https://restaurantstandards.com"),

  alternates: {
    canonical: "https://restaurantstandards.com",
  },

  title: {
    default: "Restaurant Standards | Luxury Hospitality Training System",
    template: "%s | Restaurant Standards",
  },

  description:
    "The Modern Restaurant Performance System. Fine dining training for Michelin, Forbes, and AAA standards. 79 service standards, AI coaching, and staff training tools.",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

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
    site: "@restaurantstandards",
    creator: "@derekengles",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
        <Header />

        <AuthProvider>
          <main className="main-content">
            {children}
          </main>
        </AuthProvider>

        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}