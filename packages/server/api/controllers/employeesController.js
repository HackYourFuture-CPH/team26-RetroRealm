const knex = require('../../config/db');

const fetchEmployees = async (req, res) => {
  try {
    const employees = await knex('Employees').select('*');
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  fetchEmployees,
};
