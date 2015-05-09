'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x3,
    property = _x4,
    receiver = _x5; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _events = require('events');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _applicationHooks = require('../../application/hooks');

var _applicationHooks2 = _interopRequireDefault(_applicationHooks);

var BoilerPlateServer = (function (_EventEmitter) {
	function BoilerPlateServer(options) {
		_classCallCheck(this, BoilerPlateServer);

		_get(Object.getPrototypeOf(BoilerPlateServer.prototype), 'constructor', this).call(this);

		this.name = options.name;
		this.runtime = options;
		this.log = _logger2['default'](options);
	}

	_inherits(BoilerPlateServer, _EventEmitter);

	_createClass(BoilerPlateServer, [{
		key: 'start',
		value: function start() {
			var host = arguments[0] === undefined ? this.configuration.server.host : arguments[0];
			var port = arguments[1] === undefined ? this.configuration.server.port : arguments[1];

			this.engine.start(host, port);
			return this;
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.log.info('\n[application:stop] Stopping server gracefully...');
			this.engine.stop();
			return this;
		}
	}, {
		key: 'mount',
		value: function mount() {
			var _engine;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			(_engine = this.engine).mount.apply(_engine, args);
		}
	}]);

	return BoilerPlateServer;
})(_events.EventEmitter);

function boot(options) {
	var application;
	return regeneratorRuntime.async(function boot$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				application = new BoilerPlateServer(options);
				context$1$0.next = 3;
				return _applicationHooks2['default'](application);

			case 3:
				return context$1$0.abrupt('return', context$1$0.sent);

			case 4:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boot;
module.exports = exports['default'];