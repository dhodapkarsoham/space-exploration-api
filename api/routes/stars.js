const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Star = require('../models/star');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /stars'
    });
});

// Admin function
router.post('/', (req, res, next) => {
    console.log('Inside POST');
    const star = new Star({
        _id: new mongoose.Types.ObjectId(),
        starName: req.body.starName,
        starDistance: req.body.starDistance,
        starDescription: req.body.starDescription
    });
    star
        .save()
        .then(result => {
            console.log(result);
            
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'Stars posted',
        createdStar: star
    });
});

router.get('/:starName', (req, res, next) => {
    const name = req.params.starName;
    if (name == 'sun') {
        res.status(200).json({
            message: 'You reached Sun',
            name: name
        });
    } else {
        res.status(200).json({
            message: 'You passed a name'
        })
    }
});

module.exports = router;