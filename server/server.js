var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    pass = require('./lib/pass'),
    auth = require('./routes/authentication'),
    account = require('./routes/account'),
    restricted = require('./routes/restricted'),
    api = require('./routes/api'),
    index = require('./routes/index'),
    config = require('./config/config');


//configuration
app.use(express.static(path.join(__dirname, '../client/src/')));
app.set('views', path.join(__dirname, '../client/src/'));
app.engine('html', require('ejs').renderFile);

app.use(passport.initialize());
app.use(express.cookieParser());
app.use(express.session({secret:'secretkey123'}));

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

// index
app.get('/', index.index);

//authentication
app.post('/login', auth.postlogin);
app.post('/logout', auth.logout);
app.get('/user', auth.getUser);

//acount
app.post('/register', account.register);

//restricted
app.get('/account', pass.ensureAuthenticated, restricted.account);
app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin, restricted.admin);

// JSON API
//app.get('/api/id', api.id);

//everything else:
app.get('*', index.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});