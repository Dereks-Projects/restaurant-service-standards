// 📄 src/components/ButtonCard.jsx

import React from 'react';
import './ButtonCard.css';

export default function ButtonCard({ icon, title, subtitle, onClick }) {
  return (
    <button className="btn-card" onClick={onClick}>
      <div className="btn-card__icon">{icon}</div>
      <div className="btn-card__label">
        <div className="btn-card__title">{title}</div>
        <div className="btn-card__subtitle">{subtitle}</div>
      </div>
    </button>
  );
}
