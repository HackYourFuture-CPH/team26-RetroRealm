import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './RetroPage.css';

export default function RetroPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retroCodeValue, setRetroCode] = useState('');
  const [isValidRetroCode, setIsValidRetroCode] = useState(false);

  const updateRetro = () => {
    navigate('/UpdateTeam');
  };

  const pastRetro = () => {
    navigate('/PastRetros');
  };

  const initializeRetroSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiURL()}/generateRetroCode`, {
        // Call the backend endpoint to generate retro code
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
        throw new Error(errorData.error || 'Failed to generate retro code');
      }
    } catch (catchError) {
      setError(catchError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Implement code submission logic here
    try {
      const response = await fetch(`${apiURL()}/validateRetroCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ retroCode: retroCodeValue }),
      });

      if (response.ok) {
        // Retro code is valid, navigate to the next page or perform further actions
        navigate('/NextPage');
      } else {
        // Retro code is invalid, handle accordingly
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid retro code');
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
      <h2 className="retro-header">Retro</h2>
      <button
        className="start-button"
        type="button"
        onClick={initializeRetroSession}
        disabled={loading || isValidRetroCode}
      >
        Start Retro - {currentDate}
      </button>
      <button className="update-button" type="button" onClick={updateRetro}>
        Update Retro
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

      <button
        className="submit-button"
        type="button"
        onClick={handleSubmit}
        disabled={!retroCodeValue || loading || !isValidRetroCode}
      >
        Submit
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
