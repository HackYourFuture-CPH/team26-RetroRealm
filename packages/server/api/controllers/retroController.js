const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
// const moment = require('moment-timezone');

const getRetro = async () => {
  return knex('Retro').select('Retro.id', 'Retro.title', 'Retro.date');
};

const getRetroById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const retro = await knex('Retro')
      .select('Retro.id as id', 'title', 'date')
      .where({ id });
    if (retro.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return retro;
  } catch (error) {
    return error.message;
  }
};

const deleteRetro = async (retroId) => {
  return knex('Retro').where({ id: retroId }).del();
};

const createRetro = async (body) => {
  await knex('Retro').insert({
    title: body.title,
    date: body.date,
    team_id: 1,
  });

  return {
    successful: true,
  };
};

const addRetro = async (body) => {
  try {
    const retro = await createRetro(body);
    return retro;
  } catch (error) {
    throw new HttpError('Failed to add retro', 500);
  }
};

const createSampleRetro = async () => {
  const newRetro = {
    teamId: '1',
    title: 'New Retro Title',
    date: '2024-04-12',
  };

  try {
    await createRetro(newRetro);
    // eslint-disable-next-line no-console
    console.log('Retro created successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating retro:', error.message);
  }
};

// Call the async function
createSampleRetro();

module.exports = {
  getRetro,
  getRetroById,
  deleteRetro,
  createRetro,
  addRetro,
};
