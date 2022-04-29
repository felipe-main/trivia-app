import Question from "./Question";
import React from "react";

export default function Quiz(props) {
  const allQuestions = [...props.questions].map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        results={props.results}
        toggleAnswer={(event, answerId) =>
          props.toggleAnswer(event, question.id, answerId)
        }
        question={question}
      />
    );
  });

  return (
    <div className="quiz-container">
      <ul className="quiz-questions">{allQuestions}</ul>
      {!props.results.isResults ? (
        <button onClick={props.checkAnswers} className="quiz-check">
          Check answers
        </button>
      ) : (
        <div className="quiz-results">
          <p>
            You scored {props.results.correctAnswers}/{props.questions.length}{" "}
            correct answers
          </p>
          <button onClick={props.playAgain} className="quiz-check">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
