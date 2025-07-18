// 📄 src/components/MobileNav.jsx

import React from 'react';
import './MobileNav.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Resources", path: "/resources", icon: "📚" },
    { label: "Quiz", path: "/resources/quiz", icon: "🏆" },  // ✅ FIXED PATH
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
