function requireConfig(options) {

    var basePath;

    options   = options || {};
    basePath  = 'js';

    var config = {

        //urlArgs: 'r=' + (new Date()).getTime(),
        baseUrl: basePath,
        findNestedDependencies: true,
        wrapShim: true,
        waitSeconds: 0,

        paths: {
            'amdefine': 'libraries/amdefine',
            'jquery': 'libraries/jquery',
            'underscore': 'libraries/underscore-1.8.3',
            'backbone': 'libraries/backbone-1.2.3',
            'jquery-ui': 'libraries/jquery-ui',
            'jquery-form': 'libraries/jquery.form',
            'jquery-base64': 'libraries/jquery.base64',
            'jquery-timepicker': 'libraries/jquery.timepicker',
            'jquery-datepair': 'libraries/jquery.datepair.min',
            'datepair': 'libraries/datepair/datepair',
            'bootstrap-datepicker': 'libraries/bootstrap-datepicker',
            'handlebars': 'libraries/handlebars',

            'text': 'libraries/text',
            'domready': 'libraries/ready',
            'router': 'controller/router',
            'cookiemanager': 'libraries/cookiemanager',
            'three': 'libraries/three',
            'ddsloader': 'libraries/DDSLoader',
            'mtlloader': 'libraries/MTLLoader',
            'background': 'libraries/Background',
            'fastclick': 'libraries/fastclick',
            //'stripe': 'https://js.stripe.com/v2/',
            /* Foundation */
            'foundation.core': 'libraries/foundation',
            'foundation.abide': 'libraries/foundation.abide',
            'foundation.accordion': 'libraries/foundation.accordion',
            'foundation.alert': 'libraries/foundation.alert',
            'foundation.clearing': 'libraries/foundation.clearing',
            'foundation.dropdown': 'libraries/foundation.dropdown',
            'foundation.equalizer': 'libraries/foundation.equalizer',
            'foundation.interchange': 'libraries/foundation.interchange',
            'foundation.magellan': 'libraries/foundation.magellan',
            'foundation.offcanvas': 'libraries/foundation.offcanvas',
            'foundation.orbit': 'libraries/foundation.orbit',
            'foundation.reveal': 'libraries/foundation.reveal',
            'foundation.slider': 'libraries/foundation.slider',
            'foundation.tab': 'libraries/foundation.tab',
            'foundation.toolbar': 'libraries/foundation.toolbar',
            'foundation.topbar': 'libraries/foundation.topbar',
        },

        shim: {
            'jquery': { exports: '$' },
            'underscore': { exports: '_' },
            'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
            'jquery-ui': { deps: ['jquery'], exports: 'UI' },
            'jquery-form': { deps: ['jquery'], exports: 'jQForm' },
            'jquery-base64': { deps: ['jquery'], exports: 'jBase64' },
            'jquery-timepicker': { deps: ['jquery'], exports: 'Timepicker' },
            'jquery-datepair': { deps: ['jquery'], exports: 'Datepair' },
            'bootstrap-datepicker': { exports: 'Datepicker' },
            'handlebars': { exports: 'Handlebars' },
            'text': { exports: 'HTML' },
            'domready': { deps: ['jquery'], exports: 'DomReady' }, 
            'router': { exports: 'Router' },
            'cookiemanager': { exports: 'CookieManager' },
            'three': { exports: 'Three' },
            'ddsloader': { deps: ['three'], exports: 'DDSLoader' },
            'mtlloader': {  deps: ['three'], exports: 'MTLLoader' },
            'background': {  deps: ['three'], exports: 'Background' },
            'fastclick': {  exports: 'Fastclick' },
            //'stripe': { exports: 'Stripe' },
            /* Foundation */
            'foundation.core': { deps: ['jquery'], exports: 'Foundation' },
            'foundation.abide': { deps: ['foundation.core'] },
            'foundation.accordion': { deps: ['foundation.core'] },
            'foundation.alert': { deps: ['foundation.core']},
            'foundation.clearing': { deps: ['foundation.core'] },
            'foundation.dropdown': { deps: ['foundation.core'] },
            'foundation.equalizer': { deps: ['foundation.core'] },
            'foundation.interchange': { deps: ['foundation.core'] },
            'foundation.magellan': { deps: ['foundation.core'] },
            'foundation.offcanvas': { deps: ['foundation.core'] },
            'foundation.orbit': {deps: ['foundation.core'] },
            'foundation.reveal': { deps: ['foundation.core'] },
            'foundation.tab': { deps: ['foundation.core'] },
            'foundation.tooltip': { deps: ['foundation.core'] },
            'foundation.topbar': { deps: ['foundation.core'] }
        }
    };

     // add RequireJS config
    require.config(config);

    // handle RequireJS loading errors
    requirejs.onError = function (err) {
        console.error('RequireJS Error: ' + err.requireType + ' : ' + JSON.stringify(err.requireModules));
    };
}