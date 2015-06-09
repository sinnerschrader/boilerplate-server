'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

function boilerplate() {
	var options = arguments[0] === undefined ? {} : arguments[0];
	var augmented;
	return regeneratorRuntime.async(function boilerplate$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				augmented = Object.assign({}, {
					'cwd': process.cwd(),
					'base': options.base || (0, _path.resolve)(__dirname, '../'),
					'env': process.env.NODE_ENV || 'development',
					'name': options.name || 'boilerplate-server'
				}, options, { 'api': options });
				context$1$0.next = 3;
				return regeneratorRuntime.awrap((0, _boot2['default'])(augmented));

			case 3:
				return context$1$0.abrupt('return', context$1$0.sent);

			case 4:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

exports['default'] = boilerplate;
module.exports = exports['default'];

/*eslint-disable no-process-env */