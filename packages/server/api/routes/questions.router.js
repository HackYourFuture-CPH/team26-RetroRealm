const express = require('express');

const router = express.Router({ mergeParams: true });

const questionsController = require('../controllers/questionsController');

router.get('/', (req, res, next) => {
  questionsController
    .fetchQuestions(req, res)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
