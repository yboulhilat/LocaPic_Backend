var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    facebookid: String,
    historiquePosition: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'logPosition'
    }],
});


module.exports = mongoose.model('users', UserSchema);
