const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getId);
router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/day/:day', ConcertController.getDay);
router.get('/concerts/:price_min/:price_max', ConcertController.getPriceMinMax);
router.post('/concerts', ConcertController.post);
router.delete('/concerts/:id', ConcertController.delete);
router.put('/concerts/:id', ConcertController.put);

module.exports = router;