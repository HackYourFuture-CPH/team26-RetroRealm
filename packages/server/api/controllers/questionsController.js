const knex = require('../../config/db');

const fetchQuestions = async (req, res) => {
  try {
    const question = await knex('Questions').select('*');
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  fetchQuestions,
};
