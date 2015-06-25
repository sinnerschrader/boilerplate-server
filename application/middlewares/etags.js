'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startEtagsMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _koaConditionalGet = require('koa-conditional-get');

var _koaConditionalGet2 = _interopRequireDefault(_koaConditionalGet);

var _koaEtag = require('koa-etag');

var _koaEtag2 = _interopRequireDefault(_koaEtag);

function startEtagsMiddleware(application) {
	application.engine.use((0, _koaConditionalGet2['default'])());

	application.engine.use(regeneratorRuntime.mark(function test(next) {
		return regeneratorRuntime.wrap(function test$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return next;

				case 2:
				case 'end':
					return context$2$0.stop();
			}
		}, test, this);
	}));

	return (0, _koaEtag2['default'])();
}

module.exports = exports['default'];