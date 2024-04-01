/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.raw(
    'ALTER TABLE `TeamMembers` ADD CONSTRAINT fk_team_id FOREIGN KEY (team_id) REFERENCES Teams(id);',
  );
  await knex.raw(
    'ALTER TABLE `TeamMembers` ADD CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES Employees(id);',
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw('ALTER TABLE `TeamMembers` DROP CONSTRAINT fk_team_id');
  await knex.raw('ALTER TABLE `TeamMembers` DROP CONSTRAINT fk_employee_id');
};
