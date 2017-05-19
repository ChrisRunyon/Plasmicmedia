if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var jQForm = (typeof require === 'function') ? require('jquery-form') : window.jQForm;

    var IndexPage = Backbone.View.extend({
        tagName: "div",
        className: "pagewrapper",
        template: "",
        no_cache: (new Date).getTime(),
        initialize: function() {
            $(document).keypress(
                function(event) {
                    if(event.which == '13') {
                        event.preventDefault();
                    }
                });
        },
        events: {
            //'click .cta-button': 'ctaClick',
            'click #signup-button': 'submit',
            'click #last-signup-button': 'lastSubmit',
        },

        ctaClick: function (evt) {
            this.$el.find('#firstModal').foundation('reveal','open');
        },

        submit: function (evt) {
            evt.preventDefault();
            var self = this;
            var name = $('#signup-name').val();
            var email = $('#signup-email').val();
            var pass = $('#signup-password').val();

            var options = {
                dataType: 'json',
                beforeSubmit: self.preSubmit,
                uploadProgress: self.progressBar,
                success: self.onSuccess,
                error: self.onError,
                self: this,
            };
            this.userForm = $('#signup-form');

            this.userForm.on('invalid.fndtn.abide', function () {
                console.log('invalid');
            });
            this.userForm.on('valid.fndtn.abide', function () {
                console.log('valid');
            });
            this.commit = $('.signup-user').ajaxForm();
            if(email !== "") {
               this.commit.ajaxSubmit(options);
            }
        },

        lastSubmit: function (evt) {
            evt.preventDefault();
            var self = this,
            VALID = false;
            var name = $('#last-signup-name').val();
            var email = $('#last-signup-email').val();
            var pass = $('#last-signup-password').val();

            var options = {
                dataType: 'json',
                beforeSubmit: self.preSubmit,
                uploadProgress: self.progressBar,
                success: self.onSuccess,
                error: self.onError,
                self: this,
            };

            this.commit = $('.last-signup-user').ajaxForm();
            $('#last-signup-email').on('invalid.fndtn.abide', function () {
                self.VALID = false;
                self.tryAgain()
            });
            $('#last-signup-email').on('valid.fndtn.abide', function () {
                self.VALID = true;
            });
            if(this.VALID) {
                this.commit.ajaxSubmit(options);
            }
        },

        preSubmit: function (data, jqForm, options) {},

        progressBar: function (event, position, total, percentComplete) {},

        onSuccess: function (responseText, statusText, xhr, form) {
            if(responseText !== null) {
                this.self.$el.find('#secondModal').foundation('reveal','open');
            }
        },

        onError: function (xhr, statusText, err) {
            this.self.tryAgain();
        },

        tryAgain: function () {
            this.$el.find('#alert').removeClass('hidden');
        },

        destroy: function() {
            this.undelegateEvents(),
            this.unbind(),
            this.remove()
        },
        getTemplate: function() {
            var self = this;
            $.get("js/apps/index/indexPage.html?r=" + self.no_cache, function(data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp).foundation({ abide :
                        {
                            live_validate : true, // validate the form as you go
                            validate_on_blur : true, // validate whenever you focus/blur on an input field
                            focus_on_invalid : true, // automatically bring the focus to an invalid input field
                            error_labels: false, // labels with a for="inputId" will recieve an `error` class

                            // the amount of time Abide will take before it validates the form (in ms).
                            // smaller time will result in faster validation
                            timeout : 500,
                            patterns : {
                            alpha: /^[a-zA-Z]+$/,
                            alpha_numeric : /^[a-zA-Z0-9]+$/,
                            integer: /^[-+]?\d+$/,
                            number: /^[-+]?[1-9]\d*$/,

                            // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
                            //email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

                            url: /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,

                            // abc.de
                            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
                            }
                        },
                        validators: {
                            diceRoll: function(el, required, parent) {
                                var possibilities = [true, false];
                                return possibilities[Math.round(Math.random())];
                            },
                            isAllowed: function(el, required, parent) {
                                var possibilities = ['a@zurb.com', 'b.zurb.com'];
                                return possibilities.indexOf(el.val) > -1;
                            }
                        }

                });
            }, 'html');
        },
        render: function() {
            var self = this;
            return self.getTemplate(),
            this
        }
    });
    return IndexPage
});
