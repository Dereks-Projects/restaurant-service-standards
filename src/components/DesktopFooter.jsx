// 📄 src/components/DesktopFooter.jsx

import React from 'react';
import './DesktopFooter.css';
import { useNavigate } from 'react-router-dom';

export default function DesktopFooter() {
  const navigate = useNavigate();

  const pagesLinks = [
    { label: 'Home', path: '/', type: 'internal' },
    { label: 'Training', path: '/training', type: 'internal' },
    { label: 'About us', path: '/about', type: 'internal' },
    { label: 'Contact us', path: 'mailto:derekengles@gmail.com', type: 'email' }
  ];

const topicsLinks = [
  { label: 'Introduction', path: '/introduction', type: 'internal' },
  { label: 'Reservation System', path: '/section/Reservation System', type: 'internal' },
  { label: 'Arrival & Departure', path: '/section/Arrival & Departure', type: 'internal' },
  { label: 'Dinner Service', path: '/section/Dinner Service', type: 'internal' },
  { label: 'F & B Quality', path: '/section/Food & Beverage Quality', type: 'internal' },
  { label: 'Facilities', path: '/section/Presentation of Facilities', type: 'internal' }
];

  const outsideLinks = [
    { label: 'Buy the Book', url: 'https://www.amazon.com/dp/B0FNDMTK5F', type: 'external' },
    { label: 'Meet the Founder', url: 'https://derekengles.com', type: 'external' },
    { label: 'On LinkedIn', url: 'https://www.linkedin.com/company/restaurantstandards/', type: 'external' },
    { label: 'On Instagram', url: 'https://www.instagram.com/restaurant.standards/', type: 'external' }
  ];

  const socialLinks = [
    { 
      icon: '/social-icon-2-li.svg', 
      url: 'https://www.linkedin.com/company/restaurantstandards/',
      alt: 'LinkedIn'
    },
    { 
      icon: '/social-icon-1-ig.svg', 
      url: 'https://www.instagram.com/restaurant.standards/',
      alt: 'Instagram'
    }
  ];

  const footerBottomLinks = [
    { label: 'Privacy Policy', path: '/privacy', type: 'internal' },
    { label: 'Terms of Use', path: '/terms', type: 'internal' },
    { label: 'Contact', path: 'mailto:derekengles@gmail.com', type: 'email' }
  ];

  const handleInternalClick = (path, event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <footer className="desktop-footer">
      <div className="desktop-footer__container">
        {/* Three Column Grid - NO TITLE HERE ANYMORE */}
        <div className="desktop-footer__grid">
          {/* Pages Column */}
          <div className="desktop-footer__column desktop-footer__column--left">
            <h3 className="desktop-footer__column-title">PAGES</h3>
            <div className="desktop-footer__nav">
              {pagesLinks.map((link, index) => (
                link.type === 'internal' ? (
                  <a
                    key={index}
                    href={link.path}
                    className="desktop-footer__link"
                    onClick={(e) => handleInternalClick(link.path, e)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={index}
                    href={link.path}
                    className="desktop-footer__link"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Topics Column */}
          <div className="desktop-footer__column desktop-footer__column--center">
            <h3 className="desktop-footer__column-title">TOPICS</h3>
            <div className="desktop-footer__nav">
              {topicsLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className="desktop-footer__link"
                  onClick={(e) => handleInternalClick(link.path, e)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Outside Links Column */}
          <div className="desktop-footer__column desktop-footer__column--right">
            <h3 className="desktop-footer__column-title">OUTSIDE LINKS</h3>
            <div className="desktop-footer__nav">
              {outsideLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="desktop-footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="desktop-footer__separator"></div>

        {/* Main Title - MOVED HERE BELOW THE LINE */}
        <h2 className="desktop-footer__main-title">Restaurant Standards</h2>

        {/* Social Icons */}
        <div className="desktop-footer__social">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="desktop-footer__social-link"
              aria-label={social.alt}
            >
              <img 
                src={social.icon} 
                alt={social.alt}
                className="desktop-footer__social-icon"
              />
            </a>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="desktop-footer__bottom-links">
          {footerBottomLinks.map((link, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="desktop-footer__divider">|</span>}
              {link.type === 'internal' ? (
                <a
                  href={link.path}
                  className="desktop-footer__link"
                  onClick={(e) => handleInternalClick(link.path, e)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.path}
                  className="desktop-footer__link"
                >
                  {link.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <p className="desktop-footer__copyright">
          Copyright 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}