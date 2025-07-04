// 📄 FILE: src/pages/Home.jsx

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  // ✅ Scroll lock on Home (desktop only)
  useEffect(() => {
    document.body.classList.add("home-scroll-lock");
    return () => {
      document.body.classList.remove("home-scroll-lock");
    };
  }, []);

  const sections = [
    "Reservation System",
    "Arrival & Departure",
    "Dinner Service",
    "Food & Beverage Quality",
    "Presentation of Facilities"
  ];

  return (
    <div className="homepage-container">
      <div className="home-container">
        {/* ✅ Header stack with tight spacing */}
        <div className="homepage-header-stack">
          <h1>Restaurant Service Standards</h1>

          <img
            src="/rss-icon-2-stars.svg"
            alt="5 stars"
            className="homepage-stars"
          />

          <p className="homepage-subtitle">
            RSS empowers your team with elite service standards, offering a clear roadmap to industry recognition and lasting guest loyalty.
          </p>
        </div>

        {/* ✅ Navigation buttons */}
        <div className="button-stack">
          {/* ✅ New Introduction button added to top of stack */}
          <button onClick={() => navigate("/introduction")}>Introduction</button>

          {sections.map((section) => (
            <button
              key={section}
              onClick={() => navigate(`/section/${encodeURIComponent(section)}`)}
            >
              {section}
            </button>
          ))}
          <button onClick={() => navigate("/quiz")}>Quiz</button>
        </div>

        {/* ✅ Footer */}
        <div className="home-footer">
          <p>
            Presented by{" "}
            <a
              href="https://www.derekengles.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "inherit" }}
            >
              Derek Engles
            </a>
            <br />
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
