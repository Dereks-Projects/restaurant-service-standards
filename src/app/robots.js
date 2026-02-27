/**
 * robots.js — Search Engine Crawler Rules
 *
 * FILE LOCATION: src/app/robots.js
 * 
 */

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/ai-agent",
        "/quiz",
        "/legal/",
        "/api/",
      ],
    },
    sitemap: "https://restaurantstandards.com/sitemap.xml",
  };
}