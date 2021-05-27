const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/seats', SeatController.getAll);
router.route('/seats/:id', SeatController.getId);
router.route('/seats', SeatController.post);
router.route('/seats/:id', SeatController.delete);
router.route('/seats/:id', SeatController.put);

module.exports = router;