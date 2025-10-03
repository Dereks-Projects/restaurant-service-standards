// 📄 FILE: src/pages/IntroductionPage.jsx
// PURPOSE: Introduction article with integrated header and footer navigation
// Mobile-first design with responsive navigation components

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import introductionContent from '../data/introductionContent.json';
import '../styles/IntroductionPage.css';

function IntroductionPage() {
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

  return (
    <div className="intro-page">
      {/* Header - appears on both mobile and desktop */}
      <Header subtitle="Introduction to Restaurant Standards" />

      {/* Main content area */}
      <main className="intro-page__content">
        {/* Page Title - using div instead of h1 */}
        <div className="intro-page__title">Welcome to Restaurant Standards</div>

        {/* Vimeo Video Embed */}
        <div className="intro-page__video-wrapper">
          <iframe
            src="https://player.vimeo.com/video/1096307775"
            width="100%"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Intro Video"
          />
        </div>

        {/* Content Sections from JSON */}
        {introductionContent.map((section, index) => (
          <div key={index} className="intro-page__section">
            {/* Only render heading if title exists - using div instead of h2 */}
            {section.title && (
              <div className="intro-page__section-title">{section.title}</div>
            )}
            <p className="intro-page__section-text">{section.text}</p>
          </div>
        ))}

        {/* Back to Training Button */}
        <button 
          className="intro-page__back-button" 
          onClick={() => navigate('/training')}
        >
          Back to Training
        </button>
      </main>

      {/* Footer - conditional rendering based on screen size */}
      {isMobile ? (
        <MobileNav />
      ) : (
        <DesktopFooter />
      )}
    </div>
  );
}

export default IntroductionPage;