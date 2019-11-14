const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Galaxy = require('../models/galaxy');
const checkAuth = require('../middleware/check-auth');
const GalaxyController = require('../controllers/galaxies');

router.get('/', GalaxyController.galaxies_get_all);

router.get('/:galaxyId', GalaxyController.galaxies_getOne_galaxy);

//! Admin only funtion
router.post('/', checkAuth, GalaxyController.galaxies_create_galaxy);

//! Admin only function
router.patch("/:galaxyId", checkAuth, GalaxyController.galaxies_update_galaxy)

//! Admin only function
router.delete("/:galaxyId", checkAuth, GalaxyController.galaxies_delete_galaxy);

module.exports = router;