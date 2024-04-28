/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const { createHash } = require('node:crypto');

const createTeam = async (body) => {
  const { teamName, newEmployees, existingEmployees } = body;

  // Generate team code.
  const hash = createHash('shake256', { outputLength: 10 });
  hash.update(teamName);

  const teamCode = hash.digest('hex');

  // Create the team
  const [insertedTeamId] = await knex('Teams').insert({
    team_name: teamName,
    team_code: teamCode,
  });

  // Create new members and get there ID's
  if (newEmployees.length) {
    await knex('Employees').insert(newEmployees);
  }

  const insertedMembers = (
    await knex('Employees')
      .whereIn(
        'email',
        newEmployees.map((employee) => employee.email),
      )
      .select('id')
  ).map((newMember) => newMember.id);

  // Create team members
  const teamMembersPayload = [...insertedMembers, ...existingEmployees].map(
    (employeeId) => ({
      team_id: insertedTeamId,
      employee_id: employeeId,
    }),
  );

  await knex('TeamMembers').insert(teamMembersPayload);

  return {
    teamCode,
  };
};

const validateTeamCode = async (body) => {
  const { teamCode } = body;

  const results = await knex('Teams').where({ team_code: teamCode });

  if (results.length === 0) {
    throw new Error('Team not found');
  }

  return results[0];
};

const getTeamMembers = async (params) => {
  const { teamId } = params;

  const results = await knex.raw(`
  select \`Employees\`.first_name, \`Employees\`.last_name, \`TeamMembers\`.id from \`Employees\` 
inner join \`TeamMembers\` on \`TeamMembers\`.employee_id = \`Employees\`.id
where \`TeamMembers\`.team_id = ${Number(teamId)}
  `);

  return {
    teamMembers: results[0],
  };
};

module.exports = {
  createTeam,
  validateTeamCode,
  getTeamMembers,
};
