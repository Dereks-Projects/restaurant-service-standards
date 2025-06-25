// 📄 FILE: src/pages/OverviewPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sectionData from '../data/sectionOverviews.json';
import '../styles/OverviewPage.css';

function OverviewPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  // ✅ Map sectionId from URL to the proper Topic name in JSON
  const sectionMap = {
    reservation: "Reservation System",
    arrival: "Arrival & Departure",
    dinner: "Dinner Service",
    food: "Food & Beverage Quality",
    presentation: "Presentation of Facilities"
  };

  const fullTopic = sectionMap[sectionId];
  const filteredChecklist = sectionData.filter(item => item.Topic === fullTopic);

  return (
    <div className="intro-page-container">
      <div className="intro-article">

        {/* ✅ MAIN PAGE TITLE — styled like IntroductionPage */}
        <h2 className="overview-page-title">
            {fullTopic}
        </h2>


        {/* ✅ Checklist Items */}
        {filteredChecklist.map((entry, index) => (
          <div key={index} className="intro-section">
            <h3 className="intro-section-title">{entry.Item}</h3>
            <p className="intro-section-text">{entry.Standard}</p>
          </div>
        ))}

        <button className="intro-back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}

export default OverviewPage;
