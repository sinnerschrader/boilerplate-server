'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = indexRouteFactory;

function indexRouteFactory(application) {
	return function indexRoute(path) {
		return regeneratorRuntime.async(function indexRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.body = 'You are up and running! Place a custom index route in ./application/routes.';

				case 1:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this);
	};
}

module.exports = exports['default'];