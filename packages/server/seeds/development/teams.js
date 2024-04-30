/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes all existing entries
  return knex('Teams')
    .del()
    .then(() => {
      // Deletes ALL existing entries in Teams
      return knex('Teams').insert([
        { team_name: 'Team A', team_code: 'A001' },
        { team_name: 'Team B', team_code: 'B002' },
        { team_name: 'Team C', team_code: 'C003' },
        { team_name: 'Team D', team_code: 'D004' },
        { team_name: 'Team E', team_code: 'E005' },
      ]);
    });
};
