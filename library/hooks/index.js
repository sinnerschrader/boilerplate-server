/*
 * Load, schedule and run the default hooks
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

function createHooks(application) {
	application.hooks = (0, _load2['default'])(application, (0, _path.resolve)(application.runtime.base, 'application', 'hooks'));

	application.hooks.forEach(function registerCoreHook(hook) {
		hook.register(application);
	});

	application.emit('application:before');

	return new Promise(function resolveHooks(fulfill) {
		application.on('hooks:start:after', function onAfterHookStart() {
			var remaining = application.hooks.filter(function (hook) {
				return hook.wait && hook.stages.start === false && hook.disabled === false;
			});

			if (remaining.length === 0) {
				application.emit('application:after');
				application.log.debug('[application:hooks]', 'All core hooks executed');

				application.removeListener('hooks:start:after', onAfterHookStart);
				fulfill(application);
			}
		});
	});
}

exports['default'] = createHooks;
module.exports = exports['default'];