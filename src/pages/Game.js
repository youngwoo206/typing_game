import React from "react";

import Button from "react-bootstrap/Button";
import EndScreen from "../components/EndScreen";
import Word from "../components/word";
import Timer from "../components/Timer";

function Game(props) {
  return (
    <div className="App">
      {/* <h4 className="timer">Time Remaining: {props.timeRemaining}</h4> */}
      {/* <div className="timer_btn_div">
        <Button onClick={() => props.setSTARTING_TIME(30)}>30 sec</Button>
        <Button onClick={() => props.setSTARTING_TIME(60)}>60 sec</Button>
        <Button onClick={() => props.setSTARTING_TIME(120)}>120 sec</Button>
      </div> */}
      <Timer
        STARTING_TIME={props.STARTING_TIME}
        timeRemaining={props.timeRemaining}
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
        value={props.text}
        onChange={(e) => props.processInput(e.target.value)}
        disabled={!props.isTimeRunning}
        ref={props.textBoxRef}
      />
      {props.isTimeRunning ? (
        <Button onClick={props.endGame}>Stop</Button>
      ) : (
        <Button onClick={props.startGame} disabled={props.startClicked}>
          Start
        </Button>
      )}
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
