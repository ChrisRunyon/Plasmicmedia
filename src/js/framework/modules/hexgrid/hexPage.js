if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var HexPage = Backbone.View.extend({
        tagName: "div",
        className: "gridpage",
        template: '',
        model: undefined,

        initialize: function (dataset) {
            this.model = dataset;
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/grid/gridPage.html');
               
            return self.template;
        },

        render: function () {
            var self = this, i;
            var tmpl = this.getTemplate();

            var markup = _.template(tmpl);
            self.$el.html(markup());

            for (i = 0; i < self.model.length; i++) {
                self.$el.find(".gridpagecontainer").append(self.model[i].render().el);
            }
           
            return this;
        }
    });
    return HexPage;
});