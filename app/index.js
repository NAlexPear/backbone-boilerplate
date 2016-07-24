/* global requirejs */

requirejs( [ "scripts/app" ], function startApplication( app ){
    /* eslint-disable no-console */
    console.log( app );

    app.start( "/" );
} );
