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
						// Detect hooks conflicting with core hooks
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
					application.hooks = application.hooks.concat(userHooks);
					return context$1$0.abrupt('return', this);

				case 46:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[9, 29, 33, 41], [34,, 36, 40]]);
	}
};
module.exports = exports['default'];

// load user hooks
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy91c2VyLWhvb2tzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQXdCLE1BQU07O2dDQUViLDZCQUE2Qjs7OztrQ0FDdkIsK0JBQStCOztxQkFFdkM7QUFDZCxtQkFBa0IsRUFBRSxPQUFPOztBQUUzQixRQUFPLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTs7QUFFMUMsUUFBTyxFQUFFLFNBQWUsYUFBYSxDQUFHLFdBQVc7TUFDOUMsWUFBWSxFQU1aLGFBQWEsRUFPYixTQUFTLGtGQUdKLFlBQVksRUFPaEIsV0FBVzs7Ozs7QUF2QlosaUJBQVksR0FBRyxVQVhaLE9BQU8sRUFXYSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7O0FBRTNGLFNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXZILFNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7YUFBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7TUFBQSxDQUFDLENBQUM7O0FBRWhGLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3pDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztjQUFLLFVBbkJqQyxPQUFPLEVBbUJrQyxHQUFHLEVBQUUsSUFBSSxDQUFDO09BQUEsQ0FBQyxDQUN6RDtNQUFBLEVBQUUsRUFBRSxDQUFDLENBQ0wsTUFBTSxDQUFDLFVBQUMsSUFBSTthQUFLLElBQUksS0FBSyxZQUFZO01BQUEsQ0FBQzs7QUFFekMsa0JBQWEsZ0NBQU8sSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUMsQ0FBQztBQUN4QyxjQUFTLEdBQUcsRUFBRTs7Ozs7aUJBR08sYUFBYTs7Ozs7Ozs7QUFBN0IsaUJBQVk7O3FDQUNULHdCQXpCTCxNQUFNLEVBeUJPLFlBQVksQ0FBRTs7Ozs7OEJBQUssS0FBSzs7Ozs7Ozs7QUFHMUMsZ0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSw4QkFBNEIsWUFBWSxTQUFNLENBQUM7OztBQUdoRSxnQkFBVyxHQUFHLG1DQUFNLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFFOztBQUN6RCxjQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxQyxnQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQVcsV0FBVyxDQUFDLE1BQU0scUJBQWdCLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFVO2FBQUssVUFBVSxDQUFDLElBQUk7TUFBQSxDQUFDLENBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJdEgsY0FBUyxHQUFHLDZCQUFJLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFFLE9BQU8sRUFBRSxDQUFDOztBQUV4RCxjQUFTLEdBQUcsU0FBUyxDQUNuQixHQUFHLENBQUMsVUFBUyxRQUFRLEVBQUM7O0FBRXRCLFVBQUksbUJBQW1CLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRO2NBQUssUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSTtPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckcsVUFBSSxtQkFBbUIsRUFBRTtBQUN4QixrQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVUsUUFBUSxDQUFDLElBQUksZUFBVSxRQUFRLENBQUMsV0FBVyxtQ0FBOEIsbUJBQW1CLENBQUMsSUFBSSx1QkFBb0IsQ0FBQztBQUNwSixjQUFPLElBQUksQ0FBQztPQUNaO0FBQ0QsYUFBTyxRQUFRLENBQUM7TUFDaEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7YUFBTSxJQUFJO01BQUMsQ0FBQyxDQUFDOztBQUU3QixjQUFTLENBQUMsT0FBTyxDQUFFLFVBQUUsSUFBSTthQUFNLElBQUksQ0FBQyxRQUFRLENBQUUsV0FBVyxDQUFFO01BQUEsQ0FBRSxDQUFDO0FBQzlELGdCQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lDQUNqRCxJQUFJOzs7Ozs7O0VBQ1g7Q0FDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IGxvYWQgZnJvbSAnLi4vLi4vLi4vbGlicmFyeS9ob29rcy9sb2FkJztcbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2ZzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHQnY29uZmlndXJhdGlvbktleSc6ICdob29rcycsXG5cblx0J2FmdGVyJzogWyAnaG9va3M6Y29uZmlndXJlOnN0YXJ0OmFmdGVyJyBdLFxuXG5cdCdzdGFydCc6IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0VXNlckhvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRsZXQgY29yZUhvb2tQYXRoID0gcmVzb2x2ZShhcHBsaWNhdGlvbi5ydW50aW1lLmJhc2UsIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24ucGF0aHMuaG9va3MpO1xuXG5cdFx0dGhpcy5jb25maWd1cmF0aW9uLnBhdGggPSBBcnJheS5pc0FycmF5KHRoaXMuY29uZmlndXJhdGlvbi5wYXRoKSA/IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoIDogW3RoaXMuY29uZmlndXJhdGlvbi5wYXRoXTtcblx0XHQvLyBUT0RPOiBGaXggZm9yIG15c3RlcmlvdXNseSBzcGxpdCBsYXN0IHBhdGgsIGludmVzdGlnYXRlXG5cdFx0dGhpcy5jb25maWd1cmF0aW9uLnBhdGggPSB0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGVuZ3RoID4gMSk7XG5cblx0XHRsZXQgdXNlckhvb2tQYXRocyA9IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoXG5cdFx0XHQucmVkdWNlKChpdGVtcywgaXRlbSkgPT4gaXRlbXMuY29uY2F0KFxuXHRcdFx0XHRhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZHMubWFwKChjd2QpID0+IHJlc29sdmUoY3dkLCBpdGVtKSlcblx0XHRcdCksIFtdKVxuXHRcdFx0LmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gY29yZUhvb2tQYXRoKTtcblxuXHRcdHVzZXJIb29rUGF0aHMgPSBbLi4ubmV3IFNldCh1c2VySG9va1BhdGhzKV07XG5cdFx0bGV0IHVzZXJIb29rcyA9IFtdO1xuXG5cdFx0Ly8gbG9hZCB1c2VyIGhvb2tzXG5cdFx0Zm9yIChsZXQgdXNlckhvb2tQYXRoIG9mIHVzZXJIb29rUGF0aHMpIHtcblx0XHRcdGlmICggYXdhaXQgZXhpc3RzKCB1c2VySG9va1BhdGggKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oYExvYWRpbmcgdXNlciBob29rcyBmcm9tICR7dXNlckhvb2tQYXRofS4uLmApO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbG9hZGVkSG9va3MgPSBsb2FkKCBhcHBsaWNhdGlvbiwgdXNlckhvb2tQYXRoLCB0cnVlICk7XG5cdFx0XHR1c2VySG9va3MgPSB1c2VySG9va3MuY29uY2F0KGxvYWRlZEhvb2tzKTtcblx0XHRcdGFwcGxpY2F0aW9uLmxvZy5pbmZvKGBMb2FkZWQgJHtsb2FkZWRIb29rcy5sZW5ndGh9IHVzZXIgaG9va3M6ICR7bG9hZGVkSG9va3MubWFwKChsb2FkZWRIb29rKSA9PiBsb2FkZWRIb29rLm5hbWUpfWApO1xuXHRcdH1cblxuXHRcdC8vIExldCB0aGUgbGFzdCB1c2VyIGhvb2sgd2l0aCBhIGdpdmVuIG5hbWUgcmVpZ25cblx0XHR1c2VySG9va3MgPSBbLi4ubmV3IFNldCh1c2VySG9va3MucmV2ZXJzZSgpKV0ucmV2ZXJzZSgpO1xuXG5cdFx0dXNlckhvb2tzID0gdXNlckhvb2tzXG5cdFx0XHQubWFwKGZ1bmN0aW9uKHVzZXJIb29rKXtcblx0XHRcdFx0Ly8gRGV0ZWN0IGhvb2tzIGNvbmZsaWN0aW5nIHdpdGggY29yZSBob29rc1xuXHRcdFx0XHRsZXQgY29uZmxpY3RpbmdDb3JlSG9vayA9IGFwcGxpY2F0aW9uLmhvb2tzLmZpbHRlcigoY29yZUhvb2spID0+IGNvcmVIb29rLm5hbWUgPT09IHVzZXJIb29rLm5hbWUpWzBdO1xuXG5cdFx0XHRcdGlmIChjb25mbGljdGluZ0NvcmVIb29rKSB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb24ubG9nLndhcm4oYEhvb2sgXCIke3VzZXJIb29rLm5hbWV9XCIgZnJvbSAke3VzZXJIb29rLnJlcXVpcmVQYXRofSBjb25mbGljdHMgd2l0aCBjb3JlIGhvb2sgXCIke2NvbmZsaWN0aW5nQ29yZUhvb2submFtZX1cIiwgd2lsbCBub3QgbG9hZC5gKTtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdXNlckhvb2s7XG5cdFx0XHR9KS5maWx0ZXIoKGl0ZW0pID0+IChpdGVtKSk7XG5cblx0XHR1c2VySG9va3MuZm9yRWFjaCggKCBob29rICkgPT4gaG9vay5yZWdpc3RlciggYXBwbGljYXRpb24gKSApO1xuXHRcdGFwcGxpY2F0aW9uLmhvb2tzID0gYXBwbGljYXRpb24uaG9va3MuY29uY2F0KHVzZXJIb29rcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG4iXX0=