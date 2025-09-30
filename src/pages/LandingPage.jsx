import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <img src="/rss-logo-new.svg" alt="Restaurant Standards" className="logo" />
          <h1>Unlock your Restaurant's Potential with the Highest</h1>
          <h1 className="hero-title-emphasis">Restaurant Standards</h1>
          
          <div className="cta-buttons">
            <Link to="/training" className="btn btn-primary">Enter the Site</Link>
            <Link to="/about" className="btn btn-secondary">More About Us</Link>
          </div>
          
          <p className="tagline">Training that helps your team outshine your competitive set.</p>
        </div>
        
        <div className="device-mockup">
          <img src="/app-devices-mockup.png" alt="Restaurant Standards App" />
        </div>
      </div>
      
      {/* Awards Section */}
      <div className="awards-section">
        <img src="/awards-logos.png" alt="Forbes, Michelin, 50 Best, LA Liste" />
      </div>
    </div>
  );
}

export default LandingPage;