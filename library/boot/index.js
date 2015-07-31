'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _utilitiesQueuedLogger = require('../utilities/queued-logger');

var _utilitiesQueuedLogger2 = _interopRequireDefault(_utilitiesQueuedLogger);

var _hooks = require('../hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var BoilerPlateServer = (function (_EventEmitter) {
	_inherits(BoilerPlateServer, _EventEmitter);

	function BoilerPlateServer(options) {
		_classCallCheck(this, BoilerPlateServer);

		_get(Object.getPrototypeOf(BoilerPlateServer.prototype), 'constructor', this).call(this);

		this.name = options.name;
		this.subs = options.subs || [];

		this.runtime = Object.assign({
			'mode': 'server',
			'prefix': '/',
			'env': process.env.BOILERPLATESERVER_ENV || process.env.BOILERPLATE_ENV || process.env.NODE_ENV || process.env.ENV || 'development',
			'cwds': [],
			'cwd': _appRootPath2['default'].path
		}, options);

		this.log = (0, _utilitiesQueuedLogger2['default'])(this.name);
	}

	_createClass(BoilerPlateServer, [{
		key: 'start',
		value: function start() {
			var host = arguments.length <= 0 || arguments[0] === undefined ? this.configuration.server.host : arguments[0];
			var port = arguments.length <= 1 || arguments[1] === undefined ? this.configuration.server.port : arguments[1];
			return regeneratorRuntime.async(function start$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.next = 2;
						return regeneratorRuntime.awrap(this.engine.start(host, port));

					case 2:
						return context$2$0.abrupt('return', this);

					case 3:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'stop',
		value: function stop() {
			return regeneratorRuntime.async(function stop$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						this.log.info('\n[application:stop] Stopping server gracefully...');
						context$2$0.next = 3;
						return regeneratorRuntime.awrap(this.engine.stop());

					case 3:
						this.log.info('\n[application:stop] Stopped server gracefully...');
						return context$2$0.abrupt('return', this);

					case 5:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'mount',
		value: function mount() {
			var _engine;

			(_engine = this.engine).mount.apply(_engine, arguments);
			return this;
		}
	}, {
		key: 'run',
		value: function run(options) {
			var args;
			return regeneratorRuntime.async(function run$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (this.console) {
							context$2$0.next = 3;
							break;
						}

						this.log.warn('[application:stop] application.console is not avaiable. Aborting.');
						return context$2$0.abrupt('return', this);

					case 3:
						args = Object.assign({}, options);

						delete args._;

						context$2$0.next = 7;
						return regeneratorRuntime.awrap(this.console.run(options._[1], args));

					case 7:
						return context$2$0.abrupt('return', context$2$0.sent);

					case 8:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}]);

	return BoilerPlateServer;
})(_events.EventEmitter);

function boot(options) {
	var application, result;
	return regeneratorRuntime.async(function boot$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				application = new BoilerPlateServer(options);
				context$1$0.next = 3;
				return regeneratorRuntime.awrap((0, _hooks2['default'])(application));

			case 3:
				result = context$1$0.sent;
				return context$1$0.abrupt('return', result);

			case 5:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boot;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2Jvb3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztzQkFBNkIsUUFBUTs7MkJBQ2IsZUFBZTs7OztxQ0FFZCw0QkFBNEI7Ozs7cUJBQ25DLFVBQVU7Ozs7SUFFdEIsaUJBQWlCO1dBQWpCLGlCQUFpQjs7QUFDVixVQURQLGlCQUFpQixDQUNSLE9BQU8sRUFBRzt3QkFEbkIsaUJBQWlCOztBQUVyQiw2QkFGSSxpQkFBaUIsNkNBRWI7O0FBRVIsTUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3pCLE1BQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7O0FBRS9CLE1BQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM1QixTQUFNLEVBQUUsUUFBUTtBQUNoQixXQUFRLEVBQUUsR0FBRztBQUNiLFFBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGFBQWE7QUFDbkksU0FBTSxFQUFFLEVBQUU7QUFDVixRQUFLLEVBQUUseUJBQVksSUFBSTtHQUN2QixFQUFFLE9BQU8sQ0FBRSxDQUFDOztBQUViLE1BQUksQ0FBQyxHQUFHLEdBQUcsd0NBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ25DOztjQWhCSSxpQkFBaUI7O1NBa0JWO09BQUUsSUFBSSx5REFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJO09BQUUsSUFBSSx5REFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7OztzQ0FDbkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBRTs7OzBDQUM5QixJQUFJOzs7Ozs7O0dBQ1g7OztTQUVVOzs7O0FBQ1YsVUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsb0RBQW9ELENBQUUsQ0FBQzs7c0NBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFOzs7QUFDeEIsVUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsbURBQW1ELENBQUUsQ0FBQzswQ0FDOUQsSUFBSTs7Ozs7OztHQUNYOzs7U0FFSyxpQkFBWTs7O0FBQ2pCLGNBQUEsSUFBSSxDQUFDLE1BQU0sRUFBQyxLQUFLLE1BQUEsb0JBQVcsQ0FBQztBQUM3QixVQUFPLElBQUksQ0FBQztHQUNaOzs7U0FFUyxhQUFFLE9BQU87T0FNZCxJQUFJOzs7O1VBTEYsSUFBSSxDQUFDLE9BQU87Ozs7O0FBQ2pCLFVBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLG1FQUFtRSxDQUFFLENBQUM7MENBQzlFLElBQUk7OztBQUdSLFVBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFFLEVBQUUsRUFBRSxPQUFPLENBQUU7O0FBQ3ZDLGFBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7O3NDQUVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFFLEVBQUUsSUFBSSxDQUFFOzs7Ozs7Ozs7O0dBQ3JEOzs7UUE3Q0ksaUJBQWlCO1dBTmQsWUFBWTs7QUFzRHJCLFNBQWUsSUFBSSxDQUFHLE9BQU87S0FDeEIsV0FBVyxFQUNYLE1BQU07Ozs7QUFETixlQUFXLEdBQUcsSUFBSSxpQkFBaUIsQ0FBRSxPQUFPLENBQUU7O29DQUMvQix3QkFBTyxXQUFXLENBQUU7OztBQUFuQyxVQUFNO3dDQUNILE1BQU07Ozs7Ozs7Q0FDYjs7cUJBRWMsSUFBSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgYXBwUm9vdFBhdGggZnJvbSAnYXBwLXJvb3QtcGF0aCc7XG5cbmltcG9ydCBxdWV1ZWRMb2dnZXIgZnJvbSAnLi4vdXRpbGl0aWVzL3F1ZXVlZC1sb2dnZXInO1xuaW1wb3J0IGhvb2tzIGZyb20gJy4uL2hvb2tzJztcblxuY2xhc3MgQm9pbGVyUGxhdGVTZXJ2ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXHRjb25zdHJ1Y3RvciAoIG9wdGlvbnMgKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHR0aGlzLnN1YnMgPSBvcHRpb25zLnN1YnMgfHwgW107XG5cblx0XHR0aGlzLnJ1bnRpbWUgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdCdtb2RlJzogJ3NlcnZlcicsXG5cdFx0XHQncHJlZml4JzogJy8nLFxuXHRcdFx0J2Vudic6IHByb2Nlc3MuZW52LkJPSUxFUlBMQVRFU0VSVkVSX0VOViB8fCBwcm9jZXNzLmVudi5CT0lMRVJQTEFURV9FTlYgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgcHJvY2Vzcy5lbnYuRU5WIHx8ICdkZXZlbG9wbWVudCcsXG5cdFx0XHQnY3dkcyc6IFtdLFxuXHRcdFx0J2N3ZCc6IGFwcFJvb3RQYXRoLnBhdGhcblx0XHR9LCBvcHRpb25zICk7XG5cblx0XHR0aGlzLmxvZyA9IHF1ZXVlZExvZ2dlcih0aGlzLm5hbWUpO1xuXHR9XG5cblx0YXN5bmMgc3RhcnQgKCBob3N0ID0gdGhpcy5jb25maWd1cmF0aW9uLnNlcnZlci5ob3N0LCBwb3J0ID0gdGhpcy5jb25maWd1cmF0aW9uLnNlcnZlci5wb3J0ICkge1xuXHRcdGF3YWl0IHRoaXMuZW5naW5lLnN0YXJ0KCBob3N0LCBwb3J0ICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhc3luYyBzdG9wICgpIHtcblx0XHR0aGlzLmxvZy5pbmZvKCAnXFxuW2FwcGxpY2F0aW9uOnN0b3BdIFN0b3BwaW5nIHNlcnZlciBncmFjZWZ1bGx5Li4uJyApO1xuXHRcdGF3YWl0IHRoaXMuZW5naW5lLnN0b3AoKTtcblx0XHR0aGlzLmxvZy5pbmZvKCAnXFxuW2FwcGxpY2F0aW9uOnN0b3BdIFN0b3BwZWQgc2VydmVyIGdyYWNlZnVsbHkuLi4nICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtb3VudCAoIC4uLmFyZ3MgKSB7XG5cdFx0dGhpcy5lbmdpbmUubW91bnQoIC4uLmFyZ3MgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFzeW5jIHJ1biAoIG9wdGlvbnMgKSB7XG5cdFx0aWYgKCAhdGhpcy5jb25zb2xlICkge1xuXHRcdFx0dGhpcy5sb2cud2FybiggJ1thcHBsaWNhdGlvbjpzdG9wXSBhcHBsaWNhdGlvbi5jb25zb2xlIGlzIG5vdCBhdmFpYWJsZS4gQWJvcnRpbmcuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0bGV0IGFyZ3MgPSBPYmplY3QuYXNzaWduKCB7fSwgb3B0aW9ucyApO1xuXHRcdGRlbGV0ZSBhcmdzLl87XG5cblx0XHRyZXR1cm4gYXdhaXQgdGhpcy5jb25zb2xlLnJ1biggb3B0aW9ucy5fWyAxIF0sIGFyZ3MgKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBib290ICggb3B0aW9ucyApIHtcblx0bGV0IGFwcGxpY2F0aW9uID0gbmV3IEJvaWxlclBsYXRlU2VydmVyKCBvcHRpb25zICk7XG5cdGxldCByZXN1bHQgPSBhd2FpdCBob29rcyggYXBwbGljYXRpb24gKTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYm9vdDtcbiJdfQ==