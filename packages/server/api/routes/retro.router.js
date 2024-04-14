const express = require('express');

const router = express.Router({ mergeParams: true });
const retroController = require('../controllers/retroController');

router.post('/', (req, res, next) => {
  retroController
    .createTeam(req.body)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
