import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EndScreen(props) {
  const minutes = props.time / 60;
  const speed = props.wordCount / minutes;
  const accuracy = (props.correctWordCount / props.wordCount) * 100;

  console.log(accuracy);

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Body>
          <h4>Nice Run! Here are your stats:</h4>
          <p>Typing Speed: {speed} wpm</p>
          <p>Accuracy: {Math.round(accuracy * 10) / 10}%</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EndScreen;
