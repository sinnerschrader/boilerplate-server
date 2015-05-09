'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

var _apiStart = require('./api/start');

var _apiStart2 = _interopRequireDefault(_apiStart);

var _apiStop = require('./api/stop');

var _apiStop2 = _interopRequireDefault(_apiStop);

var _apiMount = require('./api/mount');

var _apiMount2 = _interopRequireDefault(_apiMount);

var _apiUnmount = require('./api/unmount');

var _apiUnmount2 = _interopRequireDefault(_apiUnmount);

function boilerplate() {
	var options = arguments[0] === undefined ? {} : arguments[0];
	var application;
	return regeneratorRuntime.async(function boilerplate$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return _boot2['default'](options);

			case 2:
				application = context$1$0.sent;
				return context$1$0.abrupt('return', Object.assign(application, {
					'start': _apiStart2['default'](application),
					'stop': _apiStop2['default'](application),
					'mount': _apiMount2['default'](application),
					'unmount': _apiUnmount2['default'](application)
				}));

			case 4:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boilerplate;
module.exports = exports['default'];