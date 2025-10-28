// 📄 src/pages/SectionPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import standards from "../data/standards.json";
import "../styles/SectionPage.css";
import { useState } from "react";
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from "../components/MobileNav";
import DesktopFooter from "../components/DesktopFooter";
import SEO from "../components/SEO"; 

function SectionPage() {
  const { sectionName } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const sectionDescriptions = {
    "Reservation System": "This section focuses on the importance of efficient and courteous reservation handling.",
    "Arrival & Departure": "Host service ensures a warm welcome, smooth guest flow, and first impressions that align with luxury standards.",
    "Dinner Service": "Dinner service is the heart of the guest experience, blending technical execution with personal attention.",
    "Food & Beverage Quality": "Maintaining consistent, high-quality food and beverage offerings is essential to guest satisfaction.",
    "Presentation of Facilities": "Cleanliness, ambiance, and upkeep of the space contribute to a sense of luxury."
  };

  const sectionVideos = {
    "Reservation System": "https://player.vimeo.com/video/1095436506",
    "Arrival & Departure": "https://player.vimeo.com/video/1095611875",
    "Dinner Service": "https://player.vimeo.com/video/1095929797",
    "Food & Beverage Quality": "https://player.vimeo.com/video/1095944276",
    "Presentation of Facilities": "https://player.vimeo.com/video/1095958712"
  };

  const sectionStandards = standards.filter(
    (item) => item.section === sectionName
  );

  const groupedStandards = {};
  sectionStandards.forEach((item) => {
    if (!groupedStandards[item.classification]) {
      groupedStandards[item.classification] = [];
    }
    groupedStandards[item.classification].push(item);
  });

  const classifications = Object.keys(groupedStandards);

  const toggleAccordion = (classification) =>
    setActiveIndex((prev) => (prev === classification ? null : classification));

  const getSectionId = (name) => name.toLowerCase().split(" ")[0];

  return (
    <>
      <SEO 
        title={`${sectionName} Training - Restaurant Standards`}
        description={`${sectionDescriptions[sectionName] || `Professional training for ${sectionName}`} Master luxury hospitality service standards.`}
        keywords={`${sectionName} training, restaurant service standards, hospitality training, fine dining ${sectionName.toLowerCase()}`}
        canonicalUrl={`https://www.restaurantstandards.com/section/${encodeURIComponent(sectionName)}`}
      />
      
      <div className="section-page">
      {/* 🔹 Corrected: subtitle pulled from sectionDescriptions */}
      <UnifiedHeader 
        variant="internal"
        hideOnDesktop={false}  // ← Or omit entirely (defaults to false)
      />

      <div className="section-content-wrapper">
        <h2 className="section-title">{sectionName}</h2>

        {/* Wrap video and buttons in a container for desktop layout */}
        <div className="section-main-content">
          {/* 🎥 Section-specific video embed */}
          <div className="section-video-wrapper">
            <iframe
              src={sectionVideos[sectionName] || "https://player.vimeo.com/video/1095248867"}
              width="100%"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title={`Video for ${sectionName}`}
            />
          </div>

          {/* 🔹 Button stack */}
          <div className="button-group">
            <div className="accordion-item">
              <button
                className="accordion-button"
                onClick={() => navigate(`/overview/${getSectionId(sectionName)}`)}
              >
                Overview
              </button>
            </div>

            {classifications.map((classification) => (
              <div key={classification} className="accordion-item">
                <button
                  className={`accordion-button ${activeIndex === classification ? "active" : ""}`}
                  onClick={() => toggleAccordion(classification)}
                >
                  {classification}
                </button>
                {activeIndex === classification && (
                  <div className="accordion-content">
                    {groupedStandards[classification].map((item, index) => (
                      <div key={index} style={{ marginBottom: "1rem", textAlign: "left" }}>
                        <p><strong>{item.standard}</strong></p>
                        <p style={{ fontStyle: "italic", marginTop: "-0.5rem" }}>
                          Training Tip: {item.trainingTip}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Back button */}
        <button 
          className="section-back-button" 
          onClick={() => navigate('/training')}
        >
          ← Back to Training
        </button>
      </div>

      {/* 🔹 Desktop-only footer */}
      <DesktopFooter />

      {/* 🔹 Fixed MobileNav */}
      <MobileNav />
    </div>
    </>
  );
}

export default SectionPage;