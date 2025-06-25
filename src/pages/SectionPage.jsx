// 📄 FILE: src/pages/SectionPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import standards from "../data/standards.json";
import "../styles/SectionPage.css";
import { useState } from "react";

function SectionPage() {
  const { sectionName } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const sectionDescriptions = {
    "Reservation System": "This section focuses on the importance of efficient and courteous reservation handling. Below you will find a pertinent video followed by the  industry standards for exemplary guest service.",
    "Arrival & Departure": "Host service ensures a warm welcome, smooth guest flow, and first impressions that align with luxury standards. Below you will find a pertinent video followed by the  industry standards for exemplary guest service.",
    "Dinner Service": "Dinner service is the heart of the guest experience, blending technical execution with personal attention. Below you will find a pertinent video followed by the  industry standards for exemplary guest service.",
    "Food & Beverage Quality": "Maintaining consistent, high-quality food and beverage offerings is essential to guest satisfaction. Below you will find a pertinent video followed by the  industry standards for exemplary guest service.",
    "Presentation of Facilities": "Cleanliness, ambiance, and upkeep of the space contribute to a sense of luxury. Below you will find a pertinent video followed by the  industry standards for exemplary guest service."
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

  // ✅ Convert section name to sectionId slug for URL (e.g. "Reservation System" → "reservation")
  const getSectionId = (name) => name.toLowerCase().split(" ")[0];

  return (
    <div className="section-page">
      <div className="section-content-wrapper">
        <h2>{sectionName}</h2>
        <p className="section-description">
          {sectionDescriptions[sectionName] ||
            `This section outlines the best practices for ${sectionName.toLowerCase()}.`}
        </p>

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

        {/* 🆕 Overview Button wrapped to match layout */}
        <div className="button-group">
          <div className="accordion-item">
            <button
              className="accordion-button"
              onClick={() => navigate(`/overview/${getSectionId(sectionName)}`)}
            >
              Overview
            </button>
          </div>

          {/* Classification Buttons */}
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

      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      {/* ✅ Footer */}
      <div className="home-footer">
        <p>
          Presented by{" "}
          <a
            href="https://www.derekengles.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            Derek Engles
          </a>
          <br />
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default SectionPage;
