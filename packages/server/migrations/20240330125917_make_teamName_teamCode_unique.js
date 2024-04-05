/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async (knex) => {
  await knex.raw(
    'ALTER TABLE `Teams` ADD CONSTRAINT uq_team_name UNIQUE (team_name);',
  );
  await knex.raw(
    'ALTER TABLE `Teams` ADD CONSTRAINT uq_team_code UNIQUE (team_code);',
  );
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw('ALTER TABLE `Teams` DROP CONSTRAINT uq_team_name;');
  await knex.raw('ALTER TABLE `Teams` DROP CONSTRAINT uq_team_code;');
};
