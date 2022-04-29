import React from "react";
import "./App.css";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [isQuiz, setIsQuiz] = React.useState(false);
  const [results, setResults] = React.useState({
    isResults: false,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [newGame, setNewGame] = React.useState(false);
  const [questions, setQuestions] = React.useState("");
  const [apiRoute, setApiRoute] = React.useState(
    "https://opentdb.com/api.php?amount=5&type=multiple"
  );

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(apiRoute);
      const data = await res.json();
      setQuestions(data.results.map((question) => getQuestionInfo(question)));
    }
    getQuestions();
  }, [newGame]);

  function startQuiz(event) {
    //render or not the intro screen and set difficulty
    setIsQuiz(true);
    setApiRoute(
      (prevRoute) =>
        `${prevRoute}&difficulty=${
          document.getElementById("quiz-difficulty").value
        }`
    );
  }

  function getQuestionInfo(question) {
    //transform question data of api to an useful object in App.
    return {
      id: nanoid(),
      question: htmlDecode(question.question),
      correct_answer: htmlDecode(question.correct_answer),
      answers: shuffleList(
        [...question.incorrect_answers, question.correct_answer].map(
          (answer) => ({
            text: htmlDecode(answer),
            selected: false,
            id: nanoid(),
          })
        )
      ),
    };
  }

  function toggleAnswer(event, questionId, answerId) {
    //function to handle when user clicks the option, select the new one and deselect other if any

    //get the question object using id
    const question = questions.filter(
      (question) => question.id === questionId
    )[0];

    //get the answer selected from question using id and deselect other if any
    const answers = question.answers.map((answer) =>
      answer.id === answerId
        ? { ...answer, selected: !answer.selected }
        : { ...answer, selected: false }
    );

    //update questions state with the selected option
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? { ...question, answers: answers }
          : question
      )
    );
  }

  function checkAnswers() {
    //checks how many correct and wrong answers quiz had.

    const correctQuestions = questions.filter((question) => {
      const selectedAnswer = question.answers.filter(
        (answer) => answer.selected
      );
      return (
        //avoid undefined using length
        selectedAnswer.length > 0 &&
        selectedAnswer[0].text === question.correct_answer
      );
    });

    const wrongQuestions = questions.filter((question) => {
      const selectedAnswer = question.answers.filter(
        (answer) => answer.selected
      );
      return (
        selectedAnswer.length > 0 &&
        selectedAnswer[0].text !== question.correct_answer
      );
    });

    //display results and results data
    setResults({
      isResults: true,
      correctAnswers: correctQuestions.length,
      wrongAnswers: wrongQuestions.length,
    });
  }

  function playAgain() {
    //changes newGame state to rerun React.useEffect and reset results.
    setNewGame(!newGame);
    setResults({
      isResults: false,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  }

  function shuffleList(list) {
    //randomize items inside the list
    let currIndex = list.length,
      randomIndex;
    while (currIndex) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex--;
      [list[currIndex], list[randomIndex]] = [
        list[randomIndex],
        list[currIndex],
      ];
    }
    return list;
  }

  function htmlDecode(text) {
    // parse strings with &quot, &# to normal text.
    var doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <div className="App">
      {!isQuiz ? (
        <Intro startQuiz={startQuiz} />
      ) : (
        <Quiz
          checkAnswers={checkAnswers}
          results={results}
          toggleAnswer={toggleAnswer}
          questions={questions}
          playAgain={playAgain}
        />
      )}
    </div>
  );
}

export default App;
