#!/usr/bin/env node

/*eslint-disable no-process-env, no-process-exit */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-core/polyfill');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function start() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var application, settings, log, stop;
	return regeneratorRuntime.async(function start$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				stop = function stop() {
					return regeneratorRuntime.async(function stop$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								context$2$0.prev = 0;
								context$2$0.next = 3;
								return regeneratorRuntime.awrap(application.stop());

							case 3:
								process.exit(0);
								context$2$0.next = 10;
								break;

							case 6:
								context$2$0.prev = 6;
								context$2$0.t0 = context$2$0['catch'](0);

								application.log.error(context$2$0.t0);
								process.exit(1);

							case 10:
							case 'end':
								return context$2$0.stop();
						}
					}, null, this, [[0, 6]]);
				};

				application = undefined;
				settings = Object.assign(options, { 'mode': 'server' });
				context$1$0.prev = 3;
				context$1$0.next = 6;
				return regeneratorRuntime.awrap((0, _2['default'])(settings));

			case 6:
				application = context$1$0.sent;
				context$1$0.next = 14;
				break;

			case 9:
				context$1$0.prev = 9;
				context$1$0.t0 = context$1$0['catch'](3);
				log = application ? application.log || console : console;

				log.error(context$1$0.t0);
				throw new Error(context$1$0.t0);

			case 14:
				context$1$0.prev = 14;
				context$1$0.next = 17;
				return regeneratorRuntime.awrap(application.start());

			case 17:
				application.log.info('[application] Started without errors.');
				context$1$0.next = 24;
				break;

			case 20:
				context$1$0.prev = 20;
				context$1$0.t1 = context$1$0['catch'](14);

				application.log.error(context$1$0.t1);
				throw new Error(context$1$0.t1);

			case 24:

				process.on('SIGINT', function () {
					return stop('SIGINT');
				});
				process.on('SIGHUP', function () {
					return stop('SIGHUP');
				});
				process.on('SIGQUIT', function () {
					return stop('SIGQUIT');
				});
				process.on('SIGABRT', function () {
					return stop('SIGABRT');
				});
				process.on('SIGTERM', function () {
					return stop('SIGTERM');
				});

			case 29:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this, [[3, 9], [14, 20]]);
}

start((0, _minimist2['default'])(process.argv.slice(1)));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9iaW5hcnkvYm9pbGVycGxhdGUtc2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7UUFHTyxxQkFBcUI7O3dCQUNQLFVBQVU7Ozs7Z0JBRVAsS0FBSzs7OztBQUU3QixTQUFlLEtBQUs7S0FBRyxPQUFPLHlEQUFHLEVBQUU7S0FDOUIsV0FBVyxFQUNYLFFBQVEsRUFLUCxHQUFHLEVBYU8sSUFBSTs7OztBQUFKLFFBQUksWUFBSixJQUFJOzs7Ozs7d0NBRVgsV0FBVyxDQUFDLElBQUksRUFBRTs7O0FBQ3hCLGVBQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7Ozs7Ozs7O0FBRWxCLG1CQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQU8sQ0FBQztBQUM3QixlQUFPLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFDOzs7Ozs7Ozs7QUF6QmhCLGVBQVc7QUFDWCxZQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBRSxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUU7OztvQ0FHeEMsbUJBQWEsUUFBUSxDQUFFOzs7QUFBM0MsZUFBVzs7Ozs7OztBQUVQLE9BQUcsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsT0FBTzs7QUFDNUQsT0FBRyxDQUFDLEtBQUssZ0JBQVMsQ0FBQztVQUNiLElBQUksS0FBSyxnQkFBUzs7Ozs7b0NBSWxCLFdBQVcsQ0FBQyxLQUFLLEVBQUU7OztBQUN6QixlQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOzs7Ozs7OztBQUU5RCxlQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQVMsQ0FBQztVQUN6QixJQUFJLEtBQUssZ0JBQVM7Ozs7QUFhekIsV0FBTyxDQUFDLEVBQUUsQ0FBRSxRQUFRLEVBQUU7WUFBTSxJQUFJLENBQUUsUUFBUSxDQUFFO0tBQUEsQ0FBRSxDQUFDO0FBQy9DLFdBQU8sQ0FBQyxFQUFFLENBQUUsUUFBUSxFQUFFO1lBQU0sSUFBSSxDQUFFLFFBQVEsQ0FBRTtLQUFBLENBQUUsQ0FBQztBQUMvQyxXQUFPLENBQUMsRUFBRSxDQUFFLFNBQVMsRUFBRTtZQUFNLElBQUksQ0FBRSxTQUFTLENBQUU7S0FBQSxDQUFFLENBQUM7QUFDakQsV0FBTyxDQUFDLEVBQUUsQ0FBRSxTQUFTLEVBQUU7WUFBTSxJQUFJLENBQUUsU0FBUyxDQUFFO0tBQUEsQ0FBRSxDQUFDO0FBQ2pELFdBQU8sQ0FBQyxFQUFFLENBQUUsU0FBUyxFQUFFO1lBQU0sSUFBSSxDQUFFLFNBQVMsQ0FBRTtLQUFBLENBQUUsQ0FBQzs7Ozs7OztDQUNqRDs7QUFFRCxLQUFLLENBQUUsMkJBQVUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBRSxDQUFDIiwiZmlsZSI6ImJvaWxlcnBsYXRlLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyplc2xpbnQtZGlzYWJsZSBuby1wcm9jZXNzLWVudiwgbm8tcHJvY2Vzcy1leGl0ICovXG5cbmltcG9ydCAnYmFiZWwtY29yZS9wb2x5ZmlsbCc7XG5pbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnO1xuXG5pbXBvcnQgYm9pbGVycGxhdGUgZnJvbSAnLi4vJztcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQgKCBvcHRpb25zID0ge30gKSB7XG5cdGxldCBhcHBsaWNhdGlvbjtcblx0bGV0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbiggb3B0aW9ucywgeyAnbW9kZSc6ICdzZXJ2ZXInIH0gKTtcblxuXHR0cnkge1xuXHRcdGFwcGxpY2F0aW9uID0gYXdhaXQgYm9pbGVycGxhdGUoIHNldHRpbmdzICk7XG5cdH0gY2F0Y2ggKCBlcnJvciApIHtcblx0XHRsZXQgbG9nID0gYXBwbGljYXRpb24gPyBhcHBsaWNhdGlvbi5sb2cgfHwgY29uc29sZSA6IGNvbnNvbGU7XG5cdFx0bG9nLmVycm9yKCBlcnJvciApO1xuXHRcdHRocm93IG5ldyBFcnJvciggZXJyb3IgKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0YXdhaXQgYXBwbGljYXRpb24uc3RhcnQoKTtcblx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbygnW2FwcGxpY2F0aW9uXSBTdGFydGVkIHdpdGhvdXQgZXJyb3JzLicpO1xuXHR9IGNhdGNoICggZXJyb3IgKSB7XG5cdFx0YXBwbGljYXRpb24ubG9nLmVycm9yKCBlcnJvciApO1xuXHRcdHRocm93IG5ldyBFcnJvciggZXJyb3IgKTtcblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIHN0b3AgKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCBhcHBsaWNhdGlvbi5zdG9wKCk7XG5cdFx0XHRwcm9jZXNzLmV4aXQoIDAgKTtcblx0XHR9IGNhdGNoICggZXJyICkge1xuXHRcdFx0YXBwbGljYXRpb24ubG9nLmVycm9yKCBlcnIgKTtcblx0XHRcdHByb2Nlc3MuZXhpdCggMSApO1xuXHRcdH1cblx0fVxuXG5cdHByb2Nlc3Mub24oICdTSUdJTlQnLCAoKSA9PiBzdG9wKCAnU0lHSU5UJyApICk7XG5cdHByb2Nlc3Mub24oICdTSUdIVVAnLCAoKSA9PiBzdG9wKCAnU0lHSFVQJyApICk7XG5cdHByb2Nlc3Mub24oICdTSUdRVUlUJywgKCkgPT4gc3RvcCggJ1NJR1FVSVQnICkgKTtcblx0cHJvY2Vzcy5vbiggJ1NJR0FCUlQnLCAoKSA9PiBzdG9wKCAnU0lHQUJSVCcgKSApO1xuXHRwcm9jZXNzLm9uKCAnU0lHVEVSTScsICgpID0+IHN0b3AoICdTSUdURVJNJyApICk7XG59XG5cbnN0YXJ0KCBtaW5pbWlzdCggcHJvY2Vzcy5hcmd2LnNsaWNlKCAxICkgKSApO1xuIl19