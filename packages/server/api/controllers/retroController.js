const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getRetro = async () => {
  return knex('Retro').select(
    'Retro.id',
    'Retro.team_id',
    'Retro.title',
    'Retro.date',
  );
};

const getRetroById = async (id) => {
  // eslint-disable-next-line no-console
  console.log('getRetroById called with ID:', id);

  // Validate if ID is a number
  if (isNaN(id)) {
    // eslint-disable-next-line no-console
    console.log('ID is not a number');
    throw new HttpError('Id should be a number', 400);
  }

  try {
    // eslint-disable-next-line no-console
    console.log('Fetching retro with ID:', id);

    const query = knex('Retro')
      .select('Retro.id as id', 'title', 'date', 'team_id')
      .where({ id });
    // eslint-disable-next-line no-console
    console.log('SQL Query:', query.toString());

    const retro = await query;
    // eslint-disable-next-line no-console
    console.log('Retrieved Retro:', retro);

    if (retro.length === 0) {
      throw new Error(`No retro entry found with the ID ${id}`);
    }
    return retro;
  } catch (error) {
    return error.message;
  }
};

const addRetro = async (body) => {
  try {
    await knex('Retro').insert({
      title: body.title,
      date: body.date,
      team_id: 1,
    });
    return {
      successful: true,
    };
  } catch (error) {
    throw new HttpError('Failed to add retro', 500);
  }
};

const deleteRetro = async (retroId) => {
  return knex('Retro').where({ id: retroId }).del();
};

module.exports = {
  getRetro,
  getRetroById,
  addRetro,
  deleteRetro,
};
