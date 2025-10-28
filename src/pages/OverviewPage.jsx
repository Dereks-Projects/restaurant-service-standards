// 📄 FILE: src/pages/OverviewPage.jsx
// PURPOSE: Overview pages for each training section with integrated navigation
// Mobile-first design with responsive navigation components

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import sectionData from '../data/sectionOverviews.json';
import introText from '../data/sectionOverviewsIntro.json';
import '../styles/OverviewPage.css';

function OverviewPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // Listen for window resize to toggle between mobile/desktop footer
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map sectionId from URL to the proper Topic name in JSON
  const sectionMap = {
    'reservation-system': "Reservation System",
    'arrival-departure': "Arrival & Departure", 
    'dinner-service': "Dinner Service",
    'fb-quality': "Food & Beverage Quality",
    'facilities': "Presentation of Facilities",
    // Legacy mappings if needed
    'reservation': "Reservation System",
    'arrival': "Arrival & Departure",
    'dinner': "Dinner Service",
    'food': "Food & Beverage Quality",
    'presentation': "Presentation of Facilities"
  };

  const fullTopic = sectionMap[sectionId];
  const filteredChecklist = sectionData.filter(item => item.Topic === fullTopic);

  // Get the intro text using the simplified key
  const simpleKey = sectionId.replace('-system', '')
                              .replace('-departure', '')
                              .replace('-service', '')
                              .replace('-quality', '')
                              .replace('fb', 'food');
  
  const introContent = introText[simpleKey] || introText[sectionId] || '';

  return (
    <>
      <SEO 
        title={`${fullTopic} Overview - Restaurant Standards Training`}
        description={`Comprehensive ${fullTopic} training standards for luxury restaurants. Master professional service excellence and hospitality best practices.`}
        keywords={`${fullTopic} training, restaurant service standards, ${sectionId} hospitality training`}
        canonicalUrl={`https://www.restaurantstandards.com/overview/${sectionId}`}
      />
      
      <div className="overview-page">
     <UnifiedHeader 
        variant="internal"
        hideOnDesktop={false}  // ← Or omit entirely (defaults to false)
      />

      {/* Main content area */}
      <main className="overview-page__content">
        {/* Page Title - using div instead of h2 */}
        <div className="overview-page__title">
          {fullTopic}
        </div>

        {/* Divider line */}
        <div className="overview-page__divider"></div>
        
        {/* Intro paragraph from sectionOverviewsIntro.json */}
        {introContent && (
          <p className="overview-page__intro">
            {introContent}
          </p>
        )}

        {/* Checklist Items */}
        {filteredChecklist.map((entry, index) => (
          <div key={index} className="overview-page__section">
            {/* Using div instead of h3 */}
            <div className="overview-page__section-title">
              {entry.Item}
            </div>
            <p className="overview-page__section-text">
              {entry.Standard}
            </p>
          </div>
        ))}

        {/* Back Button */}
        <button 
          className="overview-page__back-button" 
           onClick={() => navigate(-1)}
          >
          Back
        </button>
      </main>

      {/* Footer - conditional rendering based on screen size */}
      {isMobile ? (
        <MobileNav />
      ) : (
        <DesktopFooter />
      )}
    </div>
    </>
  );
}

export default OverviewPage;