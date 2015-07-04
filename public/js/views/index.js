/**
 * Created by muhuntan on 10/05/2014.
 */
define(['text!templates/index.html'], function(indexTemplate) {
    var indexView = Backbone.View.extend({
        el: $('#content'),

        render: function() {
            this.$el.html(indexTemplate);
        }
    });

    return indexView;
});

