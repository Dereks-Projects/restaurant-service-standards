// 📄 src/pages/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import '../styles/AboutPage.css';

function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us - Luxury Hospitality Training Platform"
        description="Restaurant Standards training platform for Michelin, AAA and Forbes-level service excellence."
        keywords="hospitality training expert, luxury restaurant consultant, Michelin service training, Forbes standards expert, Derek Engles"
        canonicalUrl="https://www.restaurantstandards.com/about"
      />
      
      <div className="about-page">
      <UnifiedHeader 
      variant="internal"
      hideOnDesktop={false}  // ← Or omit entirely (defaults to false)
    />

      <div className="about-hero">
        <h1>About Restaurant Standards</h1>
        <p className="hero-subtitle">The Essential Training Platform for Award-Winning Service</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Elevate Your Service Excellence</h2>
          <p>
            Restaurant Standards is the premier digital training platform for restaurants and hotels 
            pursuing the highest levels of service excellence. Our comprehensive program is designed 
            for establishments seeking prestigious industry recognition, including Forbes Travel Guide 
            ratings, Michelin stars, and placement on World's 50 Best and La Liste rankings.
          </p>
          <p>
            We've analyzed the standards of the world's most acclaimed hospitality establishments 
            and distilled their best practices into an actionable, comprehensive training system 
            that transforms service teams into industry leaders.
          </p>
        </section>

        <section className="about-section disclaimer-section">
          <p className="disclaimer">
            <strong>Note:</strong> Restaurant Standards is an independent training platform. We are not 
            affiliated with Forbes Travel Guide, Michelin Guide, World's 50 Best Restaurants, or La Liste. 
            We have studied these prestigious rating systems extensively and incorporated industry best 
            practices into our comprehensive training and development program.
          </p>
        </section>

        <section className="about-section">
          <h2>The Book Behind the Platform</h2>
          <div className="book-info">
            <h3>Restaurant Standards: A Framework for Excellence in Hospitality Service</h3>
            <p>
              The foundational principles of our platform are detailed in the comprehensive guide 
              available on Amazon Kindle. This book provides the theoretical framework and practical 
              strategies that power our digital training system.
            </p>
            <a 
              href="https://www.amazon.com/dp/B0FNDMTK5F" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button book-link"
            >
              View on Amazon
            </a>
          </div>
        </section>

        <section className="about-section">
          <h2>About the Creator</h2>
          <p>
            Derek Engles brings decades of experience in luxury hospitality and restaurant operations 
            to the Restaurant Standards platform. His expertise in developing and implementing service 
            excellence programs has helped numerous establishments achieve and maintain prestigious 
            industry accolades.
          </p>
          <a 
            href="https://derekengles.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button creator-link"
          >
            Visit derekengles.com
          </a>
        </section>

        <section className="about-section features-section">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Comprehensive Standards</h3>
              <p>200+ detailed service standards covering every guest touchpoint</p>
            </div>
            <div className="feature-card">
              <h3>Interactive Training</h3>
              <p>Engaging modules with real-world scenarios and best practices</p>
            </div>
            <div className="feature-card">
              <h3>Custom Training</h3>
              <p>Organizational specific modules and SOP documents</p>
            </div>
            <div className="feature-card">
              <h3>Mobile Optimized</h3>
              <p>Access training materials anywhere, anytime, on any device</p>
            </div>
          </div>
        </section>

        <footer className="about-footer">
            <div className="footer-links">
              <Link to="/cookies" className="footer-link">Cookies Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms" className="footer-link">Terms of Use</Link>
              <span className="separator">•</span>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
            <div className="footer-meta">
              <p>Version 1.2.0 • Language: English</p>
            </div>
          </footer>
      </div>

      <DesktopFooter />
      <MobileNav />
    </div>
    </>
  );
}

export default AboutPage;