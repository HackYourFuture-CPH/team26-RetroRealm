import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './JoinRetroPage.css';

export default function JoinRetroPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retroCodeValue, setRetroCode] = useState('');
  const [isValidRetroCode, setIsValidRetroCode] = useState(false);

  const updateTeam = () => {
    navigate('*');
  };

  const pastRetro = () => {
    navigate('/retros/past');
  };

  const initializeRetroSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiURL()}/generateRetroCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const retroCode = await response.text();
        setRetroCode(retroCode);
        setCurrentDate(new Date().toLocaleDateString());
        setIsValidRetroCode(true);
      } else {
        setIsValidRetroCode(false);
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            "We're sorry, but we couldn't start a new Retro session. Please try again later.",
        );
      }
    } catch (catchError) {
      setError(catchError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await initializeRetroSession(); // generate and validate a new retro code

      if (isValidRetroCode) {
        // Retro code is valid, navigate to the next page or perform further actions
        navigate(`/retro/${retroCodeValue}`);
      } else {
        // Retro code is invalid, handle accordingly
        throw new Error('Invalid retro code');
      }
    } catch (catchError) {
      setError(catchError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="retro-container">
      <h2 className="retro-header">Retro</h2>
      <button
        className="retro-button start-button"
        type="button"
        onClick={initializeRetroSession}
        disabled={loading || isValidRetroCode}
      >
        Start Retro - {currentDate}
      </button>
      <p className="retro-code">Retro Code: {retroCodeValue}</p>
      <button
        className="retro-button update-button"
        type="button"
        onClick={updateTeam}
      >
        Update Team
      </button>
      <button
        className="retro-button past-button"
        type="button"
        onClick={pastRetro}
      >
        Past Retros
      </button>
      <input
        className="retro-input"
        type="text"
        placeholder="Enter Retro Code"
        value={retroCodeValue}
        onChange={(e) => setRetroCode(e.target.value)}
      />
      <button
        className="retro-button submit-button"
        type="button"
        onClick={handleSubmit}
        disabled={!retroCodeValue.trim() || loading || !isValidRetroCode}
      >
        Submit
      </button>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}
