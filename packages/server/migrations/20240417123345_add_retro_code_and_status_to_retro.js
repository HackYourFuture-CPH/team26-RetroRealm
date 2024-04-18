/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.alterTable('Retro', (table) => {
    table.string('retro_code');
    table.enu('status', ['in-progress', 'completed']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.alterTable('Retro', (table) => {
    table.dropColumn('retro_code');
    table.dropColumn('status');
  });
};
