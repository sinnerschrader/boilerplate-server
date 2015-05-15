"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = startRevisionMiddleware;

function startRevisionMiddleware(application) {
	return regeneratorRuntime.mark(function revisionMiddleWare(next) {
		return regeneratorRuntime.wrap(function revisionMiddleWare$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return next;

				case 2:
				case "end":
					return context$2$0.stop();
			}
		}, revisionMiddleWare, this);
	});
}

module.exports = exports["default"];