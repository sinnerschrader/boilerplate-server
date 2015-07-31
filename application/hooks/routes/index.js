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

					routePaths = this.configuration.path.reduce(function (items, item) {
						return items.concat(application.runtime.cwds.map(function (cwd) {
							return (0, _path.resolve)(cwd, item);
						}));
					}, []);
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 8;
					_iterator = routePaths[Symbol.iterator]();

				case 10:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 19;
						break;
					}

					routePath = _step.value;
					context$1$0.next = 14;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(routePath));

				case 14:
					if (!context$1$0.sent) {
						context$1$0.next = 16;
						break;
					}

					Object.assign(userRoutes, (0, _requireAll2['default'])(routePath));

				case 16:
					_iteratorNormalCompletion = true;
					context$1$0.next = 10;
					break;

				case 19:
					context$1$0.next = 25;
					break;

				case 21:
					context$1$0.prev = 21;
					context$1$0.t0 = context$1$0['catch'](8);
					_didIteratorError = true;
					_iteratorError = context$1$0.t0;

				case 25:
					context$1$0.prev = 25;
					context$1$0.prev = 26;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 28:
					context$1$0.prev = 28;

					if (!_didIteratorError) {
						context$1$0.next = 31;
						break;
					}

					throw _iteratorError;

				case 31:
					return context$1$0.finish(28);

				case 32:
					return context$1$0.finish(25);

				case 33:
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

				case 37:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[8, 21, 25, 33], [26,, 28, 32]]);
	}
};
module.exports = exports['default'];

// load physical user routes

// load module routes
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQXdCLE1BQU07O3lCQUVYLFlBQVk7Ozs7MEJBQ1IsYUFBYTs7OztrQ0FFYiwrQkFBK0I7O3FCQUV2QztBQUNkLFFBQU8sRUFBRSxDQUFFLDBCQUEwQixDQUFFO0FBQ3ZDLFFBQU8sRUFBRSxDQUFFLFFBQVEsQ0FBRTs7QUFFckIsUUFBTyxFQUFFLFNBQWUsZUFBZSxDQUFHLFdBQVc7TUFJaEQsVUFBVSxFQUdWLFVBQVUsRUFHVixVQUFVLGtGQUtMLFNBQVMsRUFPZCxZQUFZLEVBZ0JaLE1BQU07Ozs7Ozs7QUFyQ1YsZ0JBQVcsQ0FBQyxNQUFNLEdBQUcsNkJBQVEsQ0FBQzs7O0FBRzFCLGVBQVUsR0FBRyw2QkFBWSxVQWZ0QixPQUFPLEVBZXdCLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRSxDQUFFO0FBR3RHLGVBQVUsR0FBRyxFQUFFOztBQUNuQixTQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVuSCxlQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3RDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztjQUFLLFVBdkJqQyxPQUFPLEVBdUJrQyxHQUFHLEVBQUUsSUFBSSxDQUFDO09BQUEsQ0FBQyxDQUN6RDtNQUFBLEVBQUUs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QVcsUUFBUSxDQUFHLElBQUk7Ozs7O2lCQUN0RixFQUFFLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFFLElBQUksQ0FBRTs7Ozs7O1VBRGdELFFBQVE7T0FFckYsRUFBRSxDQUFDO01BRUosQ0FBRSxDQUFDOzt5Q0FFRyxXQUFXOzs7Ozs7O0VBQ2xCO0NBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCByb3V0ZXIgZnJvbSAna29hLXJvdXRlcic7XG5pbXBvcnQgcmVxdWlyZUFsbCBmcm9tICdyZXF1aXJlLWFsbCc7XG5cbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2ZzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHQnYWZ0ZXInOiBbICdob29rczplbmdpbmU6c3RhcnQ6YWZ0ZXInIF0sXG5cdCdtb2Rlcyc6IFsgJ3NlcnZlcicgXSxcblxuXHQnc3RhcnQnOiBhc3luYyBmdW5jdGlvbiBzdGFydFJvdXRlc0hvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRhcHBsaWNhdGlvbi5yb3V0ZXIgPSByb3V0ZXIoKTtcblxuXHRcdC8vIGxvYWQgcGh5c2ljYWwgY29yZSByb3V0ZXNcblx0XHRsZXQgY29yZVJvdXRlcyA9IHJlcXVpcmVBbGwoIHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5wYXRocy5yb3V0ZXMgKSApO1xuXG5cdFx0Ly8gbG9hZCBwaHlzaWNhbCB1c2VyIHJvdXRlc1xuXHRcdGxldCB1c2VyUm91dGVzID0ge307XG5cdFx0dGhpcy5jb25maWd1cmF0aW9uLnBhdGggPSBBcnJheS5pc0FycmF5KHRoaXMuY29uZmlndXJhdGlvbi5wYXRoKSA/IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoIDogW3RoaXMuY29uZmlndXJhdGlvbi5wYXRoXTtcblxuXHRcdGxldCByb3V0ZVBhdGhzID0gdGhpcy5jb25maWd1cmF0aW9uLnBhdGhcblx0XHRcdC5yZWR1Y2UoKGl0ZW1zLCBpdGVtKSA9PiBpdGVtcy5jb25jYXQoXG5cdFx0XHRcdGFwcGxpY2F0aW9uLnJ1bnRpbWUuY3dkcy5tYXAoKGN3ZCkgPT4gcmVzb2x2ZShjd2QsIGl0ZW0pKVxuXHRcdFx0KSwgW10pO1xuXG5cdFx0Zm9yIChsZXQgcm91dGVQYXRoIG9mIHJvdXRlUGF0aHMpIHtcblx0XHRcdGlmICggYXdhaXQgZXhpc3RzKCByb3V0ZVBhdGggKSApIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbih1c2VyUm91dGVzLCByZXF1aXJlQWxsKCByb3V0ZVBhdGggKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gbG9hZCBtb2R1bGUgcm91dGVzXG5cdFx0bGV0IG1vZHVsZVJvdXRlcyA9IE9iamVjdC5rZXlzKCB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZCApXG5cdFx0XHQuZmlsdGVyKCAoIHJvdXRlTmFtZSApID0+IHR5cGVvZiB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZFsgcm91dGVOYW1lIF0uZW5hYmxlZCA9PT0gJ3N0cmluZycgKVxuXHRcdFx0LnJlZHVjZSggKCByZXN1bHQsIHJvdXRlTmFtZSApID0+IHtcblx0XHRcdFx0bGV0IHJvdXRlTW9kdWxlTmFtZSA9IHRoaXMuY29uZmlndXJhdGlvbi5lbmFibGVkWyByb3V0ZU5hbWUgXS5lbmFibGVkO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzdWx0WyByb3V0ZU5hbWUgXSA9IHJlcXVpcmUoIHJvdXRlTW9kdWxlTmFtZSApO1xuXHRcdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBgUmVxdWlyZWQgbW9kdWxlIHJvdXRlICcke3JvdXRlTmFtZX0nIGZyb20gbW9kdWxlICcke3JvdXRlTW9kdWxlTmFtZX0nYCApO1xuXHRcdFx0XHR9IGNhdGNoICggZXJyICkge1xuXHRcdFx0XHRcdHRoaXMubG9nLndhcm4oIGBDb3VsZCBub3QgcmVxdWlyZSBtb2R1bGUgcm91dGUgJyR7cm91dGVOYW1lfScgZnJvbSBtb2R1bGUgJyR7cm91dGVNb2R1bGVOYW1lfSdgICk7XG5cdFx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGVyciApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sIHt9ICk7XG5cblx0XHRsZXQgcm91dGVzID0gT2JqZWN0LmFzc2lnbigge30sIGNvcmVSb3V0ZXMsIHVzZXJSb3V0ZXMsIG1vZHVsZVJvdXRlcyApO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgcmVxdWlyZWQgbW9kdWxlcyBhcmUgZnVuY3Rpb25zLCBiaW5kIHRvIHJvdXRlclxuXHRcdE9iamVjdC5rZXlzKCByb3V0ZXMgKS5mb3JFYWNoKCAoIHJvdXRlTmFtZSApID0+IHtcblx0XHRcdGxldCByb3V0ZUZhY3RvcnlGdW5jdGlvbiA9IHJvdXRlc1sgcm91dGVOYW1lIF07XG5cdFx0XHRsZXQgcm91dGVDb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZFsgcm91dGVOYW1lIF07XG5cblx0XHRcdGlmICggdHlwZW9mIHJvdXRlRmFjdG9yeUZ1bmN0aW9uICE9PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHR0aGlzLmxvZy53YXJuKCBgJyR7cm91dGVOYW1lfScgaXMgbm8gdmFsaWQgcm91dGUgZmFjdG9yeWAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHJvdXRlQ29uZmlnID09PSBmYWxzZSB8fCByb3V0ZUNvbmZpZyAmJiByb3V0ZUNvbmZpZy5lbmFibGVkID09PSBmYWxzZSApIHtcblx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGAnJHtyb3V0ZU5hbWV9JyBpcyBleHBsaWNpdGx5IGRpc2FibGVkLmAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHR5cGVvZiByb3V0ZUNvbmZpZyA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBgJyR7cm91dGVOYW1lfScgaXMgbm90IGNvbmZpZ3VyZWQsIHdpbGwgbm90IG1vdW50LmAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cblx0XHRcdGxldCBtZXRob2RzID0gcm91dGVDb25maWcubWV0aG9kcyB8fCBbICdHRVQnLCAnUE9TVCcsICdQQVRDSCcsICdERUxFVEUnLCAnSEVBRCcsICdPUFRJT05TJyBdO1xuXHRcdFx0bGV0IGZuID0gcm91dGVGYWN0b3J5RnVuY3Rpb24oIGFwcGxpY2F0aW9uLCByb3V0ZUNvbmZpZyApO1xuXG5cdFx0XHRpZiAoIHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0dGhpcy5sb2cuaW5mbyggYCR7cm91dGVOYW1lfSBmYWN0b3J5IHJldHVybmVkIG5vIHZhbGlkIHJvdXRlIGZvciAke3JvdXRlQ29uZmlnLnBhdGh9YCApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMubG9nLmluZm8oIGBNb3VudGluZyAke3JvdXRlTmFtZX0gb24gJHtyb3V0ZUNvbmZpZy5wYXRofWAgKTtcblxuXHRcdFx0YXBwbGljYXRpb24ucm91dGVyLnJlZ2lzdGVyKCByb3V0ZU5hbWUsIHJvdXRlQ29uZmlnLnBhdGgsIG1ldGhvZHMsIGZ1bmN0aW9uICogcnVuUm91dGUgKCBuZXh0ICkge1xuXHRcdFx0XHR5aWVsZCBmbi5iaW5kKCB0aGlzICkoIG5leHQgKTtcblx0XHRcdH0gKTtcblxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBhcHBsaWNhdGlvbjtcblx0fVxufTtcbiJdfQ==