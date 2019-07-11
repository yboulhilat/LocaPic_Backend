var mongoose = require('mongoose');

var PositionSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
});


var UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    picture: String,
    facebookid: String,
    historiquePosition: [PositionSchema],
});

module.exports = mongoose.model('users', UserSchema);
