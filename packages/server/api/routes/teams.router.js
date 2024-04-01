const express = require('express');

const router = express.Router({ mergeParams: true });
const teamsController = require('../controllers/teamsController');

router.post('/', (req, res, next) => {
  teamsController
    .createTeam(req.body)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
