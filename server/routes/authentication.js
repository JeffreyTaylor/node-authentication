var passport = require('passport');

exports.postlogin = function (request, response, next) {

    console.log('entering post pogin');

    passport.authenticate('local', function(error, user, info) {

        if (error) { return next(error) }

        if (!user) {

            return response.json(304, {user: null, error: info.message});
        }

        request.logIn(user, function (error) {

            if (error) { return next(error); }

            request.session.user = user;
            return response.json(200, {data: info, user: user});

        });
    })(request, response, next);
};

exports.logout = function(request, response) {

    console.log('logging out');

    request.logout();
    request.session.user = null;
    response.send(204);

};

exports.getUser = function(request, response, next) {

    var user = request.session.user;

    console.log(request);

    response.json(200, { user: user });

};


