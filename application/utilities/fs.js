'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _fs = require('fs');

var _bluebird = require('bluebird');

exports['default'] = {
	'exists': function asyncExists(path) {
		return new Promise(function resolveExists(resolve) {
			_fs.exists(path, resolve);
		});
	},
	'readFile': _bluebird.promisify(_fs.readFile),
	'writeFile': _bluebird.promisify(_fs.writeFile),
	'stat': _bluebird.promisify(_fs.stat)
};
module.exports = exports['default'];