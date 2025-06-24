// 📄 FILE: Accordion.jsx
import React, { useState } from 'react';

// A collapsible card for displaying one classification's standards and tips
function Accordion({ title, items = [], quiz }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '6px',
        margin: '10px auto',
        padding: '1rem',
        width: '90%',
        maxWidth: '700px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
      }}
    >
      <button
        onClick={toggleAccordion}
        style={{
          backgroundColor: '#1b1b1b',
          color: '#fff',
          padding: '10px 16px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '4px',
          width: '100%',
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        {title}
      </button>

      {isOpen && (
        <div style={{ marginTop: '1rem', textAlign: 'left' }}>
          {items.map((entry, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <p><strong>Standard:</strong> {entry.standard}</p>
              <p style={{ fontStyle: 'italic', marginTop: '-0.5rem' }}>
                <strong>Training Tip:</strong> {entry.trainingTip}
              </p>
            </div>
          ))}
          {quiz && quiz.question && (
            <p><strong>Quiz Preview:</strong> {quiz.question}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Accordion;
