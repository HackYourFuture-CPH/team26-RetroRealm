exports.seed = function (knex) {
  // Deletes all existing entries
  return knex('Questions')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('Questions').insert([
        { id: 1, title: 'What did we do well?' },
        { id: 2, title: 'What did we learn?' },
        { id: 3, title: 'What should we do differently next time?' },
        { id: 4, title: 'What are the roadblocks?' },
      ]);
    });
};
