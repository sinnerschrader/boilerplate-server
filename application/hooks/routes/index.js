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

					// load physical core routes
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

// load physical user routes

// load module routes
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQXdCLE1BQU07O3lCQUVYLFlBQVk7Ozs7MEJBQ1IsYUFBYTs7OztrQ0FFYiwrQkFBK0I7O3FCQUV2QztBQUNkLFFBQU8sRUFBRSxDQUFFLDBCQUEwQixDQUFFO0FBQ3ZDLFFBQU8sRUFBRSxDQUFFLFFBQVEsQ0FBRTs7QUFFckIsUUFBTyxFQUFFLFNBQWUsZUFBZSxDQUFHLFdBQVc7TUFJaEQsVUFBVSxFQUdWLFVBQVUsRUFLVixVQUFVLGtGQUtMLFNBQVMsRUFPZCxZQUFZLEVBZ0JaLE1BQU07Ozs7Ozs7QUF2Q1YsZ0JBQVcsQ0FBQyxNQUFNLEdBQUcsNkJBQVEsQ0FBQzs7O0FBRzFCLGVBQVUsR0FBRyw2QkFBWSxVQWZ0QixPQUFPLEVBZXdCLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRSxDQUFFO0FBR3RHLGVBQVUsR0FBRyxFQUFFOztBQUNuQixTQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV2SCxTQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJO2FBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO01BQUEsQ0FBQyxDQUFDOztBQUVoRixlQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3RDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFD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LENBQUMsSUFBSSxlQUFjLFNBQVMsWUFBTyxXQUFXLENBQUMsSUFBSSxDQUFJLENBQUM7O0FBRWhFLGlCQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLDBCQUFFLFNBQVcsUUFBUSxDQUFHLElBQUk7Ozs7O2lCQUN0RixFQUFFLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFFLElBQUksQ0FBRTs7Ozs7O1VBRGdELFFBQVE7T0FFckYsRUFBRSxDQUFDO01BRUosQ0FBRSxDQUFDOzt5Q0FFRyxXQUFXOzs7Ozs7O0VBQ2xCO0NBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCByb3V0ZXIgZnJvbSAna29hLXJvdXRlcic7XG5pbXBvcnQgcmVxdWlyZUFsbCBmcm9tICdyZXF1aXJlLWFsbCc7XG5cbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2ZzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHQnYWZ0ZXInOiBbICdob29rczplbmdpbmU6c3RhcnQ6YWZ0ZXInIF0sXG5cdCdtb2Rlcyc6IFsgJ3NlcnZlcicgXSxcblxuXHQnc3RhcnQnOiBhc3luYyBmdW5jdGlvbiBzdGFydFJvdXRlc0hvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRhcHBsaWNhdGlvbi5yb3V0ZXIgPSByb3V0ZXIoKTtcblxuXHRcdC8vIGxvYWQgcGh5c2ljYWwgY29yZSByb3V0ZXNcblx0XHRsZXQgY29yZVJvdXRlcyA9IHJlcXVpcmVBbGwoIHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5wYXRocy5yb3V0ZXMgKSApO1xuXG5cdFx0Ly8gbG9hZCBwaHlzaWNhbCB1c2VyIHJvdXRlc1xuXHRcdGxldCB1c2VyUm91dGVzID0ge307XG5cdFx0dGhpcy5jb25maWd1cmF0aW9uLnBhdGggPSBBcnJheS5pc0FycmF5KHRoaXMuY29uZmlndXJhdGlvbi5wYXRoKSA/IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoIDogW3RoaXMuY29uZmlndXJhdGlvbi5wYXRoXTtcblx0XHQvLyBUT0RPOiBGaXggZm9yIG15c3RlcmlvdXNseSBzcGxpdCBsYXN0IHBhdGgsIGludmVzdGlnYXRlXG5cdFx0dGhpcy5jb25maWd1cmF0aW9uLnBhdGggPSB0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGVuZ3RoID4gMSk7XG5cblx0XHRsZXQgcm91dGVQYXRocyA9IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoXG5cdFx0XHQucmVkdWNlKChpdGVtcywgaXRlbSkgPT4gaXRlbXMuY29uY2F0KFxuXHRcdFx0XHRhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZHMubWFwKChjd2QpID0+IHJlc29sdmUoY3dkLCBpdGVtKSlcblx0XHRcdCksIFtdKTtcblxuXHRcdGZvciAobGV0IHJvdXRlUGF0aCBvZiByb3V0ZVBhdGhzKSB7XG5cdFx0XHRpZiAoIGF3YWl0IGV4aXN0cyggcm91dGVQYXRoICkgKSB7XG5cdFx0XHRcdE9iamVjdC5hc3NpZ24odXNlclJvdXRlcywgcmVxdWlyZUFsbCggcm91dGVQYXRoICkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGxvYWQgbW9kdWxlIHJvdXRlc1xuXHRcdGxldCBtb2R1bGVSb3V0ZXMgPSBPYmplY3Qua2V5cyggdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWQgKVxuXHRcdFx0LmZpbHRlciggKCByb3V0ZU5hbWUgKSA9PiB0eXBlb2YgdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIHJvdXRlTmFtZSBdLmVuYWJsZWQgPT09ICdzdHJpbmcnIClcblx0XHRcdC5yZWR1Y2UoICggcmVzdWx0LCByb3V0ZU5hbWUgKSA9PiB7XG5cdFx0XHRcdGxldCByb3V0ZU1vZHVsZU5hbWUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZFsgcm91dGVOYW1lIF0uZW5hYmxlZDtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdFsgcm91dGVOYW1lIF0gPSByZXF1aXJlKCByb3V0ZU1vZHVsZU5hbWUgKTtcblx0XHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYFJlcXVpcmVkIG1vZHVsZSByb3V0ZSAnJHtyb3V0ZU5hbWV9JyBmcm9tIG1vZHVsZSAnJHtyb3V0ZU1vZHVsZU5hbWV9J2AgKTtcblx0XHRcdFx0fSBjYXRjaCAoIGVyciApIHtcblx0XHRcdFx0XHR0aGlzLmxvZy53YXJuKCBgQ291bGQgbm90IHJlcXVpcmUgbW9kdWxlIHJvdXRlICcke3JvdXRlTmFtZX0nIGZyb20gbW9kdWxlICcke3JvdXRlTW9kdWxlTmFtZX0nYCApO1xuXHRcdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBlcnIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LCB7fSApO1xuXG5cdFx0bGV0IHJvdXRlcyA9IE9iamVjdC5hc3NpZ24oIHt9LCBjb3JlUm91dGVzLCB1c2VyUm91dGVzLCBtb2R1bGVSb3V0ZXMgKTtcblxuXHRcdC8vIENoZWNrIGlmIHJlcXVpcmVkIG1vZHVsZXMgYXJlIGZ1bmN0aW9ucywgYmluZCB0byByb3V0ZXJcblx0XHRPYmplY3Qua2V5cyggcm91dGVzICkuZm9yRWFjaCggKCByb3V0ZU5hbWUgKSA9PiB7XG5cdFx0XHRsZXQgcm91dGVGYWN0b3J5RnVuY3Rpb24gPSByb3V0ZXNbIHJvdXRlTmFtZSBdO1xuXHRcdFx0bGV0IHJvdXRlQ29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIHJvdXRlTmFtZSBdO1xuXG5cdFx0XHRpZiAoIHR5cGVvZiByb3V0ZUZhY3RvcnlGdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0dGhpcy5sb2cud2FybiggYCcke3JvdXRlTmFtZX0nIGlzIG5vIHZhbGlkIHJvdXRlIGZhY3RvcnlgICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCByb3V0ZUNvbmZpZyA9PT0gZmFsc2UgfHwgcm91dGVDb25maWcgJiYgcm91dGVDb25maWcuZW5hYmxlZCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBgJyR7cm91dGVOYW1lfScgaXMgZXhwbGljaXRseSBkaXNhYmxlZC5gICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0eXBlb2Ygcm91dGVDb25maWcgPT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYCcke3JvdXRlTmFtZX0nIGlzIG5vdCBjb25maWd1cmVkLCB3aWxsIG5vdCBtb3VudC5gICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXG5cdFx0XHRsZXQgbWV0aG9kcyA9IHJvdXRlQ29uZmlnLm1ldGhvZHMgfHwgWyAnR0VUJywgJ1BPU1QnLCAnUEFUQ0gnLCAnREVMRVRFJywgJ0hFQUQnLCAnT1BUSU9OUycgXTtcblx0XHRcdGxldCBmbiA9IHJvdXRlRmFjdG9yeUZ1bmN0aW9uKCBhcHBsaWNhdGlvbiwgcm91dGVDb25maWcgKTtcblxuXHRcdFx0aWYgKCB0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdHRoaXMubG9nLmluZm8oIGAke3JvdXRlTmFtZX0gZmFjdG9yeSByZXR1cm5lZCBubyB2YWxpZCByb3V0ZSBmb3IgJHtyb3V0ZUNvbmZpZy5wYXRofWAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmxvZy5pbmZvKCBgTW91bnRpbmcgJHtyb3V0ZU5hbWV9IG9uICR7cm91dGVDb25maWcucGF0aH1gICk7XG5cblx0XHRcdGFwcGxpY2F0aW9uLnJvdXRlci5yZWdpc3Rlciggcm91dGVOYW1lLCByb3V0ZUNvbmZpZy5wYXRoLCBtZXRob2RzLCBmdW5jdGlvbiAqIHJ1blJvdXRlICggbmV4dCApIHtcblx0XHRcdFx0eWllbGQgZm4uYmluZCggdGhpcyApKCBuZXh0ICk7XG5cdFx0XHR9ICk7XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gYXBwbGljYXRpb247XG5cdH1cbn07XG4iXX0=