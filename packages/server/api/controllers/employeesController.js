const knex = require('../../config/db');

const employees = async (req, res) => {
  try {
    const existingMembers = await knex('Employees').select('*');
    res.status(200).json({ existingMembers });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  employees,
};
