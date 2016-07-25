// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";
import $ from "jquery";

// Backbone Components
import UserCollection from "../../collections/users";

// Internal Components
import template from "text!template/components/user-counter.html";

var UserCounterView = Backbone.View.extend( {
    "className": "user-counter",
    "template": _.template( template ),
    "initialize": function initialize(){
        this.collection = new UserCollection();

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        this.listUsers();

        return this;
    },
    "listUsers": function listUsers(){
        var list = [];
        var self = this;

        function appendUsers( listElements, view ){
            _( listElements ).each(
                ( item ) => view.$el.find( ".user-list" ).append( $( item ) )
            );
        }

        this.collection.fetch( {
            "success": function handleCollection( collection ){
                _( collection.models ).each(
                    ( model ) => {
                        var name = model.get( "name" );
                        var gender = model.get( "gender" );
                        var element = `<li>${name} (${gender})</li>`;

                        list.push( element );
                    }
                );

                appendUsers( list, self );
            }
        } );
    }
} );

export default UserCounterView;
