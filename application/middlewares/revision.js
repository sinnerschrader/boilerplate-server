"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = startRevisionMiddleware;

function startRevisionMiddleware(application) {

	return function revisionMiddleWare(next) {
		return regeneratorRuntime.async(function revisionMiddleWare$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					return context$2$0.abrupt("return", next);

				case 1:
				case "end":
					return context$2$0.stop();
			}
		}, null, this);
	};
}

module.exports = exports["default"];