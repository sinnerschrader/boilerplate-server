'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

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

				application.log.info('[application]', 'Starting server at http://' + application.configuration.server.host + ':' + application.configuration.server.port + ' in environment \'' + application.configuration.environment + '\' ...');

				context$1$0.next = 6;
				return application.engine.listen(application.configuration.server.port, application.configuration.server.host);

			case 6:
				return context$1$0.abrupt('return', application);

			case 7:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boot;
module.exports = exports['default'];