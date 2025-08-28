// 📄 src/components/MobileNav.jsx

import React from 'react';
import './MobileNav.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Training", path: "/Training", icon: "📚" },
    { label: "Book", path: "https://www.amazon.com/dp/B0FNDMTK5F", icon: "📖", external: true },
    { label: "About", path: "/about", icon: "ℹ️" }
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item, i) => (
        <button
        key={i}
        className={`mobile-nav__item ${location.pathname === item.path ? 'active' : ''}`}
        onClick={() => {
          if (item.external) {
            window.open(item.path, '_blank');
          } else {
            navigate(item.path);
          }
        }}
      >
        
          <div className="mobile-nav__icon">{item.icon}</div>
          <div className="mobile-nav__label">{item.label}</div>
        </button>
      ))}
    </nav>
  );
}
