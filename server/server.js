var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    pass = require('./lib/pass'),
    user_routes = require('./routes/user'),
    api = require('./routes/api'),
    config = require('./config/config')




var app = express();

//configuration
app.use(express.static(path.join(__dirname, '../client/src/')));
app.set('views', path.join(__dirname, '../client/src/'));
app.engine('html', require('ejs').renderFile);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.session({ secret: 'secret key' }));
// all environments
app.set('port', config.server.listenPort);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

// Routes
app.get('/', routes.index);

// JSON API
app.get('/api/name', api.name);

//user.js
pp.get('/account', pass.ensureAuthenticated, user_routes.account);
app.get('/login', user_routes.getlogin);
app.post('/login', user_routes.postlogin);
app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
app.get('/logout', user_routes.logout);


app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});