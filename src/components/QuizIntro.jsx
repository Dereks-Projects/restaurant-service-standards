import React from 'react';

// 🧠 Props:
// - selectedCategory: string (the user's current selection)
// - setSelectedCategory: function (updates the selected category)
// - startQuiz: function (starts the quiz when user clicks "Start Quiz")

function QuizIntro({ selectedCategory, setSelectedCategory, startQuiz }) {
  const categories = [
    'Reservation System',
    'Arrival & Departure',
    'Dinner Service',
    'Food & Beverage Quality',
    'Presentation of Facilities',
  ];

  return (
    <div className="quiz-intro">
      <h2>Quiz</h2>
      <p>Hone your skills with these quizzes<br /> on the finer points of guest service.</p>

      <label htmlFor="category-select" className="quiz-label">
        Choose Your Topic:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="quiz-select"
      >
        <option value="">-- Select a Section --</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button
        className="quiz-button"
        onClick={startQuiz}
        disabled={!selectedCategory}
      >
        Start Quiz
      </button>

      <button
        className="quiz-button back-button"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
}

export default QuizIntro;
