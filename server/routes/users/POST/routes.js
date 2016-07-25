/* eslint-disable new-cap, no-process-env, no-console */
"use strict";

var express = require( "express" );
var router = express.Router();
var pg = require( "pg" );
var path = require( "path" );
var configUrl = require(
    path.join(
        __dirname.split( "server" )[0],
        "conf",
        "db",
        "config.json"
    )
).url;
var connectionString = process.env.DATABASE_URL || configUrl;


router.post( "/api/v1/users", function handleRequest( req, res ){
    var results = [];

    // get data through http request
    var data = {
        "text": req.body.text,
        "complete": false
    };

    // set up universal error handler
    function handleError( error, done ){
        done();
        console.log( error );

        return res.status( 500 ).json( {
            "success": false,
            "data": error
        } );
    }

    // use connection pool to get postgres client
    pg.connect(
        connectionString,
        function handleConnection( error, client, done ){
            var query;

            if( error ){
                handleError( error, done );
            }

            client.query(
                "INSERT INTO items(text, complete) values($1, $2)",
                [ data.text, data.complete ]
            );

            query = client.query(
                "SELECT * FROM items ORDER BY id ASC"
            );

            query.on(
                "row",
                function streamByRow( row ){
                    results.push( row );
                }
            );

            query.on(
                "end",
                function finishQueries(){
                    done();

                    return res.json( results );
                }
            );
        }
    );
} );

module.exports = router;
