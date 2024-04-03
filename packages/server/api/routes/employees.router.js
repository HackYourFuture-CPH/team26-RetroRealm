const express = require('express');

const router = express.Router({ mergeParams: true });
const employeesController = require('../controllers/employeesController');

router.get('/', (req, res, next) => {
    employeesController
    .fetchExistingMembers(req, res)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;