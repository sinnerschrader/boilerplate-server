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
					});

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

					(0, _lodash.merge)(application.configuration, core, user, application.runtime.api, function (a, b) {
						if (Array.isArray(a)) {
							return a.concat(b).filter(function (item) {
								return typeof item !== 'undefined';
							});
						}

						if (!Array.isArray(a) && Array.isArray(b)) {
							return [a].concat(b).filter(function (item) {
								return typeof item !== 'undefined';
							});
						}
					});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9jb25maWd1cmUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUMsTUFBTTs7c0JBQ2pCLFFBQVE7O3dCQUNULFdBQVc7Ozs7NkNBRWYsMENBQTBDOzs7O2tDQUNwQywrQkFBK0I7O3FCQUV2QztBQUNkLFFBQU8sRUFBRSxDQUFFLG9CQUFvQixDQUFFOztBQUVqQyxXQUFVLEVBQUU7QUFDWCxRQUFNLEVBQUUsaUJBQWlCO0FBQ3pCLFVBQVEsRUFBRSxpQkFBaUI7RUFDM0I7O0FBRUQsWUFBVyxFQUFFLFNBQWUsbUJBQW1CLENBQUcsV0FBVzs7OztBQUM1RCxnQkFBVyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7O0FBRS9CLFNBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDdEUsWUFBTSxFQUFFLFVBbkJGLE9BQU8sRUFtQkksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUU7TUFDL0QsQ0FBRSxDQUFDOzt5Q0FFRyxJQUFJOzs7Ozs7O0VBQ1g7O0FBRUQsUUFBTyxFQUFFLFNBQWUsZUFBZSxDQUFHLFdBQVc7TUFFaEQsSUFBSSxFQUdKLFdBQVcsRUFDWCxPQUFPLEVBRVAsT0FBTyxFQUVQLEdBQUcsRUFhSCxVQUFVLEVBQ1YsVUFBVSxFQUVWLFdBQVcsRUFDWCxVQUFVLEVBZ0JWLG1CQUFtQixrRkFFZCxVQUFVLEVBQ2QsV0FBVSxFQW9CWCxtQkFBbUIsdUZBQ2IsVUFBVSx1RkFDVCxHQUFHLFlBQ0gsTUFBTSxFQW9CUCxRQUFRLEVBRGQsSUFBSSx1RkFLRixjQUFjOzs7OztBQTNGaEIsU0FBSSxHQUFHLGdEQUFNLFVBM0JWLE9BQU8sRUEyQlcsMkJBQVMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFD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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtoRSxpQkEvSE8sS0FBSyxFQStITCxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQ3BGLFVBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNyQixjQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSTtlQUFLLE9BQU8sSUFBSSxLQUFLLFdBQVc7UUFBQSxDQUFDLENBQUM7T0FDakU7O0FBRUQsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMxQyxjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7ZUFBSyxPQUFPLElBQUksS0FBSyxXQUFXO1FBQUEsQ0FBQyxDQUFDO09BQ25FO01BQ0QsQ0FBQyxDQUFDOztBQUVILGdCQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7QUFDL0QsZ0JBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQzs7eUNBRXpELElBQUk7Ozs7Ozs7RUFDWDtDQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGZpbmRSb290IGZyb20gJ2ZpbmQtcm9vdCc7XG5cbmltcG9ydCBsb2FkIGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgZXhpc3RzIH0gZnJvbSAnLi4vLi4vLi4vbGlicmFyeS91dGlsaXRpZXMvZnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdCdhZnRlcic6IFsgJ2FwcGxpY2F0aW9uOmJlZm9yZScgXSxcblxuXHQnZGVmYXVsdHMnOiB7XG5cdFx0J3BhdGgnOiAnLi9jb25maWd1cmF0aW9uJyxcblx0XHQnZmlsdGVyJzogLyguKikuKGpzfGpzb24pJC9cblx0fSxcblxuXHQnY29uZmlndXJlJzogYXN5bmMgZnVuY3Rpb24gY29uZmlndXJlRW5naW5lSG9vayAoIGFwcGxpY2F0aW9uICkge1xuXHRcdGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24gPSB7fTtcblxuXHRcdHRoaXMuY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oIHRoaXMuY29uZmlndXJhdGlvbiwgdGhpcy5kZWZhdWx0cywge1xuXHRcdFx0J3BhdGgnOiByZXNvbHZlKCBhcHBsaWNhdGlvbi5ydW50aW1lLmJhc2UsIHRoaXMuZGVmYXVsdHMucGF0aCApXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0J3N0YXJ0JzogYXN5bmMgZnVuY3Rpb24gc3RhcnRFbmdpbmVIb29rICggYXBwbGljYXRpb24gKSB7XG5cdFx0Ly8gTG9hZCBib2lsZXJwbGF0ZS1zZXJ2ZXIgY29yZSBjb25maWd1cmF0aW9uXG5cdFx0bGV0IGNvcmUgPSBsb2FkKCByZXNvbHZlKGZpbmRSb290KF9fZGlybmFtZSksIHRoaXMuY29uZmlndXJhdGlvbi5wYXRoKSwgdGhpcy5jb25maWd1cmF0aW9uLmZpbHRlciwgYXBwbGljYXRpb24ucnVudGltZS5lbnYgKTtcblxuXHRcdC8vIExvYWQgcGFja2FnZS5qc29uc1xuXHRcdGxldCBjb3JlUGtnUGF0aCA9IHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgJ3BhY2thZ2UuanNvbicgKTtcblx0XHRsZXQgcGtnUGF0aCA9IHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuY3dkLCAncGFja2FnZS5qc29uJyApO1xuXG5cdFx0bGV0IGNvcmVQa2cgPSByZXF1aXJlKCBjb3JlUGtnUGF0aCApO1xuXG5cdFx0bGV0IHBrZyA9IHt9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdHBrZyA9IHJlcXVpcmUoIHBrZ1BhdGggKTtcblx0XHR9IGNhdGNoICggZXJyICkge1xuXHRcdFx0dGhpcy5sb2cud2FybiggYENvdWxkIG5vdCByZWFkICR7cGtnUGF0aH0uYCApO1xuXHRcdH1cblxuXHRcdHBrZyA9IG1lcmdlKCB7fSwgY29yZVBrZywgcGtnICk7XG5cblx0XHQvLyBBbGxvdyB1c2VyIHRvIG92ZXJyaWRlIGNvcmUgYmVoYXZpb3VyIHZpYSBjbGkgYW5kICpyYyBmaWxlc1xuXHRcdGNvcmUgPSBtZXJnZSgge30sIGNvcmUsIHsgJ3BrZyc6IHBrZyB9LCBhcHBsaWNhdGlvbi5ydW50aW1lLmFwaSApO1xuXG5cdFx0bGV0IGNhbGxlclBhdGggPSByZXF1aXJlLm1haW4uZmlsZW5hbWU7XG5cdFx0bGV0IGNhbGxlclJvb3QgPSBjYWxsZXJQYXRoO1xuXG5cdFx0bGV0IG1vZHVsZVBhdGhzID0gW2Rpcm5hbWUobW9kdWxlLmZpbGVuYW1lKV07XG5cdFx0bGV0IG1vZHVsZVJvb3QgPSBtb2R1bGU7XG5cblx0XHQvLyBGaW5kIHRoZSByb290IG5vZGUgbW9kdWxlXG5cdFx0d2hpbGUgKCFhd2FpdCBleGlzdHMocmVzb2x2ZShjYWxsZXJSb290LCAncGFja2FnZS5qc29uJykpKSB7XG5cdFx0XHRjYWxsZXJSb290ID0gZGlybmFtZShjYWxsZXJSb290KTtcblx0XHR9XG5cblx0XHQvLyBGaW5kIGFsbCBub2RlIG1vZHVsZXMgb24gdGhlIHdheSBmcm9tIGhlcmUgdG8gdGhlIHRvcFxuXHRcdHdoaWxlKG1vZHVsZVJvb3QucGFyZW50KSB7XG5cdFx0XHRtb2R1bGVSb290ID0gbW9kdWxlUm9vdC5wYXJlbnQ7XG5cdFx0XHRtb2R1bGVQYXRocy5wdXNoKGRpcm5hbWUobW9kdWxlUm9vdC5maWxlbmFtZSkpO1xuXHRcdH1cblxuXHRcdG1vZHVsZVBhdGhzID0gWy4uLm5ldyBTZXQobW9kdWxlUGF0aHMpXTtcblx0XHRtb2R1bGVQYXRocyA9IG1vZHVsZVBhdGhzLmZpbHRlcigobW9kdWxlUGF0aCkgPT4gIW1vZHVsZVBhdGguaW5jbHVkZXMoZmluZFJvb3QoX19kaXJuYW1lKSkpO1xuXG5cdFx0bGV0IGV4aXN0aW5nTW9kdWxlUGF0aHMgPSBbXTtcblxuXHRcdGZvciAobGV0IG1vZHVsZVBhdGggb2YgbW9kdWxlUGF0aHMpIHtcblx0XHRcdGxldCBtb2R1bGVSb290ID0gbW9kdWxlUGF0aDtcblxuXHRcdFx0d2hpbGUoIWF3YWl0IGV4aXN0cyhyZXNvbHZlKG1vZHVsZVJvb3QsICdwYWNrYWdlLmpzb24nKSkpIHtcblx0XHRcdFx0bW9kdWxlUm9vdCA9IGRpcm5hbWUobW9kdWxlUm9vdCk7XG5cdFx0XHR9XG5cblx0XHRcdGV4aXN0aW5nTW9kdWxlUGF0aHMucHVzaChtb2R1bGVSb290KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgYXBwbGljYXRpb24gcnVudGltZSBjd2RzXG5cdFx0YXBwbGljYXRpb24ucnVudGltZS5jd2RzID0gW1xuXHRcdFx0Li4ubmV3IFNldChbXG5cdFx0XHRcdGFwcGxpY2F0aW9uLnJ1bnRpbWUuY3dkLCAvLyBib2lsZXJwbGF0ZSBpbnN0YW5jZSBwcm9qZWN0IGN3ZFxuXHRcdFx0XHQuLi5leGlzdGluZ01vZHVsZVBhdGhzLCAvLyB3YXkgYmV0d2VlblxuXHRcdFx0XHRjYWxsZXJSb290LCAvLyB0b3AgbGV2ZWwgLyBjYWxsZXIgbW9kdWxlXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCkgLy8gY3dkXG5cdFx0XHRdKVxuXHRcdF07XG5cblx0XHQvLyBDaGVjayB3aGljaCB1c2VyIGNvbmZpZyBwYXRocyBleGlzdFxuXHRcdGxldCBleGlzdGluZ0NvbmZpZ1BhdGhzID0gW107XG5cdFx0Zm9yICggbGV0IGNvbmZpZ1BhdGggb2YgY29yZS5wYXRocy5jb25maWd1cmF0aW9uICkge1xuXHRcdFx0Zm9yICggbGV0IGN3ZCBvZiBhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZHMgKSB7XG5cdFx0XHRcdGZvciAobGV0IHN1ZmZpeCBvZiBbJycsIHBrZy5uYW1lXSkge1xuXHRcdFx0XHRcdGxldCB1c2VyUGF0aCA9IHJlc29sdmUoIGN3ZCwgY29uZmlnUGF0aCwgc3VmZml4KTtcblxuXHRcdFx0XHRcdGlmICggYXdhaXQgZXhpc3RzKCB1c2VyUGF0aCApICkge1xuXHRcdFx0XHRcdFx0ZXhpc3RpbmdDb25maWdQYXRocy5wdXNoKHVzZXJQYXRoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBMb2FkIG1vc3Qgc3BlY2lmaWMgcGF0aHMgb25seVxuXHRcdC8vIENoZWNrIGlmIHBhdGhzIGhhdmUgc2libGluZ3MgdGhhdCBjb250YWluIHRoZW0gY29tcGxldGVseSwgdGh1cyBhcmUgc3ViIGRpcmVjdG9yaWVzIC8gbW9yZSBzcGVjaWZpYyBjb25maWd1cmF0aW9uIGZvbGRlcnNcblx0XHRleGlzdGluZ0NvbmZpZ1BhdGhzID0gZXhpc3RpbmdDb25maWdQYXRocy5maWx0ZXIoZnVuY3Rpb24oY29uZmlnUGF0aCkge1xuXHRcdFx0cmV0dXJuIGV4aXN0aW5nQ29uZmlnUGF0aHMuZmlsdGVyKGZ1bmN0aW9uKHN1YkNvbmZpZ1BhdGgpe1xuXHRcdFx0XHRyZXR1cm4gc3ViQ29uZmlnUGF0aC5pbmNsdWRlcyhjb25maWdQYXRoKSAmJiBzdWJDb25maWdQYXRoICE9PSBjb25maWdQYXRoO1xuXHRcdFx0fSkubGVuZ3RoID09PSAwO1xuXHRcdH0pO1xuXG5cdFx0Ly8gTG9hZCBkZW0gY29uZmlncyBmcm9tIGZpbHRlcmVkIHBhdGhzXG5cdFx0bGV0IHVzZXIgPSB7fTtcblx0XHRmb3IgKCBsZXQgdXNlclBhdGggb2YgZXhpc3RpbmdDb25maWdQYXRocyApIHtcblx0XHRcdHRoaXMubG9nLmluZm8oIGBMb2FkaW5nIGNvbmZpZ3VyYXRpb24gZnJvbSAnJHt1c2VyUGF0aH0nYCApO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRsZXQgdXNlclBhdGhDb25maWcgPSBsb2FkKCB1c2VyUGF0aCwgdGhpcy5jb25maWd1cmF0aW9uLmZpbHRlciwgYXBwbGljYXRpb24ucnVudGltZS5lbnYgKTtcblx0XHRcdFx0dXNlciA9IG1lcmdlKCB1c2VyLCB1c2VyUGF0aENvbmZpZyApO1xuXHRcdFx0fSBjYXRjaCAoIGVyciApIHtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoIGBFcnJvciB3aGlsZSByZWFkaW5nIGNvbmZpZ3VyYXRpb24gZnJvbSAke3VzZXJQYXRofS5gICk7XG5cdFx0XHRcdHRoaXMubG9nLmVycm9yKCBlcnIgKTtcblx0XHRcdFx0ZXJyLm1lc3NhZ2UgPSAnRmFpbGVkIGxvYWRpbmcgY29uZmlndXJhdGlvbiBmcm9tICR7dXNlclBhdGh9Jztcblx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1lcmdlKCBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLCBjb3JlLCB1c2VyLCBhcHBsaWNhdGlvbi5ydW50aW1lLmFwaSwgZnVuY3Rpb24oYSwgYil7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuXHRcdFx0XHRyZXR1cm4gYS5jb25jYXQoYikuZmlsdGVyKChpdGVtKSA9PiB0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkoYSkgJiYgQXJyYXkuaXNBcnJheShiKSkge1xuXHRcdFx0XHRyZXR1cm4gW2FdLmNvbmNhdChiKS5maWx0ZXIoKGl0ZW0pID0+IHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRhcHBsaWNhdGlvbi5ydW50aW1lLnByZWZpeCA9IGFwcGxpY2F0aW9uLnJ1bnRpbWUucHJlZml4IHx8ICcvJztcblx0XHRhcHBsaWNhdGlvbi5ydW50aW1lLm1vZGUgPSBhcHBsaWNhdGlvbi5ydW50aW1lLm1vZGUgfHwgJ3NlcnZlcic7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiJdfQ==