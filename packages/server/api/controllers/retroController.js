const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getRetro = async () => {
  return knex('retro').select('retro.id', 'retro.title', 'retro.date');
};

const getRetroById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const retro = await knex('retro')
      .select('retro.id as id', 'title', 'date')
      .where({ id });
    if (retro.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return retro;
  } catch (error) {
    return error.message;
  }
};

const editRetro = async (retroId, updatedRetro) => {
  if (!retroId) {
    throw new HttpError('retroId should be a number', 400);
  }

  return knex('retro').where({ id: retroId }).update({
    title: updatedRetro.title,
    updatedAt: moment().format(),
  });
};

const deleteRetro = async (retroId) => {
  return knex('retro').where({ id: retroId }).del();
};

const createRetro = async (body) => {
  await knex('retro').insert({
    title: body.title,
    date: body.date,
  });

  return {
    successful: true,
  };
};

module.exports = {
  getRetro,
  getRetroById,
  editRetro,
  deleteRetro,
  createRetro,
};
