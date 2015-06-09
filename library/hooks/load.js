'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = loadHooks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

function loadHooks(application, path) {
	var modules = arguments[2] === undefined ? false : arguments[2];

	var hooks = (0, _requireAll2['default'])(path);

	if (modules && application.configuration) {

		var moduleHookNames = Object.keys(application.configuration.hooks.enabled).filter(function (key) {
			return typeof application.configuration.hooks.enabled[key] === 'string';
		});

		moduleHookNames.forEach(function requireHookModules(moduleHookName) {
			var moduleName = application.configuration.hooks.enabled[moduleHookName];

			try {
				hooks[moduleHookName] = require(moduleName);
				application.log.debug('[application:hooks]', 'Required module hook \'' + moduleHookName + '\' from module \'' + moduleName + '\'');
			} catch (err) {
				application.log.warn('[application:hooks]', 'Could not require module hook \'' + moduleName + '\' from module \'' + moduleName + '\'');
			}
		});
	}

	hooks = Object.keys(hooks).map(function hookCallback(hookName) {
		if (['index', 'default', 'load'].indexOf(hookName) > -1) {
			return false;
		}

		var data = hooks[hookName];

		if (typeof data.index !== 'object') {
			application.log.warn('[application:hooks]', 'Hook \'' + hookName + '\' is no valid hook.');
			return false;
		}

		return (0, _default2['default'])(application, hookName, data.index);
	}).filter(function (item) {
		return item;
	});

	return hooks;
}

module.exports = exports['default'];