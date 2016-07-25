/* eslint-disable new-cap */
"use strict";

var express = require( "express" );
var router = express.Router();
var _ = require( "underscore" );
var post = require( "./POST/routes.js" );


module.exports = _( router ).extend( post );
