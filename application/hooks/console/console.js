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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9jb25zb2xlL2NvbnNvbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztJQUV4QixXQUFXO0FBQ0osVUFEUCxXQUFXLENBQ0YsV0FBVyxFQUFFLE9BQU8sRUFBRzt3QkFEaEMsV0FBVzs7QUFFZixXQUFTLENBQUMsR0FBRyxDQUFFLElBQUksRUFBRSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFFLENBQUM7RUFDeEU7O2NBSEksV0FBVzs7U0FLTixhQUFFLFFBQVEsRUFBRSxPQUFPO3VCQUN0QixXQUFXLEVBQUUsS0FBSyxFQWdCcEIsSUFBSSxFQUNKLFdBQVc7Ozs7O3VCQWpCYyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUExQyxpQkFBVyxrQkFBWCxXQUFXO0FBQUUsV0FBSyxrQkFBTCxLQUFLOztZQUVuQixPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUE7Ozs7O1lBQzFCLElBQUksS0FBSyxDQUFFLDZCQUE2QixDQUFFOzs7VUFHM0MsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7Ozs7WUFDZCxJQUFJLEtBQUssWUFBVyxRQUFRLDZDQUF3QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFJOzs7WUFHNUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUE7Ozs7O1lBQzVELElBQUksS0FBSyxZQUFXLFFBQVEsaUNBQStCOzs7O0FBR2xFLGlCQUFXLENBQUMsR0FBRyxDQUFDLElBQUksdUNBQXFDLFFBQVEsVUFBTyxDQUFDOztBQUVyRSxVQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUs7QUFDNUIsaUJBQVcsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7O0FBRTNELFVBQUssQ0FBQyxXQUFXLEVBQUc7QUFDbkIsa0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSx1Q0FBcUMsUUFBUSxnQ0FBNkIsQ0FBQztPQUMvRjs7OztzQ0FHTSxJQUFJLENBQUUsV0FBVyxFQUFFLFdBQVcsSUFBSSxFQUFFLENBQUU7OztBQUM1QyxpQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLDhCQUE0QixRQUFRLDZCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7OztHQUlwRjs7O1FBbkNJLFdBQVc7OztBQXNDakIsU0FBUyxjQUFjLEdBQWE7bUNBQVAsSUFBSTtBQUFKLE1BQUk7OztBQUNoQyx5QkFBVyxXQUFXLGdCQUFLLElBQUksTUFBRztDQUNsQzs7cUJBRWMsY0FBYyIsImZpbGUiOiJjb25zb2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IG5hbWVTcGFjZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNsYXNzIFRhc2tDb25zb2xlIHtcblx0Y29uc3RydWN0b3IgKCBhcHBsaWNhdGlvbiwgb3B0aW9ucyApIHtcblx0XHRuYW1lU3BhY2Uuc2V0KCB0aGlzLCB7IGFwcGxpY2F0aW9uLCBvcHRpb25zLCAndGFza3MnOiBvcHRpb25zLnRhc2tzIH0gKTtcblx0fVxuXG5cdGFzeW5jIHJ1biAoIHRhc2tOYW1lLCBvcHRpb25zICkge1xuXHRcdGxldCB7IGFwcGxpY2F0aW9uLCB0YXNrcyB9ID0gbmFtZVNwYWNlLmdldCh0aGlzKTtcblxuXHRcdGlmICggdHlwZW9mIHRhc2tOYW1lICE9PSAnc3RyaW5nJyApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvciggJ01pc3NpbmcgdGFza05hbWUgcGFyYW1ldGVyLicgKTtcblx0XHR9XG5cblx0XHRpZiAoICF0YXNrc1t0YXNrTmFtZV0gKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBUYXNrIFwiJHt0YXNrTmFtZX1cIiBpcyBub3QgYXZhaWxhYmxlLiBBdmFpbGFibGUgdGFza3M6ICR7T2JqZWN0LmtleXModGFza3MpfWAgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRhc2tzW3Rhc2tOYW1lXSAmJiB0eXBlb2YgdGFza3NbdGFza05hbWVdLmluZGV4ICE9PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgVGFzayBcIiR7dGFza05hbWV9XCIgaXMgYXZhaWxhYmxlIGJ1dCBpbnZhbGlkLmAgKTtcblx0XHR9XG5cblx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyhgW2NvbnNvbGU6cnVuXSBTdGFydGluZyB0YXNrTmFtZSBcIiR7dGFza05hbWV9XCIuLi5gKTtcblxuXHRcdGxldCB0YXNrID0gdGFza3NbdGFza05hbWVdLmluZGV4O1xuXHRcdGxldCB0YXNrT3B0aW9ucyA9IGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24udGFza3NbdGFza05hbWVdO1xuXG5cdFx0aWYgKCAhdGFza09wdGlvbnMgKSB7XG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cud2FybihgW2NvbnNvbGU6cnVuXSBTdGFydGluZyB0YXNrTmFtZSBcIiR7dGFza05hbWV9XCIgd2l0aG91dCBjb25maWd1cmF0aW9uLi4uYCk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IHRhc2soIGFwcGxpY2F0aW9uLCB0YXNrT3B0aW9ucyB8fCB7fSApO1xuXHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oYFtjb25zb2xlOnJ1bl0gdGFza05hbWUgXCIke3Rhc2tOYW1lfVwiIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dGhyb3cgZXJyO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjb25zb2xlRmFjdG9yeSAoIC4uLmFyZ3MgKSB7XG5cdHJldHVybiBuZXcgVGFza0NvbnNvbGUoIC4uLmFyZ3MgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uc29sZUZhY3Rvcnk7XG4iXX0=