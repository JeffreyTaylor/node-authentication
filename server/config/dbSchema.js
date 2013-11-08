var mongoose = require('mongoose'),
    config = require('../config/config');


exports.mongoose = mongoose;

var uriString = config.mongo.dbLocal;
var mongoOptions = { db: { safe: true }};

mongoose.connect(uriString, mongoOptions, function (error, response) {

    if (error) {
        console.log ('ERROR connecting to: ' + uriString + '. ' + error);
    } else {
        console.log ('Successfully connected to: ' + uriString);
    }
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// User schema
var userSchema = new Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    admin: { type: Boolean, required: true }

}, { collection: 'users' });


// to do, add decryption.
// as a prerequisite, though, encrypted passwords need to be
// stored in database
userSchema.methods.comparePassword = function(candidatePassword, user, done) {

    console.log('comparing passwords');
    var isMatch = false;

    if (candidatePassword == user.password) {

        console.log('password match!');
        isMatch = true;

    }

    return done(null, isMatch);

};

// Export user model
var userModel = mongoose.model('User', userSchema);

exports.userModel = userModel;
