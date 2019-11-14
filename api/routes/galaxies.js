const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Galaxy = require('../models/galaxy');
const checkAuth = require('../middleware/check-auth');
const GalaxyController = require('../controllers/galaxies');

router.get('/', GalaxyController.galaxies_get_all);

router.get('/galaxy', GalaxyController.galaxies_getOne_galaxy);

//! Admin only funtion
router.post('/', checkAuth, GalaxyController.galaxies_create_galaxy);

//! Admin only function
router.delete("/delete", checkAuth, GalaxyController.galaxies_delete_galaxy);

//! Admin only function
//* FUTURE SCOPE
// router.patch("/update", checkAuth, GalaxyController.galaxies_update_galaxy)

module.exports = router;