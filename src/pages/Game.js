import React from "react";
import "./Game.css";

import Button from "react-bootstrap/Button";
import EndScreen from "../components/EndScreen";
import Word from "../components/word";
import Timer from "../components/Timer";

function Game(props) {
  return (
    <div className="App">
      <Timer
        STARTING_TIME={props.STARTING_TIME}
        setSTARTING_TIME={props.setSTARTING_TIME}
        timeRemaining={props.timeRemaining}
        delayTime={props.delayTime}
        startClicked={props.startClicked}
        changeTime={props.changeTime}
        isTimeRunning={props.isTimeRunning}
      />
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
        className="input"
        value={props.text}
        onChange={(e) => props.processInput(e.target.value)}
        disabled={!props.isTimeRunning}
        ref={props.textBoxRef}
      />
      {props.isTimeRunning ? (
        <Button className="start_btn" onClick={props.endGame}>
          Stop
        </Button>
      ) : (
        <Button
          className="start_btn"
          onClick={props.startGame}
          disabled={props.startClicked}
        >
          Start
        </Button>
      )}
      <EndScreen
        startClicked={props.startClicked}
        isTimeRunning={props.isTimeRunning}
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
