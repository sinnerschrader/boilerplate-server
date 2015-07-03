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

						if (middlewareConfig === false) {
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