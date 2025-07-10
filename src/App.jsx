// 📄 FILE: src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";
import ClassificationPage from "./pages/ClassificationPage";
import QuizPage from "./pages/QuizPage";
import IntroductionPage from './pages/IntroductionPage';
import OverviewPage from './pages/OverviewPage';
import ScrollToTop from './components/ScrollToTop';
import ResourcesPage from './pages/ResourcesPage';

// ✅ NEW: Imports for resources subpages
import ResourcesOverviewPage from './pages/ResourcesOverviewPage';
import ResourcesTrainingPage from './pages/ResourcesTrainingPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/overview/:sectionId" element={<OverviewPage />} />
        <Route path="/section/:sectionName" element={<SectionPage />} />
        <Route path="/classification/:classificationName" element={<ClassificationPage />} />

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
