'use strict';

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('logging out now!');
        req.session.loggedIn = false;
        res.send(200);
        
    });
};
