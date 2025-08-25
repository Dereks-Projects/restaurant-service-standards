// 📄 src/components/DesktopFooter.jsx

import React from 'react';
import './DesktopFooter.css';
import { useNavigate } from 'react-router-dom';

export default function DesktopFooter() {
  const navigate = useNavigate();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: 'mailto:derekengles@gmail.com' }
  ];

  const handleClick = (link) => {
    if (link.label === 'Contact') {
      window.location.href = link.path;
    } else {
      navigate(link.path);
    }
  };

  return (
    <footer className="desktop-footer">
      <div className="desktop-footer__container">
        <h3 className="desktop-footer__title">Restaurant Standards</h3>
        <div className="desktop-footer__links">
          {links.map((link, index) => (
            <span
              key={index}
              className="desktop-footer__item"
              onClick={() => handleClick(link)}
              style={{ cursor: 'pointer' }}
            >
              {link.label}
            </span>
          ))}
        </div>
        <p className="desktop-footer__copyright">
          © Derek Engles 2025 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}