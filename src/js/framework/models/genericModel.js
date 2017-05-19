if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var GenericModel = Backbone.Model.extend({
        url: undefined,
        initialize: function () {}
    });
    return GenericModel;
});