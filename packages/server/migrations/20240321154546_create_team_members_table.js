/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('TeamMembers').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('TeamMembers', (table) => {
        table.increments('id').unsigned().primary();
        table
          .integer('team_id')
          .unsigned()
          .notNullable()
          .references('Teams.id');
        table
          .integer('employee_id')
          .unsigned()
          .notNullable()
          .references('Employees.id');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('TeamMembers');
};
