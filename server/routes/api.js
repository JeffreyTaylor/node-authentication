db = require('../config/dbSchema');


exports.checkUsername = function (request, response) {

    var usernameToCheck = request.body.value.toLowerCase();

    db.userModel.findOne({ username: usernameToCheck }, function(error, user) {

        if (user) {
            return response.json({userExists: true});
        }

        return response.json({userExists: false});

    });

};