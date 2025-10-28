// 📄 src/pages/TermsPage.jsx
import React from 'react';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO'; 
import '../styles/SectionPage.css';
import '../styles/AboutPage.css';

function TermsPage() {
  return (
    <>
      <SEO 
        title="Terms of Use - Restaurant Standards"
        description="Terms and conditions for Restaurant Standards training platform. Review usage policies and legal terms for accessing hospitality training materials."
        keywords="terms of use, terms and conditions, restaurant standards terms, legal terms"
        canonicalUrl="https://www.restaurantstandards.com/terms"
      />
      
      <div className="section-page">
      <UnifiedHeader 
        variant="internal"
        hideOnDesktop={false}  // ← Or omit entirely (defaults to false)
      />
      <div className="section-content-wrapper about-content-wrapper">
        <h2 className="section-title">Terms of Use</h2>
        <p className="about-paragraph">
          The RSS App is provided as-is for informational and training purposes only.
          No warranties or guarantees are expressed or implied.
        </p>
        <p className="about-paragraph">
          By using this app, you agree to use it responsibly and acknowledge that the
          developer is not liable for any outcomes related to its usage.
        </p>
      </div>
      <DesktopFooter />
      <MobileNav />
    </div>
    </>
  );
}

export default TermsPage;
