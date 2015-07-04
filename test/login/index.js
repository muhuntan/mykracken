/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


describe('/login', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd(),
            onconfig: function(config, next){
                app.use(bodyParser.urlencoded({ extended: false }));
                app.use(bodyParser.json());
                app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
                mongoose.connect('mongodb://localhost/nodebackbone');
                next(null, config);
            }
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
        mongoose.connection.close();
    });


    it('no username and password"', function (done) {
        request(mock)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({email:'', password:''})
            .expect(400)
            .end(function (err, res) {
                done(err);
            });
    });
    it('no username"', function (done) {
        request(mock)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({email:'', password:'muhuntan22'})
            .expect(400)
            .end(function (err, res) {
                done(err);
            });
    });
    it('no password"', function (done) {
        request(mock)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({email:'muhuntan@gmail.com', password:''})
            .expect(400)
            .end(function (err, res) {
                done(err);
            });
    });
    it('wrong username and password"', function (done) {
        request(mock)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({email:'raju', password:'1234'})
            .expect(401)
            .end(function (err, res) {
                done(err);
            });
    });

    it('correct username password"', function (done) {
        request(mock)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({email:'muhuntan@gmail.com', password:'muhuntan22'})
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

});
