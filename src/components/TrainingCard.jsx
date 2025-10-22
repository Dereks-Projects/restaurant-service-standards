// 📄 FILE: src/components/TrainingCard.jsx
// ✅ Enhanced with colorful icons and red arrow link

import React from 'react';
import { ArrowRight } from 'phosphor-react';
import './TrainingCard.css';

export default function TrainingCard({ 
  icon: IconComponent,  // ✅ Phosphor icon component
  iconColor = "#001f3f", // ✅ Default color (can override per card)
  title,                
  description,          
  onClick 
}) {
  return (
    <button className="training-card" onClick={onClick}>
      {/* 🔹 Icon Section - Top of card with color */}
      <div className="training-card__icon">
        {IconComponent && <IconComponent size={48} weight="duotone" color={iconColor} />}
      </div>

      {/* 🔹 Content Section */}
      <div className="training-card__content">
        <h3 className="training-card__title">{title}</h3>
        <p className="training-card__description">{description}</p>
      </div>

      {/* 🔹 Red Arrow Link at Bottom */}
      <div className="training-card__arrow">
        <ArrowRight size={20} weight="bold" color="#dc2626" />
      </div>
    </button>
  );
}