if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var GenericModel    = (typeof require === 'function') ? require('framework/models/genericModel')                : window.GenericModel,
        EventRegister   = (typeof require === 'function') ? require('framework/events/eventregister')               : window.EventRegister;

    var AddPasswdControls = Backbone.View.extend({
        tagName: "div",
        className: "modalcontainer",
        template: '',
        model: new GenericModel(),
        events: {
            'submit': 'submit',
            'click #close': 'close'
        },
        initialize: function () {},
        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },
        close: function () {
            EventRegister.EventListener.trigger(EventRegister.EventCallout.CLOSE_MODAL);
        },
        submit: function (e) {
            e.preventDefault();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/containers/modal.html'); 

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
    return AddPasswdControls;
});