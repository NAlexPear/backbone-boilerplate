/* eslint-disable new-cap */
"use strict";

var express = require( "express" );
var router = express.Router();
var _ = require( "underscore" );
var users = require( "./users/users.js" );

module.exports = _( router ).extend( users );
