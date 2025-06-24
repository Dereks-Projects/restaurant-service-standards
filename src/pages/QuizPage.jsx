import React, { useState, useEffect } from 'react';
import standards from '../data/standards.json';
import QuizIntro from '../components/QuizIntro';
import QuestionCard from '../components/QuestionCard';
import QuizSummary from '../components/QuizSummary';
import '../styles/Quiz.css';


// Utility to randomly shuffle an array
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function QuizPage() {
  // 🌐 State management
  const [step, setStep] = useState('intro'); // 'intro' | 'quiz' | 'summary'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // ⏱ Timer-related state
  const [timeLeft, setTimeLeft] = useState(20);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  // 🪄 When the quiz starts: filter questions and prepare set
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

  // 🧠 Handle answer selection
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

  // 🕹 Move to next question
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

  // ⏳ Timer countdown logic
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

  // 🔁 Restart the quiz
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
    <div className="quiz-page-container">
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
        <QuizSummary score={score} total={quizQuestions.length} restartQuiz={restartQuiz} />
      )}
    </div>
  );
}

export default QuizPage;
