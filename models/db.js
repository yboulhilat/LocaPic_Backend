var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
};



mongoose.connect('mongodb+srv://bouls:Bouls08128989@yousseflacapsule-hmk9t.mongodb.net/LocaPic?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("----> Connecté à MongoDB ");
        }
    }
);

module.exports = mongoose;