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

					middlewarePaths = this.configuration.path.reduce(function (items, item) {
						return items.concat(application.runtime.cwds.map(function (cwd) {
							return (0, _path.resolve)(cwd, item);
						}));
					}, []);
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$1$0.prev = 7;
					_iterator = middlewarePaths[Symbol.iterator]();

				case 9:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$1$0.next = 18;
						break;
					}

					middlewarePath = _step.value;
					context$1$0.next = 13;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(middlewarePath));

				case 13:
					if (!context$1$0.sent) {
						context$1$0.next = 15;
						break;
					}

					Object.assign(userMiddlewares, (0, _requireAll2['default'])(middlewarePath));

				case 15:
					_iteratorNormalCompletion = true;
					context$1$0.next = 9;
					break;

				case 18:
					context$1$0.next = 24;
					break;

				case 20:
					context$1$0.prev = 20;
					context$1$0.t0 = context$1$0['catch'](7);
					_didIteratorError = true;
					_iteratorError = context$1$0.t0;

				case 24:
					context$1$0.prev = 24;
					context$1$0.prev = 25;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 27:
					context$1$0.prev = 27;

					if (!_didIteratorError) {
						context$1$0.next = 30;
						break;
					}

					throw _iteratorError;

				case 30:
					return context$1$0.finish(27);

				case 31:
					return context$1$0.finish(24);

				case 32:
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

				case 36:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this, [[7, 20, 24, 32], [25,, 27, 31]]);
	}
};
module.exports = exports['default'];

// Load physical core middlewares

// Load physical user middlewares

// Load module middlewares
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9taWRkbGV3YXJlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBd0IsTUFBTTs7MEJBRVAsYUFBYTs7OztrQ0FFYiwrQkFBK0I7O3FCQUV2QztBQUNkLFFBQU8sRUFBRSxDQUFFLDBCQUEwQixDQUFFO0FBQ3ZDLFFBQU8sRUFBRSxDQUFFLFFBQVEsQ0FBRTs7QUFFckIsUUFBTyxFQUFFLFNBQWUsbUJBQW1CLENBQUcsV0FBVztNQUVwRCxlQUFlLEVBR2YsZUFBZSxFQUlmLGVBQWUsa0ZBS1YsY0FBYyxFQU9uQixpQkFBaUIsRUFnQmpCLFdBQVc7Ozs7Ozs7QUFuQ1gsb0JBQWUsR0FBRyw2QkFBWSxtQkFBUyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUUsQ0FBRTtBQUdoSCxvQkFBZSxHQUFHLEVBQUU7O0FBRXhCLFNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5ILG9CQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzNDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2FBQUssS0FBSyxDQUFDLE1BQU0sQ0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztjQUFLLG1CQUFRLEdBQUcsRUFBRSxJQUFJLENBQUM7T0FBQSxDQUFDLENBQ3pEO01BQUEsRUFBRSxFQUFFLENBQUM7Ozs7O2lCQUVvQixlQUFlOzs7Ozs7OztBQUFqQyxtQkFBYzs7cUNBQ1gsZ0NBQVEsY0FBYyxDQUFFOzs7Ozs7OztBQUNsQyxXQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSw2QkFBWSxjQUFjLENBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLM0Qsc0JBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBRSxDQUMvRCxNQUFNLENBQUUsVUFBRSxjQUFjO2FBQU0sT0FBTyxNQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUUsY0FBYyxDQUFFLENBQUMsT0FBTyxLQUFLLFFBQVE7TUFBQSxDQUFFLENBQ3hHLE1BQU0sQ0FBRSxVQUFFLE1BQU0sRUFBRSxjQUFjLEVBQU07QUFDdEMsVUFBSSxvQkFBb0IsR0FBRyxNQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUUsY0FBYyxDQUFFLENBQUMsT0FBTyxDQUFDOztBQUVoRixVQUFJO0FBQ0gsYUFBTSxDQUFFLGNBQWMsQ0FBRSxHQUFHLE9BQU8sQ0FBRSxvQkFBb0IsQ0FBRSxDQUFDO0FBQzNELGFBQUssR0FBRyxDQUFDLEtBQUssbUNBQWlDLGNBQWMseUJBQWtCLG9CQUFvQixRQUFLLENBQUM7T0FDekcsQ0FBQyxPQUFRLEdBQUcsRUFBRztBQUNmLGFBQUssR0FBRyxDQUFDLElBQUksNENBQTBDLGNBQWMseUJBQWtCLG9CQUFvQixRQUFLLENBQUM7QUFDakgsYUFBSyxHQUFHLENBQUMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO09BQ3RCOztBQUVELGFBQU8sTUFBTSxDQUFDO01BQ2QsRUFBRSxFQUFFLENBQUU7QUFFSixnQkFBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLENBQUU7OztBQUcxRixXQUFNLENBQUMsSUFBSSxDQUFFLFdBQVcsQ0FBRSxDQUFDLE9BQU8sQ0FBRSxVQUFFLGNBQWMsRUFBTTtBQUN6RCxVQUFJLHlCQUF5QixHQUFHLFdBQVcsQ0FBRSxjQUFjLENBQUUsQ0FBQztBQUM5RCxVQUFJLGdCQUFnQixHQUFHLE1BQUssYUFBYSxDQUFDLE9BQU8sQ0FBRSxjQUFjLENBQUUsQ0FBQzs7QUFFcEUsVUFBSyxPQUFPLHlCQUF5QixLQUFLLFVBQVUsRUFBRztBQUN0RCxhQUFLLEdBQUcsQ0FBQyxJQUFJLFFBQU0sY0FBYyx1Q0FBb0MsQ0FBQztBQUN0RSxjQUFPO09BQ1A7O0FBRUQsVUFBSSxRQUFRLEdBQUcsT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLENBQUM7O0FBRXBELFVBQUssZ0JBQWdCLEtBQUssS0FBSyxJQUFJLFFBQVEsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFHO0FBQ2xGLGFBQUssR0FBRyxDQUFDLEtBQUssbUJBQWlCLGNBQWMsZ0NBQTZCLENBQUM7QUFDM0UsY0FBTztPQUNQOztBQUVELFVBQUssT0FBTyxnQkFBZ0IsS0FBSyxXQUFXLEVBQUc7QUFDOUMsYUFBSyxHQUFHLENBQUMsSUFBSSxtQkFBaUIsY0FBYywyQ0FBd0MsQ0FBQztBQUNyRixjQUFPO09BQ1A7O0FBRUQsVUFBSSxFQUFFLEdBQUcseUJBQXlCLENBQUUsV0FBVyxFQUFFLGdCQUFnQixDQUFFLENBQUM7O0FBRXBFLFVBQUssT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFHO0FBQy9CLGFBQUssR0FBRyxDQUFDLElBQUksUUFBTSxjQUFjLCtFQUE0RSxDQUFDO0FBQzlHLGNBQU87T0FDUDs7QUFFRCxVQUFJO0FBQ0gsa0JBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxDQUFDO0FBQzdCLGFBQUssR0FBRyxDQUFDLEtBQUssbUJBQWlCLGNBQWMsaUJBQWMsQ0FBQztPQUM1RCxDQUFDLE9BQVEsR0FBRyxFQUFHO0FBQ2YsYUFBSyxHQUFHLENBQUMsS0FBSyxnQkFBYyxjQUFjLHlCQUFzQixDQUFDO0FBQ2pFLGFBQUssR0FBRyxDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUUsQ0FBQztPQUN0QjtNQUNELENBQUUsQ0FBQzs7eUNBRUcsV0FBVzs7Ozs7OztFQUNsQjtDQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgcmVxdWlyZUFsbCBmcm9tICdyZXF1aXJlLWFsbCc7XG5cbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL2xpYnJhcnkvdXRpbGl0aWVzL2ZzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHQnYWZ0ZXInOiBbICdob29rczpyb3V0ZXM6c3RhcnQ6YWZ0ZXInIF0sXG5cdCdtb2Rlcyc6IFsgJ3NlcnZlcicgXSxcblxuXHQnc3RhcnQnOiBhc3luYyBmdW5jdGlvbiBzdGFydE1pZGRsZXdhcmVIb29rICggYXBwbGljYXRpb24gKSB7XG5cdFx0Ly8gTG9hZCBwaHlzaWNhbCBjb3JlIG1pZGRsZXdhcmVzXG5cdFx0bGV0IGNvcmVNaWRkbGV3YXJlcyA9IHJlcXVpcmVBbGwoIHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5wYXRocy5taWRkbGV3YXJlcyApICk7XG5cblx0XHQvLyBMb2FkIHBoeXNpY2FsIHVzZXIgbWlkZGxld2FyZXNcblx0XHRsZXQgdXNlck1pZGRsZXdhcmVzID0ge307XG5cblx0XHR0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aCA9IEFycmF5LmlzQXJyYXkodGhpcy5jb25maWd1cmF0aW9uLnBhdGgpID8gdGhpcy5jb25maWd1cmF0aW9uLnBhdGggOiBbdGhpcy5jb25maWd1cmF0aW9uLnBhdGhdO1xuXG5cdFx0bGV0IG1pZGRsZXdhcmVQYXRocyA9IHRoaXMuY29uZmlndXJhdGlvbi5wYXRoXG5cdFx0XHQucmVkdWNlKChpdGVtcywgaXRlbSkgPT4gaXRlbXMuY29uY2F0KFxuXHRcdFx0XHRhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZHMubWFwKChjd2QpID0+IHJlc29sdmUoY3dkLCBpdGVtKSlcblx0XHRcdCksIFtdKTtcblxuXHRcdGZvciAobGV0IG1pZGRsZXdhcmVQYXRoIG9mIG1pZGRsZXdhcmVQYXRocykge1xuXHRcdFx0aWYgKCBhd2FpdCBleGlzdHMoIG1pZGRsZXdhcmVQYXRoICkgKSB7XG5cdFx0XHRcdE9iamVjdC5hc3NpZ24odXNlck1pZGRsZXdhcmVzLCByZXF1aXJlQWxsKCBtaWRkbGV3YXJlUGF0aCApKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBMb2FkIG1vZHVsZSBtaWRkbGV3YXJlc1xuXHRcdGxldCBtb2R1bGVNaWRkbGV3YXJlcyA9IE9iamVjdC5rZXlzKCB0aGlzLmNvbmZpZ3VyYXRpb24uZW5hYmxlZCApXG5cdFx0XHQuZmlsdGVyKCAoIG1pZGRsZXdhcmVOYW1lICkgPT4gdHlwZW9mIHRoaXMuY29uZmlndXJhdGlvbi5lbmFibGVkWyBtaWRkbGV3YXJlTmFtZSBdLmVuYWJsZWQgPT09ICdzdHJpbmcnIClcblx0XHRcdC5yZWR1Y2UoICggcmVzdWx0LCBtaWRkbGV3YXJlTmFtZSApID0+IHtcblx0XHRcdFx0bGV0IG1pZGRsZXdhcmVNb2R1bGVOYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIG1pZGRsZXdhcmVOYW1lIF0uZW5hYmxlZDtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdFsgbWlkZGxld2FyZU5hbWUgXSA9IHJlcXVpcmUoIG1pZGRsZXdhcmVNb2R1bGVOYW1lICk7XG5cdFx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGBSZXF1aXJlZCBtb2R1bGUgbWlkZGxld2FyZSAnJHttaWRkbGV3YXJlTmFtZX0nIGZyb20gbW9kdWxlICcke21pZGRsZXdhcmVNb2R1bGVOYW1lfSdgICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlcnIgKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2cud2FybiggYENvdWxkIG5vdCByZXF1aXJlIG1vZHVsZSBtaWRkbGV3YXJlICcke21pZGRsZXdhcmVOYW1lfScgZnJvbSBtb2R1bGUgJyR7bWlkZGxld2FyZU1vZHVsZU5hbWV9J2AgKTtcblx0XHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggZXJyICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSwge30gKTtcblxuXHRcdGxldCBtaWRkbGV3YXJlcyA9IE9iamVjdC5hc3NpZ24oIHt9LCBjb3JlTWlkZGxld2FyZXMsIHVzZXJNaWRkbGV3YXJlcywgbW9kdWxlTWlkZGxld2FyZXMgKTtcblxuXHRcdC8vIENoZWNrIGlmIHJlcXVpcmVkIG1vZHVsZXMgYXJlIGZ1bmN0aW9ucywgYmluZCB0byBlbmdpbmVcblx0XHRPYmplY3Qua2V5cyggbWlkZGxld2FyZXMgKS5mb3JFYWNoKCAoIG1pZGRsZXdhcmVOYW1lICkgPT4ge1xuXHRcdFx0bGV0IG1pZGRsZXdhcmVGYWN0b3J5RnVuY3Rpb24gPSBtaWRkbGV3YXJlc1sgbWlkZGxld2FyZU5hbWUgXTtcblx0XHRcdGxldCBtaWRkbGV3YXJlQ29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uLmVuYWJsZWRbIG1pZGRsZXdhcmVOYW1lIF07XG5cblx0XHRcdGlmICggdHlwZW9mIG1pZGRsZXdhcmVGYWN0b3J5RnVuY3Rpb24gIT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdHRoaXMubG9nLndhcm4oIGAnJHttaWRkbGV3YXJlTmFtZX0nIGlzIG5vIHZhbGlkIG1pZGRsZXdhcmUgZmFjdG9yeWAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaXNPYmplY3QgPSB0eXBlb2YgbWlkZGxld2FyZUNvbmZpZyA9PT0gJ29iamVjdCc7XG5cblx0XHRcdGlmICggbWlkZGxld2FyZUNvbmZpZyA9PT0gZmFsc2UgfHwgaXNPYmplY3QgJiYgbWlkZGxld2FyZUNvbmZpZy5lbmFibGVkICE9PSB0cnVlICkge1xuXHRcdFx0XHR0aGlzLmxvZy5kZWJ1ZyggYE1pZGRsZXdhcmUgJyR7bWlkZGxld2FyZU5hbWV9JyBpcyBleHBsaWNpdGx5IGRpc2FibGVkLmAgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHR5cGVvZiBtaWRkbGV3YXJlQ29uZmlnID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0dGhpcy5sb2cud2FybiggYE1pZGRsZXdhcmUgJyR7bWlkZGxld2FyZU5hbWV9JyBpcyBub3QgY29uZmlndXJlZCwgd2lsbCBub3QgbW91bnQuYCApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBmbiA9IG1pZGRsZXdhcmVGYWN0b3J5RnVuY3Rpb24oIGFwcGxpY2F0aW9uLCBtaWRkbGV3YXJlQ29uZmlnICk7XG5cblx0XHRcdGlmICggdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHR0aGlzLmxvZy53YXJuKCBgJyR7bWlkZGxld2FyZU5hbWV9JyBtaWRkbGV3YXJlIGZhY3RvcnkgZG9lcyBub3QgcHJvZHVjZSB2YWxpZCBtaWRkbGV3YXJlcywgd2lsbCBub3QgbW91bnQuYCApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGFwcGxpY2F0aW9uLnJvdXRlci51c2UoIGZuICk7XG5cdFx0XHRcdHRoaXMubG9nLmRlYnVnKCBgTWlkZGxld2FyZSAnJHttaWRkbGV3YXJlTmFtZX0nIG1vdW50ZWQuYCApO1xuXHRcdFx0fSBjYXRjaCAoIGVyciApIHtcblx0XHRcdFx0dGhpcy5sb2cuZXJyb3IoIGBCaW5kaW5nICcke21pZGRsZXdhcmVOYW1lfScgdG8gZW5naW5lIGZhaWxlZGAgKTtcblx0XHRcdFx0dGhpcy5sb2cuZGVidWcoIGVyciApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBhcHBsaWNhdGlvbjtcblx0fVxufTtcbiJdfQ==