/**
 * lib/sanity.js — Sanity Client Setup
 *
 * WHY THIS FILE EXISTS:
 * This creates a reusable connection to your Sanity database.
 * Any page that needs to fetch articles imports "client" from here.
 * The image URL builder turns Sanity image references into
 * actual URLs you can use in <img> tags.
 */

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, /* uses cached data for faster loads */
});

/* Image URL builder — turns Sanity image references into URLs */
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}