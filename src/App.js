import "./App.css";
import Data from "./components/Data";
import Word from "./components/word";
import React, { useState, useEffect, useRef } from "react";

// const getCloud = () =>
//   "scramble screw thaw pasture tent humor advance stroke true texture"
//     .split(" ")
//     .sort(() => (Math.random() > 0.5 ? 1 : -1));

// Word = React.memo(Word);

function App() {
  const STARTING_TIME = 30;
  // const typingText = "this is the text the user types".split(" ");

  const typingText = Data.split(" ");

  // const cloud = useRef(getCloud);

  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  const textBoxRef = useRef(null);

  function processInput(value) {
    if (value.endsWith(" ")) {
      setText("");
      setActiveWordIndex((index) => index + 1);

      console.log(text);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];

        //not sure what the line of code below does but fixed the issue of setText("") not working
        newResult[activeWordIndex] = word === typingText[activeWordIndex];
        return newResult;
      });
      text.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setText(value);
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setActiveWordIndex(0);
    setText("");
    setCorrectWordArray([]);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
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
      <h4>Word count: {activeWordIndex}</h4>
      <h4>Speed: {speed}</h4>
      <div className="typing_text">
        {typingText.map((word, index) => {
          return (
            <Word
              text={word}
              active={index === activeWordIndex}
              correct={correctWordArray[index]}
            />
          );
        })}
      </div>
      <input
        value={text}
        onChange={(e) => processInput(e.target.value)}
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
