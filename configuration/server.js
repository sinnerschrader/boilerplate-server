'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	'port': process.env.PORT || process.env.NODE_PORT || 1337,
	'host': process.env.HOST || process.env.NODE_HOST || 'localhost',
	'autoPort': true
};
module.exports = exports['default'];