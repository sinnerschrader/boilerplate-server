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
		var taskPaths, exisingtaskPaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, taskPath, tasks, moduleTasks;

		return regeneratorRuntime.async(function startConsoleHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					taskPaths = application.runtime.cwds.map(function (loadPath) {
						return (0, _path.resolve)(loadPath, _this.configuration.path);
					}).filter(function (item, index, list) {
						return list.lastIndexOf(item) !== index || list.indexOf(item) === index;
					});
					exisingtaskPaths = [];
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

					exisingtaskPaths.push(taskPath);

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
					tasks = exisingtaskPaths.map(function (tasksPath) {
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