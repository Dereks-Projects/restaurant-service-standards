// 📄 FILE: src/pages/IntroductionPage.jsx
// 🧠 PURPOSE: Displays the Introduction Article with 6 explanatory sections about service standards

import React from 'react';
import { useNavigate } from 'react-router-dom';
import introductionContent from '../data/introductionContent.json'; // ✅ Importing content JSON
import '../styles/IntroductionPage.css'; // ✅ Import associated CSS

function IntroductionPage() {
  const navigate = useNavigate(); // 🧭 Used for back navigation

  return (
    <div className="intro-page-container">
      <div className="intro-article">

        {/* 🏷️ Page Title */}
        <h1 className="intro-page-title">Welcome to RSS</h1>

        {/* 🎥 Embedded Vimeo Video */}
        <div className="intro-video-wrapper">
          <iframe
            src="https://player.vimeo.com/video/1096307775"
            width="100%"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Intro Video"
          />
        </div>
       

        {/* 📌 Loop through JSON sections */}
        {introductionContent.map((section, index) => (
          <div key={index} className="intro-section">
            {/* ✅ Only render heading if there's a title */}
            {section.title && <h2 className="intro-section-title">{section.title}</h2>}
            <p className="intro-section-text">{section.text}</p>
          </div>
        ))}

        {/* 🔙 Back button to return to homepage */}
        <button className="intro-back-button" onClick={() => navigate('/training')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default IntroductionPage;
