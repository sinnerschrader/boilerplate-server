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
		var coreHookPath, userHookPaths, userHooks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userHookPath, loadedHooks;

		return regeneratorRuntime.async(function startUserHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					coreHookPath = (0, _path.resolve)(application.runtime.base, application.configuration.paths.hooks);

					this.configuration.path = Array.isArray(this.configuration.path) ? this.configuration.path : [this.configuration.path];
					// TODO: Fix for mysteriously split last path, investigate
					this.configuration.path = this.configuration.path.filter(function (item) {
						return item.length > 1;
					});

					userHookPaths = this.configuration.path.reduce(function (items, item) {
						return items.concat(application.runtime.cwds.map(function (cwd) {
							return (0, _path.resolve)(cwd, item);
						}));
					}, []).filter(function (item) {
						return item !== coreHookPath;
					});

					userHookPaths = [].concat(_toConsumableArray(new Set(userHookPaths)));
					userHooks = [];
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 9;
					_iterator = userHookPaths[Symbol.iterator]();

				case 11:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 27;
						break;
					}

					userHookPath = _step.value;
					context$1$0.next = 15;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(userHookPath));

				case 15:
					context$1$0.t0 = context$1$0.sent;

					if (!(context$1$0.t0 === false)) {
						context$1$0.next = 20;
						break;
					}

					return context$1$0.abrupt('continue', 24);

				case 20:
					application.log.info('Loading user hooks from ' + userHookPath + '...');

				case 21:
					loadedHooks = (0, _libraryHooksLoad2['default'])(application, userHookPath, true);

					userHooks = userHooks.concat(loadedHooks);
					application.log.info('Loaded ' + loadedHooks.length + ' user hooks: ' + loadedHooks.map(function (loadedHook) {
						return loadedHook.name;
					}));

				case 24:
					_iteratorNormalCompletion = true;
					context$1$0.next = 11;
					break;

				case 27:
					context$1$0.next = 33;
					break;

				case 29:
					context$1$0.prev = 29;
					context$1$0.t1 = context$1$0['catch'](9);
					_didIteratorError = true;
					_iteratorError = context$1$0.t1;

				case 33:
					context$1$0.prev = 33;
					context$1$0.prev = 34;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 36:
					context$1$0.prev = 36;

					if (!_didIteratorError) {
						context$1$0.next = 39;
						break;
					}

					throw _iteratorError;

				case 39:
					return context$1$0.finish(36);

				case 40:
					return context$1$0.finish(33);

				case 41:

					// Let the last user hook with a given name reign
					userHooks = [].concat(_toConsumableArray(new Set(userHooks.reverse()))).reverse();

					userHooks = userHooks.map(function (userHook) {
						// Detect hooks conflictsing with core hooks
						var conflictingCoreHook = application.hooks.filter(function (coreHook) {
							return coreHook.name === userHook.name;
						})[0];

						if (conflictingCoreHook) {
							application.log.warn('Hook "' + userHook.name + '" from ' + userHook.requirePath + ' conflicts with core hook "' + conflictingCoreHook.name + '", will not load.');
							return null;
						}
						return userHook;
					}).filter(function (item) {
						return item;
					});

					userHooks.forEach(function (hook) {
						return hook.register(application);
					});
					return context$1$0.abrupt('return', this);

				case 45:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[9, 29, 33, 41], [34,, 36, 40]]);
	}
};
module.exports = exports['default'];

// load user hooks