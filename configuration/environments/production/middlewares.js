'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var middlewares = {
	'enabled': {
		'environment': false,
		'response-time': false,
		'revision': false,
		'basicauth': {
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