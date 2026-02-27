/**
 * learn-more/page.js — From the Network (Editorial Page)
 *
 * Fetches the 3 latest articles from each ecosystem site
 * directly from Sanity. Always fresh, no JSON to maintain.
 */

import { client, urlFor } from "@/lib/sanity";
import styles from "./page.module.css";

/* Configuration for each site section */
const sites = [
  {
    name: "Hospitality.fyi",
    value: "hospitality",
    url: "https://hospitality.fyi",
    pitch: "Industry insights, leadership, and operational strategy for hospitality professionals.",
    category: null,
  },
  {
    name: "Backbar.fyi",
    value: "backbar",
    url: "https://backbar.fyi",
    pitch: "Spirits education, cocktail craft, and bar program development.",
    category: null,
  },
  {
    name: "Somm.Site",
    value: "somm",
    url: "https://somm.site",
    pitch: "Wine education, tasting methodology, and sommelier-level knowledge.",
    category: "wine",
  },
];

/*
 * Fetch the 3 latest articles for a given site.
 * If a category is specified, only pull articles matching that category.
 */
async function getArticlesForSite(siteValue, category) {
  const categoryFilter = category ? ` && category == "${category}"` : "";
  const query = `*[_type == "article" && "${siteValue}" in sites${categoryFilter}] | order(publishedAt desc) [0...3] {
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    mainImage
  }`;

  return client.fetch(query);
}

/* Format a date string into something readable */
function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function LearnMorePage() {
  /* Fetch articles for all 3 sites in parallel */
  const results = await Promise.allSettled(
    sites.map((site) => getArticlesForSite(site.value, site.category))
  );

  /* Pair each site config with its fetched articles */
  const sections = sites.map((site, i) => ({
    ...site,
    articles: results[i].status === "fulfilled" ? results[i].value : [],
  }));

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>From the Network</h1>
      <p className={styles.pageSubtitle}>
        Curated articles from the Informative Media ecosystem. Always current, always relevant.
      </p>

      {sections.map((section) => (
        <div key={section.value} className={styles.siteSection}>
          {/* Site header with name and visit link */}
          <div className={styles.siteHeader}>
            <h2 className={styles.siteName}>{section.name}</h2>
            <a
              href={section.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.siteLink}
            >
              Visit {section.name}
            </a>
          </div>
          <p className={styles.sitePitch}>{section.pitch}</p>

          {/* Article cards */}
          {section.articles.length > 0 ? (
            <div className={styles.articles}>
              {section.articles.map((article) => (
                <a
                  key={article.slug}
                  href={`${section.url}/articles/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.articleCard}
                >
                  {article.mainImage && (
                    <img
                      src={urlFor(article.mainImage).width(400).height(300).url()}
                      alt={article.mainImage.alt || article.title}
                      className={styles.articleImage}
                    />
                  )}
                  <div className={styles.articleContent}>
                    <span className={styles.articleTitle}>{article.title}</span>
                    {article.subtitle && (
                      <span className={styles.articleSubtitle}>
                        {article.subtitle}
                      </span>
                    )}
                    <span className={styles.articleDate}>
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className={styles.error}>No articles found for {section.name}.</p>
          )}
        </div>
      ))}
    </div>
  );
}