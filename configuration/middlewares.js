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
		'basicauth': false
	}
};

exports['default'] = middlewares;
module.exports = exports['default'];