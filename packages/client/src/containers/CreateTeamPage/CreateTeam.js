import React, {useState} from 'react';

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    {
      firstName: '',
      lastName: '',
      email: '' /* secretCode: generateSecretCode() */,
    },
  ]);
  const [employees,setEmployees] = useState([]);
  const [mockEmployees] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
    },
  ]);
  const [mockMembers] = useState([
    { firstName: 'Michael', lastName: 'Jordan', email: 'mj@example.com' },
    { firstName: 'LeBron', lastName: 'James', email: 'lj@example.com' },
    { firstName: 'Kobe', lastName: 'Bryant', email: 'kb@example.com' },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...teamMembers];
    list[index][name] = value;
    setTeamMembers(list);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddMember = () => {
    
  }

  return (
    <div>
      <h1>Create New Team</h1>
      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input type="text" name="teamName" placeholder="Team Name" required />
        <br />
        <label>Members:</label>
        <br />

        <div key={teamMembers.id}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={teamMembers.firstName}
            onChange={(e) => handleInputChange(teamMembers.id, e)}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={teamMembers.lastName}
            onChange={(e) => handleInputChange(teamMembers.id, e)}
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={teamMembers.email}
            onChange={(e) => handleInputChange(teamMembers.id, e)}
          />
          <br />
        </div>
        <label>Select an employee</label>
        <select>
          <option value="">Select an existing employee</option>
          {mockEmployees.map((employee) => (
            <option key={employee.id} value={employee.email}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddMember}>Add Member</button>
        <button type="submit">Create Team</button>
        <p>Team Secret Code:</p>
      </form>

      <div>
        <h2>Team Members</h2>
        <ul>
          {teamMembers.map((member) => (
            <li>{member.firstName} {member.lastName} - {member.email}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default CreateTeam;
