#!/usr/bin/env node --harmony
/*eslint-disable no-process-env, no-process-exit */
import { resolve } from 'path';

import 'babel-core/polyfill';
import minimist from 'minimist';

import boilerplate from '../';

async function start ( options = {} ) {
	let augmented = Object.assign( {}, {
			'cwd': process.cwd(),
			'base': resolve( __dirname, '../' ),
			'env': process.env.NODE_ENV || 'development',
		}, options, { 'api': options } );

	let application;

	try {
		application = await boilerplate( augmented );
		let test = await boilerplate( Object.assign( {}, augmented, { 'name': 'test' } ) );
		application.mount( test, '/test' );
	} catch ( error ) {
		let log = application ? application.log || console : console;
		log.trace( error );
		throw new Error( error );
	}

	try {
		application.start();
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
