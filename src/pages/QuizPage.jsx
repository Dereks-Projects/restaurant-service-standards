import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import standards from '../data/standards.json';
import QuizIntro from '../components/QuizIntro';
import QuestionCard from '../components/QuestionCard';
import QuizSummary from '../components/QuizSummary';
import Header from '../components/Header';
import DesktopFooter from '../components/DesktopFooter';
import MobileNav from '../components/MobileNav';
import '../styles/SectionPage.css';  // 🔔 Use SectionPage.css for consistent styling
import '../styles/Quiz.css';


const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function QuizPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState('intro');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const startQuiz = () => {
    const questionsInCategory = standards.filter(
      (item) => item.section === selectedCategory && item.quiz
    );
    const randomSet = shuffleArray(questionsInCategory).slice(0, 5);
    setQuizQuestions(randomSet);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStep('quiz');
  };

  const handleAnswer = (choice) => {
    const currentQ = quizQuestions[currentQuestionIndex].quiz;
    const correct = currentQ.answer === choice;
    setSelectedAnswer(choice);
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer('');
    setIsCorrect(false);
    setTimeLeft(20);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('summary');
    }
  };

  useEffect(() => {
    if (step !== 'quiz' || showFeedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowFeedback(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, showFeedback, currentQuestionIndex]);

  const restartQuiz = () => {
    setStep('intro');
    setSelectedCategory('');
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(20);
    setShowFeedback(false);
  };

  return (
    <div className="section-page">
      {/* 🔹 Shared header for consistent styling */}
      <Header
        title="RSS"
        subtitle="Test your team's knowledge of elevated hospitality service standards."
      />

      {/* 🔹 Content wrapper ensures padding and alignment */}
      <div className="section-content-wrapper">
        

        {/* 🔹 Quiz workflow retained fully intact */}
        {step === 'intro' && (
          <QuizIntro
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            startQuiz={startQuiz}
          />
        )}

        {step === 'quiz' && (
          <QuestionCard
            questionData={quizQuestions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizQuestions.length}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            showFeedback={showFeedback}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
            timeLeft={timeLeft}
          />
        )}

        {step === 'summary' && (
          <QuizSummary
            score={score}
            total={quizQuestions.length}
            restartQuiz={restartQuiz}
          />
        )}
      </div>

      {/* 🔹 Desktop footer for desktop view only */}
      <DesktopFooter />

      {/* 🔹 MobileNav for mobile view only */}
      <MobileNav />
    </div>
  );
}

export default QuizPage;
