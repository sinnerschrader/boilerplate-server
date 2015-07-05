/*
 * Provides a sane-default boot logger
 * that gets replaced after all configuration is loaded
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _winston = require('winston');

function bootLogger(options, application) {
	var ConsoleTransport = _winston.transports.Console;
	var level = options.loglevel || 'debug';

	var log = new _winston.Logger({
		'transports': [new ConsoleTransport({
			'name': 'bootConsole',
			'level': level,
			'colorize': true,
			'showLevel': true,
			'timestamp': true
		})]
	});

	var logger = {};

	logger.error = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return log.error.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.warn = function () {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return log.warn.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.info = function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return log.info.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.debug = function () {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		return log.debug.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.silly = function () {
		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		return log.silly.apply(log, ['[' + application.name + ']'].concat(args));
	};

	return logger;
}

exports['default'] = bootLogger;
module.exports = exports['default'];