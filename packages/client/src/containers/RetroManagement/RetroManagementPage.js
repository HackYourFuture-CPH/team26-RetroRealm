import React, { useEffect, useState } from 'react';
import './RetroManagementPage.css';
// import { FaTrashAlt, FaPaintBrush } from 'react-icons/fa';

export const RetroManagementPage = () => {
  const [retrospectives, setRetrospectives] = useState([]);
  const [newRetroTitle, setNewRetroTitle] = useState('');
  const [addNewRetro, setAddNewRetro] = useState('');

  const fetchRetrospectives = async () => {
    try {
      const response = await fetch('/api/retrospectives');
      if (!response.ok) {
        throw new Error('Failed to fetch retrospectives');
      }
      const data = await response.json();
      setRetrospectives(data);
    } catch (error) {
      console('Error fetching retrospectives:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/retrospectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newRetroTitle }),
      });
      if (!response.ok) {
        throw new Error('Failed to create retrospective');
      }
      fetchRetrospectives();
      setNewRetroTitle('');
    } catch (error) {
      console('Error in creating retrospective:', error);
    }
  };

  useEffect(() => {
    fetchRetrospectives();
  }, []);

  return (
    <div>
      <h1>Create New Retros</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            value={newRetroTitle}
            onChange={(e) => setNewRetroTitle(e.target.value)}
            placeholder="New Title"
          />
          <button type="submit">Create</button>
        </div>
      </form>
      <ul>
        {retrospectives.map((retro) => (
          <li key={retro.id}>{retro.title}</li>
        ))}
      </ul>
      <div>
        <h3>Add New Retros</h3>
        <form>
          <input
            type="text"
            value={addNewRetro}
            onChange={(e) => setAddNewRetro(e.target.value)}
          />
        </form>
        <form>
          <input
            type="text"
            value={addNewRetro}
            onChange={(e) => setAddNewRetro(e.target.value)}
          />
        </form>
        <form>
          <input
            type="text"
            value={addNewRetro}
            onChange={(e) => setAddNewRetro(e.target.value)}
          />
        </form>
        <form>
          <input
            type="text"
            value={addNewRetro}
            onChange={(e) => setAddNewRetro(e.target.value)}
          />
        </form>
      </div>
      <div>
        <p>Created by Retro Team</p>
        <p>CC Copyright: Retro Team</p>
      </div>
    </div>
  );
};
