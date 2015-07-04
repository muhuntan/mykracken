'use strict';

module.exports = function (router) {

    router.get('/', function(req, res) {
        if ( req.session.loggedIn ) {
            res.send(200);
        } else {
            res.send(401);
        }
    });
};
