'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = staticRouteFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('path');

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

function staticRouteFactory(application, configuration) {
	var root = (0, _path.resolve)(application.runtime.base, application.configuration.paths['static']);
	var roots = Array.isArray(configuration.options.root) ? configuration.options.root : [configuration.options.root];

	roots = [(0, _path.resolve)(process.cwd(), application.configuration.paths['static'])].concat(_toConsumableArray(roots));
	roots = roots.map(function (item) {
		return (0, _path.resolve)(application.runtime.cwd, item);
	});
	roots.push(root);

	return regeneratorRuntime.mark(function staticRoute() {
		var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _root;

		return regeneratorRuntime.wrap(function staticRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					this.assert(this.params.path, 404);

					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$2$0.prev = 4;
					_iterator = roots[Symbol.iterator]();

				case 6:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$2$0.next = 19;
						break;
					}

					_root = _step.value;
					context$2$0.next = 10;
					return (0, _koaSend2['default'])(this, this.params.path, { root: _root });

				case 10:
					if (!(this.status === 200)) {
						context$2$0.next = 15;
						break;
					}

					application.log.info('[application:request] Matched ' + this.params.path + ' on ' + _root);
					return context$2$0.abrupt('break', 19);

				case 15:
					application.log.info('[application:request] No match for ' + this.params.path + ' on ' + _root);

				case 16:
					_iteratorNormalCompletion = true;
					context$2$0.next = 6;
					break;

				case 19:
					context$2$0.next = 25;
					break;

				case 21:
					context$2$0.prev = 21;
					context$2$0.t0 = context$2$0['catch'](4);
					_didIteratorError = true;
					_iteratorError = context$2$0.t0;

				case 25:
					context$2$0.prev = 25;
					context$2$0.prev = 26;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 28:
					context$2$0.prev = 28;

					if (!_didIteratorError) {
						context$2$0.next = 31;
						break;
					}

					throw _iteratorError;

				case 31:
					return context$2$0.finish(28);

				case 32:
					return context$2$0.finish(25);

				case 33:
				case 'end':
					return context$2$0.stop();
			}
		}, staticRoute, this, [[4, 21, 25, 33], [26,, 28, 32]]);
	});
}

module.exports = exports['default'];