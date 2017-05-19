if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var UI           = (typeof require === 'function') ? require('jquery-ui')                                  : window.jQueryUI,
        HexPage      = (typeof require === 'function') ? require('framework/modules/grid/gridPage')           : window.HexPage,
        HexButton    = (typeof require === 'function') ? require('framework/modules/grid/gridButton')         : window.HexButton;
        //EventRegister = (typeof require === 'function') ? require('apps/gallery/events/galleryEvents')         : window.EventRegister;

    var HexGrid = Backbone.View.extend({
        tagName: "div",
        className: "gridwrapper",
        template: '',
        model: undefined,
        tempmodel: [],
        gridButtons: [],
        totalPages: 0,
        gridElements: null,

        initialize: function (options) {
            var self = this;
            //console.log(options.data);
             /**
            * updates all seating elements
            * @origin eventRegister.js
            * @listener gridBase.js, seatDetails.js
            */
            EventRegister.EventListener.on('UPDATE_SEATING_ALL', function (evt) {
                for(var i = 0; i < self.gridButtons.length; i++) {
                    for(var j = 0; j < evt.length; j++) {
                        if(self.gridButtons[i].model.sid == evt[j].sid) {
                            self.gridButtons[i].update(evt[j]);
                        }
                    }
                }
            });

            this.model = options.data || {};
            this.gridElements = options.elements || 9;
            this.createButtons(this.model);
        },

        createButtons: function (model) {
            var self = this;
            if (model) {
                var i = 0;
                _.each(model, function (data) {
                    self.tempmodel[i] = new HexButton(data);
                    self.gridButtons.push(self.tempmodel[i]);
                    i++;
                });
            }
        },

        getTotalPages: function () {
            return this.totalPages;
        },
        
        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        /* jQuery-ui bug in selectable plugin prevents onclick event
        *  Set distance: 1
        *  Work around is provided here - 
        *  https://forum.jquery.com/topic/selectable-dosn-t-fire-click-event
        */
        setupSelectable: function() {
            var self = this;
            // Set up JQuery UI Selectable
            this.$el.selectable({
                distance: 1,
                filter: 'div',
                selected: function(evt, ui) {
                    var cid = ui.selected.id;
                    var gridbtn = self.gridButtons[cid-1];
                    
                    if(gridbtn && gridbtn._isSelected === false) {
                        /* @listener eventRegister.js */
                        EventRegister.EventListener.trigger(EventRegister.EventCallout.ADD_SEAT, gridbtn);
                        gridbtn.selectedChanged();
                    }
                },
                unselected: function(evt, ui) {
                    var cid = ui.unselected.id;
                    var gridbtn = self.gridButtons[cid-1];

                    if(gridbtn && gridbtn._isSelected) {
                        /* @listener eventRegister.js */
                        EventRegister.EventListener.trigger(EventRegister.EventCallout.REMOVE_SEAT, gridbtn);
                        gridbtn.unselectedChanged();
                    }
                }
            });
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/hexgrid/hexGrid.html'); 

            return self.template;
        },

        render: function () {
            var self = this;
            var tmp = [];
            var i = 0, j;
            var tmpl = this.getTemplate();
            
            var markup = _.template(tmpl);
            self.$el.html(markup(self.model));
           
            while (i < self.gridButtons.length) {
                tmp.push(self.gridButtons[i]);

                if (i !== 0 && (i + 1) % self.gridElements === 0) {
                    j = new HexPage(tmp);
                    self.$el.find(".gridcontainer").append(j.render().el);
                    tmp = [];
                    self.totalPages++;
                }
                i++;
            }
            if (self.gridButtons.length % self.gridElements !== 0) {
                j = new HexPage(tmp);
                self.$el.find(".gridcontainer").append(j.render().el);
                self.totalPages++;
            }
            self.setupSelectable();
            return this;
        }
    });
    return HexGrid;
});