import { useNavigate } from "react-router-dom";
import UnifiedHeader from "../components/UnifiedHeader";
import DesktopFooter from "../components/DesktopFooter";
import MobileNav from "../components/MobileNav";
import SEO from "../components/SEO";
import "../styles/SectionPage.css";

function ResourcesPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Resources Hub - Restaurant Standards Training Materials"
        description="Access comprehensive training and development materials for restaurant service excellence. Videos, guides, and resources for luxury hospitality operations."
        keywords="restaurant resources, training materials, hospitality guides, service excellence resources"
        canonicalUrl="https://www.restaurantstandards.com/resources"
      />
      
      <div className="section-page">
      {/* 🔹 Consistent header */}
      <UnifiedHeader 
        variant="internal"
        hideOnDesktop={false}  // ← Or omit entirely (defaults to false)
      />

      {/* 🔹 Content wrapper ensures padding + alignment */}
      <div className="section-content-wrapper">
        <h2 className="section-title">Resources</h2>

        {/* Wrap video and buttons in a container for desktop layout */}
        <div className="section-main-content">
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

          {/* 🔹 Button group identical to SectionPage */}
          <div className="button-group">
            <div className="accordion-item">
              <button className="accordion-button" onClick={() => navigate("/resources/overview")}>Overview</button>
            </div>
            <div className="accordion-item">
              <button className="accordion-button" onClick={() => navigate("/resources/training")}>More Training</button>
            </div>
            <div className="accordion-item">
              <button className="accordion-button" onClick={() => navigate("/resources/quiz")}>Quiz</button>
            </div>
            <div className="accordion-item">
              <button className="accordion-button" onClick={() => navigate("/training")}>Back</button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Footer for desktop */}
      <DesktopFooter />

      {/* 🔹 Mobile nav for mobile */}
      <MobileNav />
    </div>
    </>
  );
}

export default ResourcesPage;