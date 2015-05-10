'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = startEnvironmentMiddleware;

function startEnvironmentMiddleware(application) {
	return function environmentMiddleware(next) {
		return regeneratorRuntime.async(function environmentMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.set('X-Name', application.name);
					this.set('X-Environment', application.configuration.environment);
					return context$2$0.abrupt('return', next);

				case 3:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this);
	};
}

module.exports = exports['default'];