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
					}); // TODO: Resolve this properly

					existingModulePaths = [];
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

					// Check which user config paths exist
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

					// Load dem configs from filtered paths
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

					this.log.info('Loading configuration from \'' + userPath + '\'');

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
					context$1$0.t3.message = 'Failed loading configuration from ${userPath}';
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
// boilerplate instance project cwd
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9jb25maWd1cmUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUMsTUFBTTs7c0JBQ2pCLFFBQVE7O3dCQUNULFdBQVc7Ozs7NkNBRWYsMENBQTBDOzs7O2tDQUNwQywrQkFBK0I7O3FCQUV2QztBQUNkLFFBQU8sRUFBRSxDQUFFLG9CQUFvQixDQUFFOztBQUVqQyxXQUFVLEVBQUU7QUFDWCxRQUFNLEVBQUUsaUJBQWlCO0FBQ3pCLFVBQVEsRUFBRSxpQkFBaUI7RUFDM0I7O0FBRUQsWUFBVyxFQUFFLFNBQWUsbUJBQW1CLENBQUcsV0FBVzs7OztBQUM1RCxnQkFBVyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7O0FBRS9CLFNBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDdEUsWUFBTSxFQUFFLFVBbkJGLE9BQU8sRUFtQkksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUU7TUFDL0QsQ0FBRSxDQUFDOzt5Q0FFRyxJQUFJOzs7Ozs7O0VBQ1g7O0FBRUQsUUFBTyxFQUFFLFNBQWUsZUFBZSxDQUFHLFdBQVc7TUFFaEQsSUFBSSxFQUdKLFdBQVcsRUFDWCxPQUFPLEVBRVAsT0FBTyxFQUVQLEdBQUcsRUFhSCxVQUFVLEVBQ1YsVUFBVSxFQUVWLFdBQVcsRUFDWCxVQUFVLEVBb0JWLG1CQUFtQixrRkFFZCxVQUFVLEVBQ2QsV0FBVSxFQW9CWCxtQkFBbUIsdUZBQ2IsVUFBVSx1RkFDVCxHQUFHLFlBQ0gsTUFBTSxFQW9CUCxRQUFRLEVBRGQsSUFBSSx1RkFLRixjQUFjOzs7OztBQS9GaEIsU0FBSSxHQUFHLGdEQUFNLFVBM0JWLE9BQU8sRUEyQlcsMkJBQVMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFD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LENBQUUsQ0FBQzs7Ozs7Ozs7QUFFckMsU0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLDZDQUE0QyxRQUFRLE9BQUssQ0FBQztBQUN4RSxTQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQU8sQ0FBQztBQUN0QixvQkFBSSxPQUFPLEdBQUcsK0NBQStDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2hFLGlCQW5JTyxLQUFLLEVBbUlMLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxDQUFDO0FBQ3hFLGdCQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7QUFDL0QsZ0JBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQzt5Q0FDekQsSUFBSTs7Ozs7OztFQUNYO0NBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZmluZFJvb3QgZnJvbSAnZmluZC1yb290JztcblxuaW1wb3J0IGxvYWQgZnJvbSAnLi4vLi4vLi4vbGlicmFyeS91dGlsaXRpZXMvY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBleGlzdHMgfSBmcm9tICcuLi8uLi8uLi9saWJyYXJ5L3V0aWxpdGllcy9mcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0J2FmdGVyJzogWyAnYXBwbGljYXRpb246YmVmb3JlJyBdLFxuXG5cdCdkZWZhdWx0cyc6IHtcblx0XHQncGF0aCc6ICcuL2NvbmZpZ3VyYXRpb24nLFxuXHRcdCdmaWx0ZXInOiAvKC4qKS4oanN8anNvbikkL1xuXHR9LFxuXG5cdCdjb25maWd1cmUnOiBhc3luYyBmdW5jdGlvbiBjb25maWd1cmVFbmdpbmVIb29rICggYXBwbGljYXRpb24gKSB7XG5cdFx0YXBwbGljYXRpb24uY29uZmlndXJhdGlvbiA9IHt9O1xuXG5cdFx0dGhpcy5jb25maWd1cmF0aW9uID0gT2JqZWN0LmFzc2lnbiggdGhpcy5jb25maWd1cmF0aW9uLCB0aGlzLmRlZmF1bHRzLCB7XG5cdFx0XHQncGF0aCc6IHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgdGhpcy5kZWZhdWx0cy5wYXRoIClcblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQnc3RhcnQnOiBhc3luYyBmdW5jdGlvbiBzdGFydEVuZ2luZUhvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHQvLyBMb2FkIGJvaWxlcnBsYXRlLXNlcnZlciBjb3JlIGNvbmZpZ3VyYXRpb25cblx0XHRsZXQgY29yZSA9IGxvYWQoIHJlc29sdmUoZmluZFJvb3QoX19kaXJuYW1lKSwgdGhpcy5jb25maWd1cmF0aW9uLnBhdGgpLCB0aGlzLmNvbmZpZ3VyYXRpb24uZmlsdGVyLCBhcHBsaWNhdGlvbi5ydW50aW1lLmVudiApO1xuXG5cdFx0Ly8gTG9hZCBwYWNrYWdlLmpzb25zXG5cdFx0bGV0IGNvcmVQa2dQYXRoID0gcmVzb2x2ZSggYXBwbGljYXRpb24ucnVudGltZS5iYXNlLCAncGFja2FnZS5qc29uJyApO1xuXHRcdGxldCBwa2dQYXRoID0gcmVzb2x2ZSggYXBwbGljYXRpb24ucnVudGltZS5jd2QsICdwYWNrYWdlLmpzb24nICk7XG5cblx0XHRsZXQgY29yZVBrZyA9IHJlcXVpcmUoIGNvcmVQa2dQYXRoICk7XG5cblx0XHRsZXQgcGtnID0ge307XG5cblx0XHR0cnkge1xuXHRcdFx0cGtnID0gcmVxdWlyZSggcGtnUGF0aCApO1xuXHRcdH0gY2F0Y2ggKCBlcnIgKSB7XG5cdFx0XHR0aGlzLmxvZy53YXJuKCBgQ291bGQgbm90IHJlYWQgJHtwa2dQYXRofS5gICk7XG5cdFx0fVxuXG5cdFx0cGtnID0gbWVyZ2UoIHt9LCBjb3JlUGtnLCBwa2cgKTtcblxuXHRcdC8vIEFsbG93IHVzZXIgdG8gb3ZlcnJpZGUgY29yZSBiZWhhdmlvdXIgdmlhIGNsaSBhbmQgKnJjIGZpbGVzXG5cdFx0Y29yZSA9IG1lcmdlKCB7fSwgY29yZSwgeyAncGtnJzogcGtnIH0sIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYXBpICk7XG5cblx0XHRsZXQgY2FsbGVyUGF0aCA9IHJlcXVpcmUubWFpbi5maWxlbmFtZTtcblx0XHRsZXQgY2FsbGVyUm9vdCA9IGNhbGxlclBhdGg7XG5cblx0XHRsZXQgbW9kdWxlUGF0aHMgPSBbZGlybmFtZShtb2R1bGUuZmlsZW5hbWUpXTtcblx0XHRsZXQgbW9kdWxlUm9vdCA9IG1vZHVsZTtcblxuXHRcdC8vIEZpbmQgdGhlIHJvb3Qgbm9kZSBtb2R1bGVcblx0XHR3aGlsZSAoIWF3YWl0IGV4aXN0cyhyZXNvbHZlKGNhbGxlclJvb3QsICdwYWNrYWdlLmpzb24nKSkpIHtcblx0XHRcdGNhbGxlclJvb3QgPSBkaXJuYW1lKGNhbGxlclJvb3QpO1xuXHRcdH1cblxuXHRcdC8vIEZpbmQgYWxsIG5vZGUgbW9kdWxlcyBvbiB0aGUgd2F5IGZyb20gaGVyZSB0byB0aGUgdG9wXG5cdFx0d2hpbGUobW9kdWxlUm9vdC5wYXJlbnQpIHtcblx0XHRcdG1vZHVsZVJvb3QgPSBtb2R1bGVSb290LnBhcmVudDtcblx0XHRcdG1vZHVsZVBhdGhzLnB1c2goZGlybmFtZShtb2R1bGVSb290LmZpbGVuYW1lKSk7XG5cdFx0fVxuXG5cdFx0bW9kdWxlUGF0aHMgPSBbLi4ubmV3IFNldChtb2R1bGVQYXRocyldO1xuXG5cdFx0bW9kdWxlUGF0aHMgPSBtb2R1bGVQYXRoc1xuXHRcdFx0LmZpbHRlcigobW9kdWxlUGF0aCkgPT4gIW1vZHVsZVBhdGguaW5jbHVkZXMoZmluZFJvb3QoX19kaXJuYW1lKSkpIC8vIEZpbHRlciBwYXRocyBiZWxvdyBib2lsZXJwbGF0ZS1zZXJ2ZXJcblx0XHRcdC5maWx0ZXIoKG1vZHVsZVBhdGgpID0+ICFtb2R1bGVQYXRoLmluY2x1ZGVzKCdwYXR0ZXJucGxhdGUtc2VydmVyJykpIC8vIFRPRE86IFJlc29sdmUgdGhpcyBwcm9wZXJseVxuXHRcdFx0LmZpbHRlcigobW9kdWxlUGF0aCkgPT4gIW1vZHVsZVBhdGguaW5jbHVkZXMoJ3BhdHRlcm5wbGF0ZS1jbGllbnQnKSk7IC8vIFRPRE86IFJlc29sdmUgdGhpcyBwcm9wZXJseVxuXG5cdFx0bGV0IGV4aXN0aW5nTW9kdWxlUGF0aHMgPSBbXTtcblxuXHRcdGZvciAobGV0IG1vZHVsZVBhdGggb2YgbW9kdWxlUGF0aHMpIHtcblx0XHRcdGxldCBtb2R1bGVSb290ID0gbW9kdWxlUGF0aDtcblxuXHRcdFx0d2hpbGUoIWF3YWl0IGV4aXN0cyhyZXNvbHZlKG1vZHVsZVJvb3QsICdwYWNrYWdlLmpzb24nKSkpIHtcblx0XHRcdFx0bW9kdWxlUm9vdCA9IGRpcm5hbWUobW9kdWxlUm9vdCk7XG5cdFx0XHR9XG5cblx0XHRcdGV4aXN0aW5nTW9kdWxlUGF0aHMucHVzaChtb2R1bGVSb290KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgYXBwbGljYXRpb24gcnVudGltZSBjd2RzXG5cdFx0YXBwbGljYXRpb24ucnVudGltZS5jd2RzID0gW1xuXHRcdFx0Li4ubmV3IFNldChbXG5cdFx0XHRcdGFwcGxpY2F0aW9uLnJ1bnRpbWUuY3dkLCAvLyBib2lsZXJwbGF0ZSBpbnN0YW5jZSBwcm9qZWN0IGN3ZFxuXHRcdFx0XHQuLi5leGlzdGluZ01vZHVsZVBhdGhzLCAvLyB3YXkgYmV0d2VlblxuXHRcdFx0XHRjYWxsZXJSb290LCAvLyB0b3AgbGV2ZWwgLyBjYWxsZXIgbW9kdWxlXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCkgLy8gY3dkXG5cdFx0XHRdKVxuXHRcdF07XG5cblx0XHQvLyBDaGVjayB3aGljaCB1c2VyIGNvbmZpZyBwYXRocyBleGlzdFxuXHRcdGxldCBleGlzdGluZ0NvbmZpZ1BhdGhzID0gW107XG5cdFx0Zm9yICggbGV0IGNvbmZpZ1BhdGggb2YgY29yZS5wYXRocy5jb25maWd1cmF0aW9uICkge1xuXHRcdFx0Zm9yICggbGV0IGN3ZCBvZiBhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZHMgKSB7XG5cdFx0XHRcdGZvciAobGV0IHN1ZmZpeCBvZiBbJycsIHBrZy5uYW1lXSkge1xuXHRcdFx0XHRcdGxldCB1c2VyUGF0aCA9IHJlc29sdmUoIGN3ZCwgY29uZmlnUGF0aCwgc3VmZml4KTtcblxuXHRcdFx0XHRcdGlmICggYXdhaXQgZXhpc3RzKCB1c2VyUGF0aCApICkge1xuXHRcdFx0XHRcdFx0ZXhpc3RpbmdDb25maWdQYXRocy5wdXNoKHVzZXJQYXRoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBMb2FkIG1vc3Qgc3BlY2lmaWMgcGF0aHMgb25seVxuXHRcdC8vIENoZWNrIGlmIHBhdGhzIGhhdmUgc2libGluZ3MgdGhhdCBjb250YWluIHRoZW0gY29tcGxldGVseSwgdGh1cyBhcmUgc3ViIGRpcmVjdG9yaWVzIC8gbW9yZSBzcGVjaWZpYyBjb25maWd1cmF0aW9uIGZvbGRlcnNcblx0XHRleGlzdGluZ0NvbmZpZ1BhdGhzID0gZXhpc3RpbmdDb25maWdQYXRocy5maWx0ZXIoZnVuY3Rpb24oY29uZmlnUGF0aCkge1xuXHRcdFx0cmV0dXJuIGV4aXN0aW5nQ29uZmlnUGF0aHMuZmlsdGVyKGZ1bmN0aW9uKHN1YkNvbmZpZ1BhdGgpe1xuXHRcdFx0XHRyZXR1cm4gc3ViQ29uZmlnUGF0aC5pbmNsdWRlcyhjb25maWdQYXRoKSAmJiBzdWJDb25maWdQYXRoICE9PSBjb25maWdQYXRoO1xuXHRcdFx0fSkubGVuZ3RoID09PSAwO1xuXHRcdH0pO1xuXG5cdFx0Ly8gTG9hZCBkZW0gY29uZmlncyBmcm9tIGZpbHRlcmVkIHBhdGhzXG5cdFx0bGV0IHVzZXIgPSB7fTtcblx0XHRmb3IgKCBsZXQgdXNlclBhdGggb2YgZXhpc3RpbmdDb25maWdQYXRocyApIHtcblx0XHRcdHRoaXMubG9nLmluZm8oIGBMb2FkaW5nIGNvbmZpZ3VyYXRpb24gZnJvbSAnJHt1c2VyUGF0aH0nYCApO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRsZXQgdXNlclBhdGhDb25maWcgPSBsb2FkKCB1c2VyUGF0aCwgdGhpcy5jb25maWd1cmF0aW9uLmZpbHRlciwgYXBwbGljYXRpb24ucnVudGltZS5lbnYgKTtcblx0XHRcdFx0dXNlciA9IG1lcmdlKCB1c2VyLCB1c2VyUGF0aENvbmZpZyApO1xuXHRcdFx0fSBjYXRjaCAoIGVyciApIHtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoIGBFcnJvciB3aGlsZSByZWFkaW5nIGNvbmZpZ3VyYXRpb24gZnJvbSAke3VzZXJQYXRofS5gICk7XG5cdFx0XHRcdHRoaXMubG9nLmVycm9yKCBlcnIgKTtcblx0XHRcdFx0ZXJyLm1lc3NhZ2UgPSAnRmFpbGVkIGxvYWRpbmcgY29uZmlndXJhdGlvbiBmcm9tICR7dXNlclBhdGh9Jztcblx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1lcmdlKCBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLCBjb3JlLCB1c2VyLCBhcHBsaWNhdGlvbi5ydW50aW1lLmFwaSApO1xuXHRcdGFwcGxpY2F0aW9uLnJ1bnRpbWUucHJlZml4ID0gYXBwbGljYXRpb24ucnVudGltZS5wcmVmaXggfHwgJy8nO1xuXHRcdGFwcGxpY2F0aW9uLnJ1bnRpbWUubW9kZSA9IGFwcGxpY2F0aW9uLnJ1bnRpbWUubW9kZSB8fCAnc2VydmVyJztcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiJdfQ==