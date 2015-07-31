/*
 * Provides a sane-default boot logger
 * that gets replaced after all configuration is loaded
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _winston = require('winston');

function bootLogger(options, application) {
	var ConsoleTransport = _winston.transports.Console;
	var level = options.log && options.log.level || 'silly';

	var log = new _winston.Logger({
		'transports': [new ConsoleTransport({
			'name': 'bootConsole',
			'level': level,
			'colorize': true,
			'showLevel': true,
			'timestamp': true
		})]
	});

	var logger = {};

	logger.error = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return log.error.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.warn = function () {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return log.warn.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.info = function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return log.info.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.debug = function () {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		return log.debug.apply(log, ['[' + application.name + ']'].concat(args));
	};

	logger.silly = function () {
		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		return log.silly.apply(log, ['[' + application.name + ']'].concat(args));
	};

	return logger;
}

exports['default'] = bootLogger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2Jvb3QvbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O3VCQUttQyxTQUFTOztBQUU1QyxTQUFTLFVBQVUsQ0FBRyxPQUFPLEVBQUUsV0FBVyxFQUFHO0FBQzVDLEtBQUksZ0JBQWdCLEdBQUcsU0FIUCxVQUFVLENBR1EsT0FBTyxDQUFDO0FBQzFDLEtBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDOztBQUV4RCxLQUFJLEdBQUcsR0FBRyxhQU5GLE1BQU0sQ0FNUTtBQUNyQixjQUFZLEVBQUUsQ0FDYixJQUFJLGdCQUFnQixDQUFFO0FBQ3JCLFNBQU0sRUFBRSxhQUFhO0FBQ3JCLFVBQU8sRUFBRSxLQUFLO0FBQ2QsYUFBVSxFQUFFLElBQUk7QUFDaEIsY0FBVyxFQUFFLElBQUk7QUFDakIsY0FBVyxFQUFFLElBQUk7R0FDakIsQ0FBRSxDQUNIO0VBQ0QsQ0FBRSxDQUFDOztBQUVKLEtBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsT0FBTSxDQUFDLEtBQUssR0FBRyxZQUFtQjtvQ0FBTixJQUFJO0FBQUosT0FBSTs7O0FBQy9CLFNBQU8sR0FBRyxDQUFDLEtBQUssTUFBQSxDQUFULEdBQUcsU0FBaUIsV0FBVyxDQUFDLElBQUksZUFBUSxJQUFJLEVBQUksQ0FBQztFQUM1RCxDQUFDOztBQUVGLE9BQU0sQ0FBQyxJQUFJLEdBQUcsWUFBbUI7cUNBQU4sSUFBSTtBQUFKLE9BQUk7OztBQUM5QixTQUFPLEdBQUcsQ0FBQyxJQUFJLE1BQUEsQ0FBUixHQUFHLFNBQWdCLFdBQVcsQ0FBQyxJQUFJLGVBQVEsSUFBSSxFQUFJLENBQUM7RUFDM0QsQ0FBQzs7QUFFRixPQUFNLENBQUMsSUFBSSxHQUFHLFlBQW1CO3FDQUFOLElBQUk7QUFBSixPQUFJOzs7QUFDOUIsU0FBTyxHQUFHLENBQUMsSUFBSSxNQUFBLENBQVIsR0FBRyxTQUFnQixXQUFXLENBQUMsSUFBSSxlQUFRLElBQUksRUFBSSxDQUFDO0VBQzNELENBQUM7O0FBRUYsT0FBTSxDQUFDLEtBQUssR0FBRyxZQUFtQjtxQ0FBTixJQUFJO0FBQUosT0FBSTs7O0FBQy9CLFNBQU8sR0FBRyxDQUFDLEtBQUssTUFBQSxDQUFULEdBQUcsU0FBaUIsV0FBVyxDQUFDLElBQUksZUFBUSxJQUFJLEVBQUksQ0FBQztFQUM1RCxDQUFDOztBQUVGLE9BQU0sQ0FBQyxLQUFLLEdBQUcsWUFBbUI7cUNBQU4sSUFBSTtBQUFKLE9BQUk7OztBQUMvQixTQUFPLEdBQUcsQ0FBQyxLQUFLLE1BQUEsQ0FBVCxHQUFHLFNBQWlCLFdBQVcsQ0FBQyxJQUFJLGVBQVEsSUFBSSxFQUFJLENBQUM7RUFDNUQsQ0FBQzs7QUFFRixRQUFPLE1BQU0sQ0FBQztDQUNkOztxQkFFYyxVQUFVIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBQcm92aWRlcyBhIHNhbmUtZGVmYXVsdCBib290IGxvZ2dlclxuICogdGhhdCBnZXRzIHJlcGxhY2VkIGFmdGVyIGFsbCBjb25maWd1cmF0aW9uIGlzIGxvYWRlZFxuICovXG5cbmltcG9ydCB7IExvZ2dlciwgdHJhbnNwb3J0cyB9IGZyb20gJ3dpbnN0b24nO1xuXG5mdW5jdGlvbiBib290TG9nZ2VyICggb3B0aW9ucywgYXBwbGljYXRpb24gKSB7XG5cdGxldCBDb25zb2xlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5Db25zb2xlO1xuXHRsZXQgbGV2ZWwgPSBvcHRpb25zLmxvZyAmJiBvcHRpb25zLmxvZy5sZXZlbCB8fCAnc2lsbHknO1xuXG5cdGxldCBsb2cgPSBuZXcgTG9nZ2VyKCB7XG5cdFx0J3RyYW5zcG9ydHMnOiBbXG5cdFx0XHRuZXcgQ29uc29sZVRyYW5zcG9ydCgge1xuXHRcdFx0XHQnbmFtZSc6ICdib290Q29uc29sZScsXG5cdFx0XHRcdCdsZXZlbCc6IGxldmVsLFxuXHRcdFx0XHQnY29sb3JpemUnOiB0cnVlLFxuXHRcdFx0XHQnc2hvd0xldmVsJzogdHJ1ZSxcblx0XHRcdFx0J3RpbWVzdGFtcCc6IHRydWVcblx0XHRcdH0gKVxuXHRcdF1cblx0fSApO1xuXG5cdGxldCBsb2dnZXIgPSB7fTtcblxuXHRsb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdHJldHVybiBsb2cuZXJyb3IoIC4uLlsgYFske2FwcGxpY2F0aW9uLm5hbWV9XWAsIC4uLmFyZ3MgXSApO1xuXHR9O1xuXG5cdGxvZ2dlci53YXJuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRyZXR1cm4gbG9nLndhcm4oIC4uLlsgYFske2FwcGxpY2F0aW9uLm5hbWV9XWAsIC4uLmFyZ3MgXSApO1xuXHR9O1xuXG5cdGxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRyZXR1cm4gbG9nLmluZm8oIC4uLlsgYFske2FwcGxpY2F0aW9uLm5hbWV9XWAsIC4uLmFyZ3MgXSApO1xuXHR9O1xuXG5cdGxvZ2dlci5kZWJ1ZyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0cmV0dXJuIGxvZy5kZWJ1ZyggLi4uWyBgWyR7YXBwbGljYXRpb24ubmFtZX1dYCwgLi4uYXJncyBdICk7XG5cdH07XG5cblx0bG9nZ2VyLnNpbGx5ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRyZXR1cm4gbG9nLnNpbGx5KCAuLi5bIGBbJHthcHBsaWNhdGlvbi5uYW1lfV1gLCAuLi5hcmdzIF0gKTtcblx0fTtcblxuXHRyZXR1cm4gbG9nZ2VyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBib290TG9nZ2VyO1xuIl19