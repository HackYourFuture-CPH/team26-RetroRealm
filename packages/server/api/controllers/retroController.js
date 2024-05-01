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
  try {
    // eslint-disable-next-line no-console
    console.log('Fetching retro with ID:', id);
    const retro = await knex('Retro')
      .select('Retro.id as id', 'title', 'date', 'team_id')
      .where({ id });
    // eslint-disable-next-line no-console
    console.log('Retrieved Retro:', retro);
    if (retro.length === 0) {
      throw new Error(`No retro entry found with the ID ${id}`);
    }
    return retro;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new HttpError('Failed to fetch retro by ID', 500);
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
    console.error(error);
    throw new HttpError('Failed to add retro', 500);
  }
};

const deleteRetro = async (retroId) => {
  try {
    const deletedCount = await knex('Retro').where({ id: retroId }).del();
    if (deletedCount === 0) {
      throw new HttpError('Retro ID not found', 404);
    }
    return { success: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new HttpError('Failed to delete retro', 500);
  }
};

const completeRetro = async (routeParams, body) => {
  try {
    const answers = body.map((memberAnswer) => ({
      retro_id: routeParams.retroId,
      question_id: memberAnswer.questionId,
      answer: memberAnswer.text,
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
    console.error(error);
    throw new HttpError('Failed to complete retro', 500);
  }
};

const generateRetroCode = async () => {
  const retroCode = String(randomUUID()).substring(0, 8);
  return retroCode;
};

const getCompletedRetrospectives = async () => {
  try {
    const completedRetros = await knex('answers')
      .select('retro_id', 'question_id', 'team_member_id', 'answer')
      .join('retro', 'answers.retro_id', 'retro.id')
      .where('retro.status', '=', 'completed');
    // eslint-disable-next-line no-console
    console.log(completedRetros);
    return completedRetros;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching completed retrospectives:', error);
    throw new HttpError('Failed to fetch completed retrospectives', 500);
  }
};

const joinRetro = async (routeParams, userId) => {
  try {
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
    await knex('RetroParticipants').insert({
      retro_id: results[0].id,
      user_id: userId,
    });
    return results[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new HttpError('Failed to join retro', 500);
  }
};

module.exports = {
  getRetros,
  getRetroById,
  addRetro,
  deleteRetro,
  completeRetro,
  joinRetro,
  generateRetroCode,
  getCompletedRetrospectives,
};
