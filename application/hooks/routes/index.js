'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _libraryUtilitiesFs = require('../../../library/utilities/fs');

exports['default'] = {
	'after': ['hooks:engine:start:after'],
	'modes': ['server'],

	'start': function startRoutesHook(application) {
		var coreRoutes, userRoutes, routePaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, routePath, moduleRoutes, routes;

		return regeneratorRuntime.async(function startRoutesHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.router = (0, _koaRouter2['default'])();

					coreRoutes = (0, _requireAll2['default'])((0, _path.resolve)(application.runtime.base, application.configuration.paths.routes));
					userRoutes = {};

					this.configuration.path = Array.isArray(this.configuration.path) ? this.configuration.path : [this.configuration.path];
					// TODO: Fix for mysteriously split last path, investigate
					this.configuration.path = this.configuration.path.filter(function (item) {
						return item.length > 1;
					});

					routePaths = this.configuration.path.reduce(function (items, item) {
						return items.concat(application.runtime.cwds.map(function (cwd) {
							return (0, _path.resolve)(cwd, item);
						}));
					}, []);
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 9;
					_iterator = routePaths[Symbol.iterator]();

				case 11:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 20;
						break;
					}

					routePath = _step.value;
					context$1$0.next = 15;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(routePath));

				case 15:
					if (!context$1$0.sent) {
						context$1$0.next = 17;
						break;
					}

					Object.assign(userRoutes, (0, _requireAll2['default'])(routePath));

				case 17:
					_iteratorNormalCompletion = true;
					context$1$0.next = 11;
					break;

				case 20:
					context$1$0.next = 26;
					break;

				case 22:
					context$1$0.prev = 22;
					context$1$0.t0 = context$1$0['catch'](9);
					_didIteratorError = true;
					_iteratorError = context$1$0.t0;

				case 26:
					context$1$0.prev = 26;
					context$1$0.prev = 27;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 29:
					context$1$0.prev = 29;

					if (!_didIteratorError) {
						context$1$0.next = 32;
						break;
					}

					throw _iteratorError;

				case 32:
					return context$1$0.finish(29);

				case 33:
					return context$1$0.finish(26);

				case 34:
					moduleRoutes = Object.keys(this.configuration.enabled).filter(function (routeName) {
						return typeof _this.configuration.enabled[routeName].enabled === 'string';
					}).reduce(function (result, routeName) {
						var routeModuleName = _this.configuration.enabled[routeName].enabled;

						try {
							result[routeName] = require(routeModuleName);
							_this.log.debug('Required module route \'' + routeName + '\' from module \'' + routeModuleName + '\'');
						} catch (err) {
							_this.log.warn('Could not require module route \'' + routeName + '\' from module \'' + routeModuleName + '\'');
							_this.log.debug(err);
						}

						return result;
					}, {});
					routes = Object.assign({}, coreRoutes, userRoutes, moduleRoutes);

					// Check if required modules are functions, bind to router
					Object.keys(routes).forEach(function (routeName) {
						var routeFactoryFunction = routes[routeName];
						var routeConfig = _this.configuration.enabled[routeName];

						if (typeof routeFactoryFunction !== 'function') {
							_this.log.warn('\'' + routeName + '\' is no valid route factory');
							return;
						}

						if (routeConfig === false || routeConfig && routeConfig.enabled === false) {
							_this.log.debug('\'' + routeName + '\' is explicitly disabled.');
							return;
						}

						if (typeof routeConfig === 'undefined') {
							_this.log.debug('\'' + routeName + '\' is not configured, will not mount.');
							return;
						}

						var methods = routeConfig.methods || ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
						var fn = routeFactoryFunction(application, routeConfig);

						if (typeof fn !== 'function') {
							_this.log.info(routeName + ' factory returned no valid route for ' + routeConfig.path);
							return;
						}

						_this.log.info('Mounting ' + routeName + ' on ' + routeConfig.path);

						application.router.register(routeName, routeConfig.path, methods, regeneratorRuntime.mark(function runRoute(next) {
							return regeneratorRuntime.wrap(function runRoute$(context$3$0) {
								while (1) switch (context$3$0.prev = context$3$0.next) {
									case 0:
										context$3$0.next = 2;
										return fn.bind(this)(next);

									case 2:
									case 'end':
										return context$3$0.stop();
								}
							}, runRoute, this);
						}));
					});

					return context$1$0.abrupt('return', application);

				case 38:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[9, 22, 26, 34], [27,, 29, 33]]);
	}
};
module.exports = exports['default'];
// load physical core routes

// load physical user routes

// load module routes