// 📄 SectionButton.jsx
import React from 'react';

// 🧠 Reusable button for sections (or quiz) – styles can be edited later
function SectionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '260px',
        maxWidth: '90%',
        margin: '12px auto',
        display: 'block',
        borderRadius: '8px',
        backgroundColor: '#1b1b1b', // 🌈 Button background (editable)
        color: '#ffffff',           // 🌈 Button text color (editable)
        fontSize: '1rem',
        padding: '14px 20px'
      }}
    >
      {label}
    </button>
  );
}

export default SectionButton;
