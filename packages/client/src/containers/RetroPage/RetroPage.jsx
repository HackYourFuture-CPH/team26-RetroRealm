
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../apiURL";

export default function RetroPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");

const updateButton = () => {
    navigate("/updateTeamPage");
  }


  const startRetro = () => {
    // Generate retro code and navigate to RetroPage2
    const retroCode = Math.random().toString(36).substring(2, 10);
    navigate(`/retroPage2/${retroCode}`);
  };


  const pastRetro = () => {
    navigate("/retroHistory");
  };

  const submit = async () => {
    // Get the entered retro code
    const retroCode = document.querySelector('input[type="text"]').value;
    
    try {
      // Validate the retro code
      const response = await fetch(`${apiURL}/validateRetroCode`, {
        method: 'POST',
        body: JSON.stringify({ retroCode }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // when Retro code is valid, navigate to RetroPage2
        navigate(`/retroPage2/${retroCode}`);
      } else {
        // Retro code is invalid, handle the error
        throw new Error('Invalid retro code');
      }
    } catch (error) {
     // console.error(error);
    }
  };

const endRetro = async () => {
  const retroCode = document.querySelector('input[type="text"]').value;

  try {
    const response = await fetch(`${apiURL}/endRetro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          retroCode
      })
    });

    if (response.ok) {
      // console.log('Retro session ended successfully');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
   //  console.error(`Error ending retro session: ${error.message}`);
  }
};

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div>
      <h2>Team</h2>
      <button type="button" onClick={updateButton}>Update team</button>
      <h2>Retro</h2>
      <button type="button" onClick={startRetro}>Start Retro - {currentDate}</button>
      <button type="button" onClick={pastRetro}>Past Retros</button>
      <input type="text" placeholder="Enter Retro Code" />
      <button type="button" onClick={submit}>Submit</button>
      <button type="button"  onClick={endRetro}>End Retro</button>
    </div>
  );
}