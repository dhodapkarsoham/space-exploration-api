const mongoose = require('mongoose');

const starSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    starName: String,
    starDistance: String,
    starDescription: String
});

module.exports = mongoose.model('Star', starSchema);