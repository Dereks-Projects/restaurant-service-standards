/**
 * sitemap.js — XML Sitemap Generator
 *
 * FILE LOCATION: src/app/sitemap.js
 *
 */

const BASE_URL = "https://restaurantstandards.com";

export default function sitemap() {
  return [

    /* ── Homepage ─────────────────────────────────────────────── */
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },

    /* ── Course Overview ──────────────────────────────────────── */
    {
      url: `${BASE_URL}/course`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    /* ── Individual Course Classes ────────────────────────────── */
    {
      url: `${BASE_URL}/course/architecture-of-excellence`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/course/precision-in-preparation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/course/mastering-the-first-impression`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/course/execution-under-pressure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/course/legacy-and-recovery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    /* ── Standards Overview ───────────────────────────────────── */
    {
      url: `${BASE_URL}/standards`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    /* ── Individual Standards Sections ───────────────────────── */
    {
      url: `${BASE_URL}/standards/reservation-system`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/standards/arrival-departure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/standards/dinner-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/standards/food-beverage-quality`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/standards/presentation-of-facilities`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    /* ── Supporting Content Pages ─────────────────────────────── */
    {
      url: `${BASE_URL}/checklists`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn-more`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

  ];
}