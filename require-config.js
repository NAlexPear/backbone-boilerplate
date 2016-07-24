/* global requirejs */
requirejs.config( {
    "paths": {
        "template": "../../../app/templates",
        "jquery": "../../../node_modules/jquery/dist/jquery",
        "backbone": "../../../node_modules/backbone/backbone",
        "underscore": "../../../node_modules/lodash/lodash.underscore",
        "text": "../../../node_modules/requirejs-text/text"
    },

    "shim": {
        "backbone": {
            "deps": [ "underscore", "jquery" ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
} );
