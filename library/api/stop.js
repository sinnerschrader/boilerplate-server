'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function stopServerFactory(application) {

	return function stopServer() {
		return regeneratorRuntime.async(function stopServer$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					application.log.info('\n[application:stop] Stopping server gracefully...');
					application.engine.stop();
					return context$2$0.abrupt('return', application);

				case 3:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this);
	};
}

exports['default'] = stopServerFactory;
module.exports = exports['default'];