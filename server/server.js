var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    routes = require('./routes'),
    api = require('./routes/api'),
    security = require('./lib/security'),
    config = require('./config')



var app = express();

//configuration
app.use(express.static(path.join(__dirname, '../client/src/')));
app.set('views', path.join(__dirname, '../client/src/'));
app.engine('html', require('ejs').renderFile);

app.use(passport.initialize());
app.use(passport.session());

security.initialize(config.mongo.dbUrl, config.mongo.apiKey, config.security.dbName, config.security.usersCollection); // Add a Mongo strategy for handling the authentication

// all environments
app.set('port', process.env.PORT || config.server.listenPort);
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

//security
app.post('/login', security.login);


app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});