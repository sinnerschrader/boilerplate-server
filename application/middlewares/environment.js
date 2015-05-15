'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startEnvironmentMiddleware;

function startEnvironmentMiddleware(application) {
	return regeneratorRuntime.mark(function environmentMiddleware(next) {
		return regeneratorRuntime.wrap(function environmentMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.set('X-Name', application.name);
					this.set('X-Environment', application.configuration.environment);
					context$2$0.next = 4;
					return next;

				case 4:
				case 'end':
					return context$2$0.stop();
			}
		}, environmentMiddleware, this);
	});
}

module.exports = exports['default'];