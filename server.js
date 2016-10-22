/**
 * FruVer web service.
 *
 * Copyright (c) 2016-present, Alejandro Mantilla <@AlejoJamC>.
 * MIT License.
 */

/**
 * Module dependencies.
 */

var express             = require('express'),
    bodyParser          = require('body-parser'),
    favicon             = require('serve-favicon'),
    jade                = require('jade'),
    methodOverride      = require('method-override'),
    moment              = require('moment'),
    path                = require('path'),
    session             = require('express-session'),
    passport            = require('passport'),

    logger              = require('./lib/logger').Logger,
    morgan              = require('morgan'),

    routes              = require('./routes/routes'),

    mongoDB             = require('./lib/mongodb');

// Environment file
require('dotenv').config();
var port = process.env.PORT

// MongoDB connection
mongoDB.SetupMongoDB(process.env.MONGO_URI, process.env.MONGODB);

// Express app instance
var app = express();

// Load configuration, package and environment to the new express app.
// Port.
app.set('port', port);

// Config views and template engine.
// Use `.hbs` for extensions and find partials in `views/partials`.
app.set('view engine', 'jade');

// Favicon path.
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// Logger.
// TODO: Arreglar el error entre wiston y morgan
//app.use(morgan('combined', { 'stream': logger.stream }));
app.use(morgan('dev'));

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride());

// Set Header 'X-Prowered-By'
logger.info('AlejoJamC - FruVer App | API');
app.use(function (req, res, next) {
    res.set('X-Powered-By', '@AlejoJamC');
    next();
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Import static files.
app.use(express.static(path.join(__dirname, 'public')));

// Session.
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '3f1l 4 73g 0t d33n yll43r u s1ht d43r n4c u f1'
}));

// Use the passport package in our application
app.use(passport.initialize());

// Local variables.
// Current year.
app.locals.currentYear = moment().year();

// Path to our public directory
app.use(express.static(__dirname + '/public'));

//ROUTER
//Create our Express router
var router  = express.Router();

// Setup all routes on express router
routes.SetupRouter(router);

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use(process.env.VERSION, router);

// Start the server
app.listen(port);
logger.info('API running on http://localhost:' + port + process.env.VERSION + '/');