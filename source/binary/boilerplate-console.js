#!/usr/bin/env node --harmony
/*eslint-disable no-process-env, no-process-exit */

import 'babel-core/polyfill';
import minimist from 'minimist';

import boilerplate from '../';

async function start ( options = {} ) {
	let application;
	let settings = Object.assign( options, { 'mode': 'console' } );

	try {
		application = await boilerplate( settings );
	} catch ( error ) {
		let log = application ? application.log || console : console;
		log.trace( error );
		throw new Error( error );
	}

	try {
		application.console( options._.slice( 1 ) );
	} catch ( error ) {
		application.log.trace( error );
		throw new Error( error );
	}
}

start( minimist( process.argv.slice( 1 ) ) );
