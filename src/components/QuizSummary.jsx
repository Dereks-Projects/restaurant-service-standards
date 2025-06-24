import React from 'react';

// Props:
// - score: integer number of correct answers
// - total: total number of questions (e.g. 5)
// - restartQuiz: function to reset the quiz flow

function QuizSummary({ score, total, restartQuiz }) {
  return (
    <div className="quiz-summary">
      <h2>Quiz Complete</h2>
      <p className="score-display">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>

      <p className="score-message">
        {score === total
          ? "Excellent work! 💯"
          : score >= total * 0.8
          ? "Great job! 👍"
          : score >= total * 0.5
          ? "Not bad – review the tips and try again."
          : "Keep practicing. Consistency builds confidence."}
      </p>

      <button className="quiz-button" onClick={restartQuiz}>
        Restart Quiz
      </button>

      <button
        className="quiz-button back-button"
        onClick={() => window.location.href = '/quiz'}
        >
        Back to Quiz Section
      </button>
    </div>
  );
}

export default QuizSummary;
