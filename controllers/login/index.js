'use strict';
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var Account = require('../../models/Account')({}, mongoose, nodemailer);

module.exports = function (router) {
    router.post('/', function(req, res) {
        var email = req.param('email', null);
        var password = req.param('password', null);
        if ( null === email || email.length < 1 || null === password || password.length < 1 ) {
            res.json(400, {status: 'Bad Request'});
            return;
        }

        Account.login(email, password, function(success) {
            if ( !success ) {
                res.send(401);
                return;
            }
            console.log('login was successful');
            req.session.loggedIn = true;
            res.json(200, {status:'OK'});
        });
    });
};
