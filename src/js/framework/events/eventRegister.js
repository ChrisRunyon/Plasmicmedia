if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    window.EventRegister = {
        animationHelper: [],
    };

    var EventListener = _.extend({}, Backbone.Events);

    var EventCallout = {
        CREATE_MODAL: 'CREATE_MODAL',
        CLOSE_MODAL: 'CLOSE_MODAL',
        ADD_SEAT: 'ADD_SEAT',
        END_ADD_SEAT: 'END_ADD_SEAT',
        REMOVE_SEAT: 'REMOVE_SEAT',
        END_REMOVE_SEAT: 'END_REMOVE_SEAT',
        SELECT_SEAT_ICON: 'SELECT_SEAT_ICON',
        SELECT_ALL_SEAT_ICONS: 'SELECT_ALL_SEAT_ICONS',
        APPLY_SEATING: 'APPLY_SEATING',
        UPDATE_SEATING_ALL: 'UPDATE_SEATING_ALL',
        INIT_INDEX_PAGE: 'INIT_INDEX_PAGE',
        INIT_VIDEO_PAGE: 'INIT_VIDEO_PAGE'

    };

    var SeatingChart = {
        data: []
    }

    /**
    * creates a new modal window
    * @param {view} Backbone view to render
    * @origin eventRegister.js
    */
    EventListener.on('createModal', function (data) {
        $("body").wrapInner( function ()  {
            return "<div class='blocker'></div>";
        });
        var view = data.view;
        $("body").append("<div class='editpasswdmgrview'></div>");
        $(".editpasswdmgrview").append(view.render().el);
    });

    /*
    * closes current modal window
    * only one modal should be open 
    * at a given time
    * @origin eventRegister.js
    */
    EventListener.on('closeModal', function () {
        $("body").find('.blocker').children().unwrap();
        $(".editpasswdmgrview").remove();
    });

    /** 
    * Init Video Page Loading
    *
    **/
    EventListener.on('INIT_VIDEO_PAGE', function (evt) {
        this.trigger('LOAD_VIDEO_PAGE', evt);
    });

    EventListener.on('INIT_EXPERIMENT_PAGE', function (evt) {
        this.trigger('LOAD_EXPERIMENT_PAGE', evt);
    });

    EventListener.on('INIT_INDEX_PAGE', function (evt) {
        this.trigger('LOAD_INDEX_PAGE', evt);
    });

    EventListener.on('INIT_MODEL_PAGE', function (evt) {
        this.trigger('LOAD_MODEL_PAGE', evt);
    });

    /**
    * selects a seat to the seating chart stack for editing
    * @params {object} sid, model, color, designation, type, 
    *                   assignedate, start, end
    * @origin 
    * @listener seatDetails.js
    */
    EventListener.on('ADD_SEAT', function (evt) {
        var seat = {
            sid: evt.model.sid,
            color: evt.model.color,
            designation: evt.model.designation,
            type: evt.model.type,
            assignedate: evt.model.assignedate,
            price: evt.model.price,
        };
        SeatingChart.data.push(seat);
        this.trigger(EventRegister.EventCallout.END_ADD_SEAT, evt);
    });

    /**
    * removes a seat from the seating chart stack 
    * @params {object} sid, model, color, designation, type, 
    *                   assignedate, start, end
    * @origin eventRegister.js
    * @listener eventRegister.js
    */
    EventListener.on('REMOVE_SEAT', function (evt) {
        for(var i = 0; i < SeatingChart.data.length; i++) {
            if(SeatingChart.data[i].sid === evt.model.sid) {
                this.trigger(EventRegister.EventCallout.END_REMOVE_SEAT, evt);
                SeatingChart.data.splice(i, 1);
            }
        } 
    });

    /**
    * refreshing the seating list in seatDetails.js
    * @params {array} model.sid, model.type, model.assignedate,
    *                   model.price  
    * @origin eventRegister.js                  
    */
    EventListener.on('APPLY_SEATING', function (evt) {
        for(var i = 0; i < SeatingChart.data.length; i++) {
            for(var j = 0; j < evt.length; j++) {
                if(SeatingChart.data[i].sid === evt[j].model.sid) {
                    SeatingChart.data[i].color = evt[j].model.color;
                    SeatingChart.data[i].type = evt[j].model.type;
                    SeatingChart.data[i].assignedate = evt[j].model.assignedate;
                    SeatingChart.data[i].price = evt[j].model.price;
                }
            }
        } 
        this.trigger(EventRegister.EventCallout.UPDATE_SEATING_ALL, SeatingChart.data);
    });

    EventListener.on('CREATE_MODAL', function (data) {
        $("body").wrapInner( function ()  {
            return "<div class='blocker'></div>";
        });
        //var view = data.view;
        $("body").append("<div class='modal'></div>");
       // $(".modal").append(view.render().el);
    });

    EventListener.on('CLOSE_MODAL', function () {
        $("body").find('.blocker').children().unwrap();
        $(".modal").remove();
    });


    EventRegister.EventListener = EventListener;
    EventRegister.EventCallout = EventCallout;
    EventRegister.SeatingChart = SeatingChart;
    return EventRegister;
});