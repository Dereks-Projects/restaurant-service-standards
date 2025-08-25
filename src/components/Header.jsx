// 📄 FILE: src/components/Header.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ subtitle }) {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="rss-header">
      <img
        src="/rss-logo-new.svg"
        alt="Restaurant Standards Logo"
        className="rss-header__logo"
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      />
      <p className="rss-header__subtitle">{subtitle}</p>
    </div>
  );
}