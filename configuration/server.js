'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	'port': process.env.BOILERPLATESERVER_PORT || process.env.BOILERPLATE_PORT || process.env.NODE_PORT || process.env.PORT || 1337,
	'host': process.env.BOILERPLATESERVER_HOST || process.env.BOILERPLATE_HOST || process.env.NODE_HOST || process.env.HOST || 'localhost',
	'autoPort': true
};
module.exports = exports['default'];