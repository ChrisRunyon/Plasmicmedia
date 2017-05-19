if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var Footer = Backbone.View.extend({

        tagName: 'div',
        className: 'footerwrapper',
        template: '',

        initialize: function () {
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

         getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/containers/footer.html');

            return self.template;
        },

        render: function () {
            var self = this;
            var tmpl = this.getTemplate();

            var markup = _.template(tmpl);
            self.$el.html(markup());

            return this;
        }
    });
    return Footer;
});