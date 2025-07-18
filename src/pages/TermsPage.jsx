// 📄 src/pages/TermsPage.jsx
import React from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import '../styles/SectionPage.css';
import '../styles/AboutPage.css';

function TermsPage() {
  return (
    <div className="section-page">
      <Header
        title="RSS"
        subtitle="Terms of use and conditions."
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
  );
}

export default TermsPage;
