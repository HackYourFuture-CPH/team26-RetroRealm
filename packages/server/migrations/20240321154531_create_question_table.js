/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Questions', (table) => {
    table.increments('id').primary();
    table
      .integer('retro_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Retro');
    table.string('title').notNullable();
    table.string('color').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Questions');
};
