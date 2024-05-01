import React, { useState, useEffect } from 'react';
import { apiURL } from '../../apiURL';

export function PastRetroPage() {
  const [completedRetros, setCompletedRetros] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // Default view mode is list

  useEffect(() => {
    const fetchCompletedRetros = async () => {
      try {
        const response = await fetch(`${apiURL()}/past/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch completed retros');
        }
        const responseData = await response.json();
        setCompletedRetros(responseData);
      } catch (error) {
        console.error('Error fetching completed retros:', error);
      }
    };

    fetchCompletedRetros();
  }, []);

  const handleChangeViewMode = (e) => {
    setViewMode(e.target.value);
  };

  const retrosByMonth = Array.isArray(completedRetros)
    ? completedRetros.reduce((groups, retro) => {
        const date = new Date(retro.date); // Assuming retro.date is a valid date string
        const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
        const newGroups = { ...groups };
        if (!newGroups[monthYearKey]) {
          newGroups[monthYearKey] = [];
        }
        newGroups[monthYearKey].push(retro);
        return newGroups;
      }, {})
    : {};

  return (
    <div>
      <h2 className="past-retros-title">Past Retros</h2>
      <div className="viewModeSelectContainer">
        <label>
          View Mode:
          <select
            value={viewMode}
            onChange={handleChangeViewMode}
            className="viewModeSelect"
          >
            <option value="list">List</option>
            <option value="months">Months</option>
          </select>
        </label>
      </div>
      {viewMode === 'list' && (
        <ul className="retro-list">
          {Array.isArray(completedRetros) &&
            completedRetros.map((retro) => (
              <li key={retro.id}>
                Retro ID: {retro.retro_id}, Question ID: {retro.question_id},
                Team Member ID: {retro.team_member_id}, Answer: {retro.answer}
              </li>
            ))}
        </ul>
      )}
      {viewMode === 'months' && (
        <div>
          {Object.keys(retrosByMonth).map((monthYearKey) => (
            <div key={monthYearKey}>
              <h3>{monthYearKey}</h3>
              {retrosByMonth[monthYearKey].map((retro) => (
                <p key={retro.id}>
                  Retro ID: {retro.retro_id}, Question ID: {retro.question_id},
                  Team Member ID: {retro.team_member_id}, Answer: {retro.answer}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
