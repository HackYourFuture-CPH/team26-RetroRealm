const express = require('express');
const retroRouter = require('./routes/retroRouter'); // Import the router, not the controller


const router = express.Router();

router.post('/generateRetroCode', retroRouter.generateRetroCode);

module.exports = router;
