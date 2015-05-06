'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	'level': 'info',
	'transports': ['console', 'file'],
	'options': {
		'console': {
			'colorize': false,
			'timestamp': false,
			'showLevel': false
		},
		'file': {
			'colorize': false,
			'timestamp': true,
			'showLevel': true
		}
	}
};
module.exports = exports['default'];