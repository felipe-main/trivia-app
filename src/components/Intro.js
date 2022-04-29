export default function Intro(props) {
  return (
    <div className="intro-screen">
      <h1 className="quiz-name">Quizzical</h1>
      <p className="quiz--description">
        Play funny questions and check your trivia knowledge!
      </p>
      <button onClick={props.startQuiz} className="start-quiz">
        Start quiz
      </button>
      <br></br>
      <select id='quiz-difficulty' className="quiz-difficulty" name="quiz-difficulty">
        <option value='easy'>easy</option>
        <option value='medium'>medium</option>
        <option value='hard'>hard</option>
      </select>
      {/* <label htmlFor="quiz-difficulty">Choose difficulty</label> */}
    </div>
  );
}
