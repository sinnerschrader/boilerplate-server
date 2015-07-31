'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _libraryUtilitiesFs = require('../../../library/utilities/fs');

exports['default'] = {
	'after': ['hooks:routes:start:after'],
	'modes': ['server'],

	'start': function startMiddlewareHook(application) {
		var coreMiddlewares, userMiddlewares, middlewarePaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, middlewarePath, moduleMiddlewares, middlewares;

		return regeneratorRuntime.async(function startMiddlewareHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					coreMiddlewares = (0, _requireAll2['default'])((0, _path.resolve)(application.runtime.base, application.configuration.paths.middlewares));
					userMiddlewares = {};

					this.configuration.path = Array.isArray(this.configuration.path) ? this.configuration.path : [this.configuration.path];

					// TODO: Fix for mysteriously split last path, investigate
					this.configuration.path = this.configuration.path.filter(function (item) {
						return item.length > 1;
					});

					middlewarePaths = this.configuration.path.reduce(function (items, item) {
						return items.concat(application.runtime.cwds.map(function (cwd) {
							return (0, _path.resolve)(cwd, item);
						}));
					}, []);
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 8;
					_iterator = middlewarePaths[Symbol.iterator]();

				case 10:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 19;
						break;
					}

					middlewarePath = _step.value;
					context$1$0.next = 14;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(middlewarePath));

				case 14:
					if (!context$1$0.sent) {
						context$1$0.next = 16;
						break;
					}

					Object.assign(userMiddlewares, (0, _requireAll2['default'])(middlewarePath));

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
					moduleMiddlewares = Object.keys(this.configuration.enabled).filter(function (middlewareName) {
						return typeof _this.configuration.enabled[middlewareName].enabled === 'string';
					}).reduce(function (result, middlewareName) {
						var middlewareModuleName = _this.configuration.enabled[middlewareName].enabled;

						try {
							result[middlewareName] = require(middlewareModuleName);
							_this.log.debug('Required module middleware \'' + middlewareName + '\' from module \'' + middlewareModuleName + '\'');
						} catch (err) {
							_this.log.warn('Could not require module middleware \'' + middlewareName + '\' from module \'' + middlewareModuleName + '\'');
							_this.log.debug(err);
						}

						return result;
					}, {});
					middlewares = Object.assign({}, coreMiddlewares, userMiddlewares, moduleMiddlewares);

					// Check if required modules are functions, bind to engine
					Object.keys(middlewares).forEach(function (middlewareName) {
						var middlewareFactoryFunction = middlewares[middlewareName];
						var middlewareConfig = _this.configuration.enabled[middlewareName];

						if (typeof middlewareFactoryFunction !== 'function') {
							_this.log.warn('\'' + middlewareName + '\' is no valid middleware factory');
							return;
						}

						var isObject = typeof middlewareConfig === 'object';

						if (middlewareConfig === false || isObject && middlewareConfig.enabled !== true) {
							_this.log.debug('Middleware \'' + middlewareName + '\' is explicitly disabled.');
							return;
						}

						if (typeof middlewareConfig === 'undefined') {
							_this.log.warn('Middleware \'' + middlewareName + '\' is not configured, will not mount.');
							return;
						}

						var fn = middlewareFactoryFunction(application, middlewareConfig);

						if (typeof fn !== 'function') {
							_this.log.warn('\'' + middlewareName + '\' middleware factory does not produce valid middlewares, will not mount.');
							return;
						}

						try {
							application.router.use(fn);
							_this.log.debug('Middleware \'' + middlewareName + '\' mounted.');
						} catch (err) {
							_this.log.error('Binding \'' + middlewareName + '\' to engine failed');
							_this.log.debug(err);
						}
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

// Load physical core middlewares

// Load physical user middlewares

// Load module middlewares
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9taWRkbGV3YXJlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBd0IsTUFBTTs7MEJBRVAsYUFBYTs7OztrQ0FFYiwrQkFBK0I7O3FCQUV2QztBQUNkLFFBQU8sRUFBRSxDQUFFLDBCQUEwQixDQUFFO0FBQ3ZDLFFBQU8sRUFBRSxDQUFFLFFBQVEsQ0FBRTs7QUFFckIsUUFBTyxFQUFFLFNBQWUsbUJBQW1CLENBQUcsV0FBVztNQUVwRCxlQUFlLEVBR2YsZUFBZSxFQVFmLGVBQWUsa0ZBS1YsY0FBYyxFQU9uQixpQkFBaUIsRUFnQmpCLFdBQVc7Ozs7Ozs7QUF2Q1gsb0JBQWUsR0FBRyw2QkFBWSxVQVozQixPQUFPLEVBWTZCLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBRSxDQUFFO0FBR2hILG9CQUFlLEdBQUcsRUFBRTs7QUFHeEIsU0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR3ZILFNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7YUFBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7TUFBQSxDQUFDLENBQUM7O0FBRWhGLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzNDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENB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QUM7T0FDNUQsQ0FBQyxPQUFRLEdBQUcsRUFBRztBQUNmLGFBQUssR0FBRyxDQUFDLEtBQUssZ0JBQWMsY0FBYyx5QkFBc0IsQ0FBQztBQUNqRSxhQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUM7T0FDdEI7TUFDRCxDQUFFLENBQUM7O3lDQUVHLFdBQVc7Ozs7Ozs7RUFDbEI7Q0FDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHJlcXVpcmVBbGwgZnJvbSAncmVxdWlyZS1hbGwnO1xuXG5pbXBvcnQgeyBleGlzdHMgfSBmcm9tICcuLi8uLi8uLi9saWJyYXJ5L3V0aWxpdGllcy9mcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0J2FmdGVyJzogWyAnaG9va3M6cm91dGVzOnN0YXJ0OmFmdGVyJyBdLFxuXHQnbW9kZXMnOiBbICdzZXJ2ZXInIF0sXG5cblx0J3N0YXJ0JzogYXN5bmMgZnVuY3Rpb24gc3RhcnRNaWRkbGV3YXJlSG9vayAoIGFwcGxpY2F0aW9uICkge1xuXHRcdC8vIExvYWQgcGh5c2ljYWwgY29yZSBtaWRkbGV3YXJlc1xuXHRcdGxldCBjb3JlTWlkZGxld2FyZXMgPSByZXF1aXJlQWxsKCByZXNvbHZlKCBhcHBsaWNhdGlvbi5ydW50aW1lLmJhc2UsIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24ucGF0aHMubWlkZGxld2FyZXMgKSApO1xuXG5cdFx0Ly8gTG9hZCBwaHlzaWNhbCB1c2VyIG1pZGRsZXdhcmVzXG5cdFx0bGV0IHVzZXJNaWRkbGV3YXJlcyA9IHt9O1xuXG5cblx0XHR0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aCA9IEFycmF5LmlzQXJyYXkodGhpcy5jb25maWd1cmF0aW9uLnBhdGgpID8gdGhpcy5jb25maWd1cmF0aW9uLnBhdGggOiBbdGhpcy5jb25maWd1cmF0aW9uLnBhdGhdO1xuXG5cdFx0Ly8gVE9ETzogRml4IGZvciBteXN0ZXJpb3VzbHkgc3BsaXQgbGFzdCBwYXRoLCBpbnZlc3RpZ2F0ZVxuXHRcdHRoaXMuY29uZmlndXJhdGlvbi5wYXRoID0gdGhpcy5jb25maWd1cmF0aW9uLnBhdGguZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxlbmd0aCA+IDEpO1xuXG5cdFx0bGV0IG1pZGRsZXdhcmVQYXRocyA9IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoXG5cdFx0XHQucmVkdWNlKChpdGVtcywgaXRlbSkgPT4gaXRlbXMuY29uY2F0KFxuXHRcdFx0XHRhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZHMubWFwKChjd2QpID0+IHJlc29sdmUoY3dkLCBpdGVtKSlcblx0XHRcdCksIFtdKTtcblxuXHRcdGZvciAobGV0IG1pZGRsZXdhcmVQYXRoIG9mIG1pZGRsZXdhcmVQYXRocykge1xuXHRcdFx0aWYgKCBhd2FpdCBleGlzdHMoIG1pZGRsZXdhcmVQYXRoICkgKSB7XG5cdFx0XHRcdE9iamVjdC5hc3NpZ24odXNlck1pZGRsZXdhcmVzLCByZXF1aXJlQWxsKCBtaWRkbGV3YXJlUGF0aCApKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBMb2FkIG1vZHVsZSBtaWRkbGV3YXJlc1xuXHRcdGxldCBtb2R1bGVNaWRkbGV3YXJlcyA9IE9iamVjdC5rZXlzKCB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZCApXG5cdFx0XHQuZmlsdGVyKCAoIG1pZGRsZXdhcmVOYW1lICkgPT4gdHlwZW9mIHRoaXMuY29uZmlndXJhdGlvbi5lbmFibGVkWyBtaWRkbGV3YXJlTmFtZSBdLmVuYWJsZWQgPT09ICdzdHJpbmcnIClcblx0XHRcdC5yZWR1Y2UoICggcmVzdWx0LCBtaWRkbGV3YXJlTmFtZSApID0+IHtcblx0XHRcdFx0bGV0IG1pZGRsZXdhcmVNb2R1bGVOYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIG1pZGRsZXdhcmVOYW1lIF0uZW5hYmxlZDtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdFsgbWlkZGxld2FyZU5hbWUgXSA9IHJlcXVpcmUoIG1pZGRsZXdhcmVNb2R1bGVOYW1lICk7XG5cdFx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGBSZXF1aXJlZCBtb2R1bGUgbWlkZGxld2FyZSAnJHttaWRkbGV3YXJlTmFtZX0nIGZyb20gbW9kdWxlICcke21pZGRsZXdhcmVNb2R1bGVOYW1lfSdgICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlcnIgKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2cud2FybiggYENvdWxkIG5vdCByZXF1aXJlIG1vZHVsZSBtaWRkbGV3YXJlICcke21pZGRsZXdhcmVOYW1lfScgZnJvbSBtb2R1bGUgJyR7bWlkZGxld2FyZU1vZHVsZU5hbWV9J2AgKTtcblx0XHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggZXJyICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSwge30gKTtcblxuXHRcdGxldCBtaWRkbGV3YXJlcyA9IE9iamVjdC5hc3NpZ24oIHt9LCBjb3JlTWlkZGxld2FyZXMsIHVzZXJNaWRkbGV3YXJlcywgbW9kdWxlTWlkZGxld2FyZXMgKTtcblxuXHRcdC8vIENoZWNrIGlmIHJlcXVpcmVkIG1vZHVsZXMgYXJlIGZ1bmN0aW9ucywgYmluZCB0byBlbmdpbmVcblx0XHRPYmplY3Qua2V5cyggbWlkZGxld2FyZXMgKS5mb3JFYWNoKCAoIG1pZGRsZXdhcmVOYW1lICkgPT4ge1xuXHRcdFx0bGV0IG1pZGRsZXdhcmVGYWN0b3J5RnVuY3Rpb24gPSBtaWRkbGV3YXJlc1sgbWlkZGxld2FyZU5hbWUgXTtcblx0XHRcdGxldCBtaWRkbGV3YXJlQ29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIG1pZGRsZXdhcmVOYW1lIF07XG5cblx0XHRcdGlmICggdHlwZW9mIG1pZGRsZXdhcmVGYWN0b3J5RnVuY3Rpb24gIT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdHRoaXMubG9nLndhcm4oIGAnJHttaWRkbGV3YXJlTmFtZX0nIGlzIG5vIHZhbGlkIG1pZGRsZXdhcmUgZmFjdG9yeWAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaXNPYmplY3QgPSB0eXBlb2YgbWlkZGxld2FyZUNvbmZpZyA9PT0gJ29iamVjdCc7XG5cblx0XHRcdGlmICggbWlkZGxld2FyZUNvbmZpZyA9PT0gZmFsc2UgfHwgaXNPYmplY3QgJiYgbWlkZGxld2FyZUNvbmZpZy5lbmFibGVkICE9PSB0cnVlICkge1xuXHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYE1pZGRsZXdhcmUgJyR7bWlkZGxld2FyZU5hbWV9JyBpcyBleHBsaWNpdGx5IGRpc2FibGVkLmAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHR5cGVvZiBtaWRkbGV3YXJlQ29uZmlnID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0dGhpcy5sb2cud2FybiggYE1pZGRsZXdhcmUgJyR7bWlkZGxld2FyZU5hbWV9JyBpcyBub3QgY29uZmlndXJlZCwgd2lsbCBub3QgbW91bnQuYCApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBmbiA9IG1pZGRsZXdhcmVGYWN0b3J5RnVuY3Rpb24oIGFwcGxpY2F0aW9uLCBtaWRkbGV3YXJlQ29uZmlnICk7XG5cblx0XHRcdGlmICggdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHR0aGlzLmxvZy53YXJuKCBgJyR7bWlkZGxld2FyZU5hbWV9JyBtaWRkbGV3YXJlIGZhY3RvcnkgZG9lcyBub3QgcHJvZHVjZSB2YWxpZCBtaWRkbGV3YXJlcywgd2lsbCBub3QgbW91bnQuYCApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGFwcGxpY2F0aW9uLnJvdXRlci51c2UoIGZuICk7XG5cdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBgTWlkZGxld2FyZSAnJHttaWRkbGV3YXJlTmFtZX0nIG1vdW50ZWQuYCApO1xuXHRcdFx0fSBjYXRjaCAoIGVyciApIHtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoIGBCaW5kaW5nICcke21pZGRsZXdhcmVOYW1lfScgdG8gZW5naW5lIGZhaWxlZGAgKTtcblx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGVyciApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBhcHBsaWNhdGlvbjtcblx0fVxufTtcbiJdfQ==