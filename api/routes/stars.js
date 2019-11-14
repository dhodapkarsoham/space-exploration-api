const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Star = require('../models/star');
const checkAuth = require('../middleware/check-auth');
const StarController = require('../controllers/stars');

router.get('/', StarController.stars_get_all);

router.get('/:starId', StarController.stars_getOne_star);

//! Admin only function
router.post('/', checkAuth, StarController.stars_create_star);

//! Admin only function
router.patch("/:starId", checkAuth, StarController.stars_update_star);

//! Admin only function
router.delete("/:starId", checkAuth, StarController.stars_delete_star);

module.exports = router;