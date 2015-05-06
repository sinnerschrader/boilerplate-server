/*
 * Provides a sane-default boot logger
 * that gets replaced after all configuration is loaded
 */

import { Logger, transports } from 'winston';

function bootLogger ( options ) {
	let ConsoleTransport = transports.Console;
	let FileTransport = transports.File;

	let level = options.loglevel || 'debug';

	return new Logger( {
		'transports': [
			new ConsoleTransport( {
				'name': 'bootConsole',
				'level': level,
				'colorize': false,
				'showLevel': false,
				'timestamp': false
			} ),
			new FileTransport( {
				'name': 'bootFile',
				'filename': 'server_debug.log',
				'level': 'error',
				'colorize': false,
				'showLevel': true,
				'timestamp': true
			} )
		]
	} );
}

export default bootLogger;
