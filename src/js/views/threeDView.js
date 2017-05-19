if ("function" != typeof define)
    var define = require("amdefine")(module);
define(function(require) {
    "use strict";
    var Header = "function" == typeof require ? require("framework/modules/containers/header") : window.Header, 
        //threeDPage = "function" == typeof require ? require("apps/threeD/threeDPage") : window.threeDPage, 
        Footer = "function" == typeof require ? require("framework/modules/containers/footer") : window.Footer;
        var threeDView = Backbone.View.extend({
            tagName: "div",
            className: "appwrapper",
            template: "",
            events: {
                "click #jump": "jumpToNav"
            },
            initialize: function() {
                this.header = new Header,
                //this.threeDPage = new threeDPage,
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
                var self = this, 
                    tmpl = self.getTemplate(), 
                    markup = _.template(tmpl);
                self.$el.html(markup());
                var container = this.$el.find(".container");
                return container.append(this.header.render().el),
                //container.append(this.threeDPage.render().el),
                container.append(this.footer.render().el),
                return this;
            }
        });
    return threeDView;
});
