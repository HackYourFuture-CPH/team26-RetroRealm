/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('Answers').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('Answers', (table) => {
        table.increments('id').primary();
        table
          .integer('question_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('Questions');
        table
          .integer('team_member_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('TeamMembers');
        table.text('answer').notNullable();
      });
    }
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('Answers').then((exists) => {
    if (exists) {
      return knex.schema.dropTable('Answers');
    }
  });
};
