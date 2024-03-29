import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './IndexPage.css';

function Index() {
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

    if (inputValue === 'TeamCode') {
      try {
        const response = await fetch(`${apiURL}/CreateNewTeam/${inputValue}`);
        if (response.ok) {
          // Navigate to retroPage
          navigate('/retroPage');
        } else {
          // Set error message for invalid code
          setErrorMessage('Invalid code. Please try again.');
        }
      } catch (error) {
        // Handle fetch error
        // console.error('Error:', error);
        // Set error message for fetch failure
        setErrorMessage('Failed to validate code. Please try again.');
      }
    } else {
      // Set error message for missing code
      setErrorMessage('Please provide a team code.');
    }
  };

  const handleCreateNewTeamClick = () => {
    navigate('/CreateNewTeamPage');
  };

  return (
    <div className="index-container">
      <div className="header-container">
        <h2>Join with</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Team Code"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="my-button">
            Submit
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <h3> OR </h3>
      <button
        type="button"
        onClick={handleCreateNewTeamClick}
        className="my-button"
      >
        Create New Team
      </button>
      <footer>
        <p>Created by RetroRealm</p>
        <p>&copy; 2024 RetroRealm. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Index;
