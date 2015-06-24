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

	'configure': function configureEngineHook(application) {
		return regeneratorRuntime.async(function configureEngineHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.configuration = {};

					this.configuration = Object.assign(this.configuration, this.defaults, {
						'path': (0, _path.resolve)(application.runtime.base, this.defaults.path)
					});

					return context$1$0.abrupt('return', this);

				case 3:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	},

	'start': function startEngineHook(application) {
		var core, corePkgPath, pkgPath, corePkg, pkg, user, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, configPath, userPath, userPathConfig;

		return regeneratorRuntime.async(function startEngineHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					core = (0, _libraryUtilitiesConfiguration2['default'])(this.configuration.path, this.configuration.filter, application.runtime.env);
					corePkgPath = (0, _path.resolve)(application.runtime.base, 'package.json');
					pkgPath = (0, _path.resolve)(application.runtime.cwd, 'package.json');
					corePkg = require(corePkgPath);
					pkg = {};

					try {
						pkg = require(pkgPath);
					} catch (err) {
						this.log.warn('Could not read ' + pkgPath + '.');
					}

					pkg = (0, _lodash.merge)({}, corePkg, pkg);

					// Allow user to override core behaviour via cli and *rc files
					core = (0, _lodash.merge)({}, core, { 'pkg': pkg }, application.runtime.api);

					user = {};
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 12;
					_iterator = core.paths.configuration[Symbol.iterator]();

				case 14:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 37;
						break;
					}

					configPath = _step.value;
					userPath = (0, _path.resolve)(application.runtime.cwd, configPath);

					this.log.warn('Searching for user configuration at \'' + userPath + '\'');

					context$1$0.next = 20;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(userPath));

				case 20:
					if (!context$1$0.sent) {
						context$1$0.next = 33;
						break;
					}

					context$1$0.prev = 21;
					userPathConfig = (0, _libraryUtilitiesConfiguration2['default'])(userPath, this.configuration.filter, application.runtime.env);

					user = (0, _lodash.merge)(user, userPathConfig);
					context$1$0.next = 31;
					break;

				case 26:
					context$1$0.prev = 26;
					context$1$0.t0 = context$1$0['catch'](21);

					this.log.error('Error while reading user configuration from ' + userPath + '.');
					this.log.error(context$1$0.t0);

					throw new Error('Failed loading user configuration');

				case 31:
					context$1$0.next = 34;
					break;

				case 33:
					this.log.warn('No user configuration present at \'' + userPath + '\'');

				case 34:
					_iteratorNormalCompletion = true;
					context$1$0.next = 14;
					break;

				case 37:
					context$1$0.next = 43;
					break;

				case 39:
					context$1$0.prev = 39;
					context$1$0.t1 = context$1$0['catch'](12);
					_didIteratorError = true;
					_iteratorError = context$1$0.t1;

				case 43:
					context$1$0.prev = 43;
					context$1$0.prev = 44;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 46:
					context$1$0.prev = 46;

					if (!_didIteratorError) {
						context$1$0.next = 49;
						break;
					}

					throw _iteratorError;

				case 49:
					return context$1$0.finish(46);

				case 50:
					return context$1$0.finish(43);

				case 51:

					(0, _lodash.merge)(application.configuration, core, user, application.runtime.api);

					application.runtime.prefix = application.runtime.prefix || '/';
					application.runtime.mode = application.runtime.mode || 'server';
					return context$1$0.abrupt('return', this);

				case 55:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[12, 39, 43, 51], [21, 26], [44,, 46, 50]]);
	}
};
module.exports = exports['default'];

// Load core configuration

// Load package.jsons

// Load user configuration