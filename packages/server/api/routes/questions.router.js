const express = require('express');

const router = express.Router({ mergeParams: true });

const questionsController = require('../controllers/questionsController');

router.get('/', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log((req, res, next));
  questionsController
    .fetchQuestions(req, res)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
