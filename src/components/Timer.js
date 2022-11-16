import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

function Timer(props) {
  // const [delayTime, setDelayTime] = useState(3.0);

  return (
    <div className="timer_group">
      <div className="timer_container">
        <CircularProgressbar
          value={props.timeRemaining}
          maxValue={props.STARTING_TIME}
          text={
            props.delayTime ? props.delayTime : props.timeRemaining.toFixed(0)
          }
          styles={buildStyles({
            pathColor: "blue",
            trailColor: "red",
          })}
        />
      </div>
    </div>
  );
}

export default Timer;
