const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Galaxy = require('../models/galaxy');

router.get('/', (req, res, next) => {
    Galaxy.find()
        .select("_id galaxyName")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                galaxies: docs.map(doc => {
                    return {
                        _id: doc._id,
                        galaxyName: doc.galaxyName,
                        galaxyDistance: doc.galaxyDistance,
                        galaxyDescription: doc.galaxyDescription,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/galaxies/" + doc._id
                        }
                    }
                })
            };
            // if (docs.length >= 0) {
                res.status(200).json(response);
            // } else {
            //     res.status(404).json({
            //         message: "No entries found in the database"
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
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
                message: "Created a galaxy entry sucessfully",
                createdGalaxy: {
                    galaxyName:result.galaxyName,
                    galaxyDistance:result.galaxyDistance,
                    galaxyDescription:result.galaxyDescription,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/galaxies/" + result._id
                    }
                }
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

    const id = req.params.galaxyId; //TODO: req.body & galaxyName
    Galaxy.findById(id)
        .select("_id galaxyName galaxyDistance galaxyDescription")
        .exec()
        .then(doc => {
            console.log("From database: ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No valid entry found for provided ID!"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

//! Admin only function
router.patch("/:galaxyId", (req, res, next) => {
    const id = req.params.galaxyId; //TODO: req.body & on galaxyName
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Galaxy.update({ _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Galaxy information updated",
                request: {
                    type: "GET",
                    url: "http://localhost:5000/galaxies/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

//! Admin only function
router.delete("/:galaxyId", (req, res, next) => {
    const id = req.params.galaxyId; //TODO: req.body & on galaxyName
    Galaxy.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Galaxy deleted from databas",
                request: {
                    type: "POST",
                    url: "https://localhost:5000/galaxies",
                    body: { galaxyName: 'String', galaxyDistance: 'String', galaxyDescription: 'String'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;