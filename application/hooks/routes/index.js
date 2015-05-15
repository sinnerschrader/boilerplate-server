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

	'start': function startRoutesHook(application) {
		var coreRoutes, userRoutes, userRoutesPath, moduleRoutes, routes;
		return regeneratorRuntime.async(function startRoutesHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.router = _koaRouter2['default']();

					coreRoutes = _requireAll2['default'](_path.resolve(application.runtime.base, application.configuration.paths.routes));
					userRoutes = {};
					userRoutesPath = _path.resolve(application.runtime.cwd, this.configuration.path);
					context$1$0.next = 6;
					return _libraryUtilitiesFs.exists(userRoutesPath);

				case 6:
					if (!context$1$0.sent) {
						context$1$0.next = 8;
						break;
					}

					userRoutes = _requireAll2['default'](userRoutesPath);

				case 8:
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
							_this.log.info('' + routeName + ' factory returned no valid route for ' + routeConfig.path);
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

				case 12:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];
// load physical core routes

// load physical user routes

// load modules routes