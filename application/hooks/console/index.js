'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _libraryUtilitiesFs = require('../../../library/utilities/fs');

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _console = require('./console');

var _console2 = _interopRequireDefault(_console);

exports['default'] = {
	'after': ['hooks:log:start:after'],

	'start': function startConsoleHook(application) {
		var taskPaths, existingtaskPaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, taskPath, tasks, moduleTasks;

		return regeneratorRuntime.async(function startConsoleHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					taskPaths = application.runtime.cwds.map(function (loadPath) {
						return (0, _path.resolve)(loadPath, _this.configuration.path);
					}).filter(function (item, index, list) {
						return list.lastIndexOf(item) !== index || list.indexOf(item) === index;
					});
					existingtaskPaths = [];
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 5;
					_iterator = taskPaths[Symbol.iterator]();

				case 7:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 16;
						break;
					}

					taskPath = _step.value;
					context$1$0.next = 11;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(taskPath));

				case 11:
					if (!context$1$0.sent) {
						context$1$0.next = 13;
						break;
					}

					existingtaskPaths.push(taskPath);

				case 13:
					_iteratorNormalCompletion = true;
					context$1$0.next = 7;
					break;

				case 16:
					context$1$0.next = 22;
					break;

				case 18:
					context$1$0.prev = 18;
					context$1$0.t0 = context$1$0['catch'](5);
					_didIteratorError = true;
					_iteratorError = context$1$0.t0;

				case 22:
					context$1$0.prev = 22;
					context$1$0.prev = 23;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 25:
					context$1$0.prev = 25;

					if (!_didIteratorError) {
						context$1$0.next = 28;
						break;
					}

					throw _iteratorError;

				case 28:
					return context$1$0.finish(25);

				case 29:
					return context$1$0.finish(22);

				case 30:
					tasks = existingtaskPaths.map(function (tasksPath) {
						return (0, _requireAll2['default'])(tasksPath);
					}).reduce(function (results, task) {
						return Object.assign(results, task);
					}, {});
					moduleTasks = Object.keys(this.configuration).filter(function (taskName) {
						return typeof _this.configuration[taskName].enabled === 'string';
					}).reduce(function (result, taskName) {
						var taskModuleName = _this.configuration.enabled[taskName].enabled;

						try {
							result[taskName] = require(taskModuleName);
							_this.log.debug('Required module route \'' + taskName + '\' from module \'' + taskModuleName + '\'');
						} catch (err) {
							_this.log.warn('Could not require module route \'' + taskName + '\' from module \'' + taskModuleName + '\'');
							_this.log.debug(err);
						}

						return result;
					}, {});

					Object.assign(tasks, moduleTasks);
					application.console = (0, _console2['default'])(application, Object.assign({}, this.configuration, { tasks: tasks }));
					return context$1$0.abrupt('return', this);

				case 35:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[5, 18, 22, 30], [23,, 25, 29]]);
	}
};
module.exports = exports['default'];

// load module tasks
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9jb25zb2xlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUF3QixNQUFNOztrQ0FDUCwrQkFBK0I7OzBCQUUvQixhQUFhOzs7O3VCQUNULFdBQVc7Ozs7cUJBRXZCO0FBQ2QsUUFBTyxFQUFFLENBQUUsdUJBQXVCLENBQUU7O0FBRXBDLFFBQU8sRUFBRSxTQUFlLGdCQUFnQixDQUFHLFdBQVc7TUFDakQsU0FBUyxFQU1ULGlCQUFpQixrRkFFWCxRQUFRLEVBTWQsS0FBSyxFQUlMLFdBQVc7Ozs7Ozs7QUFsQlgsY0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QyxHQUFHLENBQUUsVUFBRSxRQUFRO2FBQU0sVUFYaEIsT0FBTyxFQVdrQixRQUFRLEVBQUUsTUFBSyxhQUFhLENBQUMsSUFBSSxDQUFFO01BQUEsQ0FBRSxDQUNuRSxNQUFNLENBQUUsVUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBTTtBQUNqQyxhQUFPLElBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFFLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFFLEtBQUssS0FBSyxDQUFDO01BQzVFLENBQUM7QUFFQyxzQkFBaUIsR0FBRyxFQUFFOzs7OztpQkFFSixTQUFTOzs7Ozs7OztBQUFyQixhQUFROztxQ0FDTix3QkFsQkwsTUFBTSxFQWtCTyxRQUFRLENBQUU7Ozs7Ozs7O0FBQzVCLHNCQUFpQixDQUFDLElBQUksQ0FBRSxRQUFRLENBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWpDLFVBQUssR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUUsVUFBRSxTQUFTO2FBQU0sNkJBQVksU0FBUyxDQUFFO01BQUEsQ0FBRSxDQUMzRSxNQUFNLENBQUUsVUFBRSxPQUFPLEVBQUUsSUFBSTthQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUUsT0FBTyxFQUFFLElBQUksQ0FBRTtNQUFBLEVBQUUsRUFBRSxDQUFFO0FBRy9ELGdCQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQ2hELE1BQU0sQ0FBRSxVQUFFLFFBQVE7YUFBTSxPQUFPLE1BQUssYUFBYSxDQUFFLFFBQVEsQ0FBRSxDQUFDLE9BQU8sS0FBSyxRQUFRO01BQUEsQ0FBRSxDQUNwRixNQUFNLENBQUUsVUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFNO0FBQ2hDLFVBQUksY0FBYyxHQUFHLE1BQUssYUFBYSxDQUFDLE9BQU8sQ0FBRSxRQUFRLENBQUUsQ0FBQyxPQUFPLENBQUM7O0FBRXJFLFVBQUk7QUFDSCxhQUFNLENBQUUsUUFBUSxDQUFFLEdBQUcsT0FBTyxDQUFFLGNBQWMsQ0FBRSxDQUFDO0FBQy9DLGFBQUssR0FBRyxDQUFDLEtBQUssOEJBQTRCLFFBQVEseUJBQWtCLGNBQWMsUUFBSyxDQUFDO09BQ3hGLENBQUMsT0FBUSxHQUFHLEVBQUc7QUFDZixhQUFLLEdBQUcsQ0FBQyxJQUFJLHVDQUFxQyxRQUFRLHlCQUFrQixjQUFjLFFBQUssQ0FBQztBQUNoRyxhQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUM7T0FDdEI7O0FBRUYsYUFBTyxNQUFNLENBQUM7TUFDZCxFQUFFLEVBQUUsQ0FBRTs7QUFFUCxXQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNsQyxnQkFBVyxDQUFDLE9BQU8sR0FBRywwQkFBZ0IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUUsQ0FBRSxDQUFDO3lDQUNqRyxJQUFJOzs7Ozs7O0VBQ1g7Q0FDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2ZzJztcblxuaW1wb3J0IHJlcXVpcmVBbGwgZnJvbSAncmVxdWlyZS1hbGwnO1xuaW1wb3J0IGNvbnNvbGVGYWN0b3J5IGZyb20gJy4vY29uc29sZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0J2FmdGVyJzogWyAnaG9va3M6bG9nOnN0YXJ0OmFmdGVyJyBdLFxuXG5cdCdzdGFydCc6IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29uc29sZUhvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRsZXQgdGFza1BhdGhzID0gYXBwbGljYXRpb24ucnVudGltZS5jd2RzXG5cdFx0XHQubWFwKCAoIGxvYWRQYXRoICkgPT4gcmVzb2x2ZSggbG9hZFBhdGgsIHRoaXMuY29uZmlndXJhdGlvbi5wYXRoICkgKVxuXHRcdFx0LmZpbHRlciggKCBpdGVtLCBpbmRleCwgbGlzdCApID0+IHtcblx0XHRcdFx0cmV0dXJuIGxpc3QubGFzdEluZGV4T2YoIGl0ZW0gKSAhPT0gaW5kZXggfHwgbGlzdC5pbmRleE9mKCBpdGVtICkgPT09IGluZGV4O1xuXHRcdFx0fSk7XG5cblx0XHRsZXQgZXhpc3Rpbmd0YXNrUGF0aHMgPSBbXTtcblxuXHRcdGZvciAoIGxldCB0YXNrUGF0aCBvZiB0YXNrUGF0aHMgKSB7XG5cdFx0XHRpZiAoIGF3YWl0IGV4aXN0cyggdGFza1BhdGggKSApIHtcblx0XHRcdFx0ZXhpc3Rpbmd0YXNrUGF0aHMucHVzaCggdGFza1BhdGggKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgdGFza3MgPSBleGlzdGluZ3Rhc2tQYXRocy5tYXAoICggdGFza3NQYXRoICkgPT4gcmVxdWlyZUFsbCggdGFza3NQYXRoICkgKVxuXHRcdFx0LnJlZHVjZSggKCByZXN1bHRzLCB0YXNrICkgPT4gT2JqZWN0LmFzc2lnbiggcmVzdWx0cywgdGFzayApLCB7fSApO1xuXG5cdFx0XHQvLyBsb2FkIG1vZHVsZSB0YXNrc1xuXHRcdGxldCBtb2R1bGVUYXNrcyA9IE9iamVjdC5rZXlzKCB0aGlzLmNvbmZpZ3VyYXRpb24gKVxuXHRcdFx0XHQuZmlsdGVyKCAoIHRhc2tOYW1lICkgPT4gdHlwZW9mIHRoaXMuY29uZmlndXJhdGlvblsgdGFza05hbWUgXS5lbmFibGVkID09PSAnc3RyaW5nJyApXG5cdFx0XHRcdC5yZWR1Y2UoICggcmVzdWx0LCB0YXNrTmFtZSApID0+IHtcblx0XHRcdFx0XHRsZXQgdGFza01vZHVsZU5hbWUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZFsgdGFza05hbWUgXS5lbmFibGVkO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzdWx0WyB0YXNrTmFtZSBdID0gcmVxdWlyZSggdGFza01vZHVsZU5hbWUgKTtcblx0XHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYFJlcXVpcmVkIG1vZHVsZSByb3V0ZSAnJHt0YXNrTmFtZX0nIGZyb20gbW9kdWxlICcke3Rhc2tNb2R1bGVOYW1lfSdgICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlcnIgKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2cud2FybiggYENvdWxkIG5vdCByZXF1aXJlIG1vZHVsZSByb3V0ZSAnJHt0YXNrTmFtZX0nIGZyb20gbW9kdWxlICcke3Rhc2tNb2R1bGVOYW1lfSdgICk7XG5cdFx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGVyciApO1xuXHRcdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30gKTtcblxuXHRcdE9iamVjdC5hc3NpZ24odGFza3MsIG1vZHVsZVRhc2tzKTtcblx0XHRhcHBsaWNhdGlvbi5jb25zb2xlID0gY29uc29sZUZhY3RvcnkoIGFwcGxpY2F0aW9uLCBPYmplY3QuYXNzaWduKCB7fSwgdGhpcy5jb25maWd1cmF0aW9uLCB7IHRhc2tzIH0gKSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59O1xuIl19