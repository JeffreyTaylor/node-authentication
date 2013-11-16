var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    db = require('../config/dbSchema');


var formatUser = function (user) {

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        admin: user.admin
    };

};

passport.serializeUser(function(user, done) {

    done(null, user.id);

});

passport.deserializeUser(function(id, done) {

    db.userModel.findById(id, function (error, user) {
        done(error, user);
    });

});

passport.use(new localStrategy(function(username, password, done) {

    var messages = [];

    db.userModel.findOne({ username: username }, function(error, user) {

        if (error) { return done(error); }

        if (!user) {
            messages.push('Unknown user: ' + username);
            return done(null, false, {messages: messages });
        }

        user.comparePassword(password, user, function(error, isMatch) {

            if (error) return done(error);

            if(isMatch) {

                return done(null, formatUser(user), {messages: messages});

            }
            else {
                messages.push('Invalid password');
                return done(null, false, { messages: messages });

            }
        });
    });
}));


exports.ensureAuthenticated = function ensureAuthenticated(request, response, next) {

    if (request.isAuthenticated()) { return next(); }

    return response.json({error: 'not authenticated'});

};

exports.ensureAdmin = function ensureAdmin(request, response, next) {

    return function(request, response, next) {

        if(request.user && request.user.admin === true) {

            next();

        }
        else {

            response.send(403);

        }
    }

};
