// 📄 src/pages/AboutPage.jsx

import React from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import '../styles/SectionPage.css';  // ✅ use existing consistent layout
import '../styles/AboutPage.css';


function AboutPage() {
  return (
    <div className="section-page">
      {/* 🔹 Consistent header */}
      <Header
        title="RSS"
        subtitle="Elevating hospitality training, anywhere."
      />

      <div className="section-content-wrapper about-content-wrapper">
        <h2 className="section-title">About RSS</h2>

        <p className="about-paragraph">
          Restaurant Service Standards is the number one tool for training and maintaining exceptional
          hospitality service standards. Built for restaurant and hotel teams looking to
          achieve award-winning guest service.
        </p>

        <p className="about-metadata">
            <a href="/privacy" className="about-link">Privacy Policy</a> &nbsp;&nbsp;
            <a href="/terms" className="about-link">Terms of Use</a><br />
            Version: 1.0.0<br />
            Language: English<br />
            © {new Date().getFullYear()} Derek Engles. All rights reserved.
        </p>

      </div>

      <DesktopFooter />
      <MobileNav />
    </div>
  );
}

export default AboutPage;
