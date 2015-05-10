'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _lodash = require('lodash');

var _libraryUtilitiesConfiguration = require('../../../library/utilities/configuration');

var _libraryUtilitiesConfiguration2 = _interopRequireDefault(_libraryUtilitiesConfiguration);

var _libraryUtilitiesFs = require('../../../library/utilities/fs');

exports['default'] = {
	'after': ['application:before'],

	'defaults': {
		'path': './configuration',
		'filter': /(.*).(js|json)$/
	},

	'configure': function configure(application) {
		return regeneratorRuntime.async(function configure$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.configuration = {};

					this.configuration = Object.assign(this.configuration, this.defaults, {
						'path': _path.resolve(application.runtime.base, this.defaults.path)
					});

					return context$1$0.abrupt('return', this);

				case 3:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	},

	'start': function start(application) {
		var core, corePkgPath, pkgPath, corePkg, pkg, userPath, user;
		return regeneratorRuntime.async(function start$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					core = _libraryUtilitiesConfiguration2['default'](this.configuration.path, this.configuration.filter, application.runtime.env);
					corePkgPath = _path.resolve(application.runtime.base, 'package.json');
					pkgPath = _path.resolve(application.runtime.cwd, 'package.json');
					corePkg = require(corePkgPath);
					pkg = {};

					try {
						pkg = require(pkgPath);
					} catch (err) {
						this.log.warn('Could not read ' + pkgPath + '.');
					}

					pkg = _lodash.merge({}, corePkg, pkg);

					// Allow user to override core behaviour via cli and *rc files
					core = _lodash.merge({}, core, { 'pkg': pkg }, application.runtime.api);

					userPath = _path.resolve(application.runtime.cwd, core.paths.configuration);
					user = {};
					context$1$0.next = 12;
					return _libraryUtilitiesFs.exists(userPath);

				case 12:
					if (!context$1$0.sent) {
						context$1$0.next = 24;
						break;
					}

					context$1$0.prev = 13;

					user = _libraryUtilitiesConfiguration2['default'](userPath, this.configuration.filter, application.runtime.env);
					context$1$0.next = 22;
					break;

				case 17:
					context$1$0.prev = 17;
					context$1$0.t0 = context$1$0['catch'](13);

					this.log.error('Error while reading user configuration from ' + userPath + '.');
					this.log.error(context$1$0.t0);

					throw new Error('Failed loading user configuration');

				case 22:
					context$1$0.next = 25;
					break;

				case 24:
					this.log.warn('No user configuration present at \'' + userPath + '\'');

				case 25:

					_lodash.merge(application.configuration, core, user, application.runtime.api);
					return context$1$0.abrupt('return', this);

				case 27:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[13, 17]]);
	}
};
module.exports = exports['default'];

// Load core configuration

// Load package.jsons
// Load user configuration