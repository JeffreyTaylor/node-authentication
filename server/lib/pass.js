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

    db.userModel.findOne({ username: username }, function(error, user) {

        if (error) { return done(error); }

        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }

        user.comparePassword(password, user, function(error, isMatch) {

            if (error) return done(error);

            if(isMatch) {

                return done(null, formatUser(user));

            }
            else {

                return done(null, false, { message: 'Invalid password' });

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
