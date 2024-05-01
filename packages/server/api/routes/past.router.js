const express = require('express');

const router = express.Router({ mergeParams: true });

const pastController = require('../controllers/pastController');

router.get('/', (req, res, next) => {
  pastController
    .fetchPastRetros(req, res)
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log(res);
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
