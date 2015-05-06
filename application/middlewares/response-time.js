'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = responseTimeMiddlewareFactory;

function responseTimeMiddlewareFactory() {
	return regeneratorRuntime.mark(function responseTimeMiddleware(next) {
		var start, responseTime;
		return regeneratorRuntime.wrap(function responseTimeMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					start = new Date();
					context$2$0.next = 3;
					return next;

				case 3:
					responseTime = new Date() - start;

					this.set('X-Response-Time', '' + responseTime + 'ms');

				case 5:
				case 'end':
					return context$2$0.stop();
			}
		}, responseTimeMiddleware, this);
	});
}

module.exports = exports['default'];