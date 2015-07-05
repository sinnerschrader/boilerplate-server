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

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _lodashMerge = require('lodash.merge');

var _lodashMerge2 = _interopRequireDefault(_lodashMerge);

var _libraryUtilitiesPorts = require('../../../library/utilities/ports');

var _libraryUtilitiesPorts2 = _interopRequireDefault(_libraryUtilitiesPorts);

function engineBlueprint() {
	var nameSpace = new WeakMap();

	return (function () {
		function Engine(application) {
			_classCallCheck(this, Engine);

			var fuel = (0, _koa2['default'])();
			fuel.experimental = true;

			this.env = fuel.env;
			nameSpace.set(this, { application: application, fuel: fuel, 'mounts': {} });
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

							if (application.router) {
								application.log.info('[application]', 'Kicking off router ...');
								fuel.use(application.router.routes());
								fuel.use(application.router.allowedMethods());
								application.log.info('[application]', 'Kicked off router ...');
							}

							if (!(application.runtime.env === 'development')) {
								context$3$0.next = 17;
								break;
							}

							context$3$0.next = 8;
							return regeneratorRuntime.awrap(_libraryUtilitiesPorts2['default'].test(port, host));

						case 8:
							context$3$0.t0 = context$3$0.sent;

							if (!(context$3$0.t0 !== true)) {
								context$3$0.next = 17;
								break;
							}

							if (!(server.autoPort !== true)) {
								context$3$0.next = 12;
								break;
							}

							throw new Error('Port ' + port + ' is taken and server.autPort is disabled, could not start server.');

						case 12:

							application.log.warn('[application] Port ' + port + ' is taken, trying to obtain next open port... ');
							context$3$0.next = 15;
							return regeneratorRuntime.awrap(_libraryUtilitiesPorts2['default'].find(server.port + 1, server.port + 51, server.host));

						case 15:
							server.port = context$3$0.sent;

							application.subs.forEach(function (sub) {
								application.log.info('[application:subapplication] Changing configuration of subapplications ' + sub.name);

								sub.mountable.configuration.server = server;
								sub.mountable.configuration.client = Object.assign(sub.mountable.configuration.client || {}, {
									host: server.host,
									port: server.port
								});

								application.log.silly('[application:subapplication] ' + sub.mountable.name + '.configuration.server: ' + JSON.stringify(sub.mountable.configuration.server));
								application.log.silly('[application:subapplication] ' + sub.mountable.name + '.configuration.client: ' + JSON.stringify(sub.mountable.configuration.client));
							});

						case 17:

							application.log.info('[application]', 'Starting engine at http://' + server.host + ':' + server.port + ' in environment \'' + application.configuration.environment + '\' ...');
							context$3$0.next = 20;
							return regeneratorRuntime.awrap(fuel.listen(server.port));

						case 20:
							http = context$3$0.sent;

							application.log.info('[application]', 'Started engine at http://' + server.host + ':' + server.port + ' in environment \'' + application.configuration.environment + '\' ...');

							nameSpace.set(this, { http: http });
							return context$3$0.abrupt('return', application);

						case 24:
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
							return regeneratorRuntime.awrap(http.close(function (err) {
								return new Promise(function fulfill(resolve, reject) {
									if (err) {
										return reject(err);
									}
									return resolve(application);
								});
							}));

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
			value: function mount(mountable) {
				var path = arguments[1] === undefined ? '/' : arguments[1];

				var _nameSpace$get3 = nameSpace.get(this);

				var fuel = _nameSpace$get3.fuel;
				var application = _nameSpace$get3.application;

				var fragments = path.split('/');
				var hostFragments = application.runtime.prefix.split('/');
				var depth = fragments.length;

				application.log.info('[application:subapplication] Mounting ' + mountable.name + ' on ' + path);

				if (path !== '/') {
					mountable.router.prefix(path);
				} else {
					mountable.router.stack.routes.forEach(function (route) {
						var match = application.router.route(route.name);
						if (match) {
							var index = application.router.stack.routes.indexOf(match);
							application.router.stack.routes.splice(index, 1);
							application.log.info('[applications:subapplication] Route "' + route.name + '" of "' + mountable.name + '" overwrites ' + application.name + '\'s route with same name.');
						}
					});

					application.router.stack.routes = application.router.stack.routes.concat(mountable.router.stack.routes);
				}

				application.router.stack.middleware.forEach(function (middleware) {
					var match = mountable.router.stack.middleware.filter(function (mountMiddleware) {
						return mountMiddleware.name === middleware.name;
					})[0];

					if (match) {
						return;
					}

					mountable.router.stack.middleware.push(middleware);
				});

				mountable.configuration.middlewares = mountable.configuration.middlewares || {};

				// Override middleware config on mountable by host middleware config
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = Object.keys(application.configuration.middlewares.enabled || {})[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var middlewareName = _step.value;

						var config = application.configuration.middlewares.enabled[middlewareName];
						var mountableConfig = mountable.configuration.middlewares.enabled[middlewareName];

						mountableConfig = typeof mountableConfig === 'undefined' ? config : mountableConfig;

						if (typeof config === 'object') {
							(0, _lodashMerge2['default'])(mountableConfig, config);
						} else {
							mountableConfig = config;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				fuel.use(mountable.router.routes());
				fuel.use(mountable.router.allowedMethods());

				application.router.subs = application.router.subs || [];
				application.router.subs.push(mountable.router);

				mountable.runtime.prefix = '/' + fragments.concat(hostFragments).filter(function (item) {
					return item;
				}).join('/');

				application.subs.push({ path: path, mountable: mountable });

				mountable.configuration.server = Object.assign({}, mountable.configuration.server, application.configuration.server);
				mountable.configuration.client = Object.assign({}, mountable.configuration.client, application.configuration.server);

				application.log.info('[application:subapplication] Changing configuration of subapplications ' + mountable.name);
				application.log.info('[application:subapplication] ' + mountable.name + '.configuration.server: ' + JSON.stringify(mountable.configuration.server));
				application.log.info('[application:subapplication] ' + mountable.name + '.configuration.client: ' + JSON.stringify(mountable.configuration.client));

				return application;
			}
		}, {
			key: 'use',
			value: function use() {
				var _nameSpace$get4 = nameSpace.get(this);

				var fuel = _nameSpace$get4.fuel;
				var application = _nameSpace$get4.application;

				fuel.use.apply(fuel, arguments);
				return application;
			}
		}]);

		return Engine;
	})();
}

function engineFactory() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return new (_bind.apply(engineBlueprint(), [null].concat(args)))();
}

exports['default'] = engineFactory;
module.exports = exports['default'];