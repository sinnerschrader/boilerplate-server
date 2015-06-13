'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startLogMiddleware;

function startLogMiddleware(application) {
	return regeneratorRuntime.mark(function logMiddleware(next) {
		var start, delta;
		return regeneratorRuntime.wrap(function logMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					start = new Date();
					context$2$0.next = 3;
					return next;

				case 3:
					delta = new Date() - start;

					application.log.debug('[application:request]', '' + start + ' - ' + this.method + ' ' + this.url + ' - ' + this.response.status + ' ' + this.response.message + ' - ' + delta + 'ms');

				case 5:
				case 'end':
					return context$2$0.stop();
			}
		}, logMiddleware, this);
	});
}

module.exports = exports['default'];