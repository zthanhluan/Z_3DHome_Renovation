import React, { useState } from "react";
import Emoji from "react-emoji-render";
import "./Feedback.css";
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, feedback, selectedEmoji });
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div className="feedback-popup">
          
          <form className="Feedbackform" onSubmit={handleSubmit}>
          <div className="feedback-header">
  <h2 style={{marginBottom:'5rem'}}>Feedback</h2>
  </div>
  <span className="close-icon" onClick={handleClose} style={{marginTop: '-30%'}} >
    &times;
  </span>

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <label>Choose an emoji that best represents your feedback:</label>
            <div className="emoji-list">
              <Emoji
                text="👍"
                onClick={() => setSelectedEmoji("👍")}
                className={`emoji ${selectedEmoji === "👍" ? "selected" : ""}`}
              />
              <Emoji
                text="😀"
                onClick={() => setSelectedEmoji("😀")}
                className={`emoji ${selectedEmoji === "😀" ? "selected" : ""}`}
              />
              <Emoji
                text="😍"
                onClick={() => setSelectedEmoji("😍")}
                className={`emoji ${selectedEmoji === "😍" ? "selected" : ""}`}
              />
              <Emoji
                text="😡"
                onClick={() => setSelectedEmoji("😡")}
                className={`emoji ${selectedEmoji === "😡" ? "selected" : ""}`}
              />
              <Emoji
                text="🤔"
                onClick={() => setSelectedEmoji("🤔")}
                className={`emoji ${selectedEmoji === "🤔" ? "selected" : ""}`}
              />
              <Emoji
                text="👎"
                onClick={() => setSelectedEmoji("👎")}
                className={`emoji ${selectedEmoji === "👎" ? "selected" : ""}`}
              />
            </div>
            <NavLink to="/Thankyou">
              <button className="feedback-button-submit" type="submit">
                Submit
              </button>
            </NavLink>
          </form>
        </div>
      )}
    </div>
  );
};

export default Feedback;