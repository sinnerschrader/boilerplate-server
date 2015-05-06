'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

function server() {
	var options = arguments[0] === undefined ? {} : arguments[0];
	return regeneratorRuntime.async(function server$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return _boot2['default'](options);

			case 2:
				return context$1$0.abrupt('return', context$1$0.sent);

			case 3:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = server;
module.exports = exports['default'];