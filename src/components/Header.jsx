// 📄 FILE: src/components/Header.jsx

import React from 'react';
import './Header.css';

export default function Header({ title, subtitle }) {
  return (
    <div className="rss-header">
      <h1 className="rss-header__title">{title}</h1>
      <img
        src="/rss-icon-2-stars.svg"
        alt="5 stars"
        className="rss-header__stars"
      />
      <p className="rss-header__subtitle">{subtitle}</p>
    </div>
  );
}
