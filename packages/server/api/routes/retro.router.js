const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const retroController = require('../controllers/retroController');

router.get('/', (req, res, next) => {
  retroController
    .getRetro()
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  retroController
    .getRetroById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  retroController
    .createRetro(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(400).send('Bad request').end();
    });
});

router.patch('/:id', (req, res, next) => {
  retroController
    .edit(req.params.id, req.body)
    .then((result) => res.json(result))
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
