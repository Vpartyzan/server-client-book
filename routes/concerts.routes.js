const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts', ConcertController.getAll);
router.route('/concerts/:id', ConcertController.getId);
router.route('/concerts', ConcertController.post);
router.route('/concerts/:id', ConcertController.delete);
router.route('/concerts/:id', ConcertController.put);

module.exports = router;