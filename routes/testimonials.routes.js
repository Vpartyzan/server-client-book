const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.route('/testimonials', TestimonialController.getAll);
router.route('/testimonials/random', TestimonialController.getRandom);
router.route('/testimonials/:id', TestimonialController.getId);
router.route('/testimonials', TestimonialController.post);
router.route('/testimonials/:id', TestimonialController.put);
router.route('/testimonials/:id', TestimonialController.delete);

module.exports = router;