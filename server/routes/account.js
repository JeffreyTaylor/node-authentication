var db = require('../config/dbSchema');

exports.register = function (request, response, next) {

    var messages = [];

    if (request.body.username == null) {
        messages.push('invalid username');
    }
    if (request.body.email == null) {
        messages.push('invalid email');
    }
    if (request.body.password == null) {
        messages.push('invalid password');
    }


    // below is ugly. needs refactored.

    db.userModel.findOne({ email: request.body.email }, function (error, email) {

        console.log(email);
        console.log('checking email')

        if (email != null) {
            messages.push('account with email' + request.body.email + ' already exists');
        }

        if (messages.length > 0) {
            return response.json({user: null, messages: messages});
        }

        db.userModel.create({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
            admin: false
        }, function (error, user) {

            if (error) {
                console.log(error);
                return response.json({user: null, messages: 'error inserting to db'});
            }

            var returnedUser = {
                username: request.body.username,
                email: request.body.email,
                admin: false
            };


            return response.json({user: returnedUser, messages: 'account created!'});

        });
    });
};
