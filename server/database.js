/* eslint-disable no-process-env */
"use strict";

var pg = require( "pg" );
var path = require( "path" );
var configUrl = require(
    path.join( __dirname, "../", "conf", "db", "config.json" )
).url;
var connectionString = process.env.DATABASE_URL || configUrl;
var client = new pg.Client( connectionString );
var query;

client.connect();

query = client.query( "CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)" );

query.on( "end", () => client.end() );
