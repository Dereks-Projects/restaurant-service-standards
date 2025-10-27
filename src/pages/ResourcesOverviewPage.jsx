// 📄 FILE: src/pages/ResourcesOverviewPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import "../styles/OverviewPage.css";

function ResourcesOverviewPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <SEO 
        title="Training Resources - Restaurant Standards Platform"
        description="Comprehensive training resources for restaurant excellence. Build a culture of service quality, boost revenue through education, and prepare for Michelin and Forbes recognition."
        keywords="restaurant training resources, hospitality development, service training materials, restaurant education program"
        canonicalUrl="https://www.restaurantstandards.com/resources/overview"
      />
      
      <div className="overview-page">
      <Header subtitle="Resources" />
      
      <main className="overview-page__content">
        <div className="overview-page__title">Resources</div>
        <div className="overview-page__divider"></div>
        <p className="overview-page__intro">
          The Resources section provides a roadmap for building a culture of excellence within your team. By leveraging the materials here, your restaurant can develop a structured training and development program that improves execution, consistency, and guest satisfaction while preparing for awards, accolades, and long-term success. Be sure to visit the Training tab, as it contains essential materials that complement the resources provided here.
        </p>

        {/* Section 1 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Use Case: Why Deploy Training and Development</div>
          <p className="overview-page__section-text">
            A formal training and development program ensures every team member understands expectations and can deliver consistent service regardless of tenure or experience. This structured approach reduces variability and improves both employee confidence and guest satisfaction.
          </p>
        </div>

        {/* Section 2 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Restaurant Ratings and Shopper Reports</div>
          <p className="overview-page__section-text">
            Restaurant ratings organizations and mystery shopper programs evaluate all aspects of the guest experience. A dedicated training and development program ensures that your staff understands and delivers upon the precise behaviors and standards that lead to higher scores and greater recognition.
          </p>
        </div>

        {/* Section 3 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Driving Revenue through Education</div>
          <p className="overview-page__section-text">
            Training and development directly impact the bottom line. Staff who are confident and knowledgeable increase upsell opportunities, drive repeat visits, and ensure that each guest leaves with a positive impression that leads to long-term loyalty.
          </p>
        </div>

        {/* Section 4 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Management Focus on Training</div>
          <p className="overview-page__section-text">
            Managers benefit from having a formal roadmap for education and training. This improves leadership consistency, provides clear expectations, and ensures that your management team is aligned around goals related to guest service, staff development, and operational excellence.
          </p>
        </div>

        <button className="overview-page__back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </main>

      {isMobile ? <MobileNav /> : <DesktopFooter />}
    </div>
    </>
  );
}

export default ResourcesOverviewPage;