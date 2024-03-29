/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('Retro', (table) => {
    table.increments('id').primary();
    table
      .integer('team_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Teams');
    table.string('title').notNullable();
    table.date('date').notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Retro');
};
