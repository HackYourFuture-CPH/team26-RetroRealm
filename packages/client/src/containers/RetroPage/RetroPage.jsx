import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RetroCodeContext } from '../Contexts/RetroCodeContext';
import { apiURL } from '../../apiURL';
import './RetroPage.css';

const questions = [
  { id: 1, text: 'What did we do well?' },
  { id: 2, text: 'What did we learn?' },
  { id: 3, text: 'What should we do differently next time?' },
  { id: 4, text: 'What are the roadblocks?' },
];

function RetroPage() {
  const [comments, setComments] = useState({});
  const [joinCode, setJoinCode] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [selectedRoles, setSelectedRoles] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { retroCode, setRetroCode } = useContext(RetroCodeContext);

  const handleNewRetro = async () => {
    const response = await fetch(`${apiURL()}/retro/generateRetroCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newRetroCode = await response.text();
      setRetroCode(newRetroCode);
    } else {
      throw new Error('Invalid retro code');
    }
  };

  const handleAddComment = async (questionId) => {
    const commentText = inputValues[questionId];
    if (!commentText) return;

    const newCommentId = Math.random().toString(36).substring(2, 10);
    setComments((prevComments) => ({
      ...prevComments,
      [questionId]: [
        ...(prevComments[questionId] || []),
        { id: newCommentId, text: commentText },
      ],
    }));

    setInputValues((prevValues) => ({ ...prevValues, [questionId]: '' }));
  };

  const handleComplete = () => {
    navigate('/joinretro');
  };

  const handleJoin = async () => {
    try {
      if (!joinCode) {
        return;
      }

      const response = await fetch(`${apiURL()}/retro/join/${joinCode}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch retro session: ${response.statusText}`,
        );
      }

      const retroSession = await response.json();

      setRetroCode(retroSession.retroCode);
      setComments(retroSession.comments || {});
      setJoinCode('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(
        'Failed to join the retro session. Please check the code and try again.',
      );
    }
  };

  const handleCommentInput = (questionId, e) => {
    if (e.key === 'Enter') {
      handleAddComment(questionId);
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        [questionId]: e.target.value,
      }));
    }
  };

  return (
    <div>
      <div className="retroContainer">
        <h2 className="retroTitle">Retro</h2>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <div className="newRetroContainer">
          <button
            className="newRetroButton"
            type="button"
            onClick={handleNewRetro}
          >
            New Retro
          </button>
        </div>
        {retroCode && (
          <p className="retroCodeButton">Retro code: {retroCode}</p>
        )}
        <input
          className="joinCodeInput"
          type="text"
          placeholder="Enter code to join"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button className="joinButton" type="button" onClick={handleJoin}>
          Join
        </button>
      </div>
      <div className="questionsContainer">
        {questions.map((question, index) => (
          <div key={question.id} className={`container container${index + 1}`}>
            <div className="question">{question.text}</div>
            <div className={`box box${index + 1}`}>
              {comments[question.id] &&
                comments[question.id].map((comment) => (
                  <div key={comment.id} className="comment">
                    {comment.text}
                  </div>
                ))}
              <div className="commentInputContainer">
                <select
                  className="roleSelect"
                  value={selectedRoles[question.id] || ''}
                  onChange={(e) =>
                    setSelectedRoles((prevRoles) => ({
                      ...prevRoles,
                      [question.id]: e.target.value,
                    }))
                  }
                >
                  <option value="">Select role</option>
                  <option value="teamMember">Team Member</option>
                  <option value="teamLeader">Team Leader</option>
                </select>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={inputValues[question.id] || ''}
                  onChange={(e) => handleCommentInput(question.id, e)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleCommentInput(question.id, e)
                  }
                  className="commentInput"
                />
                <button
                  type="button"
                  onClick={() => handleAddComment(question.id)}
                  className="addCommentButton"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="completeButton" type="button" onClick={handleComplete}>
        Complete
      </button>
    </div>
  );
}

export default RetroPage;
