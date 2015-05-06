#!/usr/bin/env node
/*eslint-disable no-sync */
require("babel/polyfill");

var fs = require( 'fs' );
var path = require( 'path' );

var rc = require( 'rc' );
var _ = require( 'lodash' );

var minimist = require( 'minimist' );

var start = require( './_boilerplate-server' );
var args = minimist( process.argv.slice( 1 ) );

start( args )
	.then( function startCompleted ( application ) {
		application.log.info( '[application]', 'Started server ...' );
	} )
	.catch( function startFailed ( err, application ) {
		var log = application ? application.log || console : console;
		log.trace( err );
	} );
