'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = healthRouteFactory;

function healthRouteFactory(application) {
	return function healthRoute() {
		return regeneratorRuntime.async(function healthRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.body = {
						'name': application.name,
						'healthy': true
					};

				case 1:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this);
	};
}

module.exports = exports['default'];