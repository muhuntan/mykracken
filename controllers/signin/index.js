'use strict';


var SigninModel = require('../../models/signin');


module.exports = function (router) {

    var model = new SigninModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('signin/index', model);
            }
        });
    });

};
