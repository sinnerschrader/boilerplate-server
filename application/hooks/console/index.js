'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	'after': ['hooks:user-hooks:start:after'],

	'start': function startConsoleHook(application) {
		return regeneratorRuntime.async(function startConsoleHook$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					application.console = function callee$1$0() {
						var args$2$0 = arguments;
						return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
							while (1) switch (context$2$0.prev = context$2$0.next) {
								case 0:
									console.log(args$2$0);

								case 1:
								case 'end':
									return context$2$0.stop();
							}
						}, null, this);
					};
					return context$1$0.abrupt('return', this);

				case 2:
				case 'end':
					return context$1$0.stop();
			}
		}, null, this);
	}
};
module.exports = exports['default'];