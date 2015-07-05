'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = loadHooks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

function loadHooks(application, path) {
	var modules = arguments[2] === undefined ? false : arguments[2];

	var hooks = (0, _requireAll2['default'])(path);

	hooks = Object.keys(hooks).map(function (name) {
		return Object.assign(hooks[name].index ? hooks[name].index : hooks[name], { name: name });
	}).map(function (hook) {
		return Object.assign(hook, { 'requirePath': (0, _path.resolve)(path, hook.name) });
	});

	if (modules && application.configuration) {
		var moduleHookNames = Object.keys(application.configuration.hooks.enabled).filter(function (key) {
			return typeof application.configuration.hooks.enabled[key] === 'string';
		});

		var moduleHooks = moduleHookNames.map(function requireHookModules(moduleHookName) {
			var moduleName = application.configuration.hooks.enabled[moduleHookName];

			try {
				var moduleHook = require(moduleName);
				moduleHook.name = moduleHookName;
				moduleHook.requirePath = require.resolve(moduleName);
				application.log.debug('[application:hooks]', 'Required module hook \'' + moduleHookName + '\' from module \'' + moduleName + '\'');
			} catch (err) {
				application.log.warn('[application:hooks]', 'Could not require module hook \'' + moduleHookName + '\' from module \'' + moduleName + '\'');
			}
		});

		hooks = hooks.concat(moduleHooks);
	}

	hooks = hooks.filter(function (hook) {
		return hook;
	}).map(function hookCallback(hook) {
		return (0, _default2['default'])(application, hook.name, hook);
	});

	return hooks;
}

module.exports = exports['default'];