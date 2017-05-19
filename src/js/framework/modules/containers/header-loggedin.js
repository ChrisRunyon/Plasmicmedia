if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var EventRegister = (typeof require === 'function') ? require('framework/events/eventregister') : window.EventRegister,
        CookieManager = (typeof require === 'function') ? require('cookiemanager')                  : window.CookieManager;

    var HeaderLoggedIn = Backbone.View.extend({
        tagName: 'div',
        className: 'headerwrapper',
        template: '',
        cookie: null,

        events: {
            'submit': 'submit',
            'click #signup': 'signup'
        },

        initialize: function () {
            this.fetchAuthCookie();

        },

        signup: function () {
            console.log('trip');
            $('#myModal').foundation('reveal', 'open');
        },
      
        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        fetchAuthCookie: function () {
            this.cookie = {
                username: CookieManager.readCookie('username'),
                oauth_consumer_key: CookieManager.readCookie('oauth_consumer_key'),
                oauth_signature: CookieManager.readCookie('oauth_signature'),
                oauth_signature_method: CookieManager.readCookie('oauth_signature_method'),
                oauth_token: CookieManager.readCookie('oauth_token'),
                oauth_version: CookieManager.readCookie('oauth_version')
            };
        },

         getTemplate: function () {
            var self = this;

            $.get('js/templates/modules/containers/header-loggedin.html', function(data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp(self.cookie)).foundation();
            
            }, 'html');

        },

        render: function () {
            var self = this;

            self.getTemplate();
            
            return this;
        }
    });
    return HeaderLoggedIn;
});