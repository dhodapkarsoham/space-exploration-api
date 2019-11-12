const mongoose = require('mongoose');

const galaxySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    galaxyName: { type: String, required: true },
    galaxyDistance: { type: String },
    galaxyDescription: { type: String },
    // mainStars: {                                 //* Future scope to connect galaxies and stars
    //     star_1: {
    //         name: String, required: true
    //     },
    //     star_2: {
    //         name: String, required: true
    //     }
    // }
}, {collection: 'galaxies'});

module.exports = mongoose.model('Galaxy', galaxySchema);