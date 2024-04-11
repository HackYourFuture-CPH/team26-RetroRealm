const crypto = require('crypto');
const knex = require('../../config/db');

exports.generateRetroCode = async (req, res) => {
  try {
    const hash = crypto.createHash('sha256');
    hash.update(Date.now().toString());
    const retroCode = hash.digest('hex').substring(0, 10);

    await knex('Retro').insert({
      retroCode,
    });

    res.status(200).send(retroCode);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while generating retro code' });
  }
};
