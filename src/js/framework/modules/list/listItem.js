if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var ThreeDViewer = (typeof require === 'function') ? require('framework/modules/threedviewer/threedviewer') : window.ThreeDViewer;

    var ListItem = Backbone.View.extend({
        tagName: "li",
        className: "listItem",
        template: '',
        no_cache: new Date().getTime(),
        threeDLoaded: false,

        events: {
            // using mouse events to test
            "click #listButton": "onClick",
            "mouseover": "onOver",
            "mouseout": "onOut"
        },
        
        initialize: function (options) {
            var self = this;
            this.model = options.data;
            this.threeD = new ThreeDViewer(this.model);

            $(document).on('open.fndtn.reveal', '[data-reveal]', function () {
                var element = self.$el.find('.threedviewer').remove();
                self.threeD = new ThreeDViewer(self.model);
                //self.threeD.loadModel(self.model);
                //self.threeD.render();
                //self.threeD.loadScene();
            });

            $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
                self.threeD.destroy();
            });
        },

        onClick: function(evt) {
            var container = this.$el.find('#secondModal');
            container.foundation('reveal','open');
            this.threeD = new ThreeDViewer(this.model);
            //this.threeD.loadModel(this.model);
            //if(!threeDLoaded) {
            container.append(this.threeD.render().el);
            //}
        },

        onOver: function(evt) {
            this.$el.addClass("is-over");
        },

        onOut: function(evt) {
            this.$el.removeClass("is-over");
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/list/listItem.html');
                
            return self.template;
        },

        render: function () {
            var self = this;
            var tmpl = this.getTemplate();

            var markup = _.template(tmpl);
            
            self.$el.html(markup(self.model));
    
            return this;
        }
    });
    return ListItem;
});