/**
 * Created by muhuntan on 10/05/2014.
 */
define(['router'], function (router) {
    var initialize = function () {
        checkLogin(runApplication);
    };

    var checkLogin = function (callback) {
        $.ajax("/account/authenticated", {
            method: "GET",
            success: function () {
                return callback(true);
            },
            error: function (data) {
                return callback(false);
            }
        });
    };

    var runApplication = function (authenticated) {
        if (!authenticated) {
            window.location.hash = 'login';
        } else {
            window.location.hash = 'index';
        }
        try{
            Backbone.history.start();
            Backbone.history.bind("all", function (route, router) {
                if ('#' + router.routes.index === window.location.hash) {
                    checkLogin(runApplication);
                }
            });
        }catch(e){
            console.log('catching error');
        }

    };

    return {
        initialize: initialize
    };
});