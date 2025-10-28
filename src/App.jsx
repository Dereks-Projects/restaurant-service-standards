// 📄 FILE: src/App.jsx
// ✅ Updated routing: /resources now redirects to /resources/training

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import LandingPage from "./pages/LandingPage";
import TrainingDashboard from "./pages/TrainingDashboard";
import SectionPage from "./pages/SectionPage";
import ClassificationPage from "./pages/ClassificationPage";
import QuizPage from "./pages/QuizPage";
import IntroductionPage from './pages/IntroductionPage';
import OverviewPage from './pages/OverviewPage';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import { initGA, logPageView } from './utils/analytics';

// ✅ Imports for resources subpages
import ResourcesOverviewPage from './pages/ResourcesOverviewPage';
import ResourcesTrainingPage from './pages/ResourcesTrainingPage';

// Create a separate component for routes to use useLocation hook
function AppContent() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/training" element={<TrainingDashboard />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/overview/:sectionId" element={<OverviewPage />} />
        <Route path="/section/:sectionName" element={<SectionPage />} />
        <Route path="/classification/:classificationName" element={<ClassificationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />

        {/* ✅ OLD /resources route now redirects to /resources/training */}
        <Route path="/resources" element={<Navigate to="/resources/training" replace />} />
        
        {/* ✅ Resources subpages */}
        <Route path="/resources/overview" element={<ResourcesOverviewPage />} />
        <Route path="/resources/training" element={<ResourcesTrainingPage />} />
        <Route path="/resources/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}

function App() {
  // Initialize GA on app load
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;