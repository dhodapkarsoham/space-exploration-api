const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Star = require('../models/star');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /stars'
    });
});

//! Admin only function
router.post('/', (req, res) => {
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
            res.status(201).json({
                message: 'Stars posted',
                createdStar: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.get('/:starId', (req, res, next) => {
    
    // const name = req.param.starName; 
    //* Can write the below code for star name as well, change .findById(id) to .find(name)
    //? DO WE NEED TO WRITE ANOTHER GET METHOD ALTOGETHER?

    const id = req.params.starId;
    Star.findById(id)
        .exec()
        .then(doc => {
            console.log("From database: ", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;