// 📄 FILE: src/pages/TrainingDashboard.jsx
// ✅ Updated with colorful Phosphor icons and concise descriptions

import React from "react";
import { useNavigate } from "react-router-dom";
import UnifiedHeader from "../components/UnifiedHeader";
import TrainingCard from "../components/TrainingCard";
import SEO from "../components/SEO";
import "../styles/Home.css";
import MobileNav from "../components/MobileNav";
import DesktopFooter from "../components/DesktopFooter";

// ✅ Import Phosphor React icons (duotone weight for color impact)
import { 
  BookOpen,           // Introduction
  CalendarCheck,      // Reservation System
  Door,               // Arrival & Departure
  ForkKnife,          // Dinner Service
  Wine,               // Food & Beverage Quality
  Buildings,          // Presentation of Facilities
  GraduationCap,      // Training Resources
  ClipboardText,      // Quiz
  ShoppingBag         // Get the Book
} from 'phosphor-react';

function TrainingDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Training Dashboard - Restaurant Standards Platform"
        description="Comprehensive restaurant training modules covering reservation systems, dinner service, food quality, and facility presentation. Professional hospitality education for luxury service standards."
        keywords="restaurant training dashboard, hospitality training modules, service standards training, restaurant staff education"
        canonicalUrl="https://www.restaurantstandards.com/training"
      />
      
      <div className="home-container">
      {/* ✅ Fixed header at top */}
      <UnifiedHeader 
        variant="internal"
        hideOnDesktop={false}  // ← Or omit entirely (defaults to false)
      />

      {/* ✅ Scrollable content area */}
      <div className="home-scrollable-body">
        <div className="home-page__buttons">
          
          {/* 🔹 CARD 1: Introduction */}
          <TrainingCard
            icon={BookOpen}
            iconColor="#2563eb" /* Blue */
            title="Introduction"
            description="Begin your journey into professional hospitality with foundational principles that drive exceptional service."
            onClick={() => navigate("/introduction")}
          />

          {/* 🔹 CARD 2: Reservation System */}
          <TrainingCard
            icon={CalendarCheck}
            iconColor="#7c3aed" /* Purple */
            title="Reservation System"
            description="Master booking protocols and guest communication to set the perfect tone before arrival."
            onClick={() => navigate("/section/Reservation System")}
          />

          {/* 🔹 CARD 3: Arrival & Departure */}
          <TrainingCard
            icon={Door}
            iconColor="#059669" /* Green */
            title="Arrival & Departure"
            description="Create memorable first impressions with warm greetings and gracious farewells that resonate."
            onClick={() => navigate("/section/Arrival & Departure")}
          />

          {/* 🔹 CARD 4: Dinner Service */}
          <TrainingCard
            icon={ForkKnife}
            iconColor="#dc2626" /* Red */
            title="Dinner Service"
            description="Perfect seamless table service, timing coordination, and guest interaction techniques."
            onClick={() => navigate("/section/Dinner Service")}
          />

          {/* 🔹 CARD 5: Food & Beverage Quality */}
          <TrainingCard
            icon={Wine}
            iconColor="#9333ea" /* Purple-pink */
            title="Food & Beverage Quality"
            description="Ensure flawless execution and presentation from kitchen to table with quality standards."
            onClick={() => navigate("/section/Food & Beverage Quality")}
          />

          {/* 🔹 CARD 6: Presentation of Facilities */}
          <TrainingCard
            icon={Buildings}
            iconColor="#0891b2" /* Cyan */
            title="Presentation of Facilities"
            description="Showcase your space with cleanliness, ambiance, and attention to detail standards."
            onClick={() => navigate("/section/Presentation of Facilities")}
          />

          {/* 🔹 CARD 7: Training Resources */}
          <TrainingCard
            icon={GraduationCap}
            iconColor="#ea580c" /* Orange */
            title="Training Resources"
            description="Access comprehensive training materials and professional development tools for your team."
            onClick={() => navigate("/resources/training")}
          />

          {/* 🔹 CARD 8: Quiz */}
          <TrainingCard
            icon={ClipboardText}
            iconColor="#16a34a" /* Green */
            title="Quiz"
            description="Test knowledge with scenario-based questions covering elevated hospitality service standards."
            onClick={() => navigate("/resources/quiz")}
          />

          {/* 🔹 CARD 9: Get the Book */}
          <TrainingCard
            icon={ShoppingBag}
            iconColor="#001f3f" /* Navy - brand color */
            title="Get the Book"
            description="The complete Restaurant Standards service manual with in-depth guides and applications."
            onClick={() => window.open('https://www.amazon.com/dp/B0FNDMTK5F', '_blank')}
          />

        </div>
      </div>

      {/* 📍 Desktop-only footer */}
      <DesktopFooter />

      {/* 📍 MobileNav (mobile only) */}
      <MobileNav />
    </div>
    </>
  );
}

export default TrainingDashboard;