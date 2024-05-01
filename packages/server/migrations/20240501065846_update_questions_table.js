/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasColor = await knex.schema.hasColumn('Questions', 'color');
  if (!hasColor) {
    return knex.schema.alterTable('Questions', (table) => {
      table.string('color').nullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasColor = await knex.schema.hasColumn('Questions', 'color');
  if (hasColor) {
    return knex.schema.alterTable('Questions', (table) => {
      table.dropColumn('color');
    });
  }
};
