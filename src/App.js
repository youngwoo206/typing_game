import "./App.css";
import Word from "./components/word";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 10;
  const typingText = "this is the text the user types".split(" ");

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const textBoxRef = useRef(null);

  function processInput(value) {
    if (value.endsWith(" ")) {
      setActiveWordIndex((index) => index + 1);
      setText("");
    }
    setText(value);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setWordCount(0);
    setActiveWordIndex(0);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    setWordCount(calculateWordCount(text));
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div className="App">
      <h1>Typing Game</h1>
      <h4 className="timer">Time Remaining: {timeRemaining}</h4>
      <h4>Word count: {wordCount}</h4>
      <div className="typing_text">
        {typingText.map((word, index) => {
          if (index === activeWordIndex) {
            return <b>{word} </b>;
          }

          return <span>{word} </span>;
        })}
      </div>
      <textarea
        onChange={(e) => processInput(e.target.value)}
        value={text}
        disabled={!isTimeRunning}
        ref={textBoxRef}
      />
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
    </div>
  );
}

export default App;
