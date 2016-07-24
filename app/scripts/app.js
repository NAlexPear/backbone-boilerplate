// Internal Components
import LandingPageView from "views/home/index";
import $ from "jquery";

var routes = {
    "/": function getHomePage(){
        return new LandingPageView();
    }
};

var App = {
    "start": function startApplication( route ){
        var page = routes[ route ]();

        /* eslint-disable no-console */
        console.log( page );

        $( "#container" ).html( page );
    }
};

export default App;
