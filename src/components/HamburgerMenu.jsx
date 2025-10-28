// 📄 FILE: src/components/HamburgerMenu.jsx
// Unified hamburger menu - adapts for mobile and desktop
// Mobile: Full-screen overlay
// Desktop: Dropdown panel from right

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

function HamburgerMenu({ isOpen, onClose }) {
  
  // Close menu on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Don't render if menu is closed
  if (!isOpen) return null;
  
  return (
    <div className="hamburger-menu">
      {/* Main navigation links */}
      <nav className="hamburger-menu__nav">
        <Link to="/" onClick={onClose}>Home</Link>
        <Link to="/training" onClick={onClose}>Training</Link>
        <Link to="/introduction" onClick={onClose}>Introduction</Link>
        <Link to="/about" onClick={onClose}>About</Link>
        <a href="mailto:derekengles@gmail.com" onClick={onClose}>Contact</a>
      </nav>
      
      {/* Social icons */}
      <div className="hamburger-menu__social">
        <a 
          href="https://www.instagram.com/somm.site/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src="/social-icon-1-ig.svg" alt="Instagram" />
        </a>
        <a 
          href="https://www.linkedin.com/company/restaurantstandards" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <img src="/social-icon-2-li.svg" alt="LinkedIn" />
        </a>
      </div>
      
      {/* Legal links */}
      <div className="hamburger-menu__legal">
        <Link to="/privacy" onClick={onClose}>Privacy Policy</Link>
        <Link to="/terms" onClick={onClose}>Terms of Use</Link>
        <Link to="/cookies" onClick={onClose}>Cookies Policy</Link>
      </div>
    </div>
  );
}

export default HamburgerMenu;