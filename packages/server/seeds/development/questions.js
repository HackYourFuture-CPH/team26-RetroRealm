exports.seed = function (knex) {
  // Deletes all existing entries
  return knex('Questions')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('Questions').insert([
        { id: 1, title: 'What went well?', color: 'green' },
        { id: 2, title: "What didn't go well?", color: 'red' },
        { id: 3, title: 'What can be improved?', color: 'yellow' },
        { id: 4, title: 'Any other comments?', color: 'blue' },
      ]);
    });
};
