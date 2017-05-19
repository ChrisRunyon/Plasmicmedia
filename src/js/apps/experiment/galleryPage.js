if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var NetworkGateway = (typeof require === 'function') ? require('framework/models/genericModel') : window.NetworkGateway,
        List           = (typeof require === 'function') ? require('framework/modules/list/list')   : window.List;

    var DetailsPage = Backbone.View.extend({
        tagName: "div",
        className: "pagewrapper",
        template: '',
        model: new NetworkGateway(),
        no_cache: new Date().getTime(),
        cookie: null,

        initialize: function () {},

        initData: function () {
            var self = this;
            
            this.model.url = "js/stub/modelAssets.json";
            $.when(this.model.fetch()).then(function (responseText) {
                self.createListContainer(responseText);
            });
        },

        createListContainer: function (data) {
             var options = {
                data: data.result,
                elements: 100
            };

            this.listcontainer = new List(options);
            var container = this.$el.find(".galleryContainer");
            container.append(this.listcontainer.render().el);
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;

            $.get('js/apps/experiment/galleryPage.html?r=' + self.no_cache, function (data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp);

                self.initData();
            });

        },

        render: function () {
            var self = this;

            self.getTemplate();

            return this;
        }
    });
    return DetailsPage;
});