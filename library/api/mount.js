"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function mountServerFactory(application) {

	return function mountServer() {
		var _application$engine;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return regeneratorRuntime.async(function mountServer$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					(_application$engine = application.engine).mount.apply(_application$engine, args);
					return context$2$0.abrupt("return", application);

				case 2:
				case "end":
					return context$2$0.stop();
			}
		}, null, this);
	};
}

exports["default"] = mountServerFactory;
module.exports = exports["default"];