#!/usr/bin/env node --harmony
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*eslint-disable no-process-env, no-process-exit */

var _path = require('path');

require('babel-core/polyfill');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function start() {
	var options = arguments[0] === undefined ? {} : arguments[0];
	var augmented, application, log, stop;
	return regeneratorRuntime.async(function start$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				stop = function stop() {
					return regeneratorRuntime.async(function stop$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								context$2$0.prev = 0;
								context$2$0.next = 3;
								return application.stop();

							case 3:
								process.exit(0);
								context$2$0.next = 10;
								break;

							case 6:
								context$2$0.prev = 6;
								context$2$0.t144 = context$2$0['catch'](0);

								application.log.error(context$2$0.t144);
								process.exit(1);

							case 10:
							case 'end':
								return context$2$0.stop();
						}
					}, null, this, [[0, 6]]);
				};

				augmented = Object.assign({}, {
					'cwd': process.cwd(),
					'base': _path.resolve(__dirname, '../'),
					'env': process.env.NODE_ENV || 'development'
				}, options, { 'api': options });
				application = undefined;
				context$1$0.prev = 3;
				context$1$0.next = 6;
				return _2['default'](augmented);

			case 6:
				application = context$1$0.sent;
				context$1$0.next = 14;
				break;

			case 9:
				context$1$0.prev = 9;
				context$1$0.t145 = context$1$0['catch'](3);
				log = application ? application.log || console : console;

				log.trace(context$1$0.t145);
				throw new Error(context$1$0.t145);

			case 14:
				context$1$0.prev = 14;

				application.start();
				context$1$0.next = 22;
				break;

			case 18:
				context$1$0.prev = 18;
				context$1$0.t146 = context$1$0['catch'](14);

				application.log.error(context$1$0.t146);
				throw new Error(context$1$0.t146);

			case 22:

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

			case 27:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this, [[3, 9], [14, 18]]);
}

start(_minimist2['default'](process.argv.slice(1)));