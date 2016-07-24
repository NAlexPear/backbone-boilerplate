import Backbone from "backbone";
import _ from "underscore";

import template from "text!template/default.html";

var LandingPageView = Backbone.View.extend( {
    "className": "content",
    "template": _.template( template ),
    "model": {},
    "initialize": function initialize(){
        this.render();
    },
    "render": function render(){
        this.$el.html( this.template( {
            "content": "Welcome to your future landing page!"
        } ) );

        return this;
    }
} );

export default LandingPageView;
