const crypto = require('crypto');
const knex = require('../../config/db');

exports.generateRetroCode = async (req, res) => {
  try {
    // Generate a unique retro code
    const hash = crypto.createHash('sha256');
    hash.update(Date.now().toString());
    const retroCode = hash.digest('hex').substring(0, 10);

    // Insert the retro code into the "Retro" table
    await knex('Retro').insert({
      retroCode,
    });

    // Send the retro code as a response
    res.status(200).send(retroCode);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while generating retro code' });
  }
};
