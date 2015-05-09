"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function unmountServerFactory(application) {

	return function unmountServer() {
		var _application$engine;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return regeneratorRuntime.async(function unmountServer$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					(_application$engine = application.engine).unmount.apply(_application$engine, args);
					return context$2$0.abrupt("return", application);

				case 2:
				case "end":
					return context$2$0.stop();
			}
		}, null, this);
	};
}

exports["default"] = unmountServerFactory;
module.exports = exports["default"];