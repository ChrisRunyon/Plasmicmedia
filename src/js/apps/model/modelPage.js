if (typeof define !== 'function') {var define = require('amdefine')(module);}
define(function (require) {
    'use strict';

    var GenericModel  = (typeof require === 'function') ? require('framework/models/genericModel')               : window.GenericModel,
        CookieManager = (typeof require === 'function') ? require('cookiemanager')                               : window.CookieManager,
        //EventRegister = (typeof require === 'function') ? require('apps/gallery/events/galleryEvents')           : window.EventRegister,
        ThreeDViewer  = (typeof require === 'function') ? require('framework/modules/threedviewer/threedviewer') : window.ThreeDViewer;

    var EventPage = Backbone.View.extend({
        tagName: "div",
        className: "pagewrapper",
        template: '',
        model: new GenericModel(),
        no_cache: new Date().getTime(),
        cookie: null,
        page: null,
        pageData: null,

        events: {
            'click #buy-button': 'redirectToCheckout'
        },

        initialize: function (page) {
            this.page = page;
            this.fetchAuthCookie();
            if (this.cookie.oauth_consumer_key === null) {
                //window.location.href = "/login";
            }        
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

        initData: function (page) {
            var self = this;
           
            this.model.url = "http://customstoreapp.com/model/" + page;

            $.when(this.model.fetch()).then(function (responseText) {
                self.pageData = responseText;
                $('#model-stats').append('<div><strong>Name:</strong> '+responseText.modelName+'</div>');
                $('#model-stats').append('<div><strong>Description:</strong> '+responseText.modelDescription+'</div>');
                $('#model-stats').append('<div><strong>License:</strong> Non-commercial</div>');
                $('#model-stats').append('<div><strong>Price:</strong> Not For Sale</div>');
                $('#model-stats').append('<div></div>');
                self.loadThreeD();
            });
        },

        loadThreeD: function () {
            this.threeDViewer = new ThreeDViewer(this.pageData);
            var container = this.$el.find('#3dView');
            container.append(this.threeDViewer.render().el);
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        redirectToCheckout: function () {
            window.location.href = '/checkout';
        },

        getTemplate: function () {
            var self = this;

            $.get('js/apps/model/modelPage.html?r=' + self.no_cache, function (data) {

                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp(self.pageData));
                self.pageData = self.initData(self.page);
            });
        },

        render: function () {
            var self = this;

            self.getTemplate();

            return this;
        }
    });

    return EventPage;
});