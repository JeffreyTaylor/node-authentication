var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , db = require('../config/dbSchema');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {


    db.userModel.findOne({ username: username }, function(err, user) {

        if (err) { return done(err); }

        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }

        console.log('user retrieved from database is ' + user);


        user.comparePassword(password, user, function(err, isMatch) {

            if (err) return done(err);


            if(isMatch) {
                console.log('done -- passwords match');
                return done(null, user);
            } else {
                console.log('done -- passwords DONT match');
                return done(null, false, { message: 'Invalid password' });

            }
        });
    });
}));

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) { return next(); }
    return res.json({error: 'not authenticated'});

}

exports.ensureAdmin = function ensureAdmin(req, res, next) {

    return function(req, res, next) {
        console.log(req.user);
        if(req.user && req.user.admin === true)
            next();
        else
            res.send(403);
    }
}
