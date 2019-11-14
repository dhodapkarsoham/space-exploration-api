const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Star = require('../models/star');
const checkAuth = require('../middleware/check-auth');
const StarController = require('../controllers/stars');

router.get('/', StarController.stars_get_all);

router.get('/star', StarController.stars_getOne_star);

//! Admin only function
router.post('/create', checkAuth, StarController.stars_create_star);

//! Admin only function
router.delete("/delete", checkAuth, StarController.stars_delete_star);

//! Admin only function
//* FUTURE SCOPE
// router.patch("/update", checkAuth, StarController.stars_update_star);

module.exports = router;