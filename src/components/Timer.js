import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

function Timer(props) {
  return (
    <div>
      <CircularProgressbar
        value={props.timeRemaining}
        maxValue={props.STARTING_TIME}
        text={props.timeRemaining}
      />
    </div>
  );
}

export default Timer;
