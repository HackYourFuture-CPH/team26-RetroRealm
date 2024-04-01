/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

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
  await knex('Employees').insert(newEmployees);

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

module.exports = {
  createTeam,
};
