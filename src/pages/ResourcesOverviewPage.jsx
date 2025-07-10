// 📄 FILE: src/pages/ResourcesOverviewPage.jsx

import "../styles/OverviewPage.css";

function ResourcesOverviewPage() {
  return (
    <div className="intro-page-container">
      <div className="intro-article">
        <h2 className="overview-page-title">Resources</h2>
        <hr className="overview-title-divider" />
        <p className="overview-intro-paragraph">
          The Resources section provides a roadmap for building a culture of excellence within your team. By leveraging the materials here, your restaurant can develop a structured training and development program that improves execution, consistency, and guest satisfaction while preparing for awards, accolades, and long-term success.
        </p>

        {/* Section 1 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Use Case: Why Deploy Training and Development</h3>
          <p className="intro-section-text">
            A formal training and development program ensures every team member understands expectations and can deliver consistent service regardless of tenure or experience. This structured approach reduces variability and improves both employee confidence and guest satisfaction.
          </p>
        </div>

        {/* Section 2 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Restaurant Ratings and Shopper Reports</h3>
          <p className="intro-section-text">
            Restaurant ratings organizations and mystery shopper programs evaluate all aspects of the guest experience. A dedicated training and development program ensures that your staff understands and delivers upon the precise behaviors and standards that lead to higher scores and greater recognition.
          </p>
        </div>

        {/* Section 3 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Driving Revenue through Education</h3>
          <p className="intro-section-text">
            Training and development directly impact the bottom line. Staff who are confident and knowledgeable increase upsell opportunities, drive repeat visits, and ensure that each guest leaves with a positive impression that leads to long-term loyalty.
          </p>
        </div>

        {/* Section 4 */}
        <div className="intro-section">
          <h3 className="intro-section-title">Management Focus on Training</h3>
          <p className="intro-section-text">
            Managers benefit from having a formal roadmap for education and training. This improves leadership consistency, provides clear expectations, and ensures that your management team is aligned around goals related to guest service, staff development, and operational excellence.
          </p>
        </div>

        <button className="intro-back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ResourcesOverviewPage;
