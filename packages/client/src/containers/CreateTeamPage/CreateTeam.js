import React, { useState, useEffect } from 'react';
import { apiURL } from '../../apiURL';
import './CreateTeam.css';

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [fromExistingEmployees, setFromExistingEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const fetchEmployeesAPIMethod = `${apiURL()}/employees`;

      try {
        const response = await fetch(fetchEmployeesAPIMethod);
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (inputType, e) => {
    if (inputType === 'firstNameInput') {
      setFirstName(e.target.value);
    } else if (inputType === 'lastNameInput') {
      setLastName(e.target.value);
    } else if (inputType === 'emailInput') {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (![...teamMembers, ...fromExistingEmployees].length) {
      // eslint-disable-next-line no-alert
      alert('Please add at least one member to the team.');
      return;
    }
    try {
      const postEmployeesAPIMethod = `${apiURL()}/teams`;
      const response = await fetch(postEmployeesAPIMethod, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName,
          newEmployees: teamMembers.map((member) => ({
            first_name: member.firstName,
            last_name: member.lastName,
            email: member.email,
          })),
          existingEmployees: fromExistingEmployees.map((member) => member.id),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      const data = await response.json();
      alert(`Team created successfully! Team Code: ${data.teamCode}`);
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
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

      setTeamMembers((prevTeamMembers) => [...prevTeamMembers, newMember]);

      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };

  const addExistingMember = (e) => {
    console.log('addExistingMember');
    const existingTeamMember = teamMembers.find(
      (member) => member.email === e.target.value,
    );
    console.log(existingTeamMember);

    if (existingTeamMember) {
      // eslint-disable-next-line no-alert
      alert('The member already exist in the team');
    } else {
      const excistingMember = employees.find(
        (member) => member.email === e.target.value,
      );
      console.log(excistingMember);

      setFromExistingEmployees((prevFromExistingEmployees) => [
        ...prevFromExistingEmployees,
        excistingMember,
      ]);
    }
  };

  const handleDelete = (emailToDelete) => {
    const newTeamMembers = teamMembers.filter(
      (member) => member.email !== emailToDelete,
    );

    setTeamMembers(newTeamMembers);
  };

  const buttonClasses = ['primaryButton'];

  if (!firstName || !lastName || !email) {
    buttonClasses.push('buttonDisabled');
  }

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
          <button
          type="button"
          className={`${buttonClasses.join(' ')}`}
          onClick={handleAddNewMember}
          disabled={!firstName || !lastName || !email}
        >
          Add Member
        </button> <br />

        </div>
        <label>Select an employee</label>
        <select onChange={(e) => addExistingMember(e)}>
          <option value="">Select an existing employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.email}>
              {employee.first_name} {employee.last_name}
            </option>
          ))}
        </select>
       

        <p>Team Secret Code:</p>
      </form>

      <div>
        <h2>Team Members</h2>
        <ul>
          {[...teamMembers, ...fromExistingEmployees].map((member) => (
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
