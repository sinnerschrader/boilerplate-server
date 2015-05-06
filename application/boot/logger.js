'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
/*
 * Provides a sane-default boot logger
 * that gets replaced after all configuration is loaded
 */

var _winston = require('winston');

function bootLogger(options) {
	var ConsoleTransport = _winston.transports.Console;
	var FileTransport = _winston.transports.File;

	var level = options.loglevel || 'debug';

	return new _winston.Logger({
		'transports': [new ConsoleTransport({
			'name': 'bootConsole',
			'level': level,
			'colorize': false,
			'showLevel': false,
			'timestamp': false
		}), new FileTransport({
			'name': 'bootFile',
			'filename': 'server_debug.log',
			'level': 'error',
			'colorize': false,
			'showLevel': true,
			'timestamp': true
		})]
	});
}

exports['default'] = bootLogger;
module.exports = exports['default'];