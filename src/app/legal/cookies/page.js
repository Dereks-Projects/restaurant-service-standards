import styles from "../legal.module.css";

export const metadata = {
  title: "Cookie Policy | Restaurant Standards",
};

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Cookie Policy</h1>
      <p className={styles.updated}>Last updated: February 2026</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Are Cookies</h2>
        <p className={styles.paragraph}>
          Cookies are small text files that websites place on your device to store small amounts of information. They are widely used to make websites function efficiently and to provide basic analytics information to site owners.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How We Use Cookies</h2>
        <p className={styles.paragraph}>
          Restaurant Standards uses a minimal cookie footprint. We do not use cookies for advertising, remarketing, personalization, or user tracking across sites. The only cookies present on this Site are those set by Google Analytics for the purpose of understanding anonymous, aggregated traffic patterns.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cookies on This Site</h2>
        <p className={styles.paragraph}>
          Google Analytics cookies (_ga, _gid, _gat) are used to distinguish unique visitors and throttle request rates. These cookies collect anonymous data only, including pages visited, session duration, general geographic region, and device type. No personally identifiable information is collected, stored, or processed through these cookies.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What We Do Not Do</h2>
        <p className={styles.paragraph}>
          We do not use cookies to collect personal data. We do not use cookies for targeted advertising. We do not share cookie data with third parties for marketing purposes. We do not use cookies to track you across other websites. We do not use session replay, heatmap, or behavioral profiling tools.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Managing Cookies</h2>
        <p className={styles.paragraph}>
          You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that disabling cookies does not affect the functionality of this Site since it does not require cookies to operate. You may also install the Google Analytics Opt-out Browser Add-on to prevent Google Analytics from collecting data during your visits.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Consent</h2>
        <p className={styles.paragraph}>
          Because this Site uses only anonymous analytics cookies that do not process personal data, and because the Site functions fully without cookies enabled, continued use of the Site constitutes your acknowledgment of this Cookie Policy. No separate consent mechanism is required for cookies that are strictly limited to anonymous aggregate analytics.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
        <p className={styles.paragraph}>
          If our use of cookies changes in the future, we will update this page and implement any additional consent mechanisms that may be required. We are committed to maintaining a minimal and transparent approach to cookies.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p className={styles.paragraph}>
          If you have questions about this Cookie Policy, you may contact us through{" "}
          <a href="https://informativemedia.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Informative Media
          </a>.
        </p>
      </section>
    </div>
  );
}