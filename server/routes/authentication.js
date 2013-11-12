var passport = require('passport');

exports.postlogin = function (request, response, next) {

    console.log(request.body.username);
    console.log(request.body.password);

    if (request.body.username == null) {
        return response.json({user: null, error: 'username cannot be blank'});
    }
    if (request.body.password == null) {
        return response.json({user: null, error: 'password cannot be blank'});
    }

    passport.authenticate('local', function(error, user, info) {

        if (error) { return next(error) }

        if (!user) {

            return response.json({user: null, error: info.message});
        }

        request.logIn(user, function (error) {

            if (error) { return next(error); }

            request.session.user = user;
            return response.json({data: info, user: user});

        });
    })(request, response, next);
};

exports.logout = function(request, response) {

    request.logout();
    request.session.user = null;
    response.send(204);

};

exports.getUser = function(request, response, next) {

    var user = request.session.user;

    response.json({ user: user });

};


