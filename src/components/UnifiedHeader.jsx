// 📄 FILE: src/components/UnifiedHeader.jsx
// Unified header component for entire app
// Mobile-first design with desktop support

import React, { useState } from 'react';
import './UnifiedHeader.css';
import HamburgerMenu from './HamburgerMenu';

function UnifiedHeader({ 
  variant = 'internal',
  hideOnDesktop = false
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Determine CSS class based on props
  const headerClass = hideOnDesktop 
    ? 'unified-header unified-header--hide-desktop'
    : 'unified-header';

  return (
    <>
      <header className={headerClass}>
        {/* Title on left */}
        <div className="unified-header__title">
          Restaurant Standards
        </div>
        
        {/* Hamburger button on right */}
        <button 
          className={`unified-header__hamburger ${isMenuOpen ? 'unified-header__hamburger--active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      
      {/* Hamburger menu */}
      <HamburgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
}

export default UnifiedHeader;