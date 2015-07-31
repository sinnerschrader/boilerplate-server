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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9yb3V0ZXMvc3RhdGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUd3QixrQkFBa0I7Ozs7OztvQkFIcEIsTUFBTTs7dUJBQ1gsVUFBVTs7OztBQUVaLFNBQVMsa0JBQWtCLENBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRTtBQUN2RSxLQUFJLElBQUksR0FBRyxVQUpKLE9BQU8sRUFJTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBTyxDQUFFLENBQUM7QUFDdkYsS0FBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEgsTUFBSyxJQUFJLFVBUEYsT0FBTyxFQU9HLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBTyxDQUFDLDRCQUFLLEtBQUssRUFBQyxDQUFDO0FBQ25GLE1BQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtTQUFLLFVBUnJCLE9BQU8sRUFRc0IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQUEsQ0FBQyxDQUFDO0FBQ3BFLE1BQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWpCLGdDQUFPLFNBQVcsV0FBVztzRkFHbkIsS0FBSTs7Ozs7QUFGYixTQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7aUJBRWxCLEtBQUs7Ozs7Ozs7O0FBQWIsVUFBSTs7WUFDTiwwQkFBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUosS0FBSSxFQUFDLENBQUM7OztXQUV0QyxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQTs7Ozs7QUFDdEIsZ0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxvQ0FBa0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQU8sS0FBSSxDQUFHLENBQUM7Ozs7QUFHckYsZ0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSx5Q0FBdUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQU8sS0FBSSxDQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVYzRSxXQUFXO0VBYTVCLEVBQUM7Q0FDRiIsImZpbGUiOiJzdGF0aWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Jlc29sdmV9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHNlbmQgZnJvbSAna29hLXNlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGF0aWNSb3V0ZUZhY3RvcnkgKGFwcGxpY2F0aW9uLCBjb25maWd1cmF0aW9uKSB7XG5cdGxldCByb290ID0gcmVzb2x2ZSggYXBwbGljYXRpb24ucnVudGltZS5iYXNlLCBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLnBhdGhzLnN0YXRpYyApO1xuXHRsZXQgcm9vdHMgPSBBcnJheS5pc0FycmF5KGNvbmZpZ3VyYXRpb24ub3B0aW9ucy5yb290KSA/IGNvbmZpZ3VyYXRpb24ub3B0aW9ucy5yb290IDogW2NvbmZpZ3VyYXRpb24ub3B0aW9ucy5yb290XTtcblxuXHRyb290cyA9IFtyZXNvbHZlKHByb2Nlc3MuY3dkKCksIGFwcGxpY2F0aW9uLmNvbmZpZ3VyYXRpb24ucGF0aHMuc3RhdGljKSwgLi4ucm9vdHNdO1xuXHRyb290cyA9IHJvb3RzLm1hcCgoaXRlbSkgPT4gcmVzb2x2ZShhcHBsaWNhdGlvbi5ydW50aW1lLmN3ZCwgaXRlbSkpO1xuXHRyb290cy5wdXNoKHJvb3QpO1xuXG5cdHJldHVybiBmdW5jdGlvbiAqIHN0YXRpY1JvdXRlICgpIHtcblx0XHR0aGlzLmFzc2VydCh0aGlzLnBhcmFtcy5wYXRoLCA0MDQpO1xuXG5cdFx0Zm9yIChsZXQgcm9vdCBvZiByb290cykge1xuXHRcdFx0eWllbGQgc2VuZCh0aGlzLCB0aGlzLnBhcmFtcy5wYXRoLCB7cm9vdH0pO1xuXG5cdFx0XHRpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0XHRhcHBsaWNhdGlvbi5sb2cuaW5mbyhgW2FwcGxpY2F0aW9uOnJlcXVlc3RdIE1hdGNoZWQgJHt0aGlzLnBhcmFtcy5wYXRofSBvbiAke3Jvb3R9YCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YXBwbGljYXRpb24ubG9nLmluZm8oYFthcHBsaWNhdGlvbjpyZXF1ZXN0XSBObyBtYXRjaCBmb3IgJHt0aGlzLnBhcmFtcy5wYXRofSBvbiAke3Jvb3R9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuIl19