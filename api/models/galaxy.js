const mongoose = require('mongoose');

const galaxySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    galaxyName: {type: String, required: true },
    galaxyDistance: { type: String },
    galaxyDescription: { type: String },
}, {collection: 'galaxies'});

module.exports = mongoose.model('Galaxy', galaxySchema);