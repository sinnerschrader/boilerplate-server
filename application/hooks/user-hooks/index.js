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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy91c2VyLWhvb2tzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQXdCLE1BQU07O2dDQUViLDZCQUE2Qjs7OztrQ0FDdkIsK0JBQStCOztxQkFFdkM7QUFDZCxtQkFBa0IsRUFBRSxPQUFPOztBQUUzQixRQUFPLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTs7QUFFMUMsUUFBTyxFQUFFLFNBQWUsYUFBYSxDQUFHLFdBQVc7TUFDOUMsWUFBWSxFQUlaLGFBQWEsRUFPYixTQUFTLGtGQUdKLFlBQVksRUFPaEIsV0FBVzs7Ozs7QUFyQlosaUJBQVksR0FBRyxtQkFBUSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7O0FBRTNGLFNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5ILGtCQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3pDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztjQUFLLG1CQUFRLEdBQUcsRUFBRSxJQUFJLENBQUM7T0FBQSxDQUFDLENBQ3pEO01BQUEsRUFBRSxFQUFFLENBQUMsQ0FDTCxNQUFNLENBQUMsVUFBQyxJQUFJO2FBQUssSUFBSSxLQUFLLFlBQVk7TUFBQSxDQUFDOztBQUV6QyxrQkFBYSxnQ0FBTyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDO0FBQ3hDLGNBQVMsR0FBRyxFQUFFOzs7OztpQkFHTyxhQUFhOzs7Ozs7OztBQUE3QixpQkFBWTs7cUNBQ1QsZ0NBQVEsWUFBWSxDQUFFOzs7Ozs4QkFBSyxLQUFLOzs7Ozs7OztBQUcxQyxnQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLDhCQUE0QixZQUFZLFNBQU0sQ0FBQzs7O0FBR2hFLGdCQUFXLEdBQUcsbUNBQU0sV0FBVyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUU7O0FBQ3pELGNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFDLGdCQUFXLENBQUMsR0FBRyxDQUFDLElBQUksYUFBVyxXQUFXLENBQUMsTUFBTSxxQkFBZ0IsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQVU7YUFBSyxVQUFVLENBQUMsSUFBSTtNQUFBLENBQUMsQ0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUl0SCxjQUFTLEdBQUcsNkJBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUUsT0FBTyxFQUFFLENBQUM7O0FBRXhELGNBQVMsR0FBRyxTQUFTLENBQ25CLEdBQUcsQ0FBQyxVQUFTLFFBQVEsRUFBQzs7QUFFdEIsVUFBSSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQVE7Y0FBSyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJO09BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVyRyxVQUFJLG1CQUFtQixFQUFFO0FBQ3hCLGtCQUFXLENBQUMsR0FBRyxDQUFDLElBQUksWUFBVSxRQUFRLENBQUMsSUFBSSxlQUFVLFFBQVEsQ0FBQyxXQUFXLG1DQUE4QixtQkFBbUIsQ0FBQyxJQUFJLHVCQUFvQixDQUFDO0FBQ3BKLGNBQU8sSUFBSSxDQUFDO09BQ1o7QUFDRCxhQUFPLFFBQVEsQ0FBQztNQUNoQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSTthQUFNLElBQUk7TUFBQyxDQUFDLENBQUM7O0FBRTdCLGNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBRSxJQUFJO2FBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBRSxXQUFXLENBQUU7TUFBQSxDQUFFLENBQUM7QUFDOUQsZ0JBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7eUNBQ2pELElBQUk7Ozs7Ozs7RUFDWDtDQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgbG9hZCBmcm9tICcuLi8uLi8uLi9saWJyYXJ5L2hvb2tzL2xvYWQnO1xuaW1wb3J0IHsgZXhpc3RzIH0gZnJvbSAnLi4vLi4vLi4vbGlicmFyeS91dGlsaXRpZXMvZnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdCdjb25maWd1cmF0aW9uS2V5JzogJ2hvb2tzJyxcblxuXHQnYWZ0ZXInOiBbICdob29rczpjb25maWd1cmU6c3RhcnQ6YWZ0ZXInIF0sXG5cblx0J3N0YXJ0JzogYXN5bmMgZnVuY3Rpb24gc3RhcnRVc2VySG9vayAoIGFwcGxpY2F0aW9uICkge1xuXHRcdGxldCBjb3JlSG9va1BhdGggPSByZXNvbHZlKGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5wYXRocy5ob29rcyk7XG5cblx0XHR0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aCA9IEFycmF5LmlzQXJyYXkodGhpcy5jb25maWd1cmF0aW9uLnBhdGgpID8gdGhpcy5jb25maWd1cmF0aW9uLnBhdGggOiBbdGhpcy5jb25maWd1cmF0aW9uLnBhdGhdO1xuXG5cdFx0bGV0IHVzZXJIb29rUGF0aHMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aFxuXHRcdFx0LnJlZHVjZSgoaXRlbXMsIGl0ZW0pID0+IGl0ZW1zLmNvbmNhdChcblx0XHRcdFx0YXBwbGljYXRpb24ucnVudGltZS5jd2RzLm1hcCgoY3dkKSA9PiByZXNvbHZlKGN3ZCwgaXRlbSkpXG5cdFx0XHQpLCBbXSlcblx0XHRcdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGNvcmVIb29rUGF0aCk7XG5cblx0XHR1c2VySG9va1BhdGhzID0gWy4uLm5ldyBTZXQodXNlckhvb2tQYXRocyldO1xuXHRcdGxldCB1c2VySG9va3MgPSBbXTtcblxuXHRcdC8vIGxvYWQgdXNlciBob29rc1xuXHRcdGZvciAobGV0IHVzZXJIb29rUGF0aCBvZiB1c2VySG9va1BhdGhzKSB7XG5cdFx0XHRpZiAoIGF3YWl0IGV4aXN0cyggdXNlckhvb2tQYXRoICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy5pbmZvKGBMb2FkaW5nIHVzZXIgaG9va3MgZnJvbSAke3VzZXJIb29rUGF0aH0uLi5gKTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGxvYWRlZEhvb2tzID0gbG9hZCggYXBwbGljYXRpb24sIHVzZXJIb29rUGF0aCwgdHJ1ZSApO1xuXHRcdFx0dXNlckhvb2tzID0gdXNlckhvb2tzLmNvbmNhdChsb2FkZWRIb29rcyk7XG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyhgTG9hZGVkICR7bG9hZGVkSG9va3MubGVuZ3RofSB1c2VyIGhvb2tzOiAke2xvYWRlZEhvb2tzLm1hcCgobG9hZGVkSG9vaykgPT4gbG9hZGVkSG9vay5uYW1lKX1gKTtcblx0XHR9XG5cblx0XHQvLyBMZXQgdGhlIGxhc3QgdXNlciBob29rIHdpdGggYSBnaXZlbiBuYW1lIHJlaWduXG5cdFx0dXNlckhvb2tzID0gWy4uLm5ldyBTZXQodXNlckhvb2tzLnJldmVyc2UoKSldLnJldmVyc2UoKTtcblxuXHRcdHVzZXJIb29rcyA9IHVzZXJIb29rc1xuXHRcdFx0Lm1hcChmdW5jdGlvbih1c2VySG9vayl7XG5cdFx0XHRcdC8vIERldGVjdCBob29rcyBjb25mbGljdGluZyB3aXRoIGNvcmUgaG9va3Ncblx0XHRcdFx0bGV0IGNvbmZsaWN0aW5nQ29yZUhvb2sgPSBhcHBsaWNhdGlvbi5ob29rcy5maWx0ZXIoKGNvcmVIb29rKSA9PiBjb3JlSG9vay5uYW1lID09PSB1c2VySG9vay5uYW1lKVswXTtcblxuXHRcdFx0XHRpZiAoY29uZmxpY3RpbmdDb3JlSG9vaykge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy53YXJuKGBIb29rIFwiJHt1c2VySG9vay5uYW1lfVwiIGZyb20gJHt1c2VySG9vay5yZXF1aXJlUGF0aH0gY29uZmxpY3RzIHdpdGggY29yZSBob29rIFwiJHtjb25mbGljdGluZ0NvcmVIb29rLm5hbWV9XCIsIHdpbGwgbm90IGxvYWQuYCk7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHVzZXJIb29rO1xuXHRcdFx0fSkuZmlsdGVyKChpdGVtKSA9PiAoaXRlbSkpO1xuXG5cdFx0dXNlckhvb2tzLmZvckVhY2goICggaG9vayApID0+IGhvb2sucmVnaXN0ZXIoIGFwcGxpY2F0aW9uICkgKTtcblx0XHRhcHBsaWNhdGlvbi5ob29rcyA9IGFwcGxpY2F0aW9uLmhvb2tzLmNvbmNhdCh1c2VySG9va3MpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59O1xuIl19