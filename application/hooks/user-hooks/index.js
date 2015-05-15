'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _libraryHooksLoad = require('../../../library/hooks/load');

var _libraryHooksLoad2 = _interopRequireDefault(_libraryHooksLoad);

var _libraryUtilitiesFs = require('../../../library/utilities/fs');

exports['default'] = {
	'configurationKey': 'hooks',

	'after': ['hooks:configure:start:after'],

	'hookDidConfigure': function userHooksDidConfigure(application) {
		this.configuration.path = _path.resolve(application.runtime.cwd, this.configuration.path);
	},

	'start': function startUserHook(application) {
		var coreHookPath, isProjectMode, hooks;
		return regeneratorRuntime.async(function startUserHook$(context$1$0) {
			var _this = this;

			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					coreHookPath = _path.resolve(application.runtime.base, application.configuration.paths.hooks);
					isProjectMode = this.configuration.path === coreHookPath;
					context$1$0.next = 4;
					return _libraryUtilitiesFs.exists(this.configuration.path);

				case 4:
					context$1$0.t2 = context$1$0.sent;

					if (!(context$1$0.t2 === false)) {
						context$1$0.next = 8;
						break;
					}

					this.log.warn('No user hooks found at ' + coreHookPath);
					return context$1$0.abrupt('return', this);

				case 8:
					hooks = _libraryHooksLoad2['default'](application, this.configuration.path, true);

					hooks = hooks.map(function (hook) {
						var conflictingCoreHooks = application.hooks.filter(function (coreHook) {
							return coreHook.name === hook.name;
						});

						if (conflictingCoreHooks.length > 0) {
							if (isProjectMode === false) {
								_this.log.warn('User hook \'' + hook.name + '\' conflicts with core hook \'' + conflictingCoreHooks[0].name + '\'');
							}
							return false;
						}

						return hook;
					}).filter(function (item) {
						return item;
					});

					application.hooks = application.hooks.concat(hooks);
					hooks.forEach(function (hook) {
						return hook.register(application);
					});
					return context$1$0.abrupt('return', this);

				case 13:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];