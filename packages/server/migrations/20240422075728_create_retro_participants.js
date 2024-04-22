/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('RetroParticipants', (table) => {
    table.increments('id').primary();
    table.integer('retro_id').unsigned().notNullable();
    table.integer('team_member_id').unsigned().notNullable();

    table.foreign('retro_id').references('id').inTable('Retro');
    table.foreign('team_member_id').references('id').inTable('TeamMembers');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('RetroParticipants');
};
