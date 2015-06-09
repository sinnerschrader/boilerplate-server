'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

function loadConfiguration(path) {
	var filter = arguments[1] === undefined ? /(.*).(js|json)$/ : arguments[1];
	var env = arguments[2] === undefined ? 'development' : arguments[2];

	var rawConfiguration = (0, _requireAll2['default'])({
		'dirname': path,
		'filter': filter
	});

	rawConfiguration.environments = rawConfiguration.environments || {};

	var envConfiguration = rawConfiguration.environments[env] || {};

	return (0, _lodash.merge)({}, rawConfiguration, envConfiguration, { 'environment': env });
}

exports['default'] = loadConfiguration;
module.exports = exports['default'];