const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Galaxy = require('../models/galaxy');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /galaxies'
    });
    console.log('Aat alo');
    
});

//! Admin only funtion
router.post('/', (req, res) => {
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
            res.status(201).json({
                message: 'Handling POST requests to /galaxies',
                createdGalaxy: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
            
        });
});

router.get('/:galaxyId', (req, res, next) => {

    // const name = req.params.galaxyName; 
    //* Can write the below code for galaxy name as well, change findById(id) to find(name)
    //? DO WE NEED TO WRITE ANOTHER GET METHOD ALTOGETHER?

    const id = req.params.galaxyId;
    Galaxy.findById(id)
        .exec()
        .then(doc => {
            console.log("From database: ", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

module.exports = router;