const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Galaxy = require('../models/galaxy');

router.get('/ab', (req, res) => {
    res.status(200).json({
        message: 'Handling GET requests to /galaxies'
    });
    console.log('Aat alo');
    
});

//Admin funtion
router.post('/', (req, res, next) => {
    console.log('Inside POST');
    const galaxy = new Galaxy({
        _id: new mongoose.Types.ObjectId(),
        galaxyName: req.body.galaxyName,
        galaxyDistance: req.body.galaxyDistance,
        galaxyDescription: req.body.galaxyDescription
    });
    galaxy
        .save()
        .then(result => {
            console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST requests to /galaxies',
        createdGalaxy: galaxy
    });
});

router.get('/:galaxyName', (req, res, next) => {
    const name = req.params.galaxyName;
    if (name == 'andromeda') {
        res.status(200).json({
            message: 'You reached Andromeda',
            name: name
        });
    } else {
        res.status(200).json({
            message: 'You passed a name'
        })
    }
});

module.exports = router;