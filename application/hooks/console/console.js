'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var nameSpace = new WeakMap();

var TaskConsole = (function () {
	function TaskConsole(application, options) {
		_classCallCheck(this, TaskConsole);

		nameSpace.set(this, { application: application, options: options, 'tasks': options.tasks });
	}

	_createClass(TaskConsole, [{
		key: 'run',
		value: function run(taskName, options) {
			var _nameSpace$get, application, tasks, task, taskOptions;

			return regeneratorRuntime.async(function run$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						_nameSpace$get = nameSpace.get(this);
						application = _nameSpace$get.application;
						tasks = _nameSpace$get.tasks;

						if (!(typeof taskName !== 'string')) {
							context$2$0.next = 5;
							break;
						}

						throw new Error('Missing taskName parameter.');

					case 5:
						if (tasks[taskName]) {
							context$2$0.next = 7;
							break;
						}

						throw new Error('Task "' + taskName + '" is not available. Available tasks: ' + Object.keys(tasks));

					case 7:
						if (!(tasks[taskName] && typeof tasks[taskName].index !== 'function')) {
							context$2$0.next = 9;
							break;
						}

						throw new Error('Task "' + taskName + '" is available but invalid.');

					case 9:

						application.log.info('[console:run] Starting taskName "' + taskName + '"...');

						task = tasks[taskName].index;
						taskOptions = application.configuration.tasks[taskName];

						if (!taskOptions) {
							application.log.warn('[console:run] Starting taskName "' + taskName + '" without configuration...');
						}

						context$2$0.prev = 13;
						context$2$0.next = 16;
						return regeneratorRuntime.awrap(task(application, taskOptions || {}));

					case 16:
						application.log.info('[console:run] taskName "' + taskName + '" executed successfully');
						context$2$0.next = 22;
						break;

					case 19:
						context$2$0.prev = 19;
						context$2$0.t0 = context$2$0['catch'](13);
						throw context$2$0.t0;

					case 22:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[13, 19]]);
		}
	}]);

	return TaskConsole;
})();

function consoleFactory() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return new (_bind.apply(TaskConsole, [null].concat(args)))();
}

exports['default'] = consoleFactory;
module.exports = exports['default'];