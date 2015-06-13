'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var log = {
	'level': process.env.BOILERPLATESERVER_LOG_LEVEL || process.env.BOILERPLATE_LOG_LEVEL || process.env.NODE_LOG_LEVEL || process.env.LOG_LEVEL || 'debug'
};

exports['default'] = log;
module.exports = exports['default'];