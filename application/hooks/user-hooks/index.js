'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('path');

var _libraryHooksLoad = require('../../../library/hooks/load');

var _libraryHooksLoad2 = _interopRequireDefault(_libraryHooksLoad);

var _libraryUtilitiesFs = require('../../../library/utilities/fs');

exports['default'] = {
	'configurationKey': 'hooks',

	'after': ['hooks:configure:start:after'],

	'start': function startUserHook(application) {
		var coreHookPath, isProjectMode, userHookPaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userHookPath, hooks, moduleHooks;

		return regeneratorRuntime.async(function startUserHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					coreHookPath = (0, _path.resolve)(application.runtime.base, application.configuration.paths.hooks);
					isProjectMode = this.configuration.path === coreHookPath;

					this.configuration.path = Array.isArray(this.configuration.path) ? this.configuration.path : [this.configuration.path];

					// TODO: Fix for mysteriously split last path, investigate
					this.configuration.path = this.configuration.path.filter(function (item) {
						return item.length > 1;
					});

					userHookPaths = this.configuration.path.reduce(function (items, item) {
						return items.concat(application.runtime.cwds.map(function (cwd) {
							return (0, _path.resolve)(cwd, item);
						}));
					}, []);

					userHookPaths = [].concat(_toConsumableArray(new Set(userHookPaths)));

					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 9;
					_iterator = userHookPaths[Symbol.iterator]();

				case 11:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 26;
						break;
					}

					userHookPath = _step.value;
					context$1$0.next = 15;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(userHookPath));

				case 15:
					context$1$0.t0 = context$1$0.sent;

					if (!(context$1$0.t0 === false)) {
						context$1$0.next = 19;
						break;
					}

					this.log.warn('No user hooks found at ' + coreHookPath);
					return context$1$0.abrupt('return', this);

				case 19:
					hooks = (0, _libraryHooksLoad2['default'])(application, userHookPath, true);

					hooks = hooks.map(function (hook) {
						var conflictingCoreHooks = application.hooks.filter(function (coreHook) {
							return coreHook.name === hook.name;
						});

						if (conflictingCoreHooks.length > 0) {
							if (isProjectMode === false) {
								_this.log.warn('User hook \'' + hook.name + '\' conflicts with core hook \'' + conflictingCoreHooks[0].name + '\'');
							}
							return false;
						}

						return hook;
					}).filter(function (item) {
						return item;
					});

					application.hooks = application.hooks.concat(hooks);
					hooks.forEach(function (hook) {
						return hook.register(application);
					});

				case 23:
					_iteratorNormalCompletion = true;
					context$1$0.next = 11;
					break;

				case 26:
					context$1$0.next = 32;
					break;

				case 28:
					context$1$0.prev = 28;
					context$1$0.t1 = context$1$0['catch'](9);
					_didIteratorError = true;
					_iteratorError = context$1$0.t1;

				case 32:
					context$1$0.prev = 32;
					context$1$0.prev = 33;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 35:
					context$1$0.prev = 35;

					if (!_didIteratorError) {
						context$1$0.next = 38;
						break;
					}

					throw _iteratorError;

				case 38:
					return context$1$0.finish(35);

				case 39:
					return context$1$0.finish(32);

				case 40:
					moduleHooks = Object.keys(this.configuration.enabled).filter(function (hookName) {
						return typeof _this.configuration.enabled[hookName].enabled === 'string';
					}).reduce(function (result, hookName) {
						var hookModuleName = _this.configuration.enabled[hookName].enabled;

						try {
							result.push(require(hookModuleName));
							_this.log.debug('Required module route \'' + hookName + '\' from module \'' + hookModuleName + '\'');
						} catch (err) {
							_this.log.warn('Could not require module route \'' + hookName + '\' from module \'' + hookModuleName + '\'');
							_this.log.debug(err);
						}

						return result;
					}, []);

					application.hooks = application.hooks.concat(moduleHooks);
					moduleHooks.forEach(function (hook) {
						return hook.register(application);
					});

					return context$1$0.abrupt('return', this);

				case 44:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[9, 28, 32, 40], [33,, 35, 39]]);
	}
};
module.exports = exports['default'];

// load module hooks