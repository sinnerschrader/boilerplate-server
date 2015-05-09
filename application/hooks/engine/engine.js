'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _libraryUtilitiesPorts = require('../../../library/utilities/ports');

var _libraryUtilitiesPorts2 = _interopRequireDefault(_libraryUtilitiesPorts);

function engineBlueprint() {
	var nameSpace = new WeakMap();

	return (function () {
		function Engine(application) {
			_classCallCheck(this, Engine);

			var http = undefined;
			var fuel = _koa2['default']();
			fuel.experimental = true;

			this.env = fuel.env;
			nameSpace.set(this, { application: application, fuel: fuel, http: http });
		}

		_createClass(Engine, [{
			key: 'start',
			value: function start(host, port) {
				var _nameSpace$get, fuel, application, server, http;

				return regeneratorRuntime.async(function start$(context$3$0) {
					while (1) switch (context$3$0.prev = context$3$0.next) {
						case 0:
							_nameSpace$get = nameSpace.get(this);
							fuel = _nameSpace$get.fuel;
							application = _nameSpace$get.application;
							server = application.configuration.server;
							context$3$0.next = 6;
							return _libraryUtilitiesPorts2['default'].test(port, host);

						case 6:
							context$3$0.t184 = context$3$0.sent;

							if (!(context$3$0.t184 !== true)) {
								context$3$0.next = 14;
								break;
							}

							if (!(server.autoPort !== true)) {
								context$3$0.next = 10;
								break;
							}

							throw new Error('Port ' + port + ' is taken and server.autPort is disabled, could not start server.');

						case 10:

							application.log.warn('[application] Port ' + port + ' is taken, trying to obtain next open port... ');
							context$3$0.next = 13;
							return _libraryUtilitiesPorts2['default'].find(server.port + 1, server.port + 51, server.host);

						case 13:
							server.port = context$3$0.sent;

						case 14:

							application.log.info('[application]', 'Starting server at http://' + server.host + ':' + server.port + ' in environment \'' + application.configuration.environment + '\' ...');

							context$3$0.next = 17;
							return fuel.listen(server.port, server.host);

						case 17:
							http = context$3$0.sent;

							namespace.set(this, { http: http });
							return context$3$0.abrupt('return', application);

						case 20:
						case 'end':
							return context$3$0.stop();
					}
				}, null, this);
			}
		}, {
			key: 'stop',
			value: function stop() {
				var _nameSpace$get2, http, application;

				return regeneratorRuntime.async(function stop$(context$3$0) {
					while (1) switch (context$3$0.prev = context$3$0.next) {
						case 0:
							_nameSpace$get2 = nameSpace.get(this);
							http = _nameSpace$get2.http;
							application = _nameSpace$get2.application;
							context$3$0.next = 5;
							return server.close(function (err) {
								return new Promise(function fulfill(resolve, reject) {
									if (err) {
										return reject(err);
									}
									return resolve(application);
								});
							});

						case 5:
							return context$3$0.abrupt('return', context$3$0.sent);

						case 6:
						case 'end':
							return context$3$0.stop();
					}
				}, null, this);
			}
		}, {
			key: 'mount',
			value: function mount() {
				application.log.warn('Mounting not supported yet.');
			}
		}, {
			key: 'unmount',
			value: function unmount() {
				application.log.warn('Unmounting not supported yet.');
			}
		}, {
			key: 'use',
			value: function use() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var _nameSpace$get3 = nameSpace.get(this);

				var fuel = _nameSpace$get3.fuel;

				return fuel.use.apply(fuel, args);
			}
		}]);

		return Engine;
	})();
}

function engineFactory() {
	for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		args[_key2] = arguments[_key2];
	}

	return new (_bind.apply(engineBlueprint(), [null].concat(args)))();
}

exports['default'] = engineFactory;
module.exports = exports['default'];