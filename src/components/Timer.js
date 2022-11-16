import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

function Timer(props) {
  return (
    <div className="timer_container">
      <CircularProgressbar
        value={props.timeRemaining}
        maxValue={props.STARTING_TIME}
        text={props.timeRemaining.toFixed(0)}
        styles={buildStyles({
          pathColor: "blue",
          trailColor: "red",
        })}
      />
    </div>
  );
}

export default Timer;
