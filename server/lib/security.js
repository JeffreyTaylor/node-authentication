var passport = require('passport');
var mongoStrategy = require('./mongo-strategy');

var formatResponse = function (user) {

    var result = null;

    if (user) {
        result = {
            success: true,
            user: {
                id: response._id.$oid,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                admin: response.admin
            }
        };
    }
    else {
        result = {
            success: false,
            user: null
        };
    }

    return result;
};

var security = {
    initialize: function(url, apiKey, dbName, authCollection) {
        passport.use(new mongoStrategy(url, apiKey, dbName, authCollection));
    },

    login: function(req, res, next) {

        //taken from http://passportjs.org/guide/authenticate/

        return passport.authenticate(mongoStrategy.name,
            function (err, user, info) {

                // failure path
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json(formatResponse(user));
                }

                //success path
                req.logIn(user, function (err) {

                    if (err) {return next(err);}

                    return res.json(formatResponse(user));

                });

            })(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.send(204);
    }
};

module.exports = security;