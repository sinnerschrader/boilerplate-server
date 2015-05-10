'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var routes = {
	'path': './application/routes',
	'enabled': {
		'index': {
			'enabled': true,
			'method': 'GET',
			'path': '/'
		},
		'static': {
			'enabled': true,
			'method': 'GET',
			'path': /\/static\/(.*)/,
			'options': {
				'root': './static',
				'maxage': 3600000,
				'hidden': false,
				'defer': false
			}
		}
	}
};

exports['default'] = routes;
module.exports = exports['default'];