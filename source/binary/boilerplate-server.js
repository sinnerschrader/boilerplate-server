#!/usr/bin/env node
/*eslint-disable no-process-env, no-process-exit */

import 'babel-core/polyfill';
import minimist from 'minimist';

import boilerplate from '../';

async function start ( options = {} ) {
	let application;
	let settings = Object.assign( options, { 'mode': 'server' } );

	try {
		application = await boilerplate( settings );
	} catch ( error ) {
		let log = application ? application.log || console : console;
		log.error( error );
		throw new Error( error );
	}

	try {
		await application.start();
		application.log.info('[application] Started without errors.');
	} catch ( error ) {
		application.log.error( error );
		throw new Error( error );
	}

	async function stop () {
		try {
			await application.stop();
			process.exit( 0 );
		} catch ( err ) {
			application.log.error( err );
			process.exit( 1 );
		}
	}

	process.on( 'SIGINT', () => stop( 'SIGINT' ) );
	process.on( 'SIGHUP', () => stop( 'SIGHUP' ) );
	process.on( 'SIGQUIT', () => stop( 'SIGQUIT' ) );
	process.on( 'SIGABRT', () => stop( 'SIGABRT' ) );
	process.on( 'SIGTERM', () => stop( 'SIGTERM' ) );
}

start( minimist( process.argv.slice( 1 ) ) );
