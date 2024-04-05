import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './RetroPage.css';

export default function RetroPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retroCodeValue, setRetroCode] = useState('');

  const updateTeamInformation = () => {
    navigate('/updateTeamPage');
  };

  const initializeRetroSession = () => {
    if (!retroCodeValue || retroCodeValue.length !== 8) {
      setError('Retro code must be 8 characters');
      return;
    }
    const newRetroCode = Math.random().toString(36).substring(2, 10);
    setRetroCode(newRetroCode);
    setTimeout(() => {
      navigate(`/RetroPage2/${newRetroCode}`);
    }, 2000);
  };

  const pastRetro = () => {
    navigate('/retroHistory');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiURL}/validateRetroCode`, {
        method: 'POST',
        body: JSON.stringify({ retroCode: retroCodeValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate(`/RetroPage2/${retroCodeValue}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid retro code');
      }
    } catch (catchError) {
      setError(catchError.message);
    } finally {
      setLoading(false);
    }
  };

  const finalizeRetro = async () => {
    if (!retroCodeValue || retroCodeValue.length !== 8) {
      setError('Retro code must be 8 characters');
      return;
    }
    try {
      const response = await fetch(`${apiURL}/endRetro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          retroCode: retroCodeValue,
        }),
      });

      if (response.ok) {
        // Retro session ended successfully
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (catchError) {
      setError(catchError.message);
    }
  };

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div>
      <div className="team-container">
        <h2>Team</h2>
        <button
          className="team-button"
          type="button"
          onClick={updateTeamInformation}
        >
          Update team
        </button>
      </div>
      <h2 className="retro-header">Retro</h2>
      <button
        className="start-button"
        type="button"
        onClick={initializeRetroSession}
      >
        Start Retro - {currentDate}
      </button>
      <button className="past-button" type="button" onClick={pastRetro}>
        Past Retros
      </button>
      <input
        className="input-button"
        type="text"
        placeholder="Enter Retro Code"
        value={retroCodeValue}
        onChange={(e) => setRetroCode(e.target.value)}
      />
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Submit
      </button>
      <button className="finalize-button" type="button" onClick={finalizeRetro}>
        End Retro
      </button>
      {retroCodeValue && <p>Generated Retro Code: {retroCodeValue}</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
