/*
 * Provides a sane-default boot logger
 * that gets replaced after all configuration is loaded
 */

import { Logger, transports } from 'winston';

function bootLogger ( options, application ) {
	let ConsoleTransport = transports.Console;
	let FileTransport = transports.File;

	let level = options.loglevel || 'debug';

	let log = new Logger( {
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

	let logger = {};

	logger.error = function (...args) {
		return log.error( ...[ `[${application.name}]`, ...args ] );
	};

	logger.warn = function (...args) {
		return log.warn( ...[ `[${application.name}]`, ...args ] );
	};

	logger.info = function (...args) {
		return log.info( ...[ `[${application.name}]`, ...args ] );
	};

	logger.debug = function (...args) {
		return log.debug( ...[ `[${application.name}]`, ...args ] );
	};

	logger.silly = function (...args) {
		return log.silly( ...[ `[${application.name}]`, ...args ] );
	};

	return logger;
}

export default bootLogger;
