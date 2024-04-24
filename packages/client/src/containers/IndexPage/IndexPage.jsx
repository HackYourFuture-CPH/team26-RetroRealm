import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './IndexPage.css';
import JokesRotator from '../Jokes/JokesRotator';

function IndexPage() {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Clear error message when user starts typing again
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(`${apiURL()}/teams/validateTeamCode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teamCode: inputValue }),
        });
        if (response.ok) {
          // Navigate to retroPage

          const body = await response.json();

          navigate(`${body.id}/retro`);
        } else {
          setErrorMessage(
            'Invalid team code. Please try again or make sure you entered the correct team code.',
          );
        }
      } catch (error) {
        setErrorMessage(
          'Failed to validate code. Please try again. Please make sure you entered the correct team code.',
        );
      }
    } else {
      setErrorMessage('Please provide a team code.');
    }
  };

  const handleCreateNewTeamClick = () => {
    navigate('/CreateNewTeamPage');
  };

  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    // Add more jokes as needed
  ];

  return (
    <div className="index-container" id="index-container">
      <div className="left-section">
        <div className="header-container">
          <h2 className="header-text">Join with</h2>
          <img
            className="sort-size-down-icon"
            src="https://img.freepik.com/premium-photo/sort-size-down-icon-green-technology-texture_873925-785782.jpg?w=1480"
            alt="Sort size down icon"
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Team Code"
              value={inputValue}
              onChange={handleInputChange}
              className="input-field"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="bottom-container">
          <h3 className="or-heading">OR</h3>
          <button
            type="button"
            onClick={handleCreateNewTeamClick}
            className="create-button"
          >
            Create New Team
          </button>
        </div>
      </div>
      <div className="right-section">
        <JokesRotator jokes={jokes} />
      </div>
    </div>
  );
}

export default IndexPage;
