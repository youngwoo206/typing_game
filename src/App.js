import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

import EndScreen from "./components/EndScreen";
import Data from "./components/Data";
import Word from "./components/Word";

function App() {
  const STARTING_TIME = 30;

  const typingText = Data.split(" ");

  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const textBoxRef = useRef(null);

  function processInput(value) {
    if (value.endsWith(" ")) {
      setText("");
      setActiveWordIndex((index) => index + 1);

      const word = value.trim();

      if (word === typingText[activeWordIndex]) {
        setCorrectWordCount((prevCount) => prevCount + 1);
        setCorrectWordArray((data) => {
          const newResult = [...data];
          newResult[activeWordIndex] = true;
          return newResult;
        });
      } else {
        setCorrectWordArray((data) => {
          const newResult = [...data];
          newResult[activeWordIndex] = false;
          return newResult;
        });
      }
      //not sure what the line of code below does but fixed the issue of setText("") not working
      text.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setText(value);
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setActiveWordIndex(0);
    setCorrectWordCount(0);
    setText("");
    setCorrectWordArray([]);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    handleShow();
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
      <div className={isTimeRunning ? "typing_text" : "typing_text_disabled"}>
        {typingText.map((word, index) => {
          return (
            <Word
              key={index}
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
      <Button onClick={startGame} disabled={isTimeRunning}>
        Start
      </Button>
      <EndScreen
        time={STARTING_TIME}
        wordCount={activeWordIndex}
        correctWordCount={correctWordCount}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
