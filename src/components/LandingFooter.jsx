// 📄 src/components/LandingFooter.jsx
// Purpose: A minimal footer specifically for the landing page
// This won't affect other pages which use DesktopFooter.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingFooter.css';

function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__container">
        {/* Navigation links - will stack on mobile, inline on desktop */}
        <nav className="landing-footer__nav">
          <Link to="/about" className="landing-footer__link">About Us</Link>
          <span className="landing-footer__separator">|</span>
          <Link to="/privacy" className="landing-footer__link">Privacy Policy</Link>
          <span className="landing-footer__separator">|</span>
          <Link to="/terms" className="landing-footer__link">Terms of Use</Link>
          <span className="landing-footer__separator">|</span>
          <a href="mailto:contact@restaurantstandards.com" className="landing-footer__link">Contact</a>
        </nav>
        
        {/* Copyright notice */}
        <p className="landing-footer__copyright">
          Copyright ©2024 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default LandingFooter;