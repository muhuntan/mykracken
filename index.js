'use strict';

var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
// Import the data layer
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MemoryStore = session.MemoryStore;
var cookieParser = require('cookie-parser');
var config = {
    //  mail: require('./config/mail')
};

var kraken = require('kraken-js'),
    app = require('express')(),
    options = {
        onconfig: function (config, next) {
            //any config setup/overrides here
            app.set('view engine', 'jade');
            app.use(express.static(__dirname + '/public'));
            // parse application/x-www-form-urlencoded
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
            app.use(session(
                {secret: "SocialNet secret key", store: new MemoryStore()}));
            app.use(cookieParser());
            app.use(function(req, res, next) {
                res.header("Cache-Control", "no-cache, no-store, must-validate");
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Pragma", "no-cache");
                res.header("Access-Control-Allow-Headers", "X-Requested-With");
                next();
            });
            mongoose.connect('mongodb://localhost/nodebackbone');
            next(null, config);
        }
    },
    port = process.env.PORT || 8000;

app.use(kraken(options));

app.use( function(req, res, next){
   // console.log(req);
    next();
})


app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});