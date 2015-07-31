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
					context$1$0.prev = 8;
					_iterator = userHookPaths[Symbol.iterator]();

				case 10:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 26;
						break;
					}

					userHookPath = _step.value;
					context$1$0.next = 14;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(userHookPath));

				case 14:
					context$1$0.t0 = context$1$0.sent;

					if (!(context$1$0.t0 === false)) {
						context$1$0.next = 19;
						break;
					}

					return context$1$0.abrupt('continue', 23);

				case 19:
					application.log.info('Loading user hooks from ' + userHookPath + '...');

				case 20:
					loadedHooks = (0, _libraryHooksLoad2['default'])(application, userHookPath, true);

					userHooks = userHooks.concat(loadedHooks);
					application.log.info('Loaded ' + loadedHooks.length + ' user hooks: ' + loadedHooks.map(function (loadedHook) {
						return loadedHook.name;
					}));

				case 23:
					_iteratorNormalCompletion = true;
					context$1$0.next = 10;
					break;

				case 26:
					context$1$0.next = 32;
					break;

				case 28:
					context$1$0.prev = 28;
					context$1$0.t1 = context$1$0['catch'](8);
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

				case 45:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[8, 28, 32, 40], [33,, 35, 39]]);
	}
};
module.exports = exports['default'];

// load user hooks
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy91c2VyLWhvb2tzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQXdCLE1BQU07O2dDQUViLDZCQUE2Qjs7OztrQ0FDdkIsK0JBQStCOztxQkFFdkM7QUFDZCxtQkFBa0IsRUFBRSxPQUFPOztBQUUzQixRQUFPLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTs7QUFFMUMsUUFBTyxFQUFFLFNBQWUsYUFBYSxDQUFHLFdBQVc7TUFDOUMsWUFBWSxFQUlaLGFBQWEsRUFPYixTQUFTLGtGQUdKLFlBQVksRUFPaEIsV0FBVzs7Ozs7QUFyQlosaUJBQVksR0FBRyxVQVhaLE9BQU8sRUFXYSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7O0FBRTNGLFNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5ILGtCQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3pDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztjQUFLLFVBakJqQyxPQUFPLEVBaUJrQyxHQUFHLEVBQUUsSUFBSSxDQUFDO09BQUEsQ0FBQyxDQUN6RDtNQUFBLEVBQUUsRUFBRSxDQUFDLENBQ0wsTUFBTSxDQUFDLFVBQUMsSUFBSTthQUFLLElBQUksS0FBSyxZQUFZO01BQUEsQ0FBQzs7QUFFekMsa0JBQWEsZ0NBQU8sSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUMsQ0FBQztBQUN4QyxjQUFTLEdBQUcsRUFBRTs7Ozs7aUJBR08sYUFBYTs7Ozs7Ozs7QUFBN0IsaUJBQVk7O3FDQUNULHdCQXZCTCxNQUFNLEVBdUJPLFlBQVksQ0FBRTs7Ozs7OEJBQUssS0FBSzs7Ozs7Ozs7QUFHMUMsZ0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSw4QkFBNEIsWUFBWSxTQUFNLENBQUM7OztBQUdoRSxnQkFBVyxHQUFHLG1DQUFNLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFFOztBQUN6RCxjQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxQyxnQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQVcsV0FBVyxDQUFDLE1BQU0scUJBQWdCLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFVO2FBQUssVUFBVSxDQUFDLElBQUk7TUFBQSxDQUFDLENBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJdEgsY0FBUyxHQUFHLDZCQUFJLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFFLE9BQU8sRUFBRSxDQUFDOztBQUV4RCxjQUFTLEdBQUcsU0FBUyxDQUNuQixHQUFHLENBQUMsVUFBUyxRQUFRLEVBQUM7O0FBRXRCLFVBQUksbUJBQW1CLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRO2NBQUssUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSTtPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckcsVUFBSSxtQkFBbUIsRUFBRTtBQUN4QixrQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVUsUUFBUSxDQUFDLElBQUksZUFBVSxRQUFRLENBQUMsV0FBVyxtQ0FBOEIsbUJBQW1CLENBQUMsSUFBSSx1QkFBb0IsQ0FBQztBQUNwSixjQUFPLElBQUksQ0FBQztPQUNaO0FBQ0QsYUFBTyxRQUFRLENBQUM7TUFDaEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7YUFBTSxJQUFJO01BQUMsQ0FBQyxDQUFDOztBQUU3QixjQUFTLENBQUMsT0FBTyxDQUFFLFVBQUUsSUFBSTthQUFNLElBQUksQ0FBQyxRQUFRLENBQUUsV0FBVyxDQUFFO01BQUEsQ0FBRSxDQUFDO0FBQzlELGdCQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lDQUNqRCxJQUFJOzs7Ozs7O0VBQ1g7Q0FDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IGxvYWQgZnJvbSAnLi4vLi4vLi4vbGlicmFyeS9ob29rcy9sb2FkJztcbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2ZzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHQnY29uZmlndXJhdGlvbktleSc6ICdob29rcycsXG5cblx0J2FmdGVyJzogWyAnaG9va3M6Y29uZmlndXJlOnN0YXJ0OmFmdGVyJyBdLFxuXG5cdCdzdGFydCc6IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0VXNlckhvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRsZXQgY29yZUhvb2tQYXRoID0gcmVzb2x2ZShhcHBsaWNhdGlvbi5ydW50aW1lLmJhc2UsIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24ucGF0aHMuaG9va3MpO1xuXG5cdFx0dGhpcy5jb25maWd1cmF0aW9uLnBhdGggPSBBcnJheS5pc0FycmF5KHRoaXMuY29uZmlndXJhdGlvbi5wYXRoKSA/IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoIDogW3RoaXMuY29uZmlndXJhdGlvbi5wYXRoXTtcblxuXHRcdGxldCB1c2VySG9va1BhdGhzID0gdGhpcy5jb25maWd1cmF0aW9uLnBhdGhcblx0XHRcdC5yZWR1Y2UoKGl0ZW1zLCBpdGVtKSA9PiBpdGVtcy5jb25jYXQoXG5cdFx0XHRcdGFwcGxpY2F0aW9uLnJ1bnRpbWUuY3dkcy5tYXAoKGN3ZCkgPT4gcmVzb2x2ZShjd2QsIGl0ZW0pKVxuXHRcdFx0KSwgW10pXG5cdFx0XHQuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBjb3JlSG9va1BhdGgpO1xuXG5cdFx0dXNlckhvb2tQYXRocyA9IFsuLi5uZXcgU2V0KHVzZXJIb29rUGF0aHMpXTtcblx0XHRsZXQgdXNlckhvb2tzID0gW107XG5cblx0XHQvLyBsb2FkIHVzZXIgaG9va3Ncblx0XHRmb3IgKGxldCB1c2VySG9va1BhdGggb2YgdXNlckhvb2tQYXRocykge1xuXHRcdFx0aWYgKCBhd2FpdCBleGlzdHMoIHVzZXJIb29rUGF0aCApID09PSBmYWxzZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyhgTG9hZGluZyB1c2VyIGhvb2tzIGZyb20gJHt1c2VySG9va1BhdGh9Li4uYCk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBsb2FkZWRIb29rcyA9IGxvYWQoIGFwcGxpY2F0aW9uLCB1c2VySG9va1BhdGgsIHRydWUgKTtcblx0XHRcdHVzZXJIb29rcyA9IHVzZXJIb29rcy5jb25jYXQobG9hZGVkSG9va3MpO1xuXHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oYExvYWRlZCAke2xvYWRlZEhvb2tzLmxlbmd0aH0gdXNlciBob29rczogJHtsb2FkZWRIb29rcy5tYXAoKGxvYWRlZEhvb2spID0+IGxvYWRlZEhvb2submFtZSl9YCk7XG5cdFx0fVxuXG5cdFx0Ly8gTGV0IHRoZSBsYXN0IHVzZXIgaG9vayB3aXRoIGEgZ2l2ZW4gbmFtZSByZWlnblxuXHRcdHVzZXJIb29rcyA9IFsuLi5uZXcgU2V0KHVzZXJIb29rcy5yZXZlcnNlKCkpXS5yZXZlcnNlKCk7XG5cblx0XHR1c2VySG9va3MgPSB1c2VySG9va3Ncblx0XHRcdC5tYXAoZnVuY3Rpb24odXNlckhvb2spe1xuXHRcdFx0XHQvLyBEZXRlY3QgaG9va3MgY29uZmxpY3Rpbmcgd2l0aCBjb3JlIGhvb2tzXG5cdFx0XHRcdGxldCBjb25mbGljdGluZ0NvcmVIb29rID0gYXBwbGljYXRpb24uaG9va3MuZmlsdGVyKChjb3JlSG9vaykgPT4gY29yZUhvb2submFtZSA9PT0gdXNlckhvb2submFtZSlbMF07XG5cblx0XHRcdFx0aWYgKGNvbmZsaWN0aW5nQ29yZUhvb2spIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbi5sb2cud2FybihgSG9vayBcIiR7dXNlckhvb2submFtZX1cIiBmcm9tICR7dXNlckhvb2sucmVxdWlyZVBhdGh9IGNvbmZsaWN0cyB3aXRoIGNvcmUgaG9vayBcIiR7Y29uZmxpY3RpbmdDb3JlSG9vay5uYW1lfVwiLCB3aWxsIG5vdCBsb2FkLmApO1xuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB1c2VySG9vaztcblx0XHRcdH0pLmZpbHRlcigoaXRlbSkgPT4gKGl0ZW0pKTtcblxuXHRcdHVzZXJIb29rcy5mb3JFYWNoKCAoIGhvb2sgKSA9PiBob29rLnJlZ2lzdGVyKCBhcHBsaWNhdGlvbiApICk7XG5cdFx0YXBwbGljYXRpb24uaG9va3MgPSBhcHBsaWNhdGlvbi5ob29rcy5jb25jYXQodXNlckhvb2tzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiJdfQ==