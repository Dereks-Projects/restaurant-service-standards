import React from 'react';

// Props:
// - questionData: full object from standards.json
// - questionNumber: 1-based index
// - totalQuestions: total number of quiz questions
// - selectedAnswer: user's selected choice
// - isCorrect: boolean if the answer was correct
// - showFeedback: whether to display result + training tip
// - handleAnswer: function to handle answer selection
// - nextQuestion: function to go to next question
// - timeLeft: integer seconds remaining

function QuestionCard({
  questionData,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isCorrect,
  showFeedback,
  handleAnswer,
  nextQuestion,
  timeLeft,
}) {
  const { section, standard, quiz, trainingTip } = questionData;

  return (
    <div className="question-card">
      <h2 className="section-title">{section}</h2>


      <div className="timer">
        Time Remaining: <strong>{timeLeft}</strong> seconds
      </div>

      <h3 className="quiz-question">{quiz.question}</h3>

      <div className="quiz-choices">
        {quiz.choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const correctAnswer = quiz.answer;

          let choiceClass = 'quiz-button';

          if (showFeedback) {
            if (choice === correctAnswer) {
              choiceClass += ' correct';
            } else if (isSelected && !isCorrect) {
              choiceClass += ' wrong';
            }
          }

          return (
            <button
              key={index}
              className={choiceClass}
              onClick={() => handleAnswer(choice)}
              disabled={showFeedback}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <>
          <div className="quiz-feedback">
            {isCorrect ? (
              <p className="correct-message">✅ Correct!</p>
            ) : (
              <p className="wrong-message">
                ❌ Wrong Answer<br />
                <strong>Correct:</strong> {quiz.answer}
              </p>
            )}
            <p className="training-tip">
              <em>Training Tip:</em> {trainingTip}
            </p>
          </div>

          <button className="quiz-button next-button" onClick={nextQuestion}>
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default QuestionCard;
