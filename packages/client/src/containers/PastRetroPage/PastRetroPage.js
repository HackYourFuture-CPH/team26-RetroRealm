import React, { useState } from 'react';
import './PastRetro.css';

// Mocked data
const mockedRetrospectives = [
  {
    id: 1,
    date: '2022-03-19',
    title: 'End of Task Retro',
    challenges: [
      {
        id: 1,
        participant: 'Alice',
        comment: 'I struggled with unclear project goals.',
      },
      {
        id: 2,
        participant: 'Bob',
        comment: 'Difficulties in project scoping, resource constraints.',
      },
    ],
    learnings: [
      {
        id: 1,
        participant: 'Bob',
        comment: 'Meeting deadlines, communication breakdowns.',
      },
      { id: 2, participant: 'Mia', comment: 'Late results.' },
    ],
    improvements: [
      { id: 1, participant: 'Alice', comment: 'Make the goals clear.' },
      { id: 2, participant: 'Bob', comment: 'Meetings on time.' },
    ],
    puzzles: [{ id: 1, participant: 'Mia', comment: 'Budget.' }],
  },
  // Add more mocked retrospective objects as needed
];

export const PastRetroPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTitles, setSelectedTitles] = useState([]);
  const retrospectives = selectedDate
    ? mockedRetrospectives.filter((retro) => retro.date === selectedDate)
    : mockedRetrospectives;

  // Function to handle date selection
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Function to handle title selection
  const handleTitleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTitles((prevTitles) =>
      checked
        ? [...prevTitles, value]
        : prevTitles.filter((title) => title !== value),
    );
  };

  return (
    <div>
      <div className="retro-history">
        <h1>RETRO HISTORY</h1>
        {/* Date selection dropdown */}
        <div className="date-selection">
          <label htmlFor="date">Select Date:</label>
          <select id="date" value={selectedDate} onChange={handleDateChange}>
            <option value="">All Dates</option>
            <option value="2024-04-01">2024-04-01</option>
            <option value="2024-04-02">2024-04-02</option>
            <option value="2024-04-03">2024-04-03</option>
            <option value="2024-04-04">2024-04-04</option>
          </select>
        </div>
        {/* Title selection */}
        <div className="title-selection">
          <label htmlFor="titles">Select Titles:</label>
          <select
            id="titles"
            multiple
            value={selectedTitles}
            onChange={handleTitleChange}
          >
            {mockedRetrospectives.map((retro) => (
              <option key={retro.id} value={retro.title}>
                {retro.title}
              </option>
            ))}
          </select>
        </div>
        {/* Display retro history */}
        {retrospectives.map((retro) => (
          <div key={retro.id} className="retro-entry">
            <h2>Retro Title: {retro.title}</h2>
            <div className="question-container">
              <h3>
                What were the biggest challenges or obstacles encountered?
              </h3>
              <div className="comment-box">
                {retro.challenges.map((comment) => (
                  <div key={`challenge-${comment.id}`}>
                    {comment.participant} - {comment.comment}
                  </div>
                ))}
              </div>
            </div>
            <div className="question-container">
              <h3>What did we learn?</h3>
              <div className="comment-box">
                {retro.learnings.map((comment) => (
                  <div key={`learning-${comment.id}`}>
                    {comment.participant} - {comment.comment}
                  </div>
                ))}
              </div>
            </div>
            <div className="question-container">
              <h3>What should we do differently next time?</h3>
              <div className="comment-box">
                {retro.improvements.map((comment) => (
                  <div key={`improvement-${comment.id}`}>
                    {comment.participant} - {comment.comment}
                  </div>
                ))}
              </div>
            </div>
            <div className="question-container">
              <h3>What still puzzles us?</h3>
              <div className="comment-box">
                {retro.puzzles.map((comment) => (
                  <div key={`puzzle-${comment.id}`}>
                    {comment.participant} - {comment.comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="copyright">
        <p className="copyright-text">Created by Retro Team</p>
        <p className="copyright-text">CC 2024 Copyright: Retro Team</p>
      </div>
    </div>
  );
};
