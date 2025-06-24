import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data/standards.json';
import Accordion from '../components/Accordion';
import SectionButton from '../components/SectionButton';

function ClassificationPage() {
  const { sectionName, classificationName } = useParams();
  const decodedSection = decodeURIComponent(sectionName);
  const decodedClassification = decodeURIComponent(classificationName);
  const navigate = useNavigate();

  // ✅ Section-based custom descriptions
  const descriptions = {
    "Reservation Service": "This section covers standards related to handling reservations efficiently, courteously, and with attention to guest preferences.",
    "Host Service": "Host Service focuses on first impressions, guest greetings, and how to manage arrivals with professionalism and warmth.",
    "Dinner Service": "Dinner Service outlines the execution of meal service, from pacing to clearing, and the high-touch expectations of fine dining.",
    "Food & Beverage Quality": "This section ensures all food and beverages meet quality standards, including presentation, temperature, and freshness.",
    "Presentation of Facilities": "Covers the visual and cleanliness standards for the restaurant’s interior, restrooms, and dining setup."
  };

  const defaultDescription = `Below are the service standards for ${decodedClassification} in ${decodedSection}.`;

  const filteredStandards = data.filter(
    (item) =>
      item.section === decodedSection &&
      item.classification === decodedClassification
  );

  const handleBack = () => {
    navigate(`/section/${encodeURIComponent(decodedSection)}`);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{decodedClassification}</h1>

      {/* ✅ Final: clean string rendering only */}
      <p className="section-description">
        {descriptions[decodedSection] || defaultDescription}
      </p>

      {/* Accordion List */}
      <div style={{ marginTop: '2rem' }}>
        {filteredStandards.map((item, index) => (
          <Accordion
            key={index}
            title={`Standard ${index + 1}`}
            standard={item.standard}
            trainingTip={item.trainingTip}
            quiz={item.quiz}
          />
        ))}
      </div>

      {/* Back Button */}
      <div style={{ marginTop: '2rem' }}>
        <SectionButton label="Back to Section" onClick={handleBack} />
      </div>
    </div>
  );
}

export default ClassificationPage;
