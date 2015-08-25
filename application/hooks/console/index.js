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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9jb25zb2xlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUF3QixNQUFNOztrQ0FDUCwrQkFBK0I7OzBCQUUvQixhQUFhOzs7O3VCQUNULFdBQVc7Ozs7cUJBRXZCO0FBQ2QsUUFBTyxFQUFFLENBQUUsdUJBQXVCLENBQUU7O0FBRXBDLFFBQU8sRUFBRSxTQUFlLGdCQUFnQixDQUFHLFdBQVc7TUFDakQsU0FBUyxFQU1ULGlCQUFpQixrRkFFWCxRQUFRLEVBTWQsS0FBSyxFQUlMLFdBQVc7Ozs7Ozs7QUFsQlgsY0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QyxHQUFHLENBQUUsVUFBRSxRQUFRO2FBQU0sbUJBQVMsUUFBUSxFQUFFLE1BQUssYUFBYSxDQUFDLElBQUksQ0FBRTtNQUFBLENBQUUsQ0FDbkUsTUFBTSxDQUFFLFVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQU07QUFDakMsYUFBTyxJQUFJLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBRSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxLQUFLLEtBQUssQ0FBQztNQUM1RSxDQUFDO0FBRUMsc0JBQWlCLEdBQUcsRUFBRTs7Ozs7aUJBRUosU0FBUzs7Ozs7Ozs7QUFBckIsYUFBUTs7cUNBQ04sZ0NBQVEsUUFBUSxDQUFFOzs7Ozs7OztBQUM1QixzQkFBaUIsQ0FBQyxJQUFJLENBQUUsUUFBUSxDQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlqQyxVQUFLLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFFLFVBQUUsU0FBUzthQUFNLDZCQUFZLFNBQVMsQ0FBRTtNQUFBLENBQUUsQ0FDM0UsTUFBTSxDQUFFLFVBQUUsT0FBTyxFQUFFLElBQUk7YUFBTSxNQUFNLENBQUMsTUFBTSxDQUFFLE9BQU8sRUFBRSxJQUFJLENBQUU7TUFBQSxFQUFFLEVBQUUsQ0FBRTtBQUcvRCxnQkFBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUNoRCxNQUFNLENBQUUsVUFBRSxRQUFRO2FBQU0sT0FBTyxNQUFLLGFBQWEsQ0FBRSxRQUFRLENBQUUsQ0FBQyxPQUFPLEtBQUssUUFBUTtNQUFBLENBQUUsQ0FDcEYsTUFBTSxDQUFFLFVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBTTtBQUNoQyxVQUFJLGNBQWMsR0FBRyxNQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUUsUUFBUSxDQUFFLENBQUMsT0FBTyxDQUFDOztBQUVyRSxVQUFJO0FBQ0gsYUFBTSxDQUFFLFFBQVEsQ0FBRSxHQUFHLE9BQU8sQ0FBRSxjQUFjLENBQUUsQ0FBQztBQUMvQyxhQUFLLEdBQUcsQ0FBQyxLQUFLLDhCQUE0QixRQUFRLHlCQUFrQixjQUFjLFFBQUssQ0FBQztPQUN4RixDQUFDLE9BQVEsR0FBRyxFQUFHO0FBQ2YsYUFBSyxHQUFHLENBQUMsSUFBSSx1Q0FBcUMsUUFBUSx5QkFBa0IsY0FBYyxRQUFLLENBQUM7QUFDaEcsYUFBSyxHQUFHLENBQUMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO09BQ3RCOztBQUVGLGFBQU8sTUFBTSxDQUFDO01BQ2QsRUFBRSxFQUFFLENBQUU7O0FBRVAsV0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbEMsZ0JBQVcsQ0FBQyxPQUFPLEdBQUcsMEJBQWdCLFdBQVcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFFLENBQUUsQ0FBQzt5Q0FDakcsSUFBSTs7Ozs7OztFQUNYO0NBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBleGlzdHMgfSBmcm9tICcuLi8uLi8uLi9saWJyYXJ5L3V0aWxpdGllcy9mcyc7XG5cbmltcG9ydCByZXF1aXJlQWxsIGZyb20gJ3JlcXVpcmUtYWxsJztcbmltcG9ydCBjb25zb2xlRmFjdG9yeSBmcm9tICcuL2NvbnNvbGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdCdhZnRlcic6IFsgJ2hvb2tzOmxvZzpzdGFydDphZnRlcicgXSxcblxuXHQnc3RhcnQnOiBhc3luYyBmdW5jdGlvbiBzdGFydENvbnNvbGVIb29rICggYXBwbGljYXRpb24gKSB7XG5cdFx0bGV0IHRhc2tQYXRocyA9IGFwcGxpY2F0aW9uLnJ1bnRpbWUuY3dkc1xuXHRcdFx0Lm1hcCggKCBsb2FkUGF0aCApID0+IHJlc29sdmUoIGxvYWRQYXRoLCB0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aCApIClcblx0XHRcdC5maWx0ZXIoICggaXRlbSwgaW5kZXgsIGxpc3QgKSA9PiB7XG5cdFx0XHRcdHJldHVybiBsaXN0Lmxhc3RJbmRleE9mKCBpdGVtICkgIT09IGluZGV4IHx8IGxpc3QuaW5kZXhPZiggaXRlbSApID09PSBpbmRleDtcblx0XHRcdH0pO1xuXG5cdFx0bGV0IGV4aXN0aW5ndGFza1BhdGhzID0gW107XG5cblx0XHRmb3IgKCBsZXQgdGFza1BhdGggb2YgdGFza1BhdGhzICkge1xuXHRcdFx0aWYgKCBhd2FpdCBleGlzdHMoIHRhc2tQYXRoICkgKSB7XG5cdFx0XHRcdGV4aXN0aW5ndGFza1BhdGhzLnB1c2goIHRhc2tQYXRoICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IHRhc2tzID0gZXhpc3Rpbmd0YXNrUGF0aHMubWFwKCAoIHRhc2tzUGF0aCApID0+IHJlcXVpcmVBbGwoIHRhc2tzUGF0aCApIClcblx0XHRcdC5yZWR1Y2UoICggcmVzdWx0cywgdGFzayApID0+IE9iamVjdC5hc3NpZ24oIHJlc3VsdHMsIHRhc2sgKSwge30gKTtcblxuXHRcdFx0Ly8gbG9hZCBtb2R1bGUgdGFza3Ncblx0XHRsZXQgbW9kdWxlVGFza3MgPSBPYmplY3Qua2V5cyggdGhpcy5jb25maWd1cmF0aW9uIClcblx0XHRcdFx0LmZpbHRlciggKCB0YXNrTmFtZSApID0+IHR5cGVvZiB0aGlzLmNvbmZpZ3VyYXRpb25bIHRhc2tOYW1lIF0uZW5hYmxlZCA9PT0gJ3N0cmluZycgKVxuXHRcdFx0XHQucmVkdWNlKCAoIHJlc3VsdCwgdGFza05hbWUgKSA9PiB7XG5cdFx0XHRcdFx0bGV0IHRhc2tNb2R1bGVOYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIHRhc2tOYW1lIF0uZW5hYmxlZDtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdFsgdGFza05hbWUgXSA9IHJlcXVpcmUoIHRhc2tNb2R1bGVOYW1lICk7XG5cdFx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGBSZXF1aXJlZCBtb2R1bGUgcm91dGUgJyR7dGFza05hbWV9JyBmcm9tIG1vZHVsZSAnJHt0YXNrTW9kdWxlTmFtZX0nYCApO1xuXHRcdFx0XHR9IGNhdGNoICggZXJyICkge1xuXHRcdFx0XHRcdHRoaXMubG9nLndhcm4oIGBDb3VsZCBub3QgcmVxdWlyZSBtb2R1bGUgcm91dGUgJyR7dGFza05hbWV9JyBmcm9tIG1vZHVsZSAnJHt0YXNrTW9kdWxlTmFtZX0nYCApO1xuXHRcdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBlcnIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sIHt9ICk7XG5cblx0XHRPYmplY3QuYXNzaWduKHRhc2tzLCBtb2R1bGVUYXNrcyk7XG5cdFx0YXBwbGljYXRpb24uY29uc29sZSA9IGNvbnNvbGVGYWN0b3J5KCBhcHBsaWNhdGlvbiwgT2JqZWN0LmFzc2lnbigge30sIHRoaXMuY29uZmlndXJhdGlvbiwgeyB0YXNrcyB9ICkgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiJdfQ==