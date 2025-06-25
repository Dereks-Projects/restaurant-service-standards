// 📄 FILE: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";
import ClassificationPage from "./pages/ClassificationPage";
import QuizPage from "./pages/QuizPage";
import IntroductionPage from './pages/IntroductionPage'; // ✅ NEW: Added Introduction page import
import OverviewPage from './pages/OverviewPage'; // ✅ NEW: Overview page import
import ScrollToTop from './components/ScrollToTop'; // ✅ Scroll reset helper

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ This resets scroll on route change */}
      <Routes>
        <Route path="/introduction" element={<IntroductionPage />} /> {/* ✅ Introduction route */}
        <Route path="/overview/:sectionId" element={<OverviewPage />} /> {/* ✅ NEW: Dynamic Overview route */}
        <Route path="/" element={<Home />} />
        <Route path="/section/:sectionName" element={<SectionPage />} /> {/* Dynamic Section page */}
        <Route path="/classification/:classificationName" element={<ClassificationPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
