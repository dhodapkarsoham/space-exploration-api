const mongoose = require('mongoose');

const galaxySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    galaxyName: String,
    galaxyDistance: String,
    galaxyDescription: String
}, {collection: 'galaxies'});

module.exports = mongoose.model('Galaxy', galaxySchema);