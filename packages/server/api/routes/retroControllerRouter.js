const express = require('express');

const retroRouter = require('../controllers/retroController');

const router = express.Router();

router.post('/generateRetroCode', retroRouter.generateRetroCode);

module.exports = router;
