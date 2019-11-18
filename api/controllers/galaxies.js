const mongoose = require('mongoose');

const Galaxy = require('../models/galaxy');

// GET ALL GALAXIES ENDPOINT
exports.galaxies_get_all = (req, res, next) => {
    Galaxy.find()
        .sort({galaxyName: 1})
        .select("_id galaxyName galaxyDistance galaxyDescription")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                galaxies: docs.map(doc => {
                    return {
                        _id: doc._id,
                        galaxyName: doc.galaxyName,
                        galaxyDistance: doc.galaxyDistance,
                        galaxyDescription: doc.galaxyDescription
                    }
                })
            };
                res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// CREATE GALAXY ENDPOINT
exports.galaxies_create_galaxy = (req, res) => {
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
                    _id: result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
            
        });
}

// GET ONE GALAXY ENDPOINT
exports.galaxies_getOne_galaxy = (req, res, next) => {
    const name = req.body.galaxyName; 
    Galaxy.find({galaxyName: name})
        .select("_id galaxyName galaxyDistance galaxyDescription")
        .exec()
        .then(doc => {
            console.log("From database: ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No valid entry found for provided galaxy name!"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
}

// DELETE GALAXY ENDPOINT
exports.galaxies_delete_galaxy = (req, res, next) => {
    const name = req.body.galaxyName;
    Galaxy.remove({ galaxyName: name })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Galaxy deleted from database"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//* PUTTING IT IN FUTURE SCOPE, A BIT MORE OF A WORK

// exports.galaxies_update_galaxy = (req, res, next) => {
    // const id = req.params.galaxyId; 
//     const name = req.body.galaxyName;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Galaxy.update({ galaxyName: name}, { $set: updateOps })
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: "Galaxy information updated",
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:5000/galaxies/" + Galaxy._id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// }
