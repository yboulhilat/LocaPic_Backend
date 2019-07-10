var mongoose = require('mongoose');

var positionSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
});

module.exports = mongoose.model('logPosition', positionSchema);