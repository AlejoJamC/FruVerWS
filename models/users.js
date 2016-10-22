/**
 * FruVer web service.
 *
 * Copyright (c) 2016-present, Alejandro Mantilla <@AlejoJamC>.
 * MIT License.
 */

/**
 * Module dependencies.
 */

var mongoose    = require('mongoose');

var bcrypt      = require('bcrypt-nodejs');
var logger      = require('../lib/logger').Logger;
var UserType    = require('./userTypes').UserType;

/**
 * Define 'User' schema.
 */

var UserSchema = new mongoose.Schema({
    firstName       : String,
    lastName        : String,
    identification  : String,
    birthday        : Date,
    email           : {
        type: String,
        required: true,
        unique: true
    },
    emailVefified   : Boolean,
    password        : {
        type: String,
        required: true
    },
    mobile          : String,
    picture         : String,
    type            : [ UserType.schema ],
    status          : Boolean
}, {
    timestamps: true
});

/**
 * Execute before each user.save() call
 */

UserSchema.pre('save', function (callback) {
    var user = this;

    // Break out if the password hasn't changed
    if(!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            // Check for errors and show message
            if(err){
                logger.error(err);
                return callback(err);
            }

            user.password = hash;
            callback();
        });
    })
});

/**
 * Check if password is correct.
 */

UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            return callback(err);
        }
        // Make the comparation and send the answer
        callback(null, isMatch);
    });
};

/**
 * Expose 'User'.
 */

module.exports.User = mongoose.model('User', UserSchema);