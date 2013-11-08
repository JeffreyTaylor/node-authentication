var passport = require('passport');


exports.postlogin = function(request, response, next) {

    console.log('entering post pogin');

    passport.authenticate('local', function(err, user, info) {

        if (err) { return next(err) }

        if (!user) {

            return response.json({user: null, error: info.message});
        }

        request.logIn(user, function(err) {

            if (err) { return next(err); }

            return response.json({data: info, user: user});

        });
    })(request, response, next);
};

exports.logout = function(request, res) {

    request.logout();

};
