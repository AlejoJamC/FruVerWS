/**
 * FruVer web service.
 *
 * Copyright (c) 2016-present, Alejandro Mantilla <@AlejoJamC>.
 * MIT License.
 */

/**
 * Module dependencies
 */

var logger = require('../lib/logger').Logger;
var moment = require('moment');

/**
 * SetupRouter
 *
 * @description Configure all routes on express router
 *
 * @param {express.Router}      router      The varaible router used by the server
 */

function SetupRouter (router){

    // logger for all request will first hits this middleware
    router.use(function (req, res, next) {
        var now = moment(new Date());

        var date = now.format('DD-MM-YYYY HH:mm');
        logger.info('%s %s %s', req.method, req.url, date);
        next();
    });

    /**
     *  Declare all routes
     */
    //var userRoutes              = require('./Users');
    //var userTypeRoutes          = require('./UserTypes');

    /**
     *  Document:  USERTYPES.JS
     *  Define routes where they are stored endpoints
     * /
    // ENDPOINT: /users/types
    router.route('/users/types')
        .get(authRoutes.isAuthenticated,    userTypeRoutes.getUserTypes)
        .post(authRoutes.isAuthenticated,   userTypeRoutes.postUserType);

    // ENDPOINT: /users/types/:id
    router.route('/users/types/:id')
        .get(authRoutes.isAuthenticated,    userTypeRoutes.getUserTypeById)
        .put(authRoutes.isAuthenticated,    userTypeRoutes.putUserType)
        .patch(authRoutes.isAuthenticated,  userTypeRoutes.patchUserType)
        .delete(authRoutes.isAuthenticated, userTypeRoutes.deleteUserType);
    /**
     * ====================================================================
     */
}

/**
 * Expose 'SetupRouter'.
 * Export the function that initialize all routes
 */

module.exports.SetupRouter = SetupRouter;