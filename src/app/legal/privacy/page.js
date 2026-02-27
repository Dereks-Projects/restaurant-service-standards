import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy | Restaurant Standards",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: February 2026</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          Restaurant Standards ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you visit restaurantstandards.com (the "Site"). We believe in transparency and simplicity. We collect minimal data, and we do not sell, trade, or rent personal information to third parties.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Information We Collect</h2>
        <p className={styles.paragraph}>
          We do not require user accounts, registrations, or logins to access this Site. We do not collect personally identifiable information such as names, email addresses, or payment details. The Site uses Google Analytics to collect anonymous usage data including pages visited, time spent on pages, general geographic region, device type, and browser type. This data is aggregated and cannot be used to identify individual visitors.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How We Use Information</h2>
        <p className={styles.paragraph}>
          Anonymous analytics data is used solely to understand how visitors interact with the Site so we can improve content, navigation, and performance. We do not use this data for advertising, remarketing, or any form of targeted outreach.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Third-Party Services</h2>
        <p className={styles.paragraph}>
          The Site uses Google Analytics, a web analytics service provided by Google LLC. Google Analytics uses cookies to collect anonymous traffic data. You can learn more about how Google processes data by visiting Google's Privacy Policy. We do not use any other third-party tracking, advertising, or data collection services.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data Retention</h2>
        <p className={styles.paragraph}>
          Anonymous analytics data is retained according to Google Analytics' default retention settings. We do not maintain any separate database of visitor information.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Rights</h2>
        <p className={styles.paragraph}>
          Because we do not collect personal information, there is no personal data to access, correct, or delete. You may opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on or by adjusting your browser's cookie settings.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
        <p className={styles.paragraph}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the Site following any changes constitutes acceptance of the revised policy.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p className={styles.paragraph}>
          If you have questions about this Privacy Policy, you may contact us through{" "}
          <a href="https://informativemedia.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Informative Media
          </a>.
        </p>
      </section>
    </div>
  );
}