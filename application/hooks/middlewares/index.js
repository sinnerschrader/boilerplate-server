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
		var coreMiddlewares, userMiddlewaresPath, userMiddlewares, moduleMiddlewares, middlewares;
		return regeneratorRuntime.async(function startMiddlewareHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					coreMiddlewares = (0, _requireAll2['default'])((0, _path.resolve)(application.runtime.base, application.configuration.paths.middlewares));
					userMiddlewaresPath = (0, _path.resolve)(application.runtime.cwd, this.configuration.path);
					userMiddlewares = {};
					context$1$0.next = 5;
					return regeneratorRuntime.awrap((0, _libraryUtilitiesFs.exists)(userMiddlewaresPath));

				case 5:
					if (!context$1$0.sent) {
						context$1$0.next = 7;
						break;
					}

					userMiddlewares = (0, _requireAll2['default'])(userMiddlewaresPath);

				case 7:
					moduleMiddlewares = Object.keys(this.configuration.enabled).filter(function (middlewareName) {
						return typeof _this.configuration.enabled[middlewareName] === 'string';
					}).reduce(function (result, middlewareName) {
						var middlewareModuleName = _this.configuration.enabled[middlewareName];

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

				case 11:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];

// Load physical core middlewares

// Load physical user middlewares

// Load module middlewares