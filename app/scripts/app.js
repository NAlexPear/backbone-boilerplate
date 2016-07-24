// Internal Components
import LandingPageView from "views/home/index";
import $ from "jquery";

var routes = {
    "/": LandingPageView
};

var App = {
    "start": function startApplication( route ){
        var Page = routes[ route ];
        var page = new Page();

        $( "#container" ).html( page );
    }
};

export default App;
