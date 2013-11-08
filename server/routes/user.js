var passport = require('passport');

exports.account = function(req, res) {

    return res.json({ account: 'account' });

};

exports.getlogin = function(req, res) {

    return res.json({login: 'login'});

    //res.render('login', { user: req.user, message: req.session.messages });

};

exports.admin = function(req, res) {

    return res.json({admin: 'admin!'});

};

exports.postlogin = function(req, res, next) {

    console.log('entering post pogin');

    passport.authenticate('local', function(err, user, info) {

        if (err) { return next(err) }

        if (!user) {

            return res.json({user: null, error: info.message});
        }

        req.logIn(user, function(err) {

            if (err) { return next(err); }

            return res.json({data: info, user: user});

        });
    })(req, res, next);
};

exports.logout = function(req, res) {

    req.logout();


};
