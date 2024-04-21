const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const { randomUUID } = require('node:crypto');

const getRetros = async (queryParams) => {
  return knex('Retro')
    .select('Retro.id', 'Retro.team_id', 'Retro.title', 'Retro.date')
    .where({
      team_id: queryParams.teamId,
    });
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
    const retroCode = randomUUID();

    const result = await knex('Retro')
      .insert({
        title: body.title,
        date: new Date(),
        team_id: body.teamId,
        retro_code: retroCode,
        status: 'in-progress',
      })
      .returning('id');

    return {
      retroId: result[0],
      retroCode,
      successful: true,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw new HttpError('Failed to add retro', 500);
  }
};

const deleteRetro = async (retroId) => {
  return knex('Retro').where({ id: retroId }).del();
};

const completeRetro = async (routeParams, body) => {
  try {
    const answers = body.map((memberAnswer) => ({
      retro_id: routeParams.retroId,
      question_id: memberAnswer.questionId,
      answer: memberAnswer.answer,
      team_member_id: memberAnswer.teamMemberId,
    }));

    await knex('Answers').insert(answers);

    await knex('Retro')
      .update({
        status: 'completed',
      })
      .where('id', routeParams.retroId);

    return {
      successful: true,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw new HttpError('Failed to complete retro', 500);
  }
};

const generateRetroCode = async () => {
  // Generate a single 8-character retro code without been inside a double-quoted string
  const retroCode = String(randomUUID()).substring(0, 8);
  return retroCode;
};

const joinRetro = async (routeParams, userId) => {
  // Check if the user has already joined the retro session
  const alreadyJoined = await knex('RetroParticipants')
    .where({
      retro_id: routeParams.retroCode,
      user_id: userId,
    })
    .first();

  if (alreadyJoined) {
    throw new HttpError('You have already joined this retro session', 400);
  }

  const results = await knex('Retro')
    .select('Retro.id', 'Retro.team_id', 'Retro.title', 'Retro.date')
    .where({
      retro_code: routeParams.retroCode,
    });

  // Add the user to the retro session
  await knex('RetroParticipants').insert({
    retro_id: results[0].id,
    user_id: userId,
  });

  return results[0];
};

module.exports = {
  getRetros,
  getRetroById,
  addRetro,
  deleteRetro,
  completeRetro,
  joinRetro,
  generateRetroCode,
};
