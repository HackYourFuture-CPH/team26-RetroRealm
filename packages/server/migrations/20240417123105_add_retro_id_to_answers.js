/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.alterTable('Answers', (table) => {
    table.integer('retro_id').unsigned().notNullable();
  });

  await knex.raw(
    'ALTER TABLE `Answers` ADD CONSTRAINT fk_retro_id FOREIGN KEY (retro_id) REFERENCES Retro(id);',
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw('ALTER TABLE `Answers` DROP CONSTRAINT fk_retro_id');
  await knex.schema.alterTable('Answers', (table) => {
    table.dropColumn('retro_id');
  });
};
