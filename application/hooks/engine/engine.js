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
				var path = arguments.length <= 1 || arguments[1] === undefined ? '/' : arguments[1];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9lbmdpbmUvZW5naW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7bUJBQWdCLEtBQUs7Ozs7eUJBQ0YsWUFBWTs7OzsyQkFDYixjQUFjOzs7O3FDQUVkLGtDQUFrQzs7OztBQUVwRCxTQUFTLGVBQWUsR0FBSTtBQUMzQixLQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztBQUU5QjtBQUNhLFdBREEsTUFBTSxDQUNKLFdBQVcsRUFBRzt5QkFEaEIsTUFBTTs7QUFFakIsT0FBSSxJQUFJLEdBQUcsdUJBQUssQ0FBQztBQUNqQixPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7QUFFekIsT0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3BCLFlBQVMsQ0FBQyxHQUFHLENBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFYLFdBQVcsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDO0dBQzNEOztlQVBXLE1BQU07O1VBU04sZUFBRSxJQUFJLEVBQUUsSUFBSTt3QkFDakIsSUFBSSxFQUFFLFdBQVcsRUFDbkIsTUFBTSxFQW1DTixJQUFJOzs7Ozt3QkFwQ29CLFNBQVMsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFFO0FBQTNDLFdBQUksa0JBQUosSUFBSTtBQUFFLGtCQUFXLGtCQUFYLFdBQVc7QUFDbkIsYUFBTSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTTs7QUFFN0MsV0FBSyxXQUFXLENBQUMsTUFBTSxFQUFHO0FBQ3pCLG1CQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxlQUFlLDJCQUE0QixDQUFDO0FBQ2xFLFlBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFlBQUksQ0FBQyxHQUFHLENB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QWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNySCxhQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVySCxlQUFXLENBQUMsR0FBRyxDQUFDLElBQUksNkVBQTRFLFNBQVMsQ0FBQyxJQUFJLENBQUksQ0FBQztBQUNuSCxlQUFXLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQWtDLFNBQVMsQ0FBQyxJQUFJLCtCQUEwQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQztBQUNqSixlQUFXLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQWtDLFNBQVMsQ0FBQyxJQUFJLCtCQUEwQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUksQ0FBQzs7QUFFakosV0FBTyxXQUFXLENBQUM7SUFDbkI7OztVQUVHLGVBQVU7MEJBQ2UsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O1FBQXpDLElBQUksbUJBQUosSUFBSTtRQUFFLFdBQVcsbUJBQVgsV0FBVzs7QUFDdkIsUUFBSSxDQUFDLEdBQUcsTUFBQSxDQUFSLElBQUksWUFBYSxDQUFDO0FBQ2xCLFdBQU8sV0FBVyxDQUFDO0lBQ25COzs7U0FoSlcsTUFBTTtNQWlKakI7Q0FDRjs7QUFFRCxTQUFTLGFBQWEsR0FBYTttQ0FBUCxJQUFJO0FBQUosTUFBSTs7O0FBQy9CLHlCQUFhLGVBQWUsRUFBRSxnQkFBTyxJQUFJLE1BQUc7Q0FDNUM7O3FCQUVjLGFBQWEiLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvYSBmcm9tICdrb2EnO1xuaW1wb3J0IHJvdXRlciBmcm9tICdrb2Etcm91dGVyJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gubWVyZ2UnO1xuXG5pbXBvcnQgcG9ydHMgZnJvbSAnLi4vLi4vLi4vbGlicmFyeS91dGlsaXRpZXMvcG9ydHMnO1xuXG5mdW5jdGlvbiBlbmdpbmVCbHVlcHJpbnQgKCkge1xuXHRsZXQgbmFtZVNwYWNlID0gbmV3IFdlYWtNYXAoKTtcblxuXHRyZXR1cm4gY2xhc3MgRW5naW5lIHtcblx0XHRjb25zdHJ1Y3RvciAoIGFwcGxpY2F0aW9uICkge1xuXHRcdFx0bGV0IGZ1ZWwgPSBrb2EoKTtcblx0XHRcdGZ1ZWwuZXhwZXJpbWVudGFsID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5lbnYgPSBmdWVsLmVudjtcblx0XHRcdG5hbWVTcGFjZS5zZXQoIHRoaXMsIHsgYXBwbGljYXRpb24sIGZ1ZWwsICdtb3VudHMnOiB7fSB9ICk7XG5cdFx0fVxuXG5cdFx0YXN5bmMgc3RhcnQgKCBob3N0LCBwb3J0ICkge1xuXHRcdFx0bGV0IHsgZnVlbCwgYXBwbGljYXRpb24gfSA9IG5hbWVTcGFjZS5nZXQoIHRoaXMgKTtcblx0XHRcdGxldCBzZXJ2ZXIgPSBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLnNlcnZlcjtcblxuXHRcdFx0aWYgKCBhcHBsaWNhdGlvbi5yb3V0ZXIgKSB7XG5cdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy5pbmZvKCAnW2FwcGxpY2F0aW9uXScsIGBLaWNraW5nIG9mZiByb3V0ZXIgLi4uYCApO1xuXHRcdFx0XHRmdWVsLnVzZShhcHBsaWNhdGlvbi5yb3V0ZXIucm91dGVzKCkpO1xuXHRcdFx0XHRmdWVsLnVzZShhcHBsaWNhdGlvbi5yb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKSk7XG5cdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy5pbmZvKCAnW2FwcGxpY2F0aW9uXScsIGBLaWNrZWQgb2ZmIHJvdXRlciAuLi5gICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggYXBwbGljYXRpb24ucnVudGltZS5lbnYgPT09ICdkZXZlbG9wbWVudCcgKSB7XG5cdFx0XHRcdGlmIChhd2FpdCBwb3J0cy50ZXN0KCBwb3J0LCBob3N0ICkgIT09IHRydWUpIHtcblx0XHRcdFx0XHRpZiAoIHNlcnZlci5hdXRvUG9ydCAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggYFBvcnQgJHtwb3J0fSBpcyB0YWtlbiBhbmQgc2VydmVyLmF1dFBvcnQgaXMgZGlzYWJsZWQsIGNvdWxkIG5vdCBzdGFydCBzZXJ2ZXIuYCApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy53YXJuKCBgW2FwcGxpY2F0aW9uXSBQb3J0ICR7cG9ydH0gaXMgdGFrZW4sIHRyeWluZyB0byBvYnRhaW4gbmV4dCBvcGVuIHBvcnQuLi4gYCApO1xuXHRcdFx0XHRcdHNlcnZlci5wb3J0ID0gYXdhaXQgcG9ydHMuZmluZCggc2VydmVyLnBvcnQgKyAxLCBzZXJ2ZXIucG9ydCArIDUxLCBzZXJ2ZXIuaG9zdCApO1xuXG5cdFx0XHRcdFx0YXBwbGljYXRpb24uc3Vicy5mb3JFYWNoKGZ1bmN0aW9uKHN1Yil7XG5cdFx0XHRcdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyggYFthcHBsaWNhdGlvbjpzdWJhcHBsaWNhdGlvbl0gQ2hhbmdpbmcgY29uZmlndXJhdGlvbiBvZiBzdWJhcHBsaWNhdGlvbnMgJHtzdWIubmFtZX1gICk7XG5cblx0XHRcdFx0XHRcdHN1Yi5tb3VudGFibGUuY29uZmlndXJhdGlvbi5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cdFx0XHRcdFx0XHRzdWIubW91bnRhYmxlLmNvbmZpZ3VyYXRpb24uY2xpZW50ID0gT2JqZWN0LmFzc2lnbihzdWIubW91bnRhYmxlLmNvbmZpZ3VyYXRpb24uY2xpZW50IHx8IHt9LCB7XG5cdFx0XHRcdFx0XHRcdGhvc3Q6IHNlcnZlci5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwb3J0OiBzZXJ2ZXIucG9ydFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy5zaWxseSggYFthcHBsaWNhdGlvbjpzdWJhcHBsaWNhdGlvbl0gJHtzdWIubW91bnRhYmxlLm5hbWV9LmNvbmZpZ3VyYXRpb24uc2VydmVyOiAke0pTT04uc3RyaW5naWZ5KHN1Yi5tb3VudGFibGUuY29uZmlndXJhdGlvbi5zZXJ2ZXIpfWAgKTtcblx0XHRcdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy5zaWxseSggYFthcHBsaWNhdGlvbjpzdWJhcHBsaWNhdGlvbl0gJHtzdWIubW91bnRhYmxlLm5hbWV9LmNvbmZpZ3VyYXRpb24uY2xpZW50OiAke0pTT04uc3RyaW5naWZ5KHN1Yi5tb3VudGFibGUuY29uZmlndXJhdGlvbi5jbGllbnQpfWAgKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGFwcGxpY2F0aW9uLmxvZy5pbmZvKCAnW2FwcGxpY2F0aW9uXScsIGBTdGFydGluZyBlbmdpbmUgYXQgaHR0cDovLyR7c2VydmVyLmhvc3R9OiR7c2VydmVyLnBvcnR9IGluIGVudmlyb25tZW50ICcke2FwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24uZW52aXJvbm1lbnR9JyAuLi5gICk7XG5cdFx0XHRsZXQgaHR0cCA9IGF3YWl0IGZ1ZWwubGlzdGVuKCBzZXJ2ZXIucG9ydCApO1xuXHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oICdbYXBwbGljYXRpb25dJywgYFN0YXJ0ZWQgZW5naW5lIGF0IGh0dHA6Ly8ke3NlcnZlci5ob3N0fToke3NlcnZlci5wb3J0fSBpbiBlbnZpcm9ubWVudCAnJHthcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLmVudmlyb25tZW50fScgLi4uYCApO1xuXG5cdFx0XHRuYW1lU3BhY2Uuc2V0KCB0aGlzLCB7IGh0dHAgfSApO1xuXHRcdFx0cmV0dXJuIGFwcGxpY2F0aW9uO1xuXHRcdH1cblxuXG5cdFx0YXN5bmMgc3RvcCAoKSB7XG5cdFx0XHRsZXQgeyBodHRwLCBhcHBsaWNhdGlvbiB9ID0gbmFtZVNwYWNlLmdldCh0aGlzKTtcblxuXHRcdFx0cmV0dXJuIGF3YWl0IGh0dHAuY2xvc2UoIGZ1bmN0aW9uKCBlcnIgKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24gZnVsZmlsbCggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXHRcdFx0XHRcdGlmICggZXJyICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdCggZXJyICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNvbHZlKCBhcHBsaWNhdGlvbiApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdG1vdW50ICggbW91bnRhYmxlLCBwYXRoID0gJy8nICkge1xuXHRcdFx0bGV0IHsgZnVlbCwgYXBwbGljYXRpb24gfSA9IG5hbWVTcGFjZS5nZXQodGhpcyk7XG5cdFx0XHRsZXQgZnJhZ21lbnRzID0gcGF0aC5zcGxpdCgnLycpO1xuXHRcdFx0bGV0IGhvc3RGcmFnbWVudHMgPSBhcHBsaWNhdGlvbi5ydW50aW1lLnByZWZpeC5zcGxpdCgnLycpO1xuXHRcdFx0bGV0IGRlcHRoID0gZnJhZ21lbnRzLmxlbmd0aDtcblxuXHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oIGBbYXBwbGljYXRpb246c3ViYXBwbGljYXRpb25dIE1vdW50aW5nICR7bW91bnRhYmxlLm5hbWV9IG9uICR7cGF0aH1gICk7XG5cblx0XHRcdGlmIChwYXRoICE9PSAnLycpIHtcblx0XHRcdFx0bW91bnRhYmxlLnJvdXRlci5wcmVmaXgocGF0aCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtb3VudGFibGUucm91dGVyLnN0YWNrLnJvdXRlcy5mb3JFYWNoKGZ1bmN0aW9uKHJvdXRlKXtcblx0XHRcdFx0XHRsZXQgbWF0Y2ggPSBhcHBsaWNhdGlvbi5yb3V0ZXIucm91dGUocm91dGUubmFtZSk7XG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRsZXQgaW5kZXggPSBhcHBsaWNhdGlvbi5yb3V0ZXIuc3RhY2sucm91dGVzLmluZGV4T2YobWF0Y2gpO1xuXHRcdFx0XHRcdFx0YXBwbGljYXRpb24ucm91dGVyLnN0YWNrLnJvdXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oYFthcHBsaWNhdGlvbnM6c3ViYXBwbGljYXRpb25dIFJvdXRlIFwiJHtyb3V0ZS5uYW1lfVwiIG9mIFwiJHttb3VudGFibGUubmFtZX1cIiBvdmVyd3JpdGVzICR7YXBwbGljYXRpb24ubmFtZX0ncyByb3V0ZSB3aXRoIHNhbWUgbmFtZS5gKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0YXBwbGljYXRpb24ucm91dGVyLnN0YWNrLnJvdXRlcyA9IGFwcGxpY2F0aW9uLnJvdXRlci5zdGFjay5yb3V0ZXMuY29uY2F0KG1vdW50YWJsZS5yb3V0ZXIuc3RhY2sucm91dGVzKTtcblx0XHRcdH1cblxuXHRcdFx0YXBwbGljYXRpb24ucm91dGVyLnN0YWNrLm1pZGRsZXdhcmUuZm9yRWFjaChmdW5jdGlvbihtaWRkbGV3YXJlKXtcblx0XHRcdFx0bGV0IG1hdGNoID0gbW91bnRhYmxlLnJvdXRlci5zdGFjay5taWRkbGV3YXJlXG5cdFx0XHRcdFx0LmZpbHRlcigobW91bnRNaWRkbGV3YXJlKSA9PiBtb3VudE1pZGRsZXdhcmUubmFtZSA9PT0gbWlkZGxld2FyZS5uYW1lKVswXTtcblxuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtb3VudGFibGUucm91dGVyLnN0YWNrLm1pZGRsZXdhcmUucHVzaChtaWRkbGV3YXJlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRtb3VudGFibGUuY29uZmlndXJhdGlvbi5taWRkbGV3YXJlcyA9IG1vdW50YWJsZS5jb25maWd1cmF0aW9uLm1pZGRsZXdhcmVzIHx8IHt9O1xuXG5cdFx0XHQvLyBPdmVycmlkZSBtaWRkbGV3YXJlIGNvbmZpZyBvbiBtb3VudGFibGUgYnkgaG9zdCBtaWRkbGV3YXJlIGNvbmZpZ1xuXHRcdFx0Zm9yIChsZXQgbWlkZGxld2FyZU5hbWUgb2YgT2JqZWN0LmtleXMoYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5taWRkbGV3YXJlcy5lbmFibGVkIHx8IHt9KSkge1xuXHRcdFx0XHRsZXQgY29uZmlnID0gYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5taWRkbGV3YXJlcy5lbmFibGVkW21pZGRsZXdhcmVOYW1lXTtcblx0XHRcdFx0bGV0IG1vdW50YWJsZUNvbmZpZyA9IG1vdW50YWJsZS5jb25maWd1cmF0aW9uLm1pZGRsZXdhcmVzLmVuYWJsZWRbbWlkZGxld2FyZU5hbWVdO1xuXG5cdFx0XHRcdG1vdW50YWJsZUNvbmZpZyA9IHR5cGVvZiBtb3VudGFibGVDb25maWcgPT09ICd1bmRlZmluZWQnID8gY29uZmlnIDogbW91bnRhYmxlQ29uZmlnO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdG1lcmdlKG1vdW50YWJsZUNvbmZpZywgY29uZmlnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtb3VudGFibGVDb25maWcgPSBjb25maWc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVlbC51c2UobW91bnRhYmxlLnJvdXRlci5yb3V0ZXMoKSk7XG5cdFx0XHRmdWVsLnVzZShtb3VudGFibGUucm91dGVyLmFsbG93ZWRNZXRob2RzKCkpO1xuXG5cdFx0XHRhcHBsaWNhdGlvbi5yb3V0ZXIuc3VicyA9IGFwcGxpY2F0aW9uLnJvdXRlci5zdWJzIHx8IFtdO1xuXHRcdFx0YXBwbGljYXRpb24ucm91dGVyLnN1YnMucHVzaChtb3VudGFibGUucm91dGVyKTtcblxuXHRcdFx0bW91bnRhYmxlLnJ1bnRpbWUucHJlZml4ID0gJy8nICsgZnJhZ21lbnRzXG5cdFx0XHRcdC5jb25jYXQoaG9zdEZyYWdtZW50cylcblx0XHRcdFx0LmZpbHRlcigoaXRlbSkgPT4gaXRlbSlcblx0XHRcdFx0LmpvaW4oJy8nKTtcblxuXHRcdFx0YXBwbGljYXRpb24uc3Vicy5wdXNoKHsgcGF0aCwgbW91bnRhYmxlIH0pO1xuXG5cdFx0XHRtb3VudGFibGUuY29uZmlndXJhdGlvbi5zZXJ2ZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtb3VudGFibGUuY29uZmlndXJhdGlvbi5zZXJ2ZXIsIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24uc2VydmVyKTtcblx0XHRcdG1vdW50YWJsZS5jb25maWd1cmF0aW9uLmNsaWVudCA9IE9iamVjdC5hc3NpZ24oe30sIG1vdW50YWJsZS5jb25maWd1cmF0aW9uLmNsaWVudCwgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5zZXJ2ZXIpO1xuXG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyggYFthcHBsaWNhdGlvbjpzdWJhcHBsaWNhdGlvbl0gQ2hhbmdpbmcgY29uZmlndXJhdGlvbiBvZiBzdWJhcHBsaWNhdGlvbnMgJHttb3VudGFibGUubmFtZX1gICk7XG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyggYFthcHBsaWNhdGlvbjpzdWJhcHBsaWNhdGlvbl0gJHttb3VudGFibGUubmFtZX0uY29uZmlndXJhdGlvbi5zZXJ2ZXI6ICR7SlNPTi5zdHJpbmdpZnkobW91bnRhYmxlLmNvbmZpZ3VyYXRpb24uc2VydmVyKX1gICk7XG5cdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyggYFthcHBsaWNhdGlvbjpzdWJhcHBsaWNhdGlvbl0gJHttb3VudGFibGUubmFtZX0uY29uZmlndXJhdGlvbi5jbGllbnQ6ICR7SlNPTi5zdHJpbmdpZnkobW91bnRhYmxlLmNvbmZpZ3VyYXRpb24uY2xpZW50KX1gICk7XG5cblx0XHRcdHJldHVybiBhcHBsaWNhdGlvbjtcblx0XHR9XG5cblx0XHR1c2UgKC4uLmFyZ3MpIHtcblx0XHRcdGxldCB7IGZ1ZWwsIGFwcGxpY2F0aW9uIH0gPSBuYW1lU3BhY2UuZ2V0KHRoaXMpO1xuXHRcdFx0ZnVlbC51c2UoLi4uYXJncyk7XG5cdFx0XHRyZXR1cm4gYXBwbGljYXRpb247XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBlbmdpbmVGYWN0b3J5ICggLi4uYXJncyApIHtcblx0cmV0dXJuIG5ldyAoIGVuZ2luZUJsdWVwcmludCgpICkoIC4uLmFyZ3MgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZW5naW5lRmFjdG9yeTtcbiJdfQ==