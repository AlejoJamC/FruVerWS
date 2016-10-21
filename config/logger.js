/**
 * FruVer web service.
 *
 * Copyright (c) 2016-present, Alejandro Mantilla <@AlejoJamC>.
 * MIT License.
 */

/**
 * Module dependencies
 */
var fs          = require('fs'),
    path        = require('path'),
    winston     = require('winston');

// Paths to my logs files    filedebug   = path.join(__dirname,'..','logs','debug.log'),
    filerror    = path.join(__dirname,'..','logs','error.log'),
    fileinfo    = path.join(__dirname,'..','logs','info.log');

// Activate winston emitter
winston.emitErrs = true;

// Remove the file, ignoring any errors
try {
    if(!fs.statSync(debugPath)){
        fs.mkdirSync(debugPath);
    }
    if(!fs.statSync(errorPath)){
        fs.mkdirSync(errorPath);
    }
    if(!fs.statSync(infoPath)){
        fs.mkdirSync(infoPath);
    }

    fs.unlinkSync(fileinfo);
    fs.unlinkSync(filedebug);
    fs.unlinkSync(filerror);
}
catch (ex) { }

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            level: 'info',
            name: 'info-file',
            filename: fileinfo,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.File)({
            level: 'error',
            name: 'error-file',
            filename: filerror,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.File)({
            level: 'debug',
            name: 'debug-file',
            filename:filedebug,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.Console)({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

/**
 * Export winston logger coniguration
 */

module.exports.Logger = logger;