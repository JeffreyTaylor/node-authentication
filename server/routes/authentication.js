var passport = require('passport');

exports.postlogin = function (request, response, next) {

    console.log(request.body.username);
    console.log(request.body.password);

    var messages = validateRequest(request);

    if (messages.length > 0) {
        return response.json({user: null, messages: messages});
    }

    passport.authenticate('local', function(error, user, info) {

        console.log(info);

        for (var i = 0; i < info.messages.length; i++) {
            console.log(info.messages);
            console.log(info.messages[0]);
            messages.push(info.messages[i]);
        }

        if (error) { return next(error) }

        if (!user) {

            return response.json({user: null, messages: messages});
        }

        request.logIn(user, function (error) {

            if (error) { return next(error); }

            request.session.user = user;
            return response.json({user: user, messages: messages});

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

var validateRequest = function (request) {

    var messages = [];

    if (request.body.username == null) {

        messages.push('username field cannot be blank');
    }
    if (request.body.password == null) {

        messages.push('password field cannot be blank');
    }

    return messages;

};


