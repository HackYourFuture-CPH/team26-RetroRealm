import React, { useState } from 'react';
import './CreateTeam.css';

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const employees = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
    },
  ];

  const handleInputChange = (inputType, e) => {
    if (inputType === 'firstNameInput') {
      setFirstName(e.target.value);
    } else if (inputType === 'lastNameInput') {
      setLastName(e.target.value);
    } else if (inputType === 'emailInput') {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!teamMembers.length) {
      // eslint-disable-next-line no-alert
      alert('Please add at least one member to the team.');
    }
  };

  const handleAddNewMember = () => {
    const existingTeamMember = teamMembers.find(
      (member) => member.email === email,
    );

    if (existingTeamMember) {
      // eslint-disable-next-line no-alert
      alert('The member already exist in the team');
      return;
    }

    if (!firstName || !lastName || !email) {
      // eslint-disable-next-line no-alert
      alert('Please input first name, last name & email');
    } else {
      const newMember = {
        id: null,
        firstName,
        lastName,
        email,
      };

      teamMembers.push(newMember);

      setTeamMembers([...teamMembers]);
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };

  const addExistingMember = (e) => {
    const existingTeamMember = teamMembers.find(
      (member) => member.email === e.target.value,
    );

    if (existingTeamMember) {
      // eslint-disable-next-line no-alert
      alert('The member already exist in the team');
    } else {
      const memeber = employees.find(
        (member) => member.email === e.target.value,
      );

      teamMembers.push(memeber);
      setTeamMembers([...teamMembers]);
    }
  };

  const handleDelete = (emailToDelete) => {
    const newTeamMembers = teamMembers.filter(
      (member) => member.email !== emailToDelete,
    );

    setTeamMembers(newTeamMembers);
  };

  return (
    <div className="create-team">
      <h1>Create New Team</h1>
      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />

        <button type="submit">Create Team</button>
        <br />
        <h2>Members</h2>
        <br />

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleInputChange('firstNameInput', e)}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleInputChange('lastNameInput', e)}
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange('emailInput', e)}
          />
          <br />
        </div>
        <label>Select an employee</label>
        <select onChange={(e) => addExistingMember(e)}>
          <option value="">Select an existing employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.email}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddNewMember}>
          Add Member
        </button>

        <p>Team Secret Code:</p>
      </form>

      <div>
        <h2>Team Members</h2>
        <ul>
          {teamMembers.map((member) => (
            <li key={member.email}>
              {member.firstName} {member.lastName} - {member.email}
              <button type="button" onClick={() => handleDelete(member.email)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateTeam;