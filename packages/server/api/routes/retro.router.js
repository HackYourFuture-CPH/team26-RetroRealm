const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const retroController = require('../controllers/retroController');

router.get('/', (req, res, next) => {
  retroController
    .getRetros(req.query)
    .then((result) => res.json(result))
    .catch(next);
});

// Generate a new retro code
router.post('/generateRetroCode', (req, res) => {
  retroController
    .generateRetroCode()
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send('Failed to generate retro code').end();
    });
});

// Create a new retro
router.post('/', (req, res) => {
  retroController
    .addRetro(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send('Failed to add retro').end();
    });
});

// Complete a retro
router.post('/:retroId/complete', (req, res) => {
  retroController
    .completeRetro(req.params, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send('Failed to complete the retro').end();
    });
});

// Join a retro
router.get('/join/:retroCode', (req, res) => {
  retroController
    .joinRetro(req.params)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send('Failed to join the retro').end();
    });
});

router.get('/:id', ({ params: { id } }, res, next) => {
  const idNumber = Number.parseInt(id, 10);
  retroController
    .getRetroById(idNumber)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.delete('/:id', (req, res) => {
  retroController
    .deleteRetro(req.params.id, req)
    .then((result) => {
      // If result is equal to 0, then that means the retro id does not exist
      if (result === 0) {
        res.status(404).send('The retro ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
});

module.exports = router;
