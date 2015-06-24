'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = staticRouteFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

function staticRouteFactory(application, configuration) {
	return regeneratorRuntime.mark(function staticRoute() {
		var root, roots, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _root;

		return regeneratorRuntime.wrap(function staticRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					root = (0, _path.resolve)(application.runtime.base, application.configuration.paths['static']);
					roots = Array.isArray(configuration.options.root) ? configuration.options.root : [configuration.options.root];

					roots = roots.map(function (item) {
						return (0, _path.resolve)(application.runtime.cwd, item);
					});
					roots.push(root);

					this.assert(this.params.path, 404);

					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$2$0.prev = 8;
					_iterator = roots[Symbol.iterator]();

				case 10:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$2$0.next = 23;
						break;
					}

					_root = _step.value;
					context$2$0.next = 14;
					return (0, _koaSend2['default'])(this, this.params.path, { root: _root });

				case 14:
					if (!(this.status === 200)) {
						context$2$0.next = 19;
						break;
					}

					application.log.info('[application:request] Matched ' + this.params.path + ' on ' + _root);
					return context$2$0.abrupt('break', 23);

				case 19:
					application.log.info('[application:request] No match for ' + this.params.path + ' on ' + _root);

				case 20:
					_iteratorNormalCompletion = true;
					context$2$0.next = 10;
					break;

				case 23:
					context$2$0.next = 29;
					break;

				case 25:
					context$2$0.prev = 25;
					context$2$0.t0 = context$2$0['catch'](8);
					_didIteratorError = true;
					_iteratorError = context$2$0.t0;

				case 29:
					context$2$0.prev = 29;
					context$2$0.prev = 30;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 32:
					context$2$0.prev = 32;

					if (!_didIteratorError) {
						context$2$0.next = 35;
						break;
					}

					throw _iteratorError;

				case 35:
					return context$2$0.finish(32);

				case 36:
					return context$2$0.finish(29);

				case 37:
				case 'end':
					return context$2$0.stop();
			}
		}, staticRoute, this, [[8, 25, 29, 37], [30,, 32, 36]]);
	});
}

module.exports = exports['default'];