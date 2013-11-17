db = require('../config/dbSchema');


exports.checkUsername = function (request, response) {

    var usernameToCheck = request.body.value.toLowerCase();

    db.userModel.findOne({ username: usernameToCheck }, function(error, user) {

        if (user) {
            return response.json({exists: true});
        }

        return response.json({exists: false});

    });

};


exports.checkEmail = function (request, response) {

    var emailToCheck = request.body.value.toLowerCase();

    db.userModel.findOne({ email: emailToCheck }, function(error, user) {

        if (user) {
            return response.json({exists: true});
        }

        return response.json({exists: false});

    });

};