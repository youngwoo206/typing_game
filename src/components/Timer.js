import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

function Timer(props) {
  return (
    <section className="main">
      <div className="timer_group">
        <div className="timer_wrapper">
          <CircularProgressbar
            value={props.timeRemaining}
            maxValue={props.STARTING_TIME}
            text={
              props.startClicked
                ? props.delayTime
                  ? props.delayTime
                  : props.timeRemaining.toFixed(0)
                : props.STARTING_TIME
            }
            styles={buildStyles({
              pathColor: "var(--accent)",
              trailColor: "var(--secondary)",
              textColor: "var(--timer-text-color)",
            })}
          />
        </div>
      </div>
      <div className="timer_btn_group">
        <button
          className={
            props.STARTING_TIME === 30 ? "active_timer_btn" : "timer_btn"
          }
          onClick={() => props.setSTARTING_TIME(30)}
          disabled={props.isTimeRunning}
        >
          30
        </button>
        <button
          className={
            props.STARTING_TIME === 60 ? "active_timer_btn" : "timer_btn"
          }
          onClick={() => props.setSTARTING_TIME(60)}
          disabled={props.isTimeRunning}
        >
          60
        </button>
        <button
          className={
            props.STARTING_TIME === 120 ? "active_timer_btn" : "timer_btn"
          }
          onClick={() => props.setSTARTING_TIME(120)}
          disabled={props.isTimeRunning}
        >
          120
        </button>
      </div>
    </section>
  );
}

export default Timer;
