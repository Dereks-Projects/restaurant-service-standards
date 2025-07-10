// 📄 FILE: src/pages/ResourcesTrainingPage.jsx

import "../styles/OverviewPage.css";

function ResourcesTrainingPage() {
  return (
    <div className="intro-page-container">
      <div className="intro-article">
        {/* Page Title */}
        <h2 className="overview-page-title">Training</h2>
        <hr className="overview-title-divider" />

        {/* Intro Paragraph */}
        <p className="overview-intro-paragraph">
          These training and development topics are designed to elevate your team’s skills and professionalism, preparing them to deliver exceptional guest service and support your operational goals.
        </p>

        {/* Section 1 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Guest Interaction Standards</h3>
          <p className="intro-section-text">
            This guide covers the core principles of greeting guests, anticipating needs, and maintaining a gracious demeanor at all times.
          </p>
          <a href="/training/guest-interaction.pdf" target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>

        {/* Section 2 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Table Service Procedures</h3>
          <p className="intro-section-text">
            A comprehensive reference for table service sequence, clearing, resetting, and key etiquette.
          </p>
          <a href="/training/table-service.pdf" target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>

        {/* Section 3 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Beverage Service Essentials</h3>
          <p className="intro-section-text">
            Guidelines for properly serving wine, cocktails, and non-alcoholic beverages to the highest standards.
          </p>
          <a href="/training/beverage-service.pdf" target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>

        {/* Section 4 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Manager Pre-Shift Checklist</h3>
          <p className="intro-section-text">
            A practical checklist for managers to prepare staff and operations before service begins.
          </p>
          <a href="/training/manager-checklist.pdf" target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>

        {/* Back Button */}
        <button className="intro-back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ResourcesTrainingPage;
