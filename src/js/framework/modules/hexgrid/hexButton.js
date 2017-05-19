if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    //var EventRegister = (typeof require === 'function') ? require('apps/gallery/events/galleryEvents') : window.EventRegister;

    var HexButton = Backbone.View.extend({
        tagName: "div",
        className: "gridbutton",
        template: '',
        model: undefined,
        _isSelected: false,

        initialize: function (dataset) {
            this.model = dataset;
        },

        /* jQuery-ui bug in selectable plugin prevents onclick event
        *  Register dblclick and click events here.
        *  Work around is provided here - 
        *  https://forum.jquery.com/topic/selectable-doesn-t-fire-click-event
        */
        events: {
            "dblclick": "onClick",
            "click": "onClick",
            mouseover: "onHover",
            mouseout: "onHoverOut"
        },

        onClick: function (evt) {
            if(!this._isSelected) {
                this._isSelected = true;
                this.$el.addClass("is-selected");
                //EventRegister.EventListener.trigger(EventRegister.EventCallout.ADD_SEAT, this);
            } else {
                this._isSelected = false;
                this.$el.removeClass("is-selected");
                //EventRegister.EventListener.trigger(EventRegister.EventCallout.REMOVE_SEAT, this);
            }
        },

        onHover: function (evt) {
            this.$el.addClass("is-over")
        },

        onHoverOut: function (evt) {
            this.$el.removeClass("is-over");
        },

        selectedChanged: function() {
            this._isSelected = true;
            this.$el.addClass("is-selected");
        },

        unselectedChanged: function() {
            this._isSelected = false;
            this.$el.removeClass("is-selected");
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        update: function (evt) {
            this.unselectedChanged();
            this.model = evt;
            this.render();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/grid/gridButton.html');
                
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
    return HexButton;
});