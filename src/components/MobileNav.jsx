// 📄 FILE: src/components/MobileNav.jsx
// Mobile navigation bar with 5 buttons using emoji icons

import React from 'react';
import './MobileNav.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Training", path: "/training", icon: "📚" },
    { label: "Resources", path: "/resources/training", icon: "📑" },
    { label: "Quiz", path: "/resources/quiz", icon: "✅" },
    { label: "About", path: "/about", icon: "ℹ️" }
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item, i) => (
        <button
          key={i}
          className={`mobile-nav__item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <div className="mobile-nav__icon">{item.icon}</div>
          <div className="mobile-nav__label">{item.label}</div>
        </button>
      ))}
    </nav>
  );
}