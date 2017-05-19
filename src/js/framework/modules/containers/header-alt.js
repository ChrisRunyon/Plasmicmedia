if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var HeaderAlt = Backbone.View.extend({
        tagName: 'div',
        className: 'headerwrapper',
        template: '',
      
        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

         getTemplate: function () {
            var self = this;
            
            $.get('js/templates/modules/containers/header-alt.html', function(data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp);
            }, 'html');

        },

        render: function () {
            var self = this;

            self.getTemplate();
            
            return this;
        }
    });
    return HeaderAlt;
});