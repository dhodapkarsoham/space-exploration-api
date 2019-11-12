const mongoose = require('mongoose');

const starSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    starName: { type: String, required: true },
    starDistance: { type: String },
    starDescription: { type: String }
}, {collection: "stars"});

module.exports = mongoose.model('Star', starSchema);