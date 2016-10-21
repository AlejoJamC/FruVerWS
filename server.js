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

    logger              = require('./config/logger').Logger,
    morgan              = require('morgan'),

    routes              = require('./routes/routes'),

    environment         = 'devLocal',
    //config              = require('./config/environment.json')[environment],
    //port                = config.port,

    mongoDB             = require('./config/mongodb');

// MongoDB connection
mongoDB.SetupMongoDB(config.MongoUri, config.MongoDB);

// Express app instance
var app = express();
