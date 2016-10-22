/**
 * FruVer web service.
 *
 * Copyright (c) 2016-present, Alejandro Mantilla <@AlejoJamC>.
 * MIT License.
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 * Define 'UserType' schema.
 */

var UserTypeSchema = new mongoose.Schema({
    name        : {
        type        : String,
        required    : true,
        unique      : true
    },
    description : String,
    status      : Boolean
}, {
    timestamps  : true
});

/**
 * Expose 'UserType'.
 */

module.exports.UserType = mongoose.model('UserType', UserTypeSchema);