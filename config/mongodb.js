/**
 * FruVer web service.
 *
 * Copyright (c) 2016-present, Alejandro Mantilla <@AlejoJamC>.
 * MIT License.
 */

/**
 * Module dependencies
 */
var logger = require('./logger').Logger;

/**
 * SetupMongoDB
 *
 * @description Configures and initiates the connection with the NoSQL MongoDB database.
 *
 * @param {string}      DBName      Name of the database to connect.
 * @param {string}      HostUri     Connection Uri to MongoDB server.
 */

function SetupMongoDB (HostUri, DBName){
    /**
     *  required packages
     */
    var mongoose = require('mongoose');

    mongoose.connect(HostUri + DBName);
    logger.info('Connecting to MongoDB server, database: ' + DBName);

    var con = mongoose.connection;
    // logger conexión con la base de datos
    con.once('open', function () {
        logger.info('Connected to MongoDB successfully!');
    });

}

/**
 * Export the function that initialize the connection
 */

module.exports.SetupMongoDB = SetupMongoDB;