'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var middlewares = {
	'path': './application/middlewares',
	'enabled': {
		'environment': true,
		'log': true,
		'response-time': true,
		'revision': true,
		'etags': true,
		'jsonerror': true,
		'basicauth': {
			'enabled': false,
			'credentials': {
				'name': process.env.NODE_BASIC_AUTH_LOGIN || 'boilerplate-server',
				'pass': process.env.NODE_BASIC_AUTH_PASS || 'boilerplate-server'
			},
			'exclude': '/health'
		}
	}
};

exports['default'] = middlewares;
module.exports = exports['default'];