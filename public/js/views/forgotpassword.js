/**
 * Created by muhuntan on 13/05/2014.
 */
define(['text!templates/forgotpassword.html'], function(forgotpasswordTemplate) {
    var forgotpasswordView = Backbone.View.extend({
        el: $('#content'),

        events: {
            "submit form": "password"
        },

        password: function() {
            $.post('/forgotpassword', {
                email: $('input[name=email]').val()
            }, function(data) {
                console.log(data);
            });
            return false;
        },

        render: function() {
            this.$el.html(forgotpasswordTemplate);
        }
    });

    return forgotpasswordView;
});