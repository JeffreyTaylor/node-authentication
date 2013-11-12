var db = require('../config/dbSchema');


exports.register = function (request, response, next) {

    console.log(request.body.username);
    console.log(request.body.email);
    console.log(request.body.password);

    if (request.body.username == null) {
        return response.json({user: null, error: 'username cannot be blank'});
    }
    if (request.body.email == null) {
        return response.json({user: null, error: 'email cannot be blank'});
    }
    if (request.body.password == null) {
        return response.json({user: null, error: 'password cannot be blank'});
    }


    db.userModel.create({
        username: request.body.username ,
        email: request.body.email,
        password: request.body.password,
        admin: false
    });
    å
};
