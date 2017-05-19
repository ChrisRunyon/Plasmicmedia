if ("function" != typeof define)
    var define = require("amdefine")(module);
define(function(require) {
    "use strict";

    //var EventRegister = (typeof require === 'function') ? require('framework/events/eventRegister') : window.EventRegister;
    
    var Router = Backbone.Router.extend({
        routes: {
            "": "index"
        },
        initialize: function(options) {
            
            var self = this;
            options && (this.options = options || {})

            EventRegister.EventListener.on("LOAD_INDEX_PAGE", function (evt) {
                self.index();
            });
            EventRegister.EventListener.on("LOAD_VIDEO_PAGE", function (evt) {
                self.videopage();
            });
            EventRegister.EventListener.on("LOAD_EXPERIMENT_PAGE", function (evt) {
                self.experimentpage();
            });
           
        },
        index: function() {
            window.IndexView = require("views/indexView");
            this.appview = new IndexView();
            $("#content").html(this.appview.render().el);
        },
        videopage: function() {
            var VideoView = require("views/videoView");
            this.appview = new VideoView();
            $("#content").html(this.appview.render().el);
        },
        experimentpage: function() {
            var ExperimentView = require("views/experimentView");
            this.appview = new ExperimentView();
            $("#content").html(this.appview.render().el);
        }
    });

    return Router;
});
