/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.alterTable('Teams', async () => {
    await knex.raw(`ALTER TABLE Teams ADD UNIQUE (team_name);`);
    await knex.raw(`ALTER TABLE Teams ADD UNIQUE (team_code);`);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
