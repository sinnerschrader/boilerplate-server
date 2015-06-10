'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

exports['default'] = {
	'after': ['hooks:user-hooks:start:after'],
	'modes': ['server'],

	'start': function startEngineHook(application) {
		return regeneratorRuntime.async(function startEngineHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.engine = (0, _engine2['default'])(application);
					return context$1$0.abrupt('return', this);

				case 2:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];