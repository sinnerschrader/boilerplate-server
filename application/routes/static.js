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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9yb3V0ZXMvc3RhdGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUd3QixrQkFBa0I7Ozs7OztvQkFIcEIsTUFBTTs7dUJBQ1gsVUFBVTs7OztBQUVaLFNBQVMsa0JBQWtCLENBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRTtBQUN2RSxLQUFJLElBQUksR0FBRyxtQkFBUyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBTyxDQUFFLENBQUM7QUFDdkYsS0FBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEgsTUFBSyxJQUFJLG1CQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBTyxDQUFDLDRCQUFLLEtBQUssRUFBQyxDQUFDO0FBQ25GLE1BQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtTQUFLLG1CQUFRLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztFQUFBLENBQUMsQ0FBQztBQUNwRSxNQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVqQixnQ0FBTyxTQUFXLFdBQVc7c0ZBR25CLEtBQUk7Ozs7O0FBRmIsU0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7O2lCQUVsQixLQUFLOzs7Ozs7OztBQUFiLFVBQUk7O1lBQ04sMEJBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFKLEtBQUksRUFBQyxDQUFDOzs7V0FFdEMsSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUE7Ozs7O0FBQ3RCLGdCQUFXLENBQUMsR0FBRyxDQUFDLElBQUksb0NBQWtDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFPLEtBQUksQ0FBRyxDQUFDOzs7O0FBR3JGLGdCQUFXLENBQUMsR0FBRyxDQUFDLElBQUkseUNBQXVDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFPLEtBQUksQ0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FWM0UsV0FBVztFQWE1QixFQUFDO0NBQ0YiLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlfSBmcm9tICdwYXRoJztcbmltcG9ydCBzZW5kIGZyb20gJ2tvYS1zZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhdGljUm91dGVGYWN0b3J5IChhcHBsaWNhdGlvbiwgY29uZmlndXJhdGlvbikge1xuXHRsZXQgcm9vdCA9IHJlc29sdmUoIGFwcGxpY2F0aW9uLnJ1bnRpbWUuYmFzZSwgYXBwbGljYXRpb24uY29uZmlndXJhdGlvbi5wYXRocy5zdGF0aWMgKTtcblx0bGV0IHJvb3RzID0gQXJyYXkuaXNBcnJheShjb25maWd1cmF0aW9uLm9wdGlvbnMucm9vdCkgPyBjb25maWd1cmF0aW9uLm9wdGlvbnMucm9vdCA6IFtjb25maWd1cmF0aW9uLm9wdGlvbnMucm9vdF07XG5cblx0cm9vdHMgPSBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLnBhdGhzLnN0YXRpYyksIC4uLnJvb3RzXTtcblx0cm9vdHMgPSByb290cy5tYXAoKGl0ZW0pID0+IHJlc29sdmUoYXBwbGljYXRpb24ucnVudGltZS5jd2QsIGl0ZW0pKTtcblx0cm9vdHMucHVzaChyb290KTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKiBzdGF0aWNSb3V0ZSAoKSB7XG5cdFx0dGhpcy5hc3NlcnQodGhpcy5wYXJhbXMucGF0aCwgNDA0KTtcblxuXHRcdGZvciAobGV0IHJvb3Qgb2Ygcm9vdHMpIHtcblx0XHRcdHlpZWxkIHNlbmQodGhpcywgdGhpcy5wYXJhbXMucGF0aCwge3Jvb3R9KTtcblxuXHRcdFx0aWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oYFthcHBsaWNhdGlvbjpyZXF1ZXN0XSBNYXRjaGVkICR7dGhpcy5wYXJhbXMucGF0aH0gb24gJHtyb290fWApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFwcGxpY2F0aW9uLmxvZy5pbmZvKGBbYXBwbGljYXRpb246cmVxdWVzdF0gTm8gbWF0Y2ggZm9yICR7dGhpcy5wYXJhbXMucGF0aH0gb24gJHtyb290fWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cbiJdfQ==