import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";

function Timer(props) {
  // const [delayTime, setDelayTime] = useState(3.0);

  return (
    <section className="main">
      <div className="timer_swiper">
        <div className="timer_group">
          <div className="timer_wrapper">
            <div className="timer_container">
              <CircularProgressbar
                value={props.timeRemaining}
                maxValue={props.STARTING_TIME}
                text={
                  props.delayTime
                    ? props.delayTime
                    : props.timeRemaining.toFixed(0)
                }
                styles={buildStyles({
                  pathColor: "blue",
                  trailColor: "red",
                })}
              />
            </div>
            <div className="timer_container">
              <CircularProgressbar
                value={props.timeRemaining}
                maxValue={props.STARTING_TIME}
                text={
                  props.delayTime
                    ? props.delayTime
                    : props.timeRemaining.toFixed(0)
                }
                styles={buildStyles({
                  pathColor: "blue",
                  trailColor: "red",
                })}
              />
            </div>
            <div className="timer_container">
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
                  pathColor: "blue",
                  trailColor: "red",
                })}
              />
            </div>
          </div>
        </div>
        <div className="timer_btn_group">
          <button className="timer_btn">30</button>
          <button className="timer_btn">60</button>
          <button className="timer_btn">120</button>
        </div>
      </div>
    </section>
  );
}

export default Timer;
