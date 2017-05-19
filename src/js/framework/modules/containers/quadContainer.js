if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    /*
    *   Quad section container: 
    *       top = header
    *       left = left column 
    *       right = right column
    *       bottom = footer
    */
    var QuadContainer = Backbone.View.extend({
        tagName: "div",
        className: "quadcontainer",
        template: '',

        initialize: function (options) {
            if(options) {
                this.top = options.top;
                this.left = options.left;
                this.right = options.right;
                this.bottom = options.bottom;
            }
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/containers/quadContainer.html');
                
            return self.template;
        },

        render: function () {
            var self = this;
            var tmpl = this.getTemplate();

            var markup = _.template(tmpl);

            self.$el.html(markup());
            self.$el.find(".top").append(self.top.render().el);
            self.$el.find(".left").append(self.left.render().el);
            self.$el.find(".right").append(self.right.render().el);
            self.$el.find(".bottom").append(self.bottom.render().el);
            return this;
        }
    });
    return QuadContainer;
});