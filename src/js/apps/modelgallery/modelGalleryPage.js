if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var CookieManager = (typeof require === 'function') ? require('cookiemanager')                     : window.CookieManager,
        GenericModel  = (typeof require === 'function') ? require('framework/models/genericModel')     : window.GenericModel,
        HexGrid       = (typeof require === 'function') ? require('framework/modules/hexgrid/hexGrid') : window.HexGrid;

    var ModelGalleryPage = Backbone.View.extend({
        tagName: "div",
        className: "pagewrapper",
        template: '',
        model: new GenericModel(),
        no_cache: new Date().getTime(),
        cookie: null,
        search: null,

        initialize: function (search) {
            this.search = search;
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

        /*initData: function () {
            var self = this;
           
            if (this.search !== null) {
                $.ajax({
                type: 'POST',
                url: "http://customstoreapp.com/models/search",
                dataType: 'json',
                contentType:"application/json; charset=UTF-8",
                data: JSON.stringify({'keywords': this.search}),
            }).done(function (responseText) {
                if (responseText) {
                    //console.log(responseText);
                    self.createGridContainer(responseText);
                } else {
                    //check that dataType is html
                    console.log("failed");
                    console.log(r);
                }
            }).fail(function (x) {
                console.log("error");
                console.log(x);
            });
            } else {
                this.model.url = "http://customstoreapp.com/models/all";
                $.when(this.model.fetch()).then(function (responseText) {
                    self.createGridContainer(responseText);
                });
            }
        },*/

        initData: function () {
            var self = this;
            
            this.model.url = "js/stub/modelAssets.json";
            $.when(this.model.fetch()).then(function (responseText) {
                self.createGridContainer(responseText);
            });
        },

        createGridContainer: function (data) {

            var options = {
                data: data.result,
                //elements: 1131
                elements: 100
            };

            var container = this.$el.find(".modelGalleryContainer");
            if(data.result === 'no results found') {
                container.append('<h2>No results found</h2>');
            } else {
                this.gridcontainer = new HexGrid(options);
                container.append(this.gridcontainer.render().el);
            }
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;

            $.get('js/apps/modelgallery/modelGalleryPage.html?r=' + self.no_cache, function (data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp);

                self.initData();
            }, 'html');

        },

        render: function () {
            var self = this;

            self.getTemplate();

            return this;
        }
    });
    return ModelGalleryPage;
});