import { useNavigate } from "react-router-dom";
import "../styles/SectionPage.css";

function ResourcesPage() {
  const navigate = useNavigate();

  return (
    <div className="section-page">
      <h2>Resources</h2>

      <p className="section-description">
        This section provides the training and development collateral to execute these elevated service standards. Visit the training tab to view the training and development topics, or the quiz tab to test your knowledge of these standards.
      </p>

      <div className="section-video-wrapper">
        <iframe
          src="https://player.vimeo.com/video/1095248867"
          width="100%"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Resources Video"
        />
      </div>

      {/* ✅ Make button stack identical to SectionPage.jsx */}
      <div className="button-group">
        <div className="accordion-item">
          <button className="accordion-button" onClick={() => navigate("/resources/overview")}>Overview</button>
        </div>
        <div className="accordion-item">
          <button className="accordion-button" onClick={() => navigate("/resources/training")}>Training</button>
        </div>
        <div className="accordion-item">
          <button className="accordion-button" onClick={() => navigate("/resources/quiz")}>Quiz</button>
        </div>
        <div className="accordion-item">
          <button className="accordion-button" onClick={() => navigate("/")}>Home</button>
        </div>
      </div>

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
  );
}

export default ResourcesPage;
