// 📄 FILE: src/pages/Home.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ButtonCard from "../components/ButtonCard";
import "../styles/Home.css";
import MobileNav from "../components/MobileNav";
import DesktopFooter from "../components/DesktopFooter";

function Home() {
  const navigate = useNavigate();



  return (
    <div className="home-container">
      {/* ✅ Fixed header at top */}
      <Header
        
        subtitle="Empower your restaurant team with the highest standards in the industry."
      />

      {/* ✅ Scrollable content */}
      <div className="home-scrollable-body">
        <div className="home-page__buttons">
          <ButtonCard
            icon="👋"
            title="Introduction"
            subtitle="Begin your journey here."
            onClick={() => navigate("/introduction")}
          />
          <ButtonCard
            icon="📅"
            title="Reservation System"
            subtitle="Where all experiences begin."
            onClick={() => navigate("/section/Reservation System")}
          />
          <ButtonCard
            icon="🚪"
            title="Arrival & Departure"
            subtitle="Warm greetings & intuitive hospitality."
            onClick={() => navigate("/section/Arrival & Departure")}
          />
          <ButtonCard
            icon="🍽️"
            title="Dinner Service"
            subtitle="The center of the experience."
            onClick={() => navigate("/section/Dinner Service")}
          />
          <ButtonCard
            icon="🍷"
            title="Food & Beverage Quality"
            subtitle="Execution of the product."
            onClick={() => navigate("/section/Food & Beverage Quality")}
          />
          <ButtonCard
            icon="🏛️"
            title="Presentation of Facilities"
            subtitle="Showcasing your space."
            onClick={() => navigate("/section/Presentation of Facilities")}
          />
          <ButtonCard
            icon="📚"
            title="Resources"
            subtitle="Tools to support your team."
            onClick={() => navigate("/resources")}
          />
          <ButtonCard
            icon="📖"
            title="Get the Book"
            subtitle="The ultimate service manual."
            onClick={() => window.open('https://www.amazon.com/dp/B0FNDMTK5F', '_blank')}
          />
        </div>
      </div>

      {/* 🔹 Desktop-only footer */}
      <DesktopFooter />

      {/* 🔹 MobileNav (mobile only) */}
      <MobileNav />
    </div>
  );
}

export default Home;
