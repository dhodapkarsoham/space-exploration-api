const mongoose = require('mongoose');

const Star = require('../models/star');

exports.stars_get_all = (req, res, next) => {
    Star.find()
        .sort({galaxyName: 1})
        .select("_id starName starDistance starDescription")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                stars: docs.map(doc => {
                    return {
                        _id: doc._id,
                        starName: doc.starName,
                        starDistance: doc.starDistance,
                        starDescription: doc.starDescription,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/stars/" + doc._id
                        }
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

exports.stars_create_star = (req, res, next) => {
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
                message: 'Created a star entry sucessfully',
                createdStar: {
                    starName: result.starName,
                    starDistance: result.starDistance,
                    starDescription: result.starDescription,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/stars/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

}

exports.stars_getOne_star = (req, res, next) => {

    // const id = req.params.starId; //TODO: req.body & starName
    const name = req.body.starName;
    Star.find({starName: name})
        .select("_id starName starDistance starDescription")
        .exec()
        .then(doc => {
            console.log("From database: ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No valid entry found for the provided star name!"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.stars_delete_star = (req, res, next) => {
    // const id = req.params.starId; //TODO: req.body & on starName
    const name = req.body.starName;
    Star.remove({ starName: name })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Star deleted from the database",
                request: {
                    type: "POST",
                    url: "https://localhost:5000/stars",
                    body: { starName: 'String', starDistance: 'String', starDescription: 'String'}
                }
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

// exports.stars_update_star = (req, res, next) => {
//     const id = req.params.starId; //TODO: req.body & starName
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Star.update({ _id: id}, { $set: updateOps })
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: "Star information updated",
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:5000/stars/" + id
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