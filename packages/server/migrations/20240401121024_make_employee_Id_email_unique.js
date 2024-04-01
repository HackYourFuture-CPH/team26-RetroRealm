/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.raw('ALTER TABLE `Employees` ADD CONSTRAINT uq_id UNIQUE (id)');
  await knex.raw(
    'ALTER TABLE `Employees` ADD CONSTRAINT uq_email UNIQUE (email)',
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw('ALTER TABLE `Employees` DROP CONSTRAINT uq_id');
  await knex.raw('ALTER TABLE `Employees` DROP CONSTRAINT uq_email');
};
