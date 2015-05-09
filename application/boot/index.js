'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

var _utilitiesPorts = require('../utilities/ports');

var _utilitiesPorts2 = _interopRequireDefault(_utilitiesPorts);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _hooks = require('../hooks');

var _hooks2 = _interopRequireDefault(_hooks);

function boot(options) {
	var application;
	return regeneratorRuntime.async(function boot$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				application = Object.assign(new _events.EventEmitter(), {
					'runtime': options,
					'log': _logger2['default'](options)
				});
				context$1$0.next = 3;
				return _hooks2['default'](application);

			case 3:
				context$1$0.next = 5;
				return _utilitiesPorts2['default'].test(application.configuration.server.port, application.configuration.server.host);

			case 5:
				context$1$0.t33 = context$1$0.sent;

				if (!(context$1$0.t33 === 'open')) {
					context$1$0.next = 13;
					break;
				}

				if (!(application.configuration.server.autoPort !== true)) {
					context$1$0.next = 9;
					break;
				}

				throw new Error('Port ' + application.configuration.server.port + ' is taken and server.autPort is disabled, could not start server.');

			case 9:

				application.log.warn('[application] Port ' + application.configuration.server.port + ' is taken, trying to obtain next open port... ');
				context$1$0.next = 12;
				return _utilitiesPorts2['default'].find(application.configuration.server.port + 1, application.configuration.server.port + 51, application.configuration.server.host);

			case 12:
				application.configuration.server.port = context$1$0.sent;

			case 13:

				application.log.info('[application]', 'Starting server at http://' + application.configuration.server.host + ':' + application.configuration.server.port + ' in environment \'' + application.configuration.environment + '\' ...');

				context$1$0.next = 16;
				return application.engine.listen(application.configuration.server.port, application.configuration.server.host);

			case 16:
				return context$1$0.abrupt('return', application);

			case 17:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boot;
module.exports = exports['default'];