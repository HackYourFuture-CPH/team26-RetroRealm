const knex = require('../../config/db');

const fetchPastRetros = async (req, res) => {
  try {
    const past = await knex('Answers').select('*');
    res.status(200).json({ past });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  fetchPastRetros,
};
