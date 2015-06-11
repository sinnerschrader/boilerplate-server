#!/usr/bin/env node --harmony

/*eslint-disable no-process-env, no-process-exit */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-core/polyfill');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function start() {
	var options = arguments[0] === undefined ? {} : arguments[0];
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