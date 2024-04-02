import React, { useEffect, useState } from 'react';
import './RetroManagementPage.css';
// import { FaTrashAlt, FaPaintBrush } from 'react-icons/fa';

// const initialInputField = {
//   id: Date.now() + Math.random(),
//   value: '',
// };

export const RetroManagementPage = () => {
  const [retrospectives, setRetrospectives] = useState([]);
  const [newRetroTitle, setNewRetroTitle] = useState('');
  const [inputFields, setInputFields] = useState([]);

  const fetchRetrospectives = async () => {
    try {
      const response = await fetch('/api/retrospectives');
      if (!response.ok) {
        throw new Error('Failed to fetch retrospectives');
      }
      const data = await response.json();
      setRetrospectives(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching retrospectives:', error);
    }
  };

  useEffect(() => {
    fetchRetrospectives();
  }, []);

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
      // eslint-disable-next-line no-console
      console.error('Error in creating retrospective:', error);
    }
  };

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      { id: Date.now() + Math.random(), value: '' },
    ]);
  };

  const handleInputChange = (id, newValue) => {
    setInputFields((prevInputFields) =>
      prevInputFields.map((inputField) =>
        inputField.id === id ? { ...inputField, value: newValue } : inputField,
      ),
    );
  };

  const removeInputField = (id) => {
    const fields = inputFields.filter((inputField) => inputField.id !== id);
    setInputFields(fields);
  };

  // useEffect(() => {
  //   fetchRetrospectives();
  // }, []);

  return (
    <div className="retro-management-page">
      <h1 className="title">Create New Retros</h1>
      <form className="new-retro-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            value={newRetroTitle}
            onChange={(e) => setNewRetroTitle(e.target.value)}
            placeholder="New Title"
          />
          <button type="submit" className="create-button">
            Create
          </button>
        </div>
      </form>
      <ul className="retrospectives-list">
        {retrospectives.map((retro) => (
          <li className="list-item" key={retro.id}>
            {retro.title}
          </li>
        ))}
      </ul>
      <div className="add-new-retros">
        <h3 className="heading">Add New Retros</h3>
        {inputFields.map((inputField) => (
          <div key={inputField.id} className="input-group">
            <input
              className="input-element"
              type="text"
              value={inputField.value}
              onChange={(e) => handleInputChange(inputField.id, e.target.value)}
              placeholder="Enter new retro details"
            />
            <button
              onClick={() => removeInputField(inputField.id)}
              type="button"
              className="delete-button"
            >
              X
            </button>
          </div>
        ))}
        <button onClick={addInputField} type="button" className="add-button">
          Add
        </button>
      </div>
      <div className="copyright">
        <p className="copyright-text">Created by Retro Team</p>
        <p className="copyright-text">CC Copyright: Retro Team</p>
      </div>
    </div>
  );
};
