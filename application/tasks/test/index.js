"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = testTask;

function testTask(application, config) {
	return regeneratorRuntime.async(function testTask$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				console.log(config.message);

			case 1:
			case "end":
				return context$1$0.stop();
		}
	}, null, this);
}

module.exports = exports["default"];