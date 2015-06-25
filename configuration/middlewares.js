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
		'etags': true
	}
};

exports['default'] = middlewares;
module.exports = exports['default'];