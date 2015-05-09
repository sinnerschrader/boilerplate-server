"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function startServerFactory(application) {
	return function startServer() {
		var host = arguments[0] === undefined ? application.configuration.server.host : arguments[0];
		var port = arguments[1] === undefined ? application.configuration.server.port : arguments[1];
		return regeneratorRuntime.async(function startServer$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					application.engine.start(host, port);

				case 1:
				case "end":
					return context$2$0.stop();
			}
		}, null, this);
	};
}

exports["default"] = startServerFactory;
module.exports = exports["default"];