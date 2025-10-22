// 📄 FILE: src/pages/ResourcesTrainingPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import "../styles/OverviewPage.css";

function ResourcesTrainingPage() {
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
    <div className="overview-page">
      <Header subtitle="Training Resources" />
      
      <main className="overview-page__content">
        <div className="overview-page__title">Staff Development</div>
        <div className="overview-page__divider"></div>

        <p className="overview-page__intro">
          These training and development topics are designed to elevate your team's skills and professionalism, preparing them to deliver exceptional guest service and support your operational goals.
        </p>

        {/* Section 1 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Guest Interaction Standards</div>
          <p className="overview-page__section-text">
            This guide covers the core principles of greeting guests, anticipating needs, and maintaining a gracious demeanor at all times.
          </p>
          <a href="/training/guest-interactions.pdf" target="_blank" rel="noopener noreferrer">
            Download Study Guide
          </a>
        </div>

        {/* Section 2 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Table Service Procedures</div>
          <p className="overview-page__section-text">
            A comprehensive reference for table service sequence, clearing, resetting, and key etiquette.
          </p>
          <a href="/training/table-service.pdf" target="_blank" rel="noopener noreferrer">
            Download Study Guide
          </a>
        </div>

        {/* Section 3 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Beverage Service Essentials</div>
          <p className="overview-page__section-text">
            Guidelines for properly serving wine, cocktails, and non-alcoholic beverages to the highest standards.
          </p>
          <a href="/training/beverage-service.pdf" target="_blank" rel="noopener noreferrer">
            Download Study Guide
          </a>
        </div>

        {/* Section 4 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Manager Pre-Shift Checklist</div>
          <p className="overview-page__section-text">
            A practical checklist for managers to prepare staff and operations before service begins.
          </p>
          <a href="/training/manager-checklist.pdf" target="_blank" rel="noopener noreferrer">
            Download Manager Checklist
          </a>
        </div>

        {/* Section 5 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">Introduction to Wine</div>
          <p className="overview-page__section-text">
            A deep dive into the world of wine for the hospitality professional. This is a comprehensive look at wine regions, varietals, key producers, and service standards.
          </p>
          <a href="/training/intro-wine.pdf" target="_blank" rel="noopener noreferrer">
            Download Booklet
          </a>
        </div>

        {/* Section 6 */}
        <div className="overview-page__section">
          <div className="overview-page__section-title">More Educational Material</div>
          <p className="overview-page__section-text">
            Here is a collection of articles and educational pieces pertaining to the restaurant and hotel awards systems that are popular in today's hospitality industry.
          </p>
          <a href="/training/michelin-guide.pdf" target="_blank" rel="noopener noreferrer">
            The Michelin Guide
          </a><br/>
          <a href="/training/forbes-guide.pdf" target="_blank" rel="noopener noreferrer">
            Forbes Restaurant Ratings
          </a>
        </div>

        <button className="overview-page__back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </main>

      {isMobile ? <MobileNav /> : <DesktopFooter />}
    </div>
  );
}

export default ResourcesTrainingPage;