import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import Game from "./pages/Game";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  //timer consts
  const [STARTING_TIME, setSTARTING_TIME] = useState(30.0);
  const delayTimeValue = 3;

  //game logic
  const [delayTime, setDelayTime] = useState(delayTimeValue);
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [typingData, setTypingData] = useState("");
  const [startClicked, setStartClicked] = useState(false);

  //generate random text
  const typingText = typingData.split(" ");

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
    setStartClicked(true);
    setDelayTime(delayTimeValue);
    setTimeout(() => {
      setIsTimeRunning(true);
      setTimeRemaining(STARTING_TIME);
      setActiveWordIndex(0);
      setCorrectWordCount(0);
      setText("");
      setCorrectWordArray([]);
      textBoxRef.current.disabled = false;
      textBoxRef.current.focus();
    }, 3000);
  }

  function endGame() {
    setIsTimeRunning(false);
    handleShow();
    setStartClicked(false);
  }

  function forceEndGame() {
    setStartClicked(false);
    setIsTimeRunning(false);
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0.0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  useEffect(() => {
    if (startClicked === true) {
      if (delayTime > 0) {
        setTimeout(() => {
          setDelayTime((time) => time - 1);
        }, 1000);
      }
    }
  }, [delayTime, startClicked]);

  useEffect(() => {
    fetch("http://metaphorpsum.com/paragraphs/1/30")
      .then((res) => res.text())
      .then((data) => setTypingData(data));
  }, [isTimeRunning]);

  return (
    <Router>
      <div className="background" data-theme={theme}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Game
                timeRemaining={timeRemaining}
                isTimeRunning={isTimeRunning}
                typingText={typingText}
                activeWordIndex={activeWordIndex}
                correctWordArray={correctWordArray}
                text={text}
                processInput={processInput}
                textBoxRef={textBoxRef}
                startGame={startGame}
                endGame={forceEndGame}
                STARTING_TIME={STARTING_TIME}
                correctWordCount={correctWordCount}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                setSTARTING_TIME={setSTARTING_TIME}
                startClicked={startClicked}
                setStartClicked={setStartClicked}
                delayTime={delayTime}
              />
            }
          />
          <Route path="/stats" element={<Stats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
