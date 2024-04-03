const knex = require('../../config/db');

const fetchExistingMembers = async (req, res) => {
  try {
    const existingMembers = await knex('Employees').select('*');
    res.status(200).json({ existingMembers });
  } catch (error) {
    console.error('Error fetching existing members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  fetchExistingMembers,
};
