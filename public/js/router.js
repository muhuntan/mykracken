/**
 * Created by muhuntan on 13/05/2014.
 */
define(['views/index', 'views/register', 'views/login', 'views/forgotpassword'],
    function (IndexView, RegisterView, LoginView, ForgotPasswordView) {
        var SocialRouter = Backbone.Router.extend({
            currentView: null,

            routes: {
                "index": "index",
                "login": "login",
                "register": "register",
                "forgotpassword": "forgotpassword",
                "logout": "logout"
            },

            changeView: function (view) {
                if (null !== this.currentView) {
                    this.currentView.undelegateEvents();
                }
                this.currentView = view;
                this.currentView.render();
            },

            index: function () {
                this.changeView(new IndexView());
            },

            login: function () {
                this.changeView(new LoginView());
            },

            forgotpassword: function () {
                this.changeView(new ForgotPasswordView());
            },

            register: function () {
                this.changeView(new RegisterView());
            },

            logout: function () {
                $.ajax("/logout", {
                    method: "GET",
                    success: function () {
                        window.location.hash = 'login';
                    },
                    error: function (data) {
                        window.location.hash = 'error';
                    }
                });
            }
        });

        return new SocialRouter();
    });