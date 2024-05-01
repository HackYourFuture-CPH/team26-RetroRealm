/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// questions.js
module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Questions').del();

  // Inserts seed entries
  await knex('Questions').insert([
    { id: 1, title: 'What did we do well?', color: 'red' },
    { id: 2, title: 'What did we learn?', color: 'blue' },
    {
      id: 3,
      title: 'What should we do differently next time?',
      color: 'green',
    },
    { id: 4, title: 'What are the roadblocks?', color: 'yellow' },
  ]);
};
