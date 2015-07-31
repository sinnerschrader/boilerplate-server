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

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

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

		this.log = (0, _logger2['default'])(options, this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2Jvb3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztzQkFBNkIsUUFBUTs7MkJBQ2IsZUFBZTs7OztzQkFFaEIsVUFBVTs7OztxQkFDZixVQUFVOzs7O0lBRXRCLGlCQUFpQjtXQUFqQixpQkFBaUI7O0FBQ1YsVUFEUCxpQkFBaUIsQ0FDUixPQUFPLEVBQUc7d0JBRG5CLGlCQUFpQjs7QUFFckIsNkJBRkksaUJBQWlCLDZDQUViOztBQUVSLE1BQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN6QixNQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDOztBQUUvQixNQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDNUIsU0FBTSxFQUFFLFFBQVE7QUFDaEIsV0FBUSxFQUFFLEdBQUc7QUFDYixRQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhO0FBQ25JLFNBQU0sRUFBRSxFQUFFO0FBQ1YsUUFBSyxFQUFFLHlCQUFZLElBQUk7R0FDdkIsRUFBRSxPQUFPLENBQUUsQ0FBQzs7QUFFYixNQUFJLENBQUMsR0FBRyxHQUFHLHlCQUFZLE9BQU8sRUFBRSxJQUFJLENBQUUsQ0FBQztFQUN2Qzs7Y0FoQkksaUJBQWlCOztTQWtCVjtPQUFFLElBQUkseURBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSTtPQUFFLElBQUkseURBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSTs7Ozs7c0NBQ25GLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxJQUFJLENBQUU7OzswQ0FDOUIsSUFBSTs7Ozs7OztHQUNYOzs7U0FFVTs7OztBQUNWLFVBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLG9EQUFvRCxDQUFFLENBQUM7O3NDQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTs7O0FBQ3hCLFVBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLG1EQUFtRCxDQUFFLENBQUM7MENBQzlELElBQUk7Ozs7Ozs7R0FDWDs7O1NBRUssaUJBQVk7OztBQUNqQixjQUFBLElBQUksQ0FBQyxNQUFNLEVBQUMsS0FBSyxNQUFBLG9CQUFXLENBQUM7QUFDN0IsVUFBTyxJQUFJLENBQUM7R0FDWjs7O1NBRVMsYUFBRSxPQUFPO09BTWQsSUFBSTs7OztVQUxGLElBQUksQ0FBQyxPQUFPOzs7OztBQUNqQixVQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxtRUFBbUUsQ0FBRSxDQUFDOzBDQUM5RSxJQUFJOzs7QUFHUixVQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBRSxFQUFFLEVBQUUsT0FBTyxDQUFFOztBQUN2QyxhQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7OztzQ0FFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLElBQUksQ0FBRTs7Ozs7Ozs7OztHQUNyRDs7O1FBN0NJLGlCQUFpQjtXQU5kLFlBQVk7O0FBc0RyQixTQUFlLElBQUksQ0FBRyxPQUFPO0tBQ3hCLFdBQVcsRUFDWCxNQUFNOzs7O0FBRE4sZUFBVyxHQUFHLElBQUksaUJBQWlCLENBQUUsT0FBTyxDQUFFOztvQ0FDL0Isd0JBQU8sV0FBVyxDQUFFOzs7QUFBbkMsVUFBTTt3Q0FDSCxNQUFNOzs7Ozs7O0NBQ2I7O3FCQUVjLElBQUkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IGFwcFJvb3RQYXRoIGZyb20gJ2FwcC1yb290LXBhdGgnO1xuXG5pbXBvcnQgYm9vdExvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgaG9va3MgZnJvbSAnLi4vaG9va3MnO1xuXG5jbGFzcyBCb2lsZXJQbGF0ZVNlcnZlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cdGNvbnN0cnVjdG9yICggb3B0aW9ucyApIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdHRoaXMuc3VicyA9IG9wdGlvbnMuc3VicyB8fCBbXTtcblxuXHRcdHRoaXMucnVudGltZSA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0J21vZGUnOiAnc2VydmVyJyxcblx0XHRcdCdwcmVmaXgnOiAnLycsXG5cdFx0XHQnZW52JzogcHJvY2Vzcy5lbnYuQk9JTEVSUExBVEVTRVJWRVJfRU5WIHx8IHByb2Nlc3MuZW52LkJPSUxFUlBMQVRFX0VOViB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBwcm9jZXNzLmVudi5FTlYgfHwgJ2RldmVsb3BtZW50Jyxcblx0XHRcdCdjd2RzJzogW10sXG5cdFx0XHQnY3dkJzogYXBwUm9vdFBhdGgucGF0aFxuXHRcdH0sIG9wdGlvbnMgKTtcblxuXHRcdHRoaXMubG9nID0gYm9vdExvZ2dlciggb3B0aW9ucywgdGhpcyApO1xuXHR9XG5cblx0YXN5bmMgc3RhcnQgKCBob3N0ID0gdGhpcy5jb25maWd1cmF0aW9uLnNlcnZlci5ob3N0LCBwb3J0ID0gdGhpcy5jb25maWd1cmF0aW9uLnNlcnZlci5wb3J0ICkge1xuXHRcdGF3YWl0IHRoaXMuZW5naW5lLnN0YXJ0KCBob3N0LCBwb3J0ICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhc3luYyBzdG9wICgpIHtcblx0XHR0aGlzLmxvZy5pbmZvKCAnXFxuW2FwcGxpY2F0aW9uOnN0b3BdIFN0b3BwaW5nIHNlcnZlciBncmFjZWZ1bGx5Li4uJyApO1xuXHRcdGF3YWl0IHRoaXMuZW5naW5lLnN0b3AoKTtcblx0XHR0aGlzLmxvZy5pbmZvKCAnXFxuW2FwcGxpY2F0aW9uOnN0b3BdIFN0b3BwZWQgc2VydmVyIGdyYWNlZnVsbHkuLi4nICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtb3VudCAoIC4uLmFyZ3MgKSB7XG5cdFx0dGhpcy5lbmdpbmUubW91bnQoIC4uLmFyZ3MgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFzeW5jIHJ1biAoIG9wdGlvbnMgKSB7XG5cdFx0aWYgKCAhdGhpcy5jb25zb2xlICkge1xuXHRcdFx0dGhpcy5sb2cud2FybiggJ1thcHBsaWNhdGlvbjpzdG9wXSBhcHBsaWNhdGlvbi5jb25zb2xlIGlzIG5vdCBhdmFpYWJsZS4gQWJvcnRpbmcuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0bGV0IGFyZ3MgPSBPYmplY3QuYXNzaWduKCB7fSwgb3B0aW9ucyApO1xuXHRcdGRlbGV0ZSBhcmdzLl87XG5cblx0XHRyZXR1cm4gYXdhaXQgdGhpcy5jb25zb2xlLnJ1biggb3B0aW9ucy5fWyAxIF0sIGFyZ3MgKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBib290ICggb3B0aW9ucyApIHtcblx0bGV0IGFwcGxpY2F0aW9uID0gbmV3IEJvaWxlclBsYXRlU2VydmVyKCBvcHRpb25zICk7XG5cdGxldCByZXN1bHQgPSBhd2FpdCBob29rcyggYXBwbGljYXRpb24gKTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYm9vdDtcbiJdfQ==