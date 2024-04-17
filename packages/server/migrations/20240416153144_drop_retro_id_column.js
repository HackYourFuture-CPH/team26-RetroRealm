/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.raw('ALTER TABLE `Questions` DROP CONSTRAINT questions_retro_id_foreign');
    await knex.schema.alterTable('Questions', (table) => {
        table.dropColumn('retro_id');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async (knex) => {
    await knex.schema.alterTable('Answers', (table) => {
        table
        .integer('retro_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('Retro');
    });
  };
  