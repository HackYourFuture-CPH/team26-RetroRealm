import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [joinCode, setJoinCode] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();
  const { retroCode, setRetroCode } = useContext(RetroCodeContext);
  const [retroId, setRetroId] = useState();
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeMember, setActiveMember] = useState();
  const { teamId } = useParams();

  const handleNewRetro = async () => {
    const response = await fetch(`${apiURL()}/retro/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        title: 'New retro',
      }),
    });

    const teamMembersResponse = await fetch(`${apiURL()}/teams/${teamId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const results = await response.json();
      const teamMembersList = await teamMembersResponse.json();
      setRetroCode(results.retroCode);
      setSelectedQuestions(questions);
      setTeamMembers(teamMembersList.teamMembers);
      setRetroId(results.retroId);
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
        {
          id: newCommentId,
          text: commentText,
          teamMemberId: activeMember,
          questionId,
        },
      ],
    }));

    setInputValues((prevValues) => ({ ...prevValues, [questionId]: '' }));
  };

  const handleComplete = async () => {
    // navigate('/joinretro');
    const payload = Object.values(comments).reduce(
      (answersArray, commentsArray) => {
        answersArray.push(...commentsArray);
        return answersArray;
      },
      [],
    );

    const response = await fetch(`${apiURL()}/retro/${retroId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // eslint-disable-next-line no-alert
      alert('Retro is completed');
    }
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
      setSelectedQuestions(retroSession.questions);
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

  const renderTeamMembers = (members) =>
    members.map((member) => (
      <option key={member.id} value={member.id}>
        {member.first_name} {member.last_name}
      </option>
    ));

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
        {selectedQuestions.map((question, index) => (
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
                  value={activeMember}
                  // onChange={(e) =>
                  //   setSelectedRoles((prevRoles) => ({
                  //     ...prevRoles,
                  //     [question.id]: e.target.value,
                  //   }))
                  // }
                  onChange={(e) => {
                    setActiveMember(e.target.value);
                  }}
                >
                  <option value="">Select member</option>
                  {renderTeamMembers(teamMembers)}
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
