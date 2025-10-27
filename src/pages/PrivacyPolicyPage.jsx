// 📄 src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import '../styles/SectionPage.css';
import '../styles/AboutPage.css';

function PrivacyPolicyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - Restaurant Standards"
        description="Privacy policy for Restaurant Standards training platform. Learn how we protect your data and respect your privacy."
        keywords="privacy policy, data protection, restaurant standards privacy"
        canonicalUrl="https://www.restaurantstandards.com/privacy"
      />
      
      <div className="section-page">
      <Header
        title="RSS"
        subtitle="Protecting your privacy and data."
      />
      <div className="section-content-wrapper about-content-wrapper">
        <h2 className="section-title">Privacy Policy</h2>
        <p className="about-paragraph">
          We respect your privacy. The RSS App does not collect or store personal information.
          Any data used is strictly local to your device and not shared externally.
        </p>
        <p className="about-paragraph">
          By using this app, you acknowledge that your usage data is not transmitted to any servers.
        </p>
      </div>
      <DesktopFooter />
      <MobileNav />
    </div>
    </>
  );
}

export default PrivacyPolicyPage;
