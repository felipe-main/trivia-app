export default function Question({ results, toggleAnswer, question }) {
  const answers = [...question.answers].map((item) => {
    //{text:..., selected:..., id:...}
    return (
      <li
        key={item.id}
        id={item.id}
        onClick={(event) => toggleAnswer(event, item.id)}
        className={`question--answer selected--${item.selected} ${
          results.isResults &&
          question.correct_answer === item.text &&
          "correct--answer"
        } ${
          results.isResults &&
          item.selected &&
          question.correct_answer !== item.text &&
          "wrong--answer"
        }`}
      >
        {item.text}
      </li>
    );
  });

  return (
    <div className="question">
      <h2 className="question-query">{question.question}</h2>
      <ul className="question-answers">{answers}</ul>
    </div>
  );
}
