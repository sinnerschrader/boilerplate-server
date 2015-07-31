/*eslint-disable no-console */

/**
 * Log Hook
 * Abstract: Provides logging facilities on application.log
 * Configuration: configuration/log.js
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

exports['default'] = {
	'after': ['hooks:user-hooks:start:after'],

	'configure': function configureLogHook(application) {
		return regeneratorRuntime.async(function configureLogHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					this.configuration = Object.assign(this.configuration, this.defaults, application.configuration[this.name]);
					this.configuration.level = application.runtime.api.loglevel || this.configuration.level;
					return context$1$0.abrupt('return', this);

				case 3:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	},

	'start': function startLogHook(application) {
		var logger;
		return regeneratorRuntime.async(function startLogHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					logger = (0, _logger2['default'])('[' + application.name + ']', this.configuration);

					application.log.silly('Draining boot logger queue...');
					application.log.drain(logger);

					logger.silly('Deploying application logger...');
					application.log.deploy(logger);

					return context$1$0.abrupt('return', this);

				case 6:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9ob29rcy9sb2cvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O3NCQU93QixVQUFVOzs7O3FCQUVuQjtBQUNkLFFBQU8sRUFBRSxDQUFFLDhCQUE4QixDQUFFOztBQUUzQyxZQUFXLEVBQUUsU0FBZSxnQkFBZ0IsQ0FBRyxXQUFXOzs7O0FBQ3pELFNBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUUsQ0FBQztBQUNoSCxTQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7eUNBQ2pGLElBQUk7Ozs7Ozs7RUFDWDs7QUFFRCxRQUFPLEVBQUUsU0FBZSxZQUFZLENBQUcsV0FBVztNQUM3QyxNQUFNOzs7O0FBQU4sV0FBTSxHQUFHLCtCQUFnQixXQUFXLENBQUMsSUFBSSxRQUFLLElBQUksQ0FBQyxhQUFhLENBQUM7O0FBRXJFLGdCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3ZELGdCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFOUIsV0FBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ2hELGdCQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7eUNBRXhCLElBQUk7Ozs7Ozs7RUFDWDtDQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8qKlxuICogTG9nIEhvb2tcbiAqIEFic3RyYWN0OiBQcm92aWRlcyBsb2dnaW5nIGZhY2lsaXRpZXMgb24gYXBwbGljYXRpb24ubG9nXG4gKiBDb25maWd1cmF0aW9uOiBjb25maWd1cmF0aW9uL2xvZy5qc1xuICoqL1xuaW1wb3J0IHN0YXJ0TG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHQnYWZ0ZXInOiBbICdob29rczp1c2VyLWhvb2tzOnN0YXJ0OmFmdGVyJyBdLFxuXG5cdCdjb25maWd1cmUnOiBhc3luYyBmdW5jdGlvbiBjb25maWd1cmVMb2dIb29rICggYXBwbGljYXRpb24gKSB7XG5cdFx0dGhpcy5jb25maWd1cmF0aW9uID0gT2JqZWN0LmFzc2lnbiggdGhpcy5jb25maWd1cmF0aW9uLCB0aGlzLmRlZmF1bHRzLCBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uWyB0aGlzLm5hbWUgXSApO1xuXHRcdHRoaXMuY29uZmlndXJhdGlvbi5sZXZlbCA9IGFwcGxpY2F0aW9uLnJ1bnRpbWUuYXBpLmxvZ2xldmVsIHx8IHRoaXMuY29uZmlndXJhdGlvbi5sZXZlbDtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQnc3RhcnQnOiBhc3luYyBmdW5jdGlvbiBzdGFydExvZ0hvb2sgKCBhcHBsaWNhdGlvbiApIHtcblx0XHRsZXQgbG9nZ2VyID0gc3RhcnRMb2dnZXIoYFske2FwcGxpY2F0aW9uLm5hbWV9XWAsIHRoaXMuY29uZmlndXJhdGlvbik7XG5cblx0XHRhcHBsaWNhdGlvbi5sb2cuc2lsbHkoJ0RyYWluaW5nIGJvb3QgbG9nZ2VyIHF1ZXVlLi4uJyk7XG5cdFx0YXBwbGljYXRpb24ubG9nLmRyYWluKGxvZ2dlcik7XG5cblx0XHRsb2dnZXIuc2lsbHkoJ0RlcGxveWluZyBhcHBsaWNhdGlvbiBsb2dnZXIuLi4nKTtcblx0XHRhcHBsaWNhdGlvbi5sb2cuZGVwbG95KGxvZ2dlcik7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiJdfQ==