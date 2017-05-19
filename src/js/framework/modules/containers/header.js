if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var Utils = "function" == typeof require ? require('framework/utils/helpers') : window.Utils;

    var Header = Backbone.View.extend({

        tagName: 'div',
        className: 'headerwrapper',
        template: '',
        credentials: {},

        events: {
            'submit': 'submit',
            'click #signup': 'signup'
        },

        initialize: function () {
        },

        signup: function () {
            console.log('signup');
            $('#myModal').foundation('reveal', 'open');
            //var url = 'http://127.0.0.1/backbone/#signmeup';
            //$(location).attr('href', url);
        },

        setCredentials: function () {
            var self = this;
            this.credentials = {
                email: self.$el.find('#edit-email').val(),
                password: self.$el.find('#edit-pass').val()
            }

            return this.credentials;
        },

        submit: function (evt) {
            console.log('submit');
            evt.preventDefault();
            var dataInput = this.setCredentials();

            if('' === dataInput.email || '' === dataInput.password) {
                //EventRegister.EventListener.trigger(EventRegister.EventCallout.CREATE_MODAL, {view: new Modal({data:this.msg})});
            } else {
                $.ajax({
                    type: 'POST',
                    url: "http://rest.com/user/login",
                    dataType: 'json',
                    contentType:"application/json",
                    data: JSON.stringify(dataInput),
                }).done(function (response) {
                    if (response) {
                        //var url = 'http://127.0.0.1/backbone';
                        //$(location).attr('href', url);
                    } else {
                        //check that dataType is html
                        console.log("failed");
                        //EventRegister.EventListener.trigger(EventRegister.EventCallout.CREATE_MODAL, {view: new Modal({data:this.msg})});
                    }
                }).fail(function (x) {
                    console.log("error");
                    console.log(x);
                    //EventRegister.EventListener.trigger(EventRegister.EventCallout.CREATE_MODAL, {view: new Modal({data:this.msg})});
                });
            }
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/containers/header.html');

            return self.template
        },

        render: function () {
            var self = this;
            var tmpl = this.getTemplate();

            var markup = _.template(tmpl);
            self.$el.html(markup());
           
            return this;
        }
    });
    return Header;
});