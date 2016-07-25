"use strict";

var express = require( "express" );
var app = express();
var bodyParser = require( "body-parser" );
var router = require( "./routes/router.js" );

app.use( bodyParser.urlencoded( {
    "extended": true
} ) );

app.use( "/api/v1", router );

app.listen( 3000, function confirmListener(){
    process.stdout.write( "\nBackbone application listening on port 3000...\n\n" );
} );
