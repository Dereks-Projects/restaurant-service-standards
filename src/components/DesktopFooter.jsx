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
    { label: 'Contact', path: 'mailto:derekengles@gmail.com' }  // 🔔 Specify mailto for contact
  ];

  return (
    <footer className="desktop-footer">
      {links.map((link, index) => (
        link.label === 'Contact' ? (
          <a
            key={index}
            href={link.path}
            className="desktop-footer__item"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            {link.label}
          </a>
        ) : (
          <span
            key={index}
            className="desktop-footer__item"
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </span>
        )
      ))}
    </footer>
  );
}
