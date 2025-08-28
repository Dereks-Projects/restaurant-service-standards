// 📄 FILE: src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TrainingDashboard from "./pages/TrainingDashboard";
import SectionPage from "./pages/SectionPage";
import ClassificationPage from "./pages/ClassificationPage";
import QuizPage from "./pages/QuizPage";
import IntroductionPage from './pages/IntroductionPage';
import OverviewPage from './pages/OverviewPage';
import ScrollToTop from './components/ScrollToTop';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';


// ✅ NEW: Imports for resources subpages
import ResourcesOverviewPage from './pages/ResourcesOverviewPage';
import ResourcesTrainingPage from './pages/ResourcesTrainingPage';

function App() {
  return (
    <Router>
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


        {/* ✅ Resources section and subpages */}
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/overview" element={<ResourcesOverviewPage />} />
        <Route path="/resources/training" element={<ResourcesTrainingPage />} />
        <Route path="/resources/quiz" element={<QuizPage />} /> {/* Existing QuizPage reused under resources */}
      </Routes>
    </Router>
  );
}

export default App;