'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('path');

var _lodash = require('lodash');

var _findRoot = require('find-root');

var _findRoot2 = _interopRequireDefault(_findRoot);

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
		var core, corePkgPath, pkgPath, corePkg, pkg, callerPath, callerRoot, modulePaths, moduleRoot, existingModulePaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, modulePath, _moduleRoot, existingConfigPaths, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, configPath, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, cwd, _arr, _i, suffix, userPath, user, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, userPathConfig;

		return regeneratorRuntime.async(function startEngineHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					core = (0, _libraryUtilitiesConfiguration2['default'])((0, _path.resolve)((0, _findRoot2['default'])(__dirname), this.configuration.path), this.configuration.filter, application.runtime.env);
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

					callerPath = require.main.filename;
					callerRoot = callerPath;
					modulePaths = [(0, _path.dirname)(module.filename)];
					moduleRoot = module;

				case 12:
					context$1$0.next = 14;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)((0, _path.resolve)(callerRoot, 'package.json')));

				case 14:
					if (context$1$0.sent) {
						context$1$0.next = 18;
						break;
					}

					callerRoot = (0, _path.dirname)(callerRoot);
					context$1$0.next = 12;
					break;

				case 18:

					// Find all node modules on the way from here to the top
					while (moduleRoot.parent) {
						moduleRoot = moduleRoot.parent;
						modulePaths.push((0, _path.dirname)(moduleRoot.filename));
					}

					modulePaths = [].concat(_toConsumableArray(new Set(modulePaths)));

					modulePaths = modulePaths.filter(function (modulePath) {
						return !modulePath.includes((0, _findRoot2['default'])(__dirname));
					}) // Filter paths below boilerplate-server
					.filter(function (modulePath) {
						return !modulePath.includes('patternplate-server');
					}) // TODO: Resolve this properly
					.filter(function (modulePath) {
						return !modulePath.includes('patternplate-client');
					});existingModulePaths = [];
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 25;
					_iterator = modulePaths[Symbol.iterator]();

				case 27:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 40;
						break;
					}

					modulePath = _step.value;
					_moduleRoot = modulePath;

				case 30:
					context$1$0.next = 32;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)((0, _path.resolve)(_moduleRoot, 'package.json')));

				case 32:
					if (context$1$0.sent) {
						context$1$0.next = 36;
						break;
					}

					_moduleRoot = (0, _path.dirname)(_moduleRoot);
					context$1$0.next = 30;
					break;

				case 36:

					existingModulePaths.push(_moduleRoot);

				case 37:
					_iteratorNormalCompletion = true;
					context$1$0.next = 27;
					break;

				case 40:
					context$1$0.next = 46;
					break;

				case 42:
					context$1$0.prev = 42;
					context$1$0.t0 = context$1$0['catch'](25);
					_didIteratorError = true;
					_iteratorError = context$1$0.t0;

				case 46:
					context$1$0.prev = 46;
					context$1$0.prev = 47;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 49:
					context$1$0.prev = 49;

					if (!_didIteratorError) {
						context$1$0.next = 52;
						break;
					}

					throw _iteratorError;

				case 52:
					return context$1$0.finish(49);

				case 53:
					return context$1$0.finish(46);

				case 54:

					// Set application runtime cwds
					application.runtime.cwds = [].concat(_toConsumableArray(new Set([application.runtime.cwd].concat(existingModulePaths, [// way between
					callerRoot, // top level / caller module
					process.cwd() // cwd
					]))));

					existingConfigPaths = [];
					_iteratorNormalCompletion2 = true;
					_didIteratorError2 = false;
					_iteratorError2 = undefined;
					context$1$0.prev = 59;
					_iterator2 = core.paths.configuration[Symbol.iterator]();

				case 61:
					if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
						context$1$0.next = 102;
						break;
					}

					configPath = _step2.value;
					_iteratorNormalCompletion4 = true;
					_didIteratorError4 = false;
					_iteratorError4 = undefined;
					context$1$0.prev = 66;
					_iterator4 = application.runtime.cwds[Symbol.iterator]();

				case 68:
					if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
						context$1$0.next = 85;
						break;
					}

					cwd = _step4.value;
					_arr = ['', pkg.name];
					_i = 0;

				case 72:
					if (!(_i < _arr.length)) {
						context$1$0.next = 82;
						break;
					}

					suffix = _arr[_i];
					userPath = (0, _path.resolve)(cwd, configPath, suffix);
					context$1$0.next = 77;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(userPath));

				case 77:
					if (!context$1$0.sent) {
						context$1$0.next = 79;
						break;
					}

					existingConfigPaths.push(userPath);

				case 79:
					_i++;
					context$1$0.next = 72;
					break;

				case 82:
					_iteratorNormalCompletion4 = true;
					context$1$0.next = 68;
					break;

				case 85:
					context$1$0.next = 91;
					break;

				case 87:
					context$1$0.prev = 87;
					context$1$0.t1 = context$1$0['catch'](66);
					_didIteratorError4 = true;
					_iteratorError4 = context$1$0.t1;

				case 91:
					context$1$0.prev = 91;
					context$1$0.prev = 92;

					if (!_iteratorNormalCompletion4 && _iterator4['return']) {
						_iterator4['return']();
					}

				case 94:
					context$1$0.prev = 94;

					if (!_didIteratorError4) {
						context$1$0.next = 97;
						break;
					}

					throw _iteratorError4;

				case 97:
					return context$1$0.finish(94);

				case 98:
					return context$1$0.finish(91);

				case 99:
					_iteratorNormalCompletion2 = true;
					context$1$0.next = 61;
					break;

				case 102:
					context$1$0.next = 108;
					break;

				case 104:
					context$1$0.prev = 104;
					context$1$0.t2 = context$1$0['catch'](59);
					_didIteratorError2 = true;
					_iteratorError2 = context$1$0.t2;

				case 108:
					context$1$0.prev = 108;
					context$1$0.prev = 109;

					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}

				case 111:
					context$1$0.prev = 111;

					if (!_didIteratorError2) {
						context$1$0.next = 114;
						break;
					}

					throw _iteratorError2;

				case 114:
					return context$1$0.finish(111);

				case 115:
					return context$1$0.finish(108);

				case 116:

					// Load most specific paths only
					// Check if paths have siblings that contain them completely, thus are sub directories / more specific configuration folders
					existingConfigPaths = existingConfigPaths.filter(function (configPath) {
						return existingConfigPaths.filter(function (subConfigPath) {
							return subConfigPath.includes(configPath) && subConfigPath !== configPath;
						}).length === 0;
					});

					user = {};
					_iteratorNormalCompletion3 = true;
					_didIteratorError3 = false;
					_iteratorError3 = undefined;
					context$1$0.prev = 121;
					_iterator3 = existingConfigPaths[Symbol.iterator]();

				case 123:
					if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
						context$1$0.next = 140;
						break;
					}

					userPath = _step3.value;

					this.log.warn('Loading configuration from \'' + userPath + '\'');

					context$1$0.prev = 126;
					userPathConfig = (0, _libraryUtilitiesConfiguration2['default'])(userPath, this.configuration.filter, application.runtime.env);

					user = (0, _lodash.merge)(user, userPathConfig);
					context$1$0.next = 137;
					break;

				case 131:
					context$1$0.prev = 131;
					context$1$0.t3 = context$1$0['catch'](126);

					this.log.error('Error while reading configuration from ' + userPath + '.');
					this.log.error(context$1$0.t3);
					context$1$0.t3.message = 'Failed loading configuration';
					throw context$1$0.t3;

				case 137:
					_iteratorNormalCompletion3 = true;
					context$1$0.next = 123;
					break;

				case 140:
					context$1$0.next = 146;
					break;

				case 142:
					context$1$0.prev = 142;
					context$1$0.t4 = context$1$0['catch'](121);
					_didIteratorError3 = true;
					_iteratorError3 = context$1$0.t4;

				case 146:
					context$1$0.prev = 146;
					context$1$0.prev = 147;

					if (!_iteratorNormalCompletion3 && _iterator3['return']) {
						_iterator3['return']();
					}

				case 149:
					context$1$0.prev = 149;

					if (!_didIteratorError3) {
						context$1$0.next = 152;
						break;
					}

					throw _iteratorError3;

				case 152:
					return context$1$0.finish(149);

				case 153:
					return context$1$0.finish(146);

				case 154:

					(0, _lodash.merge)(application.configuration, core, user, application.runtime.api);
					application.runtime.prefix = application.runtime.prefix || '/';
					application.runtime.mode = application.runtime.mode || 'server';
					return context$1$0.abrupt('return', this);

				case 158:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[25, 42, 46, 54], [47,, 49, 53], [59, 104, 108, 116], [66, 87, 91, 99], [92,, 94, 98], [109,, 111, 115], [121, 142, 146, 154], [126, 131], [147,, 149, 153]]);
	}
};
module.exports = exports['default'];

// Load boilerplate-server core configuration

// Load package.jsons

// Find the root node module
// TODO: Resolve this properly

// boilerplate instance project cwd
// Check which user config paths exist
// Load dem configs from filtered paths