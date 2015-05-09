'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _portscanner = require('portscanner');

var _bluebird = require('bluebird');

var ports = {
	'find': _bluebird.promisify(_portscanner.findAPortNotInUse),
	'test': _bluebird.promisify(_portscanner.checkPortStatus)
};

exports['default'] = ports;
module.exports = exports['default'];