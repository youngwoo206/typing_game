import React from "react";

import Button from "react-bootstrap/Button";
import EndScreen from "../components/EndScreen";
import Word from "../components/Word";

function Game(props) {
  return (
    <div className="App">
      <h1>Typing Game</h1>
      <h4 className="timer">Time Remaining: {props.timeRemaining}</h4>
      <div
        className={props.isTimeRunning ? "typing_text" : "typing_text_disabled"}
      >
        {props.typingText.map((word, index) => {
          return (
            <Word
              key={index}
              text={word}
              active={index === props.activeWordIndex}
              correct={props.correctWordArray[index]}
            />
          );
        })}
      </div>
      <input
        value={props.text}
        onChange={(e) => props.processInput(e.target.value)}
        disabled={!props.isTimeRunning}
        ref={props.textBoxRef}
      />
      <Button onClick={props.startGame} disabled={props.isTimeRunning}>
        Start
      </Button>
      <EndScreen
        time={props.STARTING_TIME}
        wordCount={props.activeWordIndex}
        correctWordCount={props.correctWordCount}
        show={props.show}
        handleClose={props.handleClose}
        handleShow={props.handleShow}
      />
    </div>
  );
}

export default Game;
