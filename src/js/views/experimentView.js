if ("function" != typeof define)
    var define = require("amdefine")(module);
define(function(require) {
    "use strict";
    var Header = "function" == typeof require ? require("framework/modules/containers/header") : window.Header, 
        //ExperimentPage = "function" == typeof require ? require("framework/modules/threedviewer/threedviewer") : window.ExperimentPage, 
        ExperimentPage = "function" == typeof require ? require("apps/experiment/galleryPage") : window.ExperimentPage,
        Footer = "function" == typeof require ? require("framework/modules/containers/footer") : window.Footer; 
    
    var ExperimentView = Backbone.View.extend({
        tagName: "div",
        className: "appwrapper",
        template: "",
        events: {
            "click #jump": "jumpToNav"
        },
        initialize: function() {
            this.header = new Header,
            this.experimentPage = new ExperimentPage()
            this.footer = new Footer
        },
        destroy: function() {
            this.undelegateEvents(),
            this.unbind(),
            this.remove()
        },
        jumpToNav: function(evt) {
            evt.preventDefault(),
            window.location.href = "/backbone/uploader"
        },
        getTemplate: function() {
            var self = this;
            return self.template = require("text!templates/views/defaultView.html"),
            self.template
        },
        render: function() {
            var self = this
              , tmpl = this.getTemplate()
              , markup = _.template(tmpl);
            self.$el.html(markup());
            var container = this.$el.find(".container");
            return container.append(this.header.render().el),
            container.append(this.experimentPage.render().el),
            container.append(this.footer.render().el),
            this
        }
    });
    return ExperimentView;
});
