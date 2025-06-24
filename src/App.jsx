// 📄 FILE: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";
import ClassificationPage from "./pages/ClassificationPage";
import QuizPage from "./pages/QuizPage";
import IntroductionPage from './pages/IntroductionPage'; // ✅ NEW: Added Introduction page import
import ScrollToTop from './components/ScrollToTop'; // ✅ NEW: Scroll reset helper

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ This resets scroll on route change */}
      <Routes>
        <Route path="/introduction" element={<IntroductionPage />} /> {/* ✅ NEW: Introduction route */}
        <Route path="/" element={<Home />} />
        {/* Dynamic routing: handles all section buttons */}
        <Route path="/section/:sectionName" element={<SectionPage />} />
        {/* Optional: drill-down into classification if needed */}
        <Route path="/classification/:classificationName" element={<ClassificationPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
