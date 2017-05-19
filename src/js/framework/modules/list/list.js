if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var ListItem      = (typeof require === 'function') ? require('framework/modules/list/listItem') : window.ListItem,
        EventRegister = (typeof require === 'function') ? require('framework/events/eventRegister') : window.EventRegister;

    var List = Backbone.View.extend({
        tagName: "div",
        className: "listContainer",
        template: '',
        no_cache: new Date().getTime(),
        listItems: [],
        
        initialize: function (options) {
            this.data = options.data;
        },

        addItem: function(data) {
            var self = this,
                listItem = null,
                thisItem = null;

            var container = self.$el.find(".list");

            listItem = new ListItem( { data: data } );  

            container.append(listItem.render().el);

            listItem.on("active", function(evt) {

            });

            listItem.on("inactive", function(evt) {

            });

            this.listItems.push(listItem);
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;
            
            $.get('js/templates/modules/list/list.html?r=' + self.no_cache, function (data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp);
                

                for (var i=0, len=self.data.length; i<len; i++) {

                    // render line above each list item
                    //self.$el.append(tmpl());

                    // render list item
                    self.addItem(self.data[i]);
                    //console.log(self.data[i]);

                    //if (i === len - 1) {
                        // render line below last list item
                        //self.$el.append(tmpl());
                    //}

                }
            });
        },

        render: function () {
            var self = this;
    
            self.getTemplate();
    
            return this;
        }
    });
    return List;
});